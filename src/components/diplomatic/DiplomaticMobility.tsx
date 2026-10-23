"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Existing public-site assets. Swap these for approved diplomatic-service photography when ready.
const images = {
  arrival: "/Diplomat-Hero.jpg",
  welcome: "/Diplomat-Detail.jpg",
  journey: "/Chuffer-Live.jpg",
  closing: "/Diplomat-Final.jpg",
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
  children = "Discuss your mission’s transport",
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

function FixedPhoto({ children, src }: { children: ReactNode; src: string }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative isolate bg-[#131512] text-white [clip-path:inset(0)]">
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
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />
      </div>
      {children}
    </div>
  );
}

export default function DiplomaticMobility() {
  return (
    <main
      id="top"
      className="overflow-x-clip bg-[#f7f5ef] text-[#252722] [font-family:var(--font-body),Arial,sans-serif]"
    >
      <section
        aria-labelledby="diplomatic-heading"
        className="relative isolate overflow-hidden bg-[#131512] text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={images.arrival}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131512] via-black/10 to-black/20" />
        </div>
        <div
          className={`${container} flex min-h-[620px] flex-col justify-between py-8 md:min-h-[710px] md:py-10`}
        >
          <nav
            aria-label="Breadcrumb"
            className="flex gap-3 text-xs text-white/65"
          >
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Diplomatic mobility</span>
          </nav>
          <Reveal className="mx-auto w-full max-w-[1000px] py-16 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-[#d5bc89]">
              Premier · Diplomatic mobility
            </p>
            <div
              aria-hidden="true"
              className="mx-auto mt-7 h-px w-14 bg-[#b7a071]"
            />
            <h1
              id="diplomatic-heading"
              className={`${heading} mx-auto mt-7 max-w-[970px] text-[clamp(40px,5.6vw,76px)] [text-wrap:balance]`}
            >
              Discreet Mobility for Those Who Represent Nations
            </h1>
            <div className="mt-9">
              <ContactLink />
            </div>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-white/20 pt-6 text-[11px] uppercase tracking-[0.18em] text-white/70 md:gap-x-16">
            <span>Protocol understood</span>
            <span>Discretion assured</span>
            <span>Movements coordinated</span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="diplomatic-intro-heading"
        className={`${container} py-20 md:py-28`}
      >
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal direction="left">
            <p className={eyebrow}>In service of your mission</p>
            <h2
              id="diplomatic-intro-heading"
              className={`${heading} mt-5 max-w-[460px] text-[clamp(33px,3.8vw,52px)]`}
            >
              Your instructions.
              <br />
              <span className="text-[#957e5e]">Our considered approach.</span>
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <p className={body}>
              A mission’s movements follow its own protocol, and the right
              partner learns it rather than assumes it. Premier builds each
              movement around your instructions: who travels, in what order, and
              how each arrival is to be handled. Every seasoned chauffeur is
              briefed before the first movement, every vehicle is followed live,
              and one attentive Client Experience Lead answers at any hour.
              Discreet, composed, and one step ahead.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="diplomatic-protocol-heading"
        className={`${container} pb-20 md:pb-28`}
      >
        <div className="grid border border-[#957e5e]/25 bg-white lg:grid-cols-2">
          <Reveal
            direction="left"
            className="relative min-h-[300px] overflow-hidden md:min-h-[400px]"
            image
          >
            <Image
              src={images.welcome}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </Reveal>
          <div className="flex items-center px-7 py-12 md:px-12 lg:px-14 lg:py-16">
            <Reveal direction="right">
              <p className={eyebrow}>Before the first movement</p>
              <h2
                id="diplomatic-protocol-heading"
                className={`${heading} mt-5 text-[clamp(31px,3.1vw,44px)]`}
              >
                Your protocol, briefed to every chauffeur.
              </h2>
              <p className={`${body} mt-7`}>
                You tell us the order of arrival, the sensitivities, and how
                each principal is to be received. Our Chauffeur Intelligence
                Team gives every chauffeur a meticulous briefing before the
                journey begins, so the people carrying out the movement know
                exactly what it asks of them.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="diplomatic-discretion-heading"
        className="bg-[#171a16] py-20 text-white md:py-24"
      >
        <div
          className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}
        >
          <Reveal direction="left">
            <p className="text-xs uppercase tracking-[0.22em] text-[#c4ad82]">
              A matter of trust
            </p>
            <h2
              id="diplomatic-discretion-heading"
              className={`${heading} mt-5 text-[clamp(34px,4vw,54px)]`}
            >
              Discretion
              <br />
              as the standard.
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <div className="border-t border-[#957e5e]/55 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p
                className={`${heading} text-[clamp(25px,2.8vw,38px)] leading-[1.4] text-[#e1d3b8]`}
              >
                What is said and seen in our vehicles stays there.
              </p>
              <p className="mt-6 text-[17px] leading-[1.85] text-white/80 md:text-lg">
                Our discreet chauffeurs do not speak of who they carried, where,
                or when. Your principal travels in absolute privacy.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="diplomatic-delegation-heading"
        className={`${container} py-20 md:py-28`}
      >
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal direction="left">
            <p className={eyebrow}>One coordinated delegation</p>
            <h2
              id="diplomatic-delegation-heading"
              className={`${heading} mt-5 max-w-[680px] text-[clamp(33px,3.9vw,53px)]`}
            >
              Every rank, every vehicle, one movement.
            </h2>
            <p className={`${body} mt-7`}>
              A delegation never travels in a single car. The principal, the
              senior staff, the advance team, and the luggage each need
              something different. We assemble the right mix of sedans, SUVs,
              Sprinters, and coaches, all immaculate, and run them from one
              considered plan, so everyone leaves together and arrives together.
            </p>
            <a
              href="/#fleet"
              className="mt-7 inline-flex min-h-11 items-center gap-5 text-sm text-[#806b43] underline decoration-[#957e5e]/50 underline-offset-8 hover:text-black"
            >
              Explore the Premier fleet <Arrow />
            </a>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <div className="border border-[#957e5e]/30 p-7 md:p-9">
              <p className={eyebrow}>A fleet shaped to the mission</p>
              <ul className="mt-5 divide-y divide-[#957e5e]/20">
                {["Sedans", "SUVs", "Sprinters", "Coaches"].map((vehicle) => (
                  <li
                    key={vehicle}
                    className="flex items-center justify-between py-5"
                  >
                    <span className={`${heading} text-[27px]`}>{vehicle}</span>
                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-[#957e5e]/60"
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-[#957e5e]/30 pt-5 text-sm leading-6 text-[#70695e]">
                Different needs. One considered plan.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="diplomatic-live-heading"
        className="bg-[#eae6dc] py-16 md:py-24"
      >
        <div
          className={`${container} grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20`}
        >
          <Reveal
            direction="left"
            className="relative aspect-[4/3] overflow-hidden"
            image
          >
            <Image
              src={images.journey}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </Reveal>
          <Reveal direction="right">
            <p className={eyebrow}>Clarity at every stage</p>
            <h2
              id="diplomatic-live-heading"
              className={`${heading} mt-5 text-[clamp(33px,3.8vw,51px)]`}
            >
              Known in advance, followed live.
            </h2>
            <p className={`${body} mt-7`}>
              Chauffeurs are assigned ahead of time, and their names and contact
              details reach your team at least 24 hours before service. Every
              vehicle is tracked in real time, so your team sees each movement
              as it unfolds.
            </p>
            <div className="mt-8 border-t border-[#957e5e]/30 pt-6">
              <p className="text-sm leading-7 text-[#70695e]">
                <span className="font-medium text-[#806b43]">
                  Before departure:
                </span>{" "}
                Your chauffeur’s details.
              </p>
              <p className="mt-1 text-sm leading-7 text-[#70695e]">
                <span className="font-medium text-[#806b43]">
                  Throughout the journey:
                </span>{" "}
                Every vehicle followed live.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="diplomatic-care-heading">
        <FixedPhoto src={images.closing}>
          <div className={`${container} py-20 md:py-28`}>
            <Reveal className="mx-auto max-w-[870px] text-center">
              <p className="text-xs uppercase tracking-[0.22em] text-[#d5bc89]">
                With the dignity the moment requires
              </p>
              <h2
                id="diplomatic-care-heading"
                className={`${heading} mt-6 text-[clamp(35px,4.6vw,62px)] [text-wrap:balance]`}
              >
                Duty of care,
                <br />
                held to the mission.
              </h2>
              <p className="mx-auto mt-7 max-w-[740px] text-[17px] leading-[1.85] text-white/85 md:text-lg">
                Your institution carries a duty of care to its principals, and
                we help you fulfill it: composed and punctual through the
                unexpected, with the quiet dignity the moment requires.
              </p>
              <div className="mt-9">
                <ContactLink>Speak with our Client Experience Team</ContactLink>
              </div>
              <a
                href="tel:+18884129150"
                className="mt-5 inline-flex min-h-11 items-center text-sm text-[#dfcfb1] underline decoration-[#957e5e]/60 underline-offset-4 hover:text-white"
              >
                +1-888-412-9150
              </a>
            </Reveal>
          </div>
        </FixedPhoto>
      </section>
    </main>
  );
}
