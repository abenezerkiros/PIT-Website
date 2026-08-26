"use client";

import { useState } from "react";

type Faq = {
  question: string;
  answer: string;
};

const sharedAnswer =
  "High-security areas are navigated through advance route approval, real-time monitoring, and legally permitted staging—not on-the-fly driving. Chauffeurs adjust routes as security zones shift to avoid checkpoints, denied access, or forced walk-offs. Premier International Transportation uses pre-planned access strategies to protect timing and discretion.";

const faqs: Faq[] = [
  {
    question:
      "How are high-security perimeters like the National Mall or Capitol Hill navigated?",
    answer: sharedAnswer,
  },
  {
    question:
      "Can we book a multi-stop itinerary covering Maryland and Virginia business corridors?",
    answer: sharedAnswer,
  },
  {
    question:
      "Why is professional transportation more reliable than ride-sharing during rush hour?",
    answer: sharedAnswer,
  },
  {
    question:
      "How is transportation handled during major regional events or summits?",
    answer: sharedAnswer,
  },
  {
    question:
      "Are vehicles equipped for confidential business discussions during transit?",
    answer: sharedAnswer,
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="flex w-full flex-col items-center gap-12 bg-[#0e0808] px-6 py-24 md:px-[72px]">
      {/* Heading */}
      <h2 className="text-center text-4xl font-semibold tracking-tight text-white md:text-5xl">
        Frequently asked questions
      </h2>

      <div className="flex w-full max-w-[1064px] flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`w-full overflow-hidden rounded-xl border transition-[background-color,border-color,box-shadow] duration-500 ease-out ${
                isOpen
                  ? "border-[#fee801]/[0.32] bg-[#1c1a1a] shadow-[0_1px_20px_rgba(255,215,0,0.09)]"
                  : "border-[#fee801]/[0.22] bg-gradient-to-b from-white/[0.02] to-white/[0.06]"
              }`}
            >
              {/* Question */}
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
              >
                <span
                  className={`text-lg leading-8 transition-colors duration-300 md:text-2xl ${
                    isOpen
                      ? "text-white"
                      : "text-white/90 group-hover:text-white"
                  }`}
                >
                  {index + 1}. {faq.question}
                </span>

                {/* Plus / X */}
                <span className="relative flex size-8 shrink-0 items-center justify-center">
                  <span
                    className={`absolute h-px w-5 bg-white transition-transform duration-500 ease-out ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  />

                  <span
                    className={`absolute h-px w-5 bg-white transition-transform duration-500 ease-out ${
                      isOpen ? "-rotate-45" : "rotate-90"
                    }`}
                  />
                </span>
              </button>

              {/* Smooth accordion */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-6 pb-8 text-lg leading-9 text-[#a0a0a0] md:px-8 md:text-xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}