"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Existing public-site assets. Swap these for corporate photography when ready.
const images = {
  arrival: "/hero.jpg",
  welcome: "/white-glove.png",
  journey: "/Curated-trip.png",
  closing: "/final.jpg",
};
const ease = [0.22, 1, 0.36, 1] as const;
const container =
  "mx-auto w-[calc(100%-48px)] max-w-[1280px] md:w-[calc(100%-96px)]";
const heading =
  "font-normal tracking-[-0.035em] leading-[1.12] [font-family:var(--font-heading),Georgia,serif]";
const body = "text-[17px] leading-[1.85] text-[#666159] md:text-lg";
const eyebrow =
  "text-[10px] font-medium uppercase leading-6 tracking-[0.22em] text-[#957e5e]";

function Arrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function ContactLink({
  children = "Plan your corporate journey",
}: {
  children?: ReactNode;
}) {
  return (
    <a
      href="/#contact"
      className="group relative isolate inline-flex min-h-[50px] max-w-full items-center justify-center gap-5 overflow-hidden border border-[#a59067] bg-[#806b43] px-6 py-4 text-left text-[11px] font-semibold uppercase leading-5 tracking-[0.1em] text-white transition-colors hover:bg-[#a38d65] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5bc89] motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-[40%] -z-10 w-[30%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[400ms] ease-in-out group-hover:translate-x-[500%] group-focus-visible:translate-x-[500%] motion-reduce:hidden"
      />
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  image = false,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  image?: boolean;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // The observed wrapper never moves. Only its child is animated.
        // Reset once fully offscreen; enter after 15% becomes visible.
        if (!entry.isIntersecting) setVisible(false);
        else if (entry.intersectionRatio >= 0.15) setVisible(true);
      },
      { threshold: [0, 0.15] },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [reduced]);

  const shown = reduced || visible;
  return (
    <div ref={ref} className={className}>
      <motion.div
        className={image ? "absolute inset-0" : "w-full min-w-0"}
        initial={false}
        animate={{
          opacity: shown ? 1 : 0,
          x: shown || direction === "up" ? 0 : direction === "left" ? -90 : 90,
          y: shown ? 0 : direction === "up" ? 90 : 25,
          scale: shown ? 1 : 0.96,
        }}
        transition={{
          duration: reduced ? 0 : shown ? 1.15 : 0,
          delay: shown && !reduced ? delay : 0,
          ease,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const chapters = [
  {
    id: "planning",
    label: "Journey planning",
    title: "Send Us The Itinerary. We build the plan.",
    text: "Our dedicated client experience team studies your itinerary and books every ride it calls for: airport transfers, point-to-point journeys, hourly service, cross-state trips. Attentive greeters are placed at every arrival, and standby vehicles are held for the moment the schedule changes. Each reservation is confirmed to you the moment it’s made, in one centralized, organized view, so you always see the whole roadshow at a glance and never have to ask where anything stands.",
  },
  {
    id: "rates",
    label: "Agreed rates",
    title: "Transparent Rates Set in Partnership",
    text: "Our client experience team begins with a clear, itemized price proposal for your roadshow, then works through it with you until every rate is right for your budget. Nothing is booked until the prices are agreed, so you see the full picture before the first reservation is made, and the invoice only ever confirms what you already know.",
  },
  {
    id: "coordination",
    label: "Live coordination",
    title: "Your Itinerary, Updated in Real Time",
    text: "Even a flawless itinerary meets the unexpected. Flights are cancelled, meetings move, and conferences run long. Your planner updates the schedule, and our attentive team works through it alongside them, booking, rescheduling, and releasing reservations as each change arrives. The plan on the page and the cars on the road never drift apart, and your travelers never feel the change.",
  },
  {
    id: "chauffeurs",
    label: "Consistent care",
    title: "The Same Precision, From The First Day to The Last",
    text: "Chauffeurs are assigned in advance so your planners and travelers receive their names and contact details at least 24 hours before service. From the first morning of your roadshow to the last departure, every ride we book happens exactly as planned. Our fully vetted, discreet chauffeurs arrive exactly on time and move your team in immaculate vehicles, with quiet efficiency and unfailing care, so day five runs with the same assured precision as day one.",
  },
  {
    id: "billing",
    label: "Clear billing",
    title: "Every Invoice Settled With Precision.",
    text: "We build a billing process around your finance team, with flexible options for travelers and administrators alike. Every booking, change, and cancellation is reconciled against what actually ran. You receive a clear, itemized invoice with no hidden fees or additional charges so your team closes the bill with confidence.",
  },
];

export default function CorporateMobilityOptionTwo() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("planning");
  const chapterRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections =
      chapterRoot.current?.querySelectorAll<HTMLElement>("article[id]");
    if (!sections) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      id="top"
      className="overflow-x-clip bg-[#f8f6f1] text-[#20221f] [font-family:var(--font-body),Arial,sans-serif]"
    >
      <section
        aria-labelledby="corporate-heading"
        className="relative isolate overflow-hidden bg-black text-white"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src={images.arrival}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        </div>
        <div
          className={`${container} flex min-h-[600px] flex-col justify-between py-8 md:min-h-[680px] md:py-10`}
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-3 text-xs text-white/75"
          >
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Corporate mobility</span>
          </nav>
          <Reveal className="max-w-[820px] py-20" direction="left">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#dfbf82]">
              Premier for business
            </p>
            <h1
              id="corporate-heading"
              className={`${heading} mt-6 max-w-[800px] text-[clamp(40px,5.2vw,74px)] [text-wrap:balance]`}
            >
              Composed Mobility for Companies on the Move
            </h1>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <ContactLink>Let’s plan your journey</ContactLink>
              <a
                href="#corporate-overview"
                className="inline-flex min-h-11 items-center gap-4 text-sm text-white/90 underline decoration-white/40 underline-offset-8 hover:decoration-white"
              >
                Discover the Premier approach <span aria-hidden="true">↓</span>
              </a>
            </div>
          </Reveal>
          <p className="border-t border-white/25 pt-5 text-xs uppercase tracking-[0.15em] text-white/80">
            Roadshows <span className="mx-3 text-[#dfbf82]">/</span> Conferences{" "}
            <span className="mx-3 text-[#dfbf82]">/</span> Corporate events
          </p>
        </div>
      </section>

      <section
        aria-label="Our approach at a glance"
        className="border-b border-black/10 bg-white"
      >
        <div
          className={`${container} grid gap-6 py-8 sm:grid-cols-3 sm:gap-8 md:py-10`}
        >
          {[
            [
              "Considered from the start",
              "An itinerary shaped around your people.",
            ],
            [
              "Ready for every change",
              "Attentive coordination as plans evolve.",
            ],
            ["Clear to the last detail", "Agreed rates. Reconciled invoices."],
          ].map(([title, text]) => (
            <div key={title} className="border-l-2 border-[#957e5e] pl-5">
              <p className="text-base font-medium">{title}</p>
              <p className="mt-2 text-sm leading-6 text-[#6b665e]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="corporate-overview"
        aria-labelledby="overview-heading"
        className={`${container} scroll-mt-28 py-20 md:py-28`}
      >
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal direction="left">
            <p className={eyebrow}>The Premier approach</p>
            <h2
              id="overview-heading"
              className={`${heading} mt-5 max-w-[480px] text-[clamp(32px,3.6vw,49px)]`}
            >
              Your people travel.
              <br />
              <span className="text-[#957e5e]">We carry the arrangements.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} direction="right">
            <p className={body}>
              Whether it’s a roadshow, a conference, or a corporate event: hand
              us the itinerary, and the rest is ours, including every change
              that follows. Premier turns your schedule into a considered plan,
              then keeps that plan live: rates agreed before we book, every
              reservation confirmed as it’s made, and every cancellation or
              change handled as it arrives. Your people travel, composed and
              unhurried. We carry the arrangements.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        aria-label="Prepared for every movement"
        className="relative isolate min-h-[260px] bg-[#161713] text-white [clip-path:inset(0)] md:min-h-[390px]"
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none inset-0 -z-10 ${reduced ? "absolute" : "fixed"}`}
        >
          <Image
            src={images.journey}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
        </div>
        <div
          className={`${container} flex min-h-[260px] items-end py-10 md:min-h-[390px] md:py-14`}
        >
          <Reveal>
            <p
              className={`${heading} max-w-[650px] text-[clamp(30px,3.5vw,48px)]`}
            >
              A considered plan.
              <br />
              Quiet confidence in every movement.
            </p>
          </Reveal>
        </div>
      </section>

      <div
        ref={chapterRoot}
        className={`${container} grid gap-10 py-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20 lg:py-24`}
      >
        <aside className="min-w-0">
          <nav
            aria-label="Corporate service details"
            className="lg:sticky lg:top-28"
          >
            <p className={`${eyebrow} mb-5`}>From itinerary to invoice</p>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {chapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  aria-current={active === chapter.id ? "location" : undefined}
                  className={`flex min-h-11 items-center justify-between gap-3 border px-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#957e5e] lg:border-x-0 lg:border-t-0 lg:px-0 lg:py-5 ${active === chapter.id ? "border-[#957e5e] text-[#806b43]" : "border-black/10 text-[#706a60] hover:text-black"}`}
                >
                  {chapter.label}
                  <span
                    aria-hidden="true"
                    className={
                      active === chapter.id ? "opacity-100" : "opacity-30"
                    }
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-8 hidden lg:block">
              <a
                href="tel:+18884129150"
                className="text-sm leading-7 text-[#6b665e] hover:text-black"
              >
                Speak with our team
                <br />
                <span className="text-lg text-[#20221f]">+1-888-412-9150</span>
              </a>
            </div>
          </nav>
        </aside>
        <div className="min-w-0">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.id}
              id={chapter.id}
              aria-labelledby={`${chapter.id}-heading`}
              className="scroll-mt-28 border-b border-black/15 py-12 first:pt-0 last:border-b-0 last:pb-0 md:py-16"
            >
              <Reveal direction="up">
                <p className={eyebrow}>{chapter.label}</p>
                <h2
                  id={`${chapter.id}-heading`}
                  className={`${heading} mt-4 max-w-[760px] text-[clamp(29px,3vw,43px)] [text-wrap:balance]`}
                >
                  {chapter.title}
                </h2>
                <p className={`${body} mt-7 max-w-[760px]`}>{chapter.text}</p>
              </Reveal>
              {index === 0 && (
                <ul
                  aria-label="Journey types"
                  className="mt-8 flex flex-wrap gap-2"
                >
                  {[
                    "Airport transfers",
                    "Point-to-point",
                    "Hourly service",
                    "Cross-state journeys",
                  ].map((service) => (
                    <li
                      key={service}
                      className="border border-[#957e5e]/30 px-4 py-2 text-xs text-[#6e5e43]"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              )}
              {index === 2 && (
                <Reveal
                  className="relative mt-9 aspect-[16/9] overflow-hidden"
                  image
                >
                  <Image
                    src={images.welcome}
                    alt="Premier chauffeur service prepared with care"
                    fill
                    sizes="(min-width: 1024px) 65vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>
              )}
            </article>
          ))}
        </div>
      </div>

      <section
        aria-labelledby="corporate-contact-heading"
        className="relative isolate bg-[#161713] text-white [clip-path:inset(0)]"
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none inset-0 -z-10 ${reduced ? "absolute" : "fixed"}`}
        >
          <Image
            src={images.closing}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/20" />
        </div>
        <div
          className={`${container} grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16`}
        >
          <Reveal direction="left">
            <p className="text-xs uppercase tracking-[0.2em] text-[#c6af83]">
              Every movement. Every detail.
            </p>
            <h2
              id="corporate-contact-heading"
              className={`${heading} mt-6 max-w-[850px] text-[clamp(30px,3.5vw,47px)]`}
            >
              From the first itinerary to the final invoice, your roadshow,
              anticipated and executed with precision.
            </h2>
          </Reveal>
          <Reveal direction="right">
            <div className="border-l border-[#957e5e] pl-7">
              <p className="mb-6 text-lg leading-8 text-white/75">
                Start with your itinerary.
                <br />
                We’ll take care of what follows.
              </p>
              <ContactLink>Speak with our team</ContactLink>
              <a
                href="tel:+18884129150"
                className="mt-5 block w-fit py-2 text-sm text-[#d8c4a1] underline decoration-[#957e5e]/50 underline-offset-4 hover:text-white"
              >
                +1-888-412-9150
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
