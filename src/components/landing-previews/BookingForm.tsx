"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Check, Plane, Phone } from "lucide-react";
type Details = {
  traveler: string;
  purpose: string;
  success: string;
  preferences: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  contactName: string;
  email: string;
  phone: string;
};
const empty: Details = {
  traveler: "",
  purpose: "Airport transfer",
  success: "",
  preferences: "",
  pickup: "",
  dropoff: "",
  date: "",
  time: "",
  contactName: "",
  email: "",
  phone: "",
};
function Location({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [results, setResults] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const id = label === "Pick-up location" ? "pickup" : "dropoff";
  useEffect(() => {
    if (value.length < 2) {
      setResults([]);
      return;
    }
    const abort = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const r = await fetch(`/api/airports?q=${encodeURIComponent(value)}`, {
          signal: abort.signal,
        });
        const d = (await r.json()) as { results?: { formatted: string }[] };
        setResults(
          (d.results || [])
            .map((a: { formatted: string }) => a.formatted)
            .filter(Boolean),
        );
      } catch {
        setResults([]);
      }
    }, 280);
    return () => {
      clearTimeout(timer);
      abort.abort();
    };
  }, [value]);
  return (
    <label className="location-field">
      {label}
      <input
        name={id}
        autoComplete="off"
        required
        maxLength={500}
        value={value}
        placeholder="Address, airport, hotel…"
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        aria-expanded={open && results.length > 0}
        aria-controls={`${id}-suggestions`}
      />
      {open && results.length > 0 && (
        <div className="airport-suggestions" id={`${id}-suggestions`}>
          <small>Airport suggestions</small>
          {results.map((r) => (
            <button
              type="button"
              key={r}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(r);
                setOpen(false);
              }}
            >
              <Plane size={14} />
              {r}
            </button>
          ))}
        </div>
      )}
    </label>
  );
}
export default function BookingForm() {
  const [data, setData] = useState<Details>(empty);
  const [order, setOrder] = useState(["journey", "person", "details"]);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const submitted = useRef(false);
  const touched = useRef(false);
  const current = order[step];
  const set = (key: keyof Details, value: string) => {
    touched.current = true;
    setData((d) => ({ ...d, [key]: value }));
  };
  useEffect(() => {
    if (window.matchMedia("(max-width: 600px)").matches && !touched.current)
      setOrder(["person", "journey", "details"]);
    const onStart = (event: Event) => {
      const d = (event as CustomEvent).detail;
      setData((prev) => ({ ...prev, ...d }));
      touched.current = true;
      setStep(0);
    };
    window.addEventListener("premier-start", onStart);
    return () => window.removeEventListener("premier-start", onStart);
  }, []);
  async function next(e: React.FormEvent) {
    e.preventDefault();
    if (!form.current?.reportValidity() || submitted.current) return;
    setError("");
    if (step < 2) {
      setStep(step + 1);
      requestAnimationFrame(() =>
        title.current?.focus({ preventScroll: true }),
      );
      return;
    }
    const missing =
      !data.pickup || !data.dropoff || !data.date || !data.time
        ? "journey"
        : !data.traveler || !data.contactName || !data.email || !data.phone
          ? "person"
          : null;
    if (missing) {
      setStep(order.indexOf(missing));
      setError("Please complete these details.");
      return;
    }
    submitted.current = true;
    setBusy(true);
    try {
      const r = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await r.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
      if (!r.ok) throw Error(result.error || "Unable to send your request.");
      setSent(true);
      requestAnimationFrame(() =>
        title.current?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "center",
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      submitted.current = false;
      setBusy(false);
    }
  }
  return (
    <div className="request-ui">
      {sent ? (
        <div className="request-success">
          <span>
            <Check size={28} />
          </span>
          <p className="form-eyebrow">YOUR JOURNEY STARTS HERE</p>
          <h2 ref={title} tabIndex={-1}>
            Consider it in good hands.
          </h2>
          <p>
            Your request has been sent to our Client Experience Team. We’ll
            contact you to confirm the arrangements. Your booking is not
            confirmed until you hear from us.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setStep(0);
              setData(empty);
            }}
          >
            Plan another journey <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <>
          <div className="request-topline">
            <span className="form-eyebrow">LET’S ARRANGE YOUR JOURNEY</span>
            <span>
              0{step + 1} <i>/ 03</i>
            </span>
          </div>
          <div
            className="request-progress"
            aria-label={`Step ${step + 1} of 3`}
          >
            {order.map((s, i) => (
              <button
                disabled={i > step || busy}
                type="button"
                key={s}
                onClick={() => {
                  setStep(i);
                  setError("");
                }}
                className={i <= step ? "active" : ""}
              >
                {s === "journey"
                  ? "Your journey"
                  : s === "person"
                    ? "Your details"
                    : "The little things"}
              </button>
            ))}
          </div>
          <h2 ref={title} tabIndex={-1}>
            {current === "journey"
              ? "Where does your day begin?"
              : current === "person"
                ? "Who are we looking after?"
                : "Make it yours."}
          </h2>
          <p className="request-intro">
            {current === "journey"
              ? "A few details now. One less thing to think about later."
              : current === "person"
                ? "A name, a way to reach you, and we’ll take it from here."
                : "Tell us what will make the journey feel just right."}
          </p>
          <form ref={form} onSubmit={next}>
            <fieldset disabled={busy}>
              {current === "journey" && (
                <div className="form-grid">
                  <Location
                    label="Pick-up location"
                    value={data.pickup}
                    onChange={(v) => set("pickup", v)}
                  />
                  <Location
                    label="Drop-off location"
                    value={data.dropoff}
                    onChange={(v) => set("dropoff", v)}
                  />
                  <label>
                    Date
                    <input
                      type="date"
                      required
                      value={data.date}
                      onChange={(e) => set("date", e.target.value)}
                    />
                  </label>
                  <label>
                    Time
                    <input
                      type="time"
                      required
                      value={data.time}
                      onChange={(e) => set("time", e.target.value)}
                    />
                    <small>Local time at your pick-up location</small>
                  </label>
                </div>
              )}
              {current === "person" && (
                <div className="form-grid">
                  <label>
                    Traveler’s name
                    <input
                      autoComplete="off"
                      required
                      maxLength={120}
                      placeholder="Who is traveling?"
                      value={data.traveler}
                      onChange={(e) => set("traveler", e.target.value)}
                    />
                  </label>
                  <label>
                    Your name
                    <input
                      autoComplete="name"
                      required
                      maxLength={120}
                      placeholder="Person arranging the journey"
                      value={data.contactName}
                      onChange={(e) => set("contactName", e.target.value)}
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="you@example.com"
                      value={data.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      type="tel"
                      autoComplete="tel"
                      required
                      maxLength={40}
                      placeholder="Include country code"
                      value={data.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </label>
                </div>
              )}
              {current === "details" && (
                <div className="form-grid">
                  <label className="full">
                    What brings you here?
                    <select
                      value={data.purpose}
                      onChange={(e) => set("purpose", e.target.value)}
                    >
                      {[
                        "Airport transfer",
                        "Business meeting",
                        "Entertainment Detail",
                        "Security detail",
                        "Family travel",
                        "Event",
                        "Other",
                      ].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    What would make this perfect? <small>Optional</small>
                    <textarea
                      maxLength={1500}
                      placeholder="A special occasion, a tight schedule…"
                      value={data.success}
                      onChange={(e) => set("success", e.target.value)}
                    />
                  </label>
                  <label>
                    Your preferences <small>Optional</small>
                    <textarea
                      maxLength={1500}
                      placeholder="Water, temperature, conversation, quiet…"
                      value={data.preferences}
                      onChange={(e) => set("preferences", e.target.value)}
                    />
                  </label>
                </div>
              )}
            </fieldset>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <div className="form-actions">
              {step > 0 ? (
                <button
                  type="button"
                  className="back"
                  disabled={busy}
                  onClick={() => {
                    setStep(step - 1);
                    setError("");
                  }}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              ) : (
                <span className="form-discretion">
                  Considered. Personal. Discreet.
                </span>
              )}
              <button className="form-next" type="submit" disabled={busy}>
                {busy
                  ? "Sending your request…"
                  : step === 2
                    ? "Send journey request"
                    : "Continue"}
                <ArrowRight size={17} />
              </button>
            </div>
            {step === 2 && (
              <p className="confirm-note">
                Our team will contact you to confirm availability and
                arrangements. Sending a request does not confirm a reservation.
              </p>
            )}
          </form>
          <div className="request-call">
            <Phone size={13} />
            <span>Prefer to speak with someone?</span>
            <a href="tel:+18884129150">+1 888 412 9150</a>
          </div>
        </>
      )}
    </div>
  );
}
