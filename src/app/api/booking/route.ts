import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "../../../lib/firbase-admin";

export const runtime = "nodejs";

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

  // Only accept the fields expected by the booking form.
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

  if (!purposes.has(booking.purpose)) {
    return badRequest("Please select a valid trip purpose.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
    return badRequest("Please enter a valid email address.");
  }

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

  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(booking.time)) {
    return badRequest("Please enter a valid time.");
  }

  try {
    const db = getAdminDb();

    const document = await db.collection("bookings").add({
      ...booking,
      timeBasis: "pickup-local",
      status: "new",
      source: "website",
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: document.id,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log the error code without logging booking data or credentials.
    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error
        ? String(error.code)
        : "unknown";

    console.error("Booking save failed. Code:", code);

    return NextResponse.json(
      { error: "Unable to save your request. Please try again." },
      { status: 500 }
    );
  }
}