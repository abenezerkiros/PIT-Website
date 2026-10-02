"use client";

import { useEffect, useId, useRef, useState } from "react";
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

const steps: { label: string; title: string; fields: Field[] }[] = [
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
    setValues((previous) => ({ ...previous, [field]: value }));
    setError("");
  }

  function navigate(next: number) {
    if (submissionLock.current || next < 0 || next >= steps.length) return;
    focusNextStep.current = true;
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
            <form ref={formRef} onSubmit={handleSubmit} aria-busy={submitting} className="grid grid-cols-1 gap-x-5 gap-y-3 lg:grid-cols-[minmax(0,1fr)_auto]">
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
                  <div className={`grid min-w-0 gap-4 ${step === 0 ? "sm:grid-cols-2 xl:grid-cols-[1.2fr_1.2fr_1fr_1fr]" : step === 5 ? "sm:grid-cols-3" : "grid-cols-1"}`}>
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
                          {field.type === "select" ? (
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
                  {step === 0 && <p id={`${id}-time-note`} className="mt-3 text-[12px] leading-5 text-white/60">Please use the local time at your pick-up location.</p>}
                </fieldset>
              </motion.div>



              <div className={`flex items-end justify-end gap-2 ${step === 0 ? "lg:pb-[32px]" : ""}`}>
                <button type="button" onClick={() => navigate(step - 1)} disabled={step === 0 || submitting}
                  className={`inline-flex min-h-[46px] items-center gap-2 rounded px-2 text-[14px] text-white/75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4bf94] disabled:opacity-40 ${step === 0 ? "hidden" : ""}`}>
                  <Arrow back /> Back
                </button>
                <button type="submit" disabled={submitting}
                  className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-sm bg-[#b7a071] px-5 py-3 text-[14px] font-semibold text-[#17130d] transition-colors hover:bg-[#d4bf94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4bf94] disabled:cursor-wait disabled:opacity-60">
                  {submitting ? "Sending…" : lastStep ? "Send request" : "Continue"}
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
