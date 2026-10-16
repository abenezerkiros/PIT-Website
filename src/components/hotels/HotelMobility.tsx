"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Existing public-site assets. Swap these for hotel photography when ready.
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
  const body =
  "text-[17px] leading-[1.85] text-[#666159] md:text-lg";
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
  children = "Discuss a hotel partnership",
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

export default function HotelMobility() {
  return (
    <main
      id="top"
      className="overflow-x-clip bg-[#f8f6f1] text-[#24231f] [font-family:var(--font-body),Arial,sans-serif]"
    >
      {/* An editorial masthead, distinct from the executive page's photo hero. */}
      <section aria-labelledby="hotel-heading" className="pt-6 md:pt-8">
        <div className={container}>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-3 text-[11px] text-[#777268]"
          >
            <a
              href="/"
              className="hover:text-[#806b43] focus-visible:outline focus-visible:outline-[#957e5e]"
            >
              Home
            </a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Hotel partnerships</span>
          </nav>
          <Reveal className="mx-auto max-w-[940px] pb-12 pt-12 text-center md:pb-14 md:pt-16">
            <p className={eyebrow}>Premier / Hotel partnerships</p>
            <h1
              id="hotel-heading"
              className={`${heading} mt-6 text-[clamp(38px,5vw,70px)] [text-wrap:balance]`}
            >
              Gracious Mobility
              <span className="mt-1 block text-[#8c7552]">
                for Distinguished Hotels
              </span>
            </h1>
            <div className="mt-8">
              <ContactLink />
            </div>
          </Reveal>
        </div>
        <div className="relative h-[280px] w-full md:h-[440px]">
          <Image
            src={images.arrival}
            alt="Premier chauffeur service at a distinguished property"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_55%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent"
          />
          <div
            className={`${container} relative flex h-full items-end pb-7 md:pb-9`}
          >
            <p className="text-[10px] uppercase leading-6 tracking-[0.2em] text-white/90">
              From your concierge desk to every arrival.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="hotel-intro-heading"
        className={`${container} py-16 md:py-24`}
      >
        <div className="grid gap-8 md:grid-cols-[0.6fr_1.4fr] md:gap-16">
          <Reveal direction="left">
            <p id="hotel-intro-heading" className={eyebrow}>
              A welcome, continued
            </p>
            <div
              aria-hidden="true"
              className="mt-6 h-px w-14 bg-[#957e5e]/60"
            />
          </Reveal>
          <Reveal direction="right">
            <p
              className={`${heading} text-[clamp(24px,2.5vw,35px)] !leading-[1.45]`}
            >
              A guest’s welcome is made at your concierge desk, and at an
              establishment like yours, it is never generic.
            </p>
            <p className={`${body} mt-6`}>
              Premier joins it: a thoughtful, attentive partner fluent in your
              standards, aware of every journey as it unfolds, and more attuned
              to your hotel each month. From the first airport transfer to the
              last departure, every journey of a guest’s stay is ours to care
              for, so your desk can promise a warm, gracious welcome worthy of
              your establishment, and a stay that keeps that promise.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="hotel-partnership-heading"
        className="pb-16 md:pb-24"
      >
        <div
          className={`${container} grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16 lg:gap-24`}
        >
          <Reveal
            image
            direction="left"
            className="relative aspect-[5/4] bg-[#e6e1d7] md:aspect-[4/5]"
          >
            <Image
              src={images.welcome}
              alt="A Premier chauffeur welcoming a guest"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal direction="right">
            <p className={eyebrow}>An extension of your house</p>
            <h2
              id="hotel-partnership-heading"
              className={`${heading} mt-5 text-[clamp(30px,3.4vw,47px)] [text-wrap:balance]`}
            >
              True Partnership–Your Brand Carried to The Curb
            </h2>
            <p className={`${body} mt-6`}>
              Every hotel has its own way of treating a guest. We study yours
              and adopt it: your exacting standard, your language, even the
              water in the car. We carry all of it with us, so the warm,
              effortless welcome begins the moment your guest is picked up.
            </p>
          </Reveal>
        </div>
      </section>

      {/* A dark partnership panel, followed by an asymmetric gold-accented pair. */}
      <section
        aria-labelledby="hotel-refinement-heading"
        className="bg-[#171916] py-16 text-white md:py-20"
      >
        <div
          className={`${container} grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-20`}
        >
          <Reveal direction="left">
            <p className="text-[10px] uppercase leading-6 tracking-[0.22em] text-[#c2a779]">
              A partnership that grows
            </p>
            <h2
              id="hotel-refinement-heading"
              className={`${heading} mt-5 max-w-[440px] text-[clamp(30px,3.3vw,46px)]`}
            >
              Our service, Elevated Over Time
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.1} className="md:pt-10">
          <p className="text-lg leading-[1.85] text-white/75 md:text-xl">
              Every month, our leadership sits down with your head of management
              and head of concierge. We bring a candid, detailed review of
              arrivals, notes, and adjustments. You tell us what to refine, so
              every booking becomes more personal and more assured than the
              last.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        aria-label="Partnership terms and guest privileges"
        className={`${container} py-16 md:py-24`}
      >
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-0">
          <Reveal direction="left" className="md:pr-16 lg:pr-24">
            <p className={eyebrow}>Considered terms</p>
            <h2 className={`${heading} mt-5 text-[clamp(30px,3vw,42px)]`}>
              Preferred Partner Rates
            </h2>
            <p className={`${body} mt-6`}>
              Together with your management team, we establish a rate schedule
              structured around your property’s volume and seasonal demand.
              Every term is agreed with you before service begins, so your
              guests pay a fair, transparent price that reflects the refined
              standard of your house.
            </p>
          </Reveal>
          <Reveal
            direction="right"
            delay={0.1}
            className="border-t border-[#957e5e]/30 pt-10 md:border-l md:border-t-0 md:pl-14 md:pt-0 lg:pl-20"
          >
            <p className={eyebrow}>A gesture, from your house</p>
            <h2
              className={`${heading} mt-5 text-[clamp(34px,3.6vw,50px)] text-[#8c7552]`}
            >
              Hours to Gift
            </h2>
            <p className={`${body} mt-6`}>
              Complimentary hours are yours to give to any guest, at any moment
              you choose. A generous gift from your house, carried by us.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="hotel-rhythms-heading"
        className="bg-white py-16 md:py-24"
      >
        <div className={container}>
          <Reveal className="mx-auto max-w-[850px] text-center">
            <p className={eyebrow}>Throughout their stay</p>
            <h2
              id="hotel-rhythms-heading"
              className={`${heading} mt-5 text-[clamp(30px,3.7vw,50px)] [text-wrap:balance]`}
            >
              Service Shaped to Your Guests&apos; Rhythms
            </h2>
            <p className={`${body} mt-6`}>
              We work closely with your management team to design our service
              around your property. It is tailored to the rhythms and needs of
              your clientele, covering airport transfers, city-to-city journeys,
              and corporate or large-group travel. Your guests are met by fully
              vetted, courteous chauffeurs, poised and discreet, in an
              immaculate late-model fleet, so they move through your city
              serenely and exactly as they need to, for the whole of their stay.
            </p>
          </Reveal>
          <Reveal
            image
            className="relative mt-10 aspect-[4/3] bg-[#e8e4dd] md:mt-14 md:aspect-[2.6/1]"
          >
            <Image
              src={images.journey}
              alt="A guest journey arranged by Premier"
              fill
              sizes="(min-width: 1440px) 1280px, 100vw"
              className="object-cover object-center"
            />
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-3 border-b border-[#957e5e]/25 pb-6 text-[10px] uppercase leading-6 tracking-[0.16em] text-[#806b43] sm:grid-cols-3 sm:text-center">
            <span>Airport transfers</span>
            <span>City-to-city journeys</span>
            <span>Corporate &amp; group travel</span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="hotel-concierge-heading"
        className={`${container} grid items-start gap-8 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:py-24`}
      >
        <Reveal direction="left">
          <p className={eyebrow}>In step with your concierge</p>
          <h2
            id="hotel-concierge-heading"
            className={`${heading} mt-5 max-w-[460px] text-[clamp(30px,3.5vw,46px)]`}
          >
            Your Concierge Always Informed
          </h2>
        </Reveal>
        <Reveal direction="right" delay={0.1}>
          <p className={body}>
            We track every chauffeur and vehicle live. Your concierge is
            notified when your guest has arrived and is en route, so the door,
            the greeting, and the warm welcome are ready when the car is.
            Chauffeurs are assigned in advance, and their names and contact
            details reach your team at least 24 hours before service.
          </p>
          <a
            href="tel:+18884129150"
            className="mt-7 inline-flex min-h-11 items-center gap-4 border-b border-[#957e5e]/40 py-2 text-sm text-[#806b43] transition-colors hover:text-black focus-visible:outline focus-visible:outline-[#957e5e]"
          >
            Speak with our team <Arrow />
          </a>
        </Reveal>
      </section>

      {/* Photo and overlay share the same fixed layer; content alone animates. */}
      <section
        aria-labelledby="hotel-closing-heading"
        className="relative isolate bg-[#171916] px-6 py-20 text-white [clip-path:inset(0)] md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 md:fixed motion-reduce:!absolute"
        >
          <Image
            src={images.closing}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 bg-black/75" />
        </div>
        <Reveal className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#d5bc89]">
            Your standard. Every journey.
          </p>
          <h2
            id="hotel-closing-heading"
            className={`${heading} mt-6 text-[clamp(30px,3.7vw,51px)] [text-wrap:balance]`}
          >
            Your guest, cared for with warmth through every journey of their
            stay, to your standard.
          </h2>
          <div className="mt-9">
            <ContactLink>Speak with our Client Experience Team</ContactLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
