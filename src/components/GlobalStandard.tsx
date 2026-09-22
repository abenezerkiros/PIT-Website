"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

type GlobalStandardProps = {
  imageSrc: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function GlobalStandard({
  imageSrc,
}: GlobalStandardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
  });

  const visible = reduceMotion || inView;

  const transition = {
    duration: reduceMotion ? 0 : inView ? 1.1 : 0.65,
    ease,
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="global-standard-heading"
      className="relative isolate w-full bg-[#101112] text-white"
      style={{
        clipPath: "inset(0)",
      }}
    >
      {/* Stationary background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/15" />
      </div>

      {/* Animated content */}
      <div className="mx-auto flex min-h-[300px] w-full max-w-[1600px] items-center px-6 py-8 md:min-h-[340px] md:px-[72px] md:py-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.h2
            id="global-standard-heading"
            className="text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[1.05] tracking-[-0.045em]"
            initial={false}
            animate={{
              x: visible ? 0 : -100,
              opacity: visible ? 1 : 0,
            }}
            transition={transition}
          >
            <span className="block">One standard.</span>
            <span className="block">Everywhere.</span>
          </motion.h2>

          <motion.div
            className="border-t border-white/25 pt-10 lg:border-l lg:border-t-0 lg:py-6 lg:pl-16"
            initial={false}
            animate={{
              x: visible ? 0 : 100,
              opacity: visible ? 1 : 0,
            }}
            transition={transition}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="mb-7 text-white/90"
            >
              <circle cx="24" cy="24" r="19" />
              <ellipse cx="24" cy="24" rx="9" ry="19" />
              <path d="M5 24h38M9 13h30M9 35h30" />
            </svg>

            <p className="max-w-[660px] text-xl leading-[1.7] text-white/90 md:text-2xl">
              From your city to the other side of the world the same
              duty of care follows you. The same discretion. The same
              attention. Wherever the journey may take you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}