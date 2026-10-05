"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { FormEvent } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const purposes = [
  "Business meeting", "Entertainment Detail", "Airport transfer",
  "Security detail", "Family travel", "Event", "Other",
];

const initialValues = {
  traveler: "", purpose: "", success: "", preferences: "",
  pickup: "", dropoff: "", date: "", time: "",
  contactName: "", email: "", phone: "",
};
type BookingValues = typeof initialValues;
type FieldName = keyof BookingValues;
type Field = {
  name: FieldName;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "date" | "time" | "select" | "textarea";
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
};

const bookingSteps: { label: string; title: string; fields: Field[] }[] = [
  {
    label: "The journey", title: "Where are we taking you?",
    fields: [
      { name: "pickup", label: "Pick-up location", placeholder: "Address, airport, hotel, or venue", required: true, maxLength: 500 },
      { name: "dropoff", label: "Drop-off location", placeholder: "Your destination", required: true, maxLength: 500 },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Pick-up time", type: "time", required: true },
    ],
  },
  {
    label: "The traveler", title: "Who are we serving?",
    fields: [{ name: "traveler", label: "Name of the principal or person traveling", placeholder: "Full name", required: true, maxLength: 150 }],
  },
  {
    label: "The occasion", title: "What brings you here?",
    fields: [{ name: "purpose", label: "Trip purpose", type: "select", required: true }],
  },
  {
    label: "Your expectations", title: "What would make this perfect?",
    fields: [{ name: "success", label: "What matters most for this journey?", placeholder: "A seamless arrival, a moment of quiet, or something else…", type: "textarea", maxLength: 3000 }],
  },
  {
    label: "Personal preferences", title: "The details make the difference.",
    fields: [{ name: "preferences", label: "Personal preferences", placeholder: "Water, temperature, reading material, conversation style—anything we should know.", type: "textarea", maxLength: 3000 }],
  },
  {
    label: "Your details", title: "How should we reach you?",
    fields: [
      { name: "contactName", label: "Your name", placeholder: "Full name", required: true, maxLength: 150, autoComplete: "name" },
      { name: "email", label: "Email", placeholder: "you@company.com", type: "email", required: true, maxLength: 254, autoComplete: "email" },
      { name: "phone", label: "Phone", placeholder: "Include country code", type: "tel", required: true, maxLength: 40, autoComplete: "tel" },
    ],
  },
];

const inputClass =
  "block min-h-[48px] w-full min-w-0 rounded-md border border-white/20 bg-white/[0.07] px-3.5 py-3 text-[16px] leading-5 text-white outline-none transition-colors placeholder:text-white/45 hover:border-white/40 focus:border-[#d4bf94] focus:ring-1 focus:ring-[#d4bf94]/40 disabled:opacity-60 [color-scheme:dark]";

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

  // Portal avoids clipping by the hero and its translucent form container.
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      className={`h-[18px] w-[18px] shrink-0 ${back ? "rotate-180" : ""}`}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export default function HeroSection({ endpoint = "/api/booking" }: { endpoint?: string }) {
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState(bookingSteps);
  const [orderReady, setOrderReady] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const chooseOrder = () => {
      // Keep the chosen sequence once the visitor starts filling in the form.
      if (hasStarted.current) return;
      setSteps(desktop.matches
        ? bookingSteps
        : [bookingSteps[1], bookingSteps[0], ...bookingSteps.slice(2)]);
      setOrderReady(true);
    };
    chooseOrder();
    desktop.addEventListener("change", chooseOrder);
    return () => desktop.removeEventListener("change", chooseOrder);
  }, []);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<BookingValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const submissionLock = useRef(false);
  const focusNextStep = useRef(false);
  const id = useId();
  const reduceMotion = useReducedMotion();
  const inView = useInView(heroRef, { once: false, amount: 0.15 });
  const visible = reduceMotion || inView;
  const current = steps[step];
  const isJourneyStep = current.fields.some((field) => field.name === "pickup");
  const isContactStep = current.fields.some((field) => field.name === "contactName");
  const lastStep = step === steps.length - 1;

  useEffect(() => {
    if (focusNextStep.current) {
      stepHeadingRef.current?.focus({ preventScroll: true });
      focusNextStep.current = false;
    }
  }, [step]);

  useEffect(() => {
    if (!submitted) return;
    const frame = requestAnimationFrame(() => {
      const confirmation = successRef.current;
      if (!confirmation) return;
      confirmation.focus({ preventScroll: true });
      const bounds = confirmation.getBoundingClientRect();
      if (bounds.top < 100 || bounds.bottom > window.innerHeight) {
        confirmation.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [submitted, reduceMotion]);

  function update(field: FieldName, value: string) {
    hasStarted.current = true;
    setValues((previous) => ({ ...previous, [field]: value }));
    setError("");
  }

  function navigate(next: number) {
    if (submissionLock.current || next < 0 || next >= steps.length) return;
    hasStarted.current = true;
    focusNextStep.current = true;
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    hasStarted.current = true;
    if (submissionLock.current || !formRef.current?.reportValidity()) return;
    if (!lastStep) {
      navigate(step + 1);
      return;
    }

    // Check required values from previous steps before sending the same API payload.
    const missingStep = steps.findIndex((item) =>
      item.fields.some((field) => field.required && !values[field.name].trim()),
    );
    if (missingStep !== -1) {
      navigate(missingStep);
      setError("Please complete the required details before sending your request.");
      return;
    }

    submissionLock.current = true;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Unable to submit request.");
      setSubmitted(true);
    } catch {
      setError("We couldn’t send your request. Your details are still here—please try again.");
    } finally {
      submissionLock.current = false;
      setSubmitting(false);
    }
  }

  return (
    <section ref={heroRef} id="top" aria-labelledby={`${id}-hero-heading`}
      className="relative isolate flex min-h-[calc(100svh-78px)] w-full flex-col overflow-hidden bg-black px-5 pb-6 pt-8 text-white sm:px-8 lg:min-h-[calc(100svh-90px)] lg:px-[72px] lg:pb-7 lg:pt-10">
      {/* Full-width hero photograph. The form remains usable during scroll animations. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-0" initial={false}
          animate={{ scale: reduceMotion || inView ? 1 : 1.04 }}
          transition={{ duration: reduceMotion ? 0 : 1.8, ease }}>
          <Image src="/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
      </div>

      <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col items-center">
        <div className="flex w-full flex-1 items-center justify-center py-12 sm:py-16">
        <motion.h1 id={`${id}-hero-heading`}
          className="max-w-[1000px] text-center text-[clamp(30px,3.5vw,50px)] font-normal leading-[1.18] tracking-[-0.02em] [text-wrap:balance]"
          initial={false}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease }}>
          World class chauffeured transportation for the world&apos;s most important journeys.
        </motion.h1>
        </div>

        {/* Keep only this contact anchor when removing the old BookingSection. */}
        <div id="contact" className="mt-4 w-full shrink-0 scroll-mt-[110px] rounded-lg border border-white/20 bg-black/50 p-4 backdrop-blur-md sm:p-5">
          {submitted ? (
            <motion.div ref={successRef} tabIndex={-1} role="status"
              className="flex min-h-[180px] flex-col items-center justify-center text-center outline-none"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease }}>
              <div className="mb-5 flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#d4bf94]/60 text-[#d4bf94]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-[24px] w-[24px]"><path d="m5 12 4 4L19 6" /></svg>
              </div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#d4bf94]">Request received</p>
              <h2 className="text-[24px] font-normal leading-tight sm:text-[28px]">We will be in touch shortly.</h2>
              <p className="mt-4 max-w-[580px] text-[15px] leading-7 text-white/75">
                Thank you, {values.contactName}. Our Client Experience Team has received your request and will contact you using the details you provided.
              </p>
            </motion.div>
          ) : (
            <form style={{ visibility: orderReady ? "visible" : "hidden" }} ref={formRef} onSubmit={handleSubmit} aria-busy={submitting} className="grid grid-cols-1 gap-x-5 gap-y-3 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="col-span-full flex items-center justify-between gap-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#d4bf94]">{current.label}</p>
                <span className="shrink-0 text-[12px] tabular-nums text-white/65">{String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
              </div>
              <div role="progressbar" aria-label="Booking request progress" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-valuetext={`Step ${step + 1} of ${steps.length}: ${current.label}`} className="col-span-full mb-1 flex gap-1.5">
                {steps.map((item, index) => <span key={item.label} className={`h-[2px] flex-1 rounded-full ${index <= step ? "bg-[#c9a227]" : "bg-white/20"}`} />)}
              </div>

              <motion.div key={step} initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : direction * 12 }}
                animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25, ease }}
                className="min-w-0">
                <h2 ref={stepHeadingRef} id={`${id}-step-heading`} tabIndex={-1} className="sr-only">{current.title}</h2>
                <fieldset disabled={submitting} className="min-w-0">
                  <legend className="sr-only">{current.title}</legend>
                  <div className={`grid min-w-0 gap-4 ${isJourneyStep ? "sm:grid-cols-2 xl:grid-cols-[1.2fr_1.2fr_1fr_1fr]" : isContactStep ? "sm:grid-cols-3" : "grid-cols-1"}`}>
                    {current.fields.map((field) => {
                      const fieldId = `${id}-${field.name}`;
                      const shared = {
                        id: fieldId, name: field.name, required: field.required,
                        value: values[field.name], className: inputClass,
                        "aria-describedby": field.name === "time" ? `${id}-time-note` : undefined,
                      };
                      return (
                        <div key={field.name} className="min-w-0">
                          <label htmlFor={fieldId} className="mb-2 block text-[13px] font-medium leading-5 text-white/85">
                            {field.label}{!field.required && <span className="ml-2 font-normal text-white/45">(optional)</span>}
                          </label>
                          {field.name === "pickup" || field.name === "dropoff" ? (
                            <LocationAutocomplete
                              id={fieldId} name={field.name} value={values[field.name]}
                              required={field.required} maxLength={field.maxLength}
                              placeholder={field.placeholder}
                              onChange={(value) => update(field.name, value)}
                            />
                          ) : field.type === "select" ? (
                            <select {...shared} onChange={(event) => update(field.name, event.target.value)}>
                              <option value="" disabled className="bg-[#151515]">Select the purpose of your trip</option>
                              {purposes.map((purpose) => <option key={purpose} value={purpose} className="bg-[#151515]">{purpose}</option>)}
                            </select>
                          ) : field.type === "textarea" ? (
                            <textarea {...shared} rows={2} maxLength={field.maxLength} placeholder={field.placeholder}
                              className={`${inputClass} min-h-[74px] resize-y`}
                              onChange={(event) => update(field.name, event.target.value)} />
                          ) : (
                            <input {...shared} type={field.type ?? "text"} maxLength={field.maxLength} autoComplete={field.autoComplete}
                              placeholder={field.placeholder} onChange={(event) => update(field.name, event.target.value)} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {isJourneyStep && <p id={`${id}-time-note`} className="mt-3 text-[12px] leading-5 text-white/60">Please use the local time at your pick-up location.</p>}
                </fieldset>
              </motion.div>



              <div className={`flex items-end justify-end gap-2 ${isJourneyStep ? "lg:pb-[32px]" : ""}`}>
                <button type="button" onClick={() => navigate(step - 1)} disabled={step === 0 || submitting}
                  className={`inline-flex min-h-[46px] items-center gap-2 rounded px-2 text-[14px] text-white/75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4bf94] disabled:opacity-40 ${step === 0 ? "hidden" : ""}`}>
                  <Arrow back /> Back
                </button>
                <button type="submit" disabled={submitting}
                  className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-sm bg-[#b7a071] px-5 py-3 text-[14px] font-semibold text-[#17130d] transition-colors hover:bg-[#d4bf94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4bf94] disabled:cursor-wait disabled:opacity-60">
                  {submitting ? "Sending…" : lastStep ? "Start Conversation" : "Continue"}
                  {!submitting && <Arrow />}
                </button>
              </div>
              {error && <p role="alert" className="col-span-full rounded-md border border-red-300/25 bg-red-950/40 px-4 py-3 text-[14px] leading-6 text-red-100">{error}</p>}
            </form>
          )}
        </div>
        <p className="mt-4 shrink-0 text-center text-[12px] tracking-[0.08em] text-white/70">Experience the Premier Standard</p>
      </div>
    </section>
  );
}
