"use client";

import { useRef, useState,useEffect } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const purposes = [
  "Business meeting",
  "Entertainment Detail",
  "Airport transfer",
  "Security detail",
  "Family travel",
  "Event",
  "Other",
];

const steps = [
  {
    label: "The traveler",
    title: "Who are we serving?",
    description:
      "Every journey begins with a person. Tell us who we’ll be looking after.",
  },
  {
    label: "The journey",
    title: "Now, tell us the logistics.",
    description:
      "Where should the journey begin, and where are we taking you?",
  },
  {
    label: "The occasion",
    title: "What is the purpose of this trip?",
    description:
      "A little context helps us prepare the right experience.",
  },
  {
    label: "Your expectations",
    title: "What would make this perfect?",
    description:
      "Tell us what matters most, from a seamless arrival to a moment of quiet.",
  },
  {
    label: "Personal preferences",
    title: "What are their preferences?",
    description:
      "The smallest details can make a journey feel entirely their own.",
  },
  {
    label: "Your details",
    title: "How should we reach you?",
    description:
      "Our Client Experience Team will use these details to follow up personally.",
  },
  {
    label: "Start the conversation",
    title: "We will be in touch shortly.",
    description:
      "Review your details, then send your request to our Client Experience Team.",
  },
];

const initialValues = {
  traveler: "",
  purpose: "",
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

type BookingValues = typeof initialValues;

const inputClass =
  "w-full rounded-lg border border-white/20 bg-white/[0.035] px-4 py-4 text-base text-white outline-none transition-colors placeholder:text-white/35 hover:border-white/35 focus:border-[#c9a227] focus:bg-white/[0.055] disabled:opacity-50";

const labelClass = "mb-3 block text-sm font-medium text-white/75";

// Native fetch keeps this integration free of extra npm dependencies.
// Configure NEXT_PUBLIC_GEOAPIFY_API_KEY in .env.local and your hosting settings.
type LocationSuggestion = {
  place_id: string;
  formatted: string;
  address_line1?: string;
  address_line2?: string;
  name?: string;
  categories?: string[];
  exactAirportCode?: boolean;
};

// Airports come from the server-side OurAirports dataset; addresses use Geoapify.
function prioritizeLocations(airportResults: LocationSuggestion[], addressResults: LocationSuggestion[]) {
  const seenIds = new Set<string>();
  const seenAddresses = new Set<string>();
  return [...airportResults, ...addressResults].filter((item) => {
    const address = item.formatted.toLowerCase().replace(/\s+/g, " ").trim();
    if ((item.place_id && seenIds.has(item.place_id)) || seenAddresses.has(address)) return false;
    if (item.place_id) seenIds.add(item.place_id);
    seenAddresses.add(address);
    return true;
  }).sort((a, b) => {
    const isAirport = (item: LocationSuggestion) =>
      item.categories?.some((category) => category === "airport" || category.startsWith("airport.")) ||
      /\b(airport|aerodrome)\b/i.test(item.name || item.address_line1 || "");
    return Number(Boolean(b.exactAirportCode)) - Number(Boolean(a.exactAirportCode)) ||
      Number(Boolean(isAirport(b))) - Number(Boolean(isAirport(a)));
  }).slice(0, 8);
}

async function searchLocations(query: string, key: string, signal: AbortSignal) {
  const addressParams = new URLSearchParams({
    apiKey: key, lang: "en", limit: "6", bias: "proximity:-77.0369,38.9072",
    text: query, format: "json",
  });
  const [addresses, airports] = await Promise.allSettled([
    (async (): Promise<LocationSuggestion[]> => {
      if (!key) throw new Error("Missing Geoapify API key");
      const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?${addressParams}`, { signal });
      if (!response.ok) throw new Error("Address search unavailable");
      const data: { results?: LocationSuggestion[] } = await response.json();
      return (data.results ?? []).filter((item) => typeof item.formatted === "string");
    })(),
    (async (): Promise<LocationSuggestion[]> => {
      const params = new URLSearchParams({ q: query });
      const response = await fetch(`/api/airports?${params}`, { signal });
      if (!response.ok) throw new Error("Airport search unavailable");
      const data: { results?: LocationSuggestion[] } = await response.json();
      return (data.results ?? []).filter((item) => typeof item.formatted === "string");
    })(),
  ]);
  if (addresses.status === "rejected" && airports.status === "rejected") {
    throw new Error("Location search unavailable");
  }
  return {
    items: prioritizeLocations(airports.status === "fulfilled" ? airports.value : [], addresses.status === "fulfilled" ? addresses.value : []),
    complete: addresses.status === "fulfilled" && airports.status === "fulfilled",
    warning: airports.status === "rejected"
      ? "Airport suggestions are temporarily unavailable. You can still enter your airport."
      : addresses.status === "rejected"
        ? "Address suggestions are temporarily unavailable. You can still enter your address."
        : "",
  };
}

type LocationProps = {
  id: string;
  name: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  onChange: (value: string) => void;
};

function LocationAutocomplete({ onChange, ...props }: LocationProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const cache = useRef(new Map<string, LocationSuggestion[]>());
  const requestId = useRef(0);
  const selectedValue = useRef<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [predictions, setPredictions] = useState<LocationSuggestion[]>([]);
  const [active, setActive] = useState(-1);
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState({ left: 0, top: 0, width: 0, height: 280, above: false });
  const listId = `${props.id}-suggestions`;

  useEffect(() => {
    const sequence = ++requestId.current;
    if (!focused || props.value.trim().length < 3 || selectedValue.current === props.value) {
      setOpen(false);
      return;
    }
    setPredictions([]);
    setActive(-1);
    setMessage("Searching locations…");
    setOpen(true);
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      if (requestId.current !== sequence) return;
      try {
        const key = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY ?? "";
        const query = props.value.trim();
        let items = cache.current.get(query.toLowerCase());
        let warning = "";
        if (!items) {
          const result = await searchLocations(query, key, controller.signal);
          items = result.items;
          warning = result.warning;
          if (result.complete) {
            if (cache.current.size >= 50) cache.current.clear();
            cache.current.set(query.toLowerCase(), items);
          }
        }
        if (requestId.current !== sequence) return;
        setPredictions(items);
        setMessage(warning || (items.length ? "" : "No suggestions. You can enter the full address."));
      } catch {
        if (requestId.current !== sequence) return;
        setMessage("Suggestions unavailable. Please enter the full address.");
      }
    }, 400);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
      ++requestId.current;
    };
  }, [props.value, focused]);

  // Portal keeps suggestions visible outside the animated form panel.
  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      const rect = inputRef.current?.getBoundingClientRect();
      if (!rect) return;
      const viewport = window.visualViewport;
      const viewportTop = viewport?.offsetTop ?? 0;
      const viewportBottom = viewportTop + (viewport?.height ?? window.innerHeight);
      const below = viewportBottom - rect.bottom - 12;
      const above = rect.top - viewportTop - 12;
      const showAbove = below < 280 && above > below;
      const height = Math.max(0, Math.min(320, showAbove ? above : below));
      const width = Math.min(Math.max(rect.width, 280), document.documentElement.clientWidth - 24);
      setPosition({
        left: Math.max(12, Math.min(rect.left, document.documentElement.clientWidth - width - 12)),
        top: showAbove ? rect.top - 6 : rect.bottom + 6,
        above: showAbove,
        width,
        height,
      });
    };
    reposition();
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    window.visualViewport?.addEventListener("resize", reposition);
    window.visualViewport?.addEventListener("scroll", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
      window.visualViewport?.removeEventListener("resize", reposition);
      window.visualViewport?.removeEventListener("scroll", reposition);
    };
  }, [open]);

  useEffect(() => {
    if (active >= 0) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function choose(prediction: LocationSuggestion) {
    ++requestId.current;
    const text = prediction.formatted;
    selectedValue.current = text;
    onChange(text);
    setOpen(false);
    setActive(-1);
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <input
        {...props}
        ref={inputRef}
        type="text"
        className={inputClass}
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (event.relatedTarget instanceof Node && popupRef.current?.contains(event.relatedTarget)) return;
          ++requestId.current; setFocused(false); setOpen(false);
        }}
        onChange={(event) => {
          ++requestId.current;
          selectedValue.current = null;
          setPredictions([]);
          setActive(-1);
          onChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing) return;
          if (event.key === "Escape") {
            ++requestId.current;
            setOpen(false);
          } else if (open && predictions.length && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
            event.preventDefault();
            setActive((index) => event.key === "ArrowDown"
              ? (index + 1) % predictions.length
              : (index <= 0 ? predictions.length - 1 : index - 1));
          } else if (open && event.key === "Enter") {
            event.preventDefault();
            if (active >= 0 && predictions[active]) choose(predictions[active]);
            else setOpen(false);
          }
        }}
      />
      {open && position.width > 0 && createPortal(
        <div
          ref={popupRef}
          onBlur={(event) => {
            if (event.relatedTarget instanceof Node &&
              (event.currentTarget.contains(event.relatedTarget) || event.relatedTarget === inputRef.current)) return;
            ++requestId.current; setFocused(false); setOpen(false);
          }}
          data-lenis-prevent
          className="fixed z-[1000] flex flex-col overflow-hidden rounded-md border border-[#d4bf94]/30 bg-[#151515] text-white shadow-2xl"
          style={{ left: position.left, top: position.top, width: position.width, maxHeight: position.height, transform: position.above ? "translateY(-100%)" : undefined }}
          onPointerDown={(event) => {
            if (!(event.target as HTMLElement).closest("a")) event.preventDefault();
          }}
        >
          <ul id={listId} ref={listRef} role="listbox" aria-label="Suggested locations"
            className="m-0 min-h-0 list-none overflow-y-auto overscroll-contain p-1">
            {predictions.map((prediction, index) => (
              <li key={prediction.place_id || prediction.formatted} id={`${listId}-${index}`} role="option"
                aria-selected={index === active}
                onClick={() => choose(prediction)}
                className={`cursor-pointer rounded px-3 py-3 text-[14px] leading-5 hover:bg-white/10 ${index === active ? "bg-white/10" : ""}`}>
                <span className="block font-medium text-[#e0c99b]">
                  {prediction.address_line1 || prediction.name || prediction.formatted}
                </span>
                {prediction.address_line2 && <span className="mt-1 block text-[12px] text-white/65">{prediction.address_line2}</span>}
              </li>
            ))}
          </ul>
          {message && <p role="status" className="px-4 py-3 text-[13px] leading-5 text-white/70">{message}</p>}
          <div className="shrink-0 border-t border-white/10 px-4 py-2 text-right">
            <span className="text-[11px] leading-4 text-white/65">
              Powered by <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Geoapify</a>
              {" · "}© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">OpenStreetMap</a> contributors
              {" · "}Airports: <a href="https://ourairports.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">OurAirports</a>
            </span>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`size-5 shrink-0 ${back ? "rotate-180" : ""}`}
    >
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export default function BookingSection({
  endpoint = "/api/booking",
}: {
  endpoint?: string;
}) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const submissionLock = useRef(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Observe the stationary section, not the moving panels. "some" also
  // keeps the long review form visible while scrolling through its fields.
  const sectionInView = useInView(sectionRef, {
    once: false,
    amount: "some",
    margin: "0px 0px -80px 0px",
  });
  const sectionVisible = reduceMotion || sectionInView;
  const entranceTransition = {
    duration: reduceMotion ? 0 : sectionInView ? 1.1 : 0.45,
    ease,
  };


  const current = steps[step];
  const lastStep = step === steps.length - 1;

  function update(field: keyof BookingValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setError("");
  }

  function navigate(nextStep: number) {
    if (submitting) return;

    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formRef.current?.reportValidity()) return;

    if (!lastStep) {
      navigate(step + 1);
      return;
    }

    if (submissionLock.current) return;

    submissionLock.current = true;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Unable to submit request.");
      }

      setSubmitted(true);
    } catch {
      setError(
        "We couldn’t send your request. Your details are still here—please try again."
      );
    } finally {
      submissionLock.current = false;
      setSubmitting(false);
    }
  }
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!submitted) return;
    const frame = requestAnimationFrame(() => {
      const confirmation = successRef.current;
      if (!confirmation) return;
      confirmation.focus({ preventScroll: true });
      confirmation.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [submitted, reduceMotion]);
  const reviewGroups = [
    {
      title: "The traveler",
      step: 0,
      entries: [["Name", values.traveler]],
    },
    {
      title: "The journey",
      step: 1,
      entries: [
        ["Pick-up", values.pickup],
        ["Drop-off", values.dropoff],
        ["Date", values.date],
        ["Time", `${values.time} · Pick-up location’s local time`],
      ],
    },
    {
      title: "The occasion",
      step: 2,
      entries: [["Purpose", values.purpose]],
    },
    {
      title: "Your expectations",
      step: 3,
      entries: [["A perfect journey", values.success || "Not specified"]],
    },
    {
      title: "Personal preferences",
      step: 4,
      entries: [["Preferences", values.preferences || "Not specified"]],
    },
    {
      title: "Your contact details",
      step: 5,
      entries: [
        ["Name", values.contactName],
        ["Email", values.email],
        ["Phone", values.phone],
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="booking-section-heading"
      className="relative isolate overflow-hidden bg-black px-6 py-20 text-white md:px-[72px] md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 0% 20%, rgba(255,255,255,0.05), transparent 60%)",
        }}
      />

      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Section introduction */}
        <motion.div
          className="lg:pt-10"
          initial={false}
          animate={{ opacity: sectionVisible ? 1 : 0, x: sectionVisible ? 0 : -90 }}
          transition={entranceTransition}
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-white/55">
            Your Journey, Personally Arranged
          </p>

          <h2
            id="booking-section-heading"
            className="max-w-[480px] text-4xl font-medium leading-[1.15] tracking-[-0.035em] md:text-5xl"
          >
            Every journey begins with a conversation.
          </h2>

          <div
            aria-hidden="true"
            className="my-8 h-px w-16 bg-[#c9a227]/70"
          />

          <p className="max-w-[400px] text-lg leading-8 text-white/65">
          Tell us who you're moving and what matters to them, a Client Experience Lead will take it from there.
          </p>

          <p className="mt-7 max-w-[380px] text-sm leading-7 text-white/45">
  Prefer to speak with someone? Call{" "}
  <a
    href="tel:+18884129150"
    className="text-[#dfbf64] underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227]"
  >
    +1-888-412-9150
  </a>
  . Available 24 hours a day.
</p>
        </motion.div>

        {/* Form panel */}
        <motion.div
          className="min-w-0 rounded-2xl border border-white/15 bg-white/[0.025] p-6 sm:p-9 md:p-10"
          initial={false}
          animate={{ opacity: sectionVisible ? 1 : 0, x: sectionVisible ? 0 : 90 }}
          transition={entranceTransition}
        >
          {submitted ? (
          <motion.div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="flex min-h-[460px] flex-col items-start justify-center outline-none"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
        >
              <div className="mb-8 flex size-16 items-center justify-center rounded-full border border-[#c9a227]/50 text-[#dfbf64]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-7"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </div>

              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#dfbf64]">
                Request Received
              </p>

              <h3 className="text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
                We will be in touch shortly.
              </h3>

              <p className="mt-6 text-base leading-8 text-white/65">
                Thank you, {values.contactName}. Our Client Experience Team
                has received your request and will contact you using the
                details you provided.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Progress */}
              <div className="mb-10">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                    {current.label}
                  </p>

                  <span className="shrink-0 text-xs tabular-nums text-white/45">
                    {String(step + 1).padStart(2, "0")}
                    <span className="mx-2 text-white/25">/</span>
                    07
                  </span>
                </div>

                <div
                  role="progressbar"
                  aria-label="Booking request progress"
                  aria-valuemin={1}
                  aria-valuemax={7}
                  aria-valuenow={step + 1}
                  className="flex gap-2"
                >
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${
                        index <= step ? "bg-[#c9a227]" : "bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{
                      opacity: 0,
                      x: reduceMotion ? 0 : direction * 14,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: reduceMotion ? 0 : direction * -10,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                      ease,
                    }}
                    onAnimationComplete={() => {
                      headingRef.current?.focus({ preventScroll: true });
                    }}
                  >
                    <h3
                      ref={headingRef}
                      tabIndex={-1}
                      className="text-3xl font-medium leading-tight tracking-[-0.025em] outline-none sm:text-4xl"
                    >
                      {current.title}
                    </h3>

                    <p className="mt-4 text-base leading-7 text-white/60">
                      {current.description}
                    </p>

                    <fieldset
                      disabled={submitting}
                      className="mt-8 min-w-0 space-y-6"
                    >
                      <legend className="sr-only">{current.title}</legend>

                      {step === 0 && (
                        <div>
                          <label htmlFor="traveler" className={labelClass}>
                            Name of the principal or the person traveling
                          </label>
                          <input
                            id="traveler"
                            name="traveler"
                            required
                            maxLength={150}
                            value={values.traveler}
                            onChange={(e) => update("traveler", e.target.value)}
                            placeholder="Full name"
                            className={inputClass}
                          />
                        </div>
                      )}

                      {step === 1 && (
                        <>
                          <div>
                            <label htmlFor="pickup" className={labelClass}>
                              Pick-Up Location
                            </label>
                            <LocationAutocomplete
                              id="pickup"
                              name="pickup"
                              required
                              maxLength={500}
                              value={values.pickup}
                              onChange={(value) => update("pickup", value)}
                              placeholder="Address, airport, hotel, or venue"
                            />
                          </div>

                          <div>
                            <label htmlFor="dropoff" className={labelClass}>
                              Drop-Off Location
                            </label>
                            <LocationAutocomplete
                              id="dropoff"
                              name="dropoff"
                              required
                              maxLength={500}
                              value={values.dropoff}
                              onChange={(value) => update("dropoff", value)}
                              placeholder="Where are we taking you?"
                            />
                          </div>

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="min-w-0">
                              <label htmlFor="date" className={labelClass}>
                                Date
                              </label>
                              <input
                                id="date"
                                name="date"
                                type="date"
                                required
                                value={values.date}
                                onChange={(e) => update("date", e.target.value)}
                                className={`${inputClass} min-w-0 [color-scheme:dark]`}
                              />
                            </div>

                            <div className="min-w-0">
                              <label htmlFor="time" className={labelClass}>
                                Time
                              </label>
                              <input
                                id="time"
                                name="time"
                                type="time"
                                required
                                aria-describedby="booking-time-note"
                                value={values.time}
                                onChange={(e) => update("time", e.target.value)}
                                className={`${inputClass} min-w-0 [color-scheme:dark]`}
                              />
                            </div>
                          </div>

                          <p
                            id="booking-time-note"
                            className="text-xs leading-6 text-white/45"
                          >
                            Please use the local time at your pick-up location.
                          </p>
                        </>
                      )}

                      {step === 2 && (
                        <div>
                          <label htmlFor="purpose" className={labelClass}>
                            Trip purpose
                          </label>
                          <select
                            id="purpose"
                            name="purpose"
                            required
                            value={values.purpose}
                            onChange={(e) => update("purpose", e.target.value)}
                            className={`${inputClass} [color-scheme:dark]`}
                          >
                            <option value="" disabled className="bg-black">
                              Select the purpose of your trip
                            </option>
                            {purposes.map((purpose) => (
                              <option
                                key={purpose}
                                value={purpose}
                                className="bg-black"
                              >
                                {purpose}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <label htmlFor="success" className={labelClass}>
                            Describe what success looks like for this ride
                            <span className="ml-2 text-white/40">
                              (optional)
                            </span>
                          </label>
                          <textarea
                            id="success"
                            name="success"
                            rows={5}
                            maxLength={3000}
                            value={values.success}
                            onChange={(e) => update("success", e.target.value)}
                            placeholder="What would make this journey feel just right?"
                            className={`${inputClass} resize-y`}
                          />
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <label htmlFor="preferences" className={labelClass}>
                            Personal preferences
                            <span className="ml-2 text-white/40">
                              (optional)
                            </span>
                          </label>
                          <textarea
                            id="preferences"
                            name="preferences"
                            rows={5}
                            maxLength={3000}
                            value={values.preferences}
                            onChange={(e) =>
                              update("preferences", e.target.value)
                            }
                            placeholder="Water, reading material, temperature, conversation style—anything we should know."
                            className={`${inputClass} resize-y`}
                          />
                        </div>
                      )}

                      {step === 5 && (
                        <>
                          <div>
                            <label htmlFor="contactName" className={labelClass}>
                              Your name
                            </label>
                            <input
                              id="contactName"
                              name="contactName"
                              autoComplete="name"
                              required
                              maxLength={150}
                              value={values.contactName}
                              onChange={(e) =>
                                update("contactName", e.target.value)
                              }
                              placeholder="Full name"
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className={labelClass}>
                              Email
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              maxLength={254}
                              value={values.email}
                              onChange={(e) => update("email", e.target.value)}
                              placeholder="you@company.com"
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label htmlFor="phone" className={labelClass}>
                              Phone
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              autoComplete="tel"
                              required
                              maxLength={40}
                              value={values.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              placeholder="Include country code"
                              className={inputClass}
                            />
                          </div>
                        </>
                      )}

                      {step === 6 && (
                        <div className="divide-y divide-white/10 rounded-lg border border-white/15 px-5">
                          {reviewGroups.map((group) => (
                            <div key={group.title} className="py-5">
                              <div className="mb-4 flex items-center justify-between gap-4">
                                <p className="text-xs uppercase tracking-[0.12em] text-white/50">
                                  {group.title}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => navigate(group.step)}
                                  aria-label={`Edit ${group.title.toLowerCase()}`}
                                  className="rounded px-2 py-1 text-sm text-[#dfbf64] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a227]"
                                >
                                  Edit
                                </button>
                              </div>

                              <dl className="space-y-3">
                                {group.entries.map(([label, value]) => (
                                  <div key={label}>
                                    <dt className="text-xs text-white/45">
                                      {label}
                                    </dt>
                                    <dd className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-white/85">
                                      {value}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          ))}
                        </div>
                      )}
                    </fieldset>
                  </motion.div>
                </AnimatePresence>

                {error && (
                  <p
                    role="alert"
                    className="mt-6 rounded-lg border border-red-300/20 bg-red-300/5 p-4 text-sm leading-6 text-red-200"
                  >
                    {error}
                  </p>
                )}

                {/* Navigation */}
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate(step - 1)}
                    disabled={step === 0 || submitting}
                    className={`inline-flex min-h-12 items-center gap-2 rounded px-2 text-sm text-white/65 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-40 ${
                      step === 0 ? "invisible" : ""
                    }`}
                  >
                    <Arrow back />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-12 items-center justify-center gap-4 rounded-sm border border-[#c9a227]/70 px-5 py-3 text-sm font-medium text-[#dfbf64] transition-colors hover:bg-[#c9a227] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227] disabled:cursor-wait disabled:opacity-50"
                  >
                    {submitting
                      ? "Sending your request…"
                      : lastStep
                        ? "Start the Conversation"
                        : "Continue"}
                    {!submitting && <Arrow />}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}