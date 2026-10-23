"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Existing public-site assets. Swap these for licensed event photography when ready.
const images = {
  gala:"/gala.jpg",
  arrival: "/Wedding-Hero.jpg",
  celebrations:"/celebrations.jpg",
  welcome: "/Events-Agent.jpg",
  couple:"/Event-Wedding.jpg",
  journey: "/EventCoordinator.jpg",
  closing: "/Events-Closing.JPG",
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
  children = "Plan your event transport",
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

const details = {
  lead: {
    title: "One Call. One Person.",
    text: "From the first conversation to the last guest home, you have one dedicated Client Experience Lead, reachable at any hour. Questions, changes, and last-minute wishes go to one person who already knows your day, and who answers quickly, warmly, and with full authority to act.",
  },
  plan: {
    title: "Every Detail Confirmed Before the Day",
    text: "Before the event, our exacting team walks through the full plan with you, your venues, and every chauffeur: pickup times, pick up locations, the timing between ceremony and reception, who rides with whom. Contacts are shared with everyone, so on the day nobody is guessing.",
  },
  chauffeur: {
    title: "Chauffeurs You Know by Name",
    text: "Chauffeurs are assigned in advance, and their names and contact details reach you at least 24 hours before service. Your family, your wedding party, and your most important guests know who is coming for them, and every chauffeur is fully vetted, courteous, discreet, and briefed on the day ahead.",
  },
  coordinator: {
    title: "A Coordinator On Site, Directing the Flow",
    text: "On the day, our polished on-site coordinator stands where the movement happens: guiding arrivals, staging vehicles, shepherding departures, and greeting guests by name. Your guests feel gracious attention from the first curb to the last, and your team never has to direct a single car.",
  },
  live: {
    title: "Followed Live. Adjusted Quietly.",
    text: "Every vehicle is tracked in real time. A delayed flight, a ceremony that runs long, a guest who needs to leave early: we see it forming, absorb the change, and tell the right people before anyone has to ask. You will rarely notice an adjustment, because we have already made it.",
  },
  guests: {
    title: "The Same Care for Every Guest",
    text: "From the couple’s car to the shuttle that carries the extended family, every guest receives the same unhurried, effortless service. We choreograph immaculate sedans, SUVs, Sprinters, and coaches into one considered plan, matching each vehicle to the moment and safeguarding the day’s timing from first pickup to last.",
  },
};

function Photo({
  src,
  className = "",
  priority = false,
}: {
  src: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#ded8cc] ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-center"
      />
    </div>
  );
}

function FixedPhoto({
  children,
  src,
  className = "",
}: {
  children: ReactNode;
  src: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      className={`relative isolate bg-[#141511] text-white [clip-path:inset(0)] ${className}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none inset-0 -z-10 ${reduced ? "absolute" : "fixed"}`}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
      </div>
      {children}
    </div>
  );
}

export default function EventMobility() {
  return (
    <main
      id="top"
      className="overflow-x-clip bg-[#f8f6f1] text-[#24251f] [font-family:var(--font-body),Arial,sans-serif]"
    >
      <section
        aria-labelledby="events-heading"
        className="pb-14 pt-7 md:pb-20 md:pt-10"
      >
        <div className={container}>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-3 text-xs text-[#716b60]"
          >
            <a href="/" className="hover:text-black">
              Home
            </a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Events & celebrations</span>
          </nav>
          <Reveal className="mx-auto max-w-[1000px] pb-12 pt-12 text-center md:pb-16 md:pt-16">
            <p className={eyebrow}>Weddings · Galas · Celebrations</p>
            <h1
              id="events-heading"
              className={`${heading} mx-auto mt-5 max-w-[960px] text-[clamp(39px,5.8vw,78px)] [text-wrap:balance]`}
            >
              Effortless Mobility for{" "}
              <span className="text-[#8a7350]">Life’s Defining Days</span>
            </h1>
            <div className="mt-8">
              <ContactLink />
            </div>
          </Reveal>
        </div>
        <div className="mx-auto grid w-[calc(100%-32px)] max-w-[1520px] grid-cols-[0.7fr_1.6fr] items-center gap-3 md:w-[calc(100%-64px)] md:grid-cols-[0.8fr_1.5fr_0.8fr] md:gap-6">
          <Reveal direction="left">
            <Photo
              src={images.gala}
              priority
              className="h-[190px] md:h-[330px] lg:h-[410px]"
            />
          </Reveal>
          <Reveal delay={0.12}>
  <Photo
    src={images.arrival}
    priority
    className="h-[350px] md:h-[480px] lg:h-[580px] object-contain"
  />
</Reveal>
          <Reveal direction="right" delay={0.2} className="hidden md:block">
            <Photo src={images.celebrations} className="h-[330px] lg:h-[410px]" />
          </Reveal>
        </div>
        <p className="mt-7 text-center text-[11px] uppercase tracking-[0.22em] text-[#8a7350]">
          Every arrival is part of the occasion.
        </p>
      </section>

      <section
        aria-labelledby="events-intro-heading"
        className={`${container} pb-20 pt-6 md:pb-28 md:pt-10`}
      >
        <div className="grid gap-9 border-t border-[#957e5e]/30 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 md:pt-16">
          <Reveal direction="left">
            <p className={eyebrow}>The day belongs to you</p>
            <h2
              id="events-intro-heading"
              className={`${heading} mt-5 text-[clamp(33px,4vw,54px)]`}
            >
              You celebrate.
              <br />
              <span className="text-[#957e5e]">We stay one step ahead.</span>
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <p className={body}>
              Some days happen only once. A wedding, a gala, a celebration years
              in the making: every guest should arrive radiant and unhurried,
              and no one hosting should spend the evening wondering where a car
              is. Premier orchestrates the movement of the day entirely in its
              own hands. One dedicated point of contact, every detail
              meticulously confirmed beforehand, a poised coordinator on site,
              and every vehicle followed live. You celebrate. We stay one step
              ahead.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="events-lead-heading"
        className="bg-[#ede8de] py-16 md:py-24"
      >
        <div
          className={`${container} grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20`}
        >
          <Reveal direction="left" className="relative">
            <Photo
              src={images.welcome}
              className="aspect-[4/3] lg:aspect-[5/4]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 border-b border-r border-[#957e5e] md:-bottom-5 md:-right-5 md:h-36 md:w-36"
            />
          </Reveal>
          <Reveal direction="right">
            <p className={eyebrow}>A familiar voice, from the beginning</p>
            <h2
              id="events-lead-heading"
              className={`${heading} mt-5 text-[clamp(34px,4vw,55px)]`}
            >
              {details.lead.title}
            </h2>
            <p className={`${body} mt-7`}>{details.lead.text}</p>
            <a
              href="tel:+18884129150"
              className="mt-7 inline-flex min-h-11 items-center gap-4 border-b border-[#957e5e] text-sm text-[#6f5d3e] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#957e5e]"
            >
              Speak with our team <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="events-preparation-heading"
        className={`${container} py-20 md:py-28`}
      >
        <Reveal className="mx-auto mb-12 max-w-[720px] text-center md:mb-16">
          <p className={eyebrow}>Before the first arrival</p>
          <h2
            id="events-preparation-heading"
            className={`${heading} mt-4 text-[clamp(34px,4vw,53px)]`}
          >
            Confidence begins
            <br />
            well before the day.
          </h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          {[details.plan, details.chauffeur].map((detail, index) => (
            <Reveal
              key={detail.title}
              direction={index === 0 ? "left" : "right"}
              delay={index * 0.1}
            >
              <article className="border-t border-[#957e5e]/50 pt-8">
                <h3
                  className={`${heading} max-w-[470px] text-[clamp(29px,2.8vw,38px)]`}
                >
                  {detail.title}
                </h3>
                <p className={`${body} mt-6`}>{detail.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="events-coordinator-heading">
        <FixedPhoto src={images.journey}>
          <div
            className={`${container} grid items-center gap-8 py-20 lg:min-h-[450px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 md:py-24`}
          >
            <Reveal direction="left">
              <p className="text-xs uppercase tracking-[0.22em] text-[#d5bc89]">
                On the day
              </p>
              <h2
                id="events-coordinator-heading"
                className={`${heading} mt-5 max-w-[550px] text-[clamp(33px,3.9vw,53px)]`}
              >
                {details.coordinator.title}
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div className="border-t border-white/25 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <p className="text-[17px] leading-[1.85] text-white/90 md:text-lg">
                  {details.coordinator.text}
                </p>
              </div>
            </Reveal>
          </div>
        </FixedPhoto>
      </section>

      <section
        aria-labelledby="events-live-heading"
        className={`${container} py-20 md:py-28`}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal direction="left">
            <p className={eyebrow}>Room for the unexpected</p>
            <h2
              id="events-live-heading"
              className={`${heading} mt-5 max-w-[530px] text-[clamp(34px,4vw,53px)]`}
            >
              {details.live.title}
            </h2>
            <p className={`${body} mt-7`}>{details.live.text}</p>
          </Reveal>
          <Reveal direction="right">
            <Photo src={images.couple} className="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="events-guests-heading"
        className="border-y border-[#957e5e]/20 bg-white py-16 md:py-24"
      >
        <div
          className={`${container} grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}
        >
          <Reveal direction="left">
            <p className={eyebrow}>Every guest belongs</p>
            <h2
              id="events-guests-heading"
              className={`${heading} mt-5 max-w-[470px] text-[clamp(34px,3.8vw,51px)]`}
            >
              {details.guests.title}
            </h2>
          </Reveal>
          <Reveal direction="right">
            <p className={body}>{details.guests.text}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#957e5e]/25 pt-6 text-xs uppercase tracking-[0.13em] text-[#8a7350]">
              {["Sedans", "SUVs", "Sprinters", "Coaches"].map((vehicle) => (
                <span key={vehicle}>{vehicle}</span>
              ))}
            </div>
            <a
              href="/#fleet"
              className="mt-6 inline-flex min-h-11 items-center gap-4 text-sm text-[#6f5d3e] underline decoration-[#957e5e]/50 underline-offset-8 hover:text-black"
            >
              Explore our fleet <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="events-closing-heading"
        className="px-0 py-0 md:px-10 md:py-16 lg:px-16"
      >
        <FixedPhoto src={images.closing} className="mx-auto max-w-[1480px]">
          <Reveal className="mx-auto max-w-[1000px] px-6 py-20 text-center md:px-12 md:py-24">
            <p className="text-xs uppercase tracking-[0.22em] text-[#d5bc89]">
              Until the last goodnight
            </p>
            <h2
              id="events-closing-heading"
              className={`${heading} mt-6 text-[clamp(32px,3.9vw,53px)] [text-wrap:balance]`}
            >
              From the first guest to the last goodnight, every journey of your
              day, anticipated and handled with tender care.
            </h2>
            <div className="mt-9">
              <ContactLink>Tell us about your day</ContactLink>
            </div>
            <a
              href="tel:+18884129150"
              className="mt-5 inline-flex min-h-11 items-center text-sm text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white"
            >
              +1-888-412-9150
            </a>
          </Reveal>
        </FixedPhoto>
      </section>
    </main>
  );
}
