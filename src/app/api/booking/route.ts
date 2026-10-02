import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { Resend } from "resend";
import { getAdminDb } from "../../../lib/firbase-admin";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const purposes = new Set([
  "Business meeting",
  "Entertainment Detail",
  "Airport transfer",
  "Security detail",
  "Family travel",
  "Event",
  "Other",
]);

const fields = {
  traveler: { required: true, max: 150 },
  purpose: { required: true, max: 100 },
  success: { required: false, max: 3000 },
  preferences: { required: false, max: 3000 },
  pickup: { required: true, max: 500 },
  dropoff: { required: true, max: 500 },
  date: { required: true, max: 10 },
  time: { required: true, max: 5 },
  contactName: { required: true, max: 150 },
  email: { required: true, max: 254 },
  phone: { required: true, max: 40 },
} as const;

type BookingField = keyof typeof fields;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/**
 * Escapes user-controlled values before inserting them into HTML emails.
 */
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON.");
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return badRequest("Invalid booking data.");
  }

  const input = body as Record<string, unknown>;
  const booking = {} as Record<BookingField, string>;

  // Only accept fields expected by the booking form.
  for (const field of Object.keys(fields) as BookingField[]) {
    const rules = fields[field];
    const value = input[field];

    if (value === undefined && !rules.required) {
      booking[field] = "";
      continue;
    }

    if (typeof value !== "string") {
      return badRequest(`Invalid value for ${field}.`);
    }

    const cleaned = value.trim();

    if (rules.required && !cleaned) {
      return badRequest(`${field} is required.`);
    }

    if (cleaned.length > rules.max) {
      return badRequest(`${field} is too long.`);
    }

    booking[field] = cleaned;
  }

  // Validate purpose.
  if (!purposes.has(booking.purpose)) {
    return badRequest("Please select a valid trip purpose.");
  }

  // Validate email.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
    return badRequest("Please enter a valid email address.");
  }

  // Validate date format.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.date)) {
    return badRequest("Please enter a valid date.");
  }

  const parsedDate = new Date(`${booking.date}T00:00:00.000Z`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== booking.date
  ) {
    return badRequest("Please enter a valid calendar date.");
  }

  // Validate time.
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(booking.time)) {
    return badRequest("Please enter a valid time.");
  }

  try {
    const db = getAdminDb();

    // -------------------------------------------------------
    // 1. SAVE BOOKING TO FIRESTORE
    // -------------------------------------------------------

    const document = await db.collection("bookings").add({
      ...booking,
      timeBasis: "pickup-local",
      status: "new",
      source: "website",
      createdAt: FieldValue.serverTimestamp(),
    });

    // -------------------------------------------------------
    // 2. FIRESTORE SUCCEEDED — SEND EMAIL
    // -------------------------------------------------------

    try {
      const { error: emailError } = await resend.emails.send({
        from: "Premier Reservations <booking@pitdrives.com>",

        // CHANGE THIS if reservations should go somewhere else.
        to: ["info@pitdrives.com"],

        // Clicking Reply will reply directly to the customer.
        replyTo: booking.email,

        subject: `New Reservation Request — ${booking.traveler}`,

        html: `
          <!DOCTYPE html>
          <html>
            <body
              style="
                margin: 0;
                padding: 0;
                background: #f4f4f4;
                font-family: Arial, Helvetica, sans-serif;
                color: #171717;
              "
            >
              <div
                style="
                  max-width: 680px;
                  margin: 0 auto;
                  padding: 40px 20px;
                "
              >
                <div
                  style="
                    background: #111111;
                    padding: 30px;
                    text-align: center;
                  "
                >
                  <div
                    style="
                      color: #d4bf94;
                      font-size: 12px;
                      letter-spacing: 3px;
                      text-transform: uppercase;
                    "
                  >
                    Premier International Transportation
                  </div>

                  <h1
                    style="
                      color: #ffffff;
                      font-size: 26px;
                      font-weight: 400;
                      margin: 12px 0 0;
                    "
                  >
                    New Reservation Request
                  </h1>
                </div>

                <div
                  style="
                    background: #ffffff;
                    padding: 32px;
                  "
                >
                  <p
                    style="
                      margin: 0 0 30px;
                      color: #777777;
                      font-size: 13px;
                    "
                  >
                    Booking reference:
                    <strong>${escapeHtml(document.id)}</strong>
                  </p>

                  <!-- JOURNEY -->

                  <h2
                    style="
                      font-size: 13px;
                      text-transform: uppercase;
                      letter-spacing: 2px;
                      color: #9a8256;
                      margin: 0 0 18px;
                    "
                  >
                    Journey
                  </h2>

                  <p>
                    <strong>Pick-up</strong><br />
                    ${escapeHtml(booking.pickup)}
                  </p>

                  <p>
                    <strong>Drop-off</strong><br />
                    ${escapeHtml(booking.dropoff)}
                  </p>

                  <p>
                    <strong>Date</strong><br />
                    ${escapeHtml(booking.date)}
                  </p>

                  <p>
                    <strong>Pick-up time</strong><br />
                    ${escapeHtml(booking.time)} (local time)
                  </p>

                  <hr
                    style="
                      border: 0;
                      border-top: 1px solid #eeeeee;
                      margin: 30px 0;
                    "
                  />

                  <!-- TRAVELER -->

                  <h2
                    style="
                      font-size: 13px;
                      text-transform: uppercase;
                      letter-spacing: 2px;
                      color: #9a8256;
                      margin: 0 0 18px;
                    "
                  >
                    Traveler
                  </h2>

                  <p>
                    <strong>Principal / Traveler</strong><br />
                    ${escapeHtml(booking.traveler)}
                  </p>

                  <p>
                    <strong>Purpose</strong><br />
                    ${escapeHtml(booking.purpose)}
                  </p>

                  ${
                    booking.success
                      ? `
                        <p>
                          <strong>What matters most</strong><br />
                          ${escapeHtml(booking.success).replaceAll(
                            "\n",
                            "<br />"
                          )}
                        </p>
                      `
                      : ""
                  }

                  ${
                    booking.preferences
                      ? `
                        <p>
                          <strong>Personal preferences</strong><br />
                          ${escapeHtml(booking.preferences).replaceAll(
                            "\n",
                            "<br />"
                          )}
                        </p>
                      `
                      : ""
                  }

                  <hr
                    style="
                      border: 0;
                      border-top: 1px solid #eeeeee;
                      margin: 30px 0;
                    "
                  />

                  <!-- CONTACT -->

                  <h2
                    style="
                      font-size: 13px;
                      text-transform: uppercase;
                      letter-spacing: 2px;
                      color: #9a8256;
                      margin: 0 0 18px;
                    "
                  >
                    Contact
                  </h2>

                  <p>
                    <strong>Name</strong><br />
                    ${escapeHtml(booking.contactName)}
                  </p>

                  <p>
                    <strong>Email</strong><br />
                    <a
                      href="mailto:${escapeHtml(booking.email)}"
                      style="color: #9a8256;"
                    >
                      ${escapeHtml(booking.email)}
                    </a>
                  </p>

                  <p>
                    <strong>Phone</strong><br />
                    ${escapeHtml(booking.phone)}
                  </p>

                  <hr
                    style="
                      border: 0;
                      border-top: 1px solid #eeeeee;
                      margin: 30px 0;
                    "
                  />

                  <p
                    style="
                      margin: 0;
                      color: #777777;
                      font-size: 12px;
                      line-height: 1.6;
                    "
                  >
                    Submitted through pitdrives.com
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      if (emailError) {
        console.error(
          "Booking saved but notification email failed:",
          emailError.name
        );
      }
    } catch (emailError) {
      // IMPORTANT:
      // The booking is already safely stored in Firestore.
      // An email problem should NOT tell the customer their booking failed.
      console.error(
        "Booking saved but notification email failed:",
        emailError instanceof Error ? emailError.message : "unknown"
      );
    }

    // -------------------------------------------------------
    // 3. RETURN SUCCESS
    // -------------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        bookingId: document.id,
      },
      { status: 201 }
    );
  } catch (error) {
    // Don't log customer booking data or credentials.
    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error
        ? String(error.code)
        : "unknown";

    console.error("Booking save failed. Code:", code);

    return NextResponse.json(
      {
        error: "Unable to save your request. Please try again.",
      },
      { status: 500 }
    );
  }
}