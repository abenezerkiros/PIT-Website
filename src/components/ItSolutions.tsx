"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    icon: "communications",
    title: "A Communications Team Always at Your Service",
    description:
      "Whatever the hour, wherever you are, a Client Experience Lead is available—listening, understanding, and making sure nothing is left to chance.",
  },
  {
    icon: "journey",
    title: "Your Journey, Curated with Intelligence",
    description:
      "Before your journey begins, your preferences become your chauffeur’s briefing. They arrive knowing more than the route. They arrive knowing you.",
  },
  {
    icon: "chauffeur",
    title: "White Glove Chauffeur Service",
    description:
      "Every Premier chauffeur is rigorously trained. The difference is the match—we choose the person whose character fits your journey, not whoever is closest.",
  },
  {
    icon: "vehicle",
    title: "Vehicles That Ensure You Arrive Like No Other",
    description:
      "A fleet of the latest luxury vehicles, European and American, increasingly electric—selected and prepared for each journey.",
  },
] as const;

type PillarIconName = (typeof pillars)[number]["icon"];

function PillarIcon({ name }: { name: PillarIconName }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "communications" && (
        <>
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
          <rect x="3" y="11" width="4" height="7" rx="2" />
          <rect x="17" y="11" width="4" height="7" rx="2" />
          <path d="M19 18a3 3 0 0 1-3 3h-3" />
          <path d="M11 21h2" />
        </>
      )}

      {name === "journey" && (
        <>
          <circle cx="5" cy="18" r="2" />
          <path d="M7 18h8a4 4 0 0 0 0-8h-4a3 3 0 0 1 0-6h3" />
          <path d="m17 2 1.2 2.8L21 6l-2.8 1.2L17 10l-1.2-2.8L13 6l2.8-1.2L17 2Z" />
        </>
      )}

      {name === "chauffeur" && (
        <>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
          <path d="m9 13 3 3 3-3" />
          <path d="m12 16-1.5 3 1.5 2 1.5-2-1.5-3Z" />
        </>
      )}

      {name === "vehicle" && (
        <>
          <path d="m5 10 1.5-4A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1L19 10" />
          <rect x="3" y="10" width="18" height="8" rx="2" />
          <path d="M5 18v2M19 18v2M7 14h2M15 14h2" />
        </>
      )}
    </svg>
  );
}

function FeatureCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-7 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.065] lg:p-6 xl:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.08, ease }}
      whileHover={{ y: -5, transition: { duration: 0.4, ease } }}
    >
      {/* Icon and pillar number */}
      <div className="mb-9 flex items-center justify-between">
        <div className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/85 transition-colors duration-500 group-hover:border-white/25 group-hover:text-white">
          <PillarIcon name={pillar.icon} />
        </div>

        <span
          aria-hidden="true"
          className="text-xs tracking-[0.2em] text-white/40"
        >
          0{index + 1}
        </span>
      </div>

      {/* Reserve equal heading space across each desktop row */}
      <h3 className="text-2xl font-medium leading-[1.35] tracking-[-0.02em] text-white sm:min-h-[130px]">
        {pillar.title}
      </h3>

      <div
        aria-hidden="true"
        className="my-7 h-px w-16 bg-gradient-to-r from-white/50 to-white/5 transition-[width] duration-500 group-hover:w-24"
      />

      <p className="text-base leading-7 text-white/70">
        {pillar.description}
      </p>
    </motion.article>
  );
}

export default function ItSolutions({
  contactHref = "/contact",
}: {
  contactHref?: string;
}) {
  return (
    <section
      aria-labelledby="premier-service-heading"
      className="relative isolate w-full overflow-hidden bg-[#011638] px-6 py-20 text-white md:px-[72px] md:py-28 lg:py-32"
    >
      {/* Subtle depth behind the section introduction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.055) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px]">
        {/* Introduction */}
        <motion.div
          className="mx-auto mb-14 flex max-w-[850px] flex-col items-center text-center md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-white/60">
            The Four Pillars of Premier Service
          </p>

          <h2
            id="premier-service-heading"
            className="text-4xl font-medium leading-[1.15] tracking-[-0.035em] md:text-5xl lg:text-6xl"
          >
            At Premier, luxury is personal.
          </h2>

          <p className="mt-7 max-w-[720px] text-lg leading-8 text-white/70 md:text-xl md:leading-9">
            Premier learns who you are, how you move, what you need, and who you
            trust—then ensures every journey feels designed for your tailored
            experience.
          </p>
        </motion.div>

        {/* Four pillars */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {pillars.map((pillar, index) => (
            <FeatureCard key={pillar.icon} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Closing invitation */}
        <motion.div
          className="mt-16 border-t border-white/15 pt-12 md:mt-20 md:pt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease }}
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="max-w-[620px]">
              <p className="text-2xl font-medium leading-snug tracking-[-0.02em] md:text-3xl">
                Every journey begins with a conversation.
              </p>

              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                Tell us who you&apos;re moving and where—we&apos;ll handle the
                details.
              </p>
            </div>

            <a
              href={contactHref}
              className="group inline-flex min-h-14 w-full items-center justify-center gap-5 rounded-sm border border-white/40 px-6 py-4 text-sm font-medium leading-6 tracking-wide text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#011638] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto lg:shrink-0"
            >
              <span>Speak with our Client Experience Team</span>

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}