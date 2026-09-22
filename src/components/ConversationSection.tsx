"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type ConversationSectionProps = {
  imageSrc: string;
  contactHref?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ConversationSection({
  imageSrc,
  contactHref = "/contact",
}: ConversationSectionProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const boxSectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLElement>(null);

  const headingId = useId();
  const boxHeadingId = useId();
  const reduceMotion = useReducedMotion();

  const boxInView = useInView(boxRef, {
    once: false,
    amount: 0.3,
  });

  const visible = reduceMotion || boxInView;

  const textTransition = {
    duration: reduceMotion ? 0 : boxInView ? 1.1 : 0.65,
    ease,
  };

  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "center start"],
  });

  const scale = useTransform(introProgress, [0, 1], [1.12, 0.4]);

  const { scrollYProgress: colorProgress } = useScroll({
    target: boxSectionRef,
    offset: ["start 85%", "start 30%"],
  });

  const backgroundColor = useTransform(
    colorProgress,
    [0, 1],
    ["#000000", "#ffffff"],
  );

  const color = useTransform(
    colorProgress,
    [0, 1],
    ["#ffffff", "#111111"],
  );

  return (
    <motion.section
      aria-labelledby={headingId}
      className="relative isolate w-full"
      style={{
        backgroundColor: reduceMotion ? "#ffffff" : backgroundColor,
        color: reduceMotion ? "#111111" : color,
      }}
    >
      {/* Existing scroll-zoom introduction */}
      <div
        ref={introRef}
        className="relative flex min-h-[85svh] items-center justify-center overflow-hidden px-8 py-28 md:min-h-[90svh] md:px-[90px] md:py-36"
        style={
          reduceMotion
            ? { backgroundColor: "#000000", color: "#ffffff" }
            : undefined
        }
      >
        <motion.div
          className="mx-auto w-full max-w-[1500px] text-center"
          style={{
            scale: reduceMotion ? 1 : scale,
            transformOrigin: "50% 50%",
          }}
        >
          <h2
            id={headingId}
            className="text-[clamp(2.75rem,5.6vw,6.5rem)] font-medium leading-[1.08] tracking-[-0.045em]"
          >
            <span className="block">Every journey begins</span>
            <span className="block">with a conversation.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-[780px] text-base leading-7 tracking-[-0.01em] opacity-75 [text-wrap:balance] md:mt-9 md:text-xl md:leading-8">
            Tell us who you&apos;re moving and where—we&apos;ll handle
            the details.
          </p>
        </motion.div>
      </div>

      {/* Image box */}
      <div
        ref={boxSectionRef}
        className="px-6 pb-16 pt-10 md:px-[72px] md:pb-24 md:pt-16"
      >
        <section
          ref={boxRef}
          aria-labelledby={boxHeadingId}
          className="relative isolate mx-auto w-full max-w-[1600px] bg-[#101112] text-white"
          style={{ clipPath: "inset(0)" }}
        >
          {/* Fixed background stays separate from animated content */}
          <div
            aria-hidden="true"
            className={`pointer-events-none inset-0 -z-10 ${
              reduceMotion ? "absolute" : "fixed"
            }`}
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

          <div className="relative flex min-h-[340px] items-center px-7 py-12 md:px-14 md:py-14 lg:px-20">
  <motion.div
    className="w-full max-w-[1150px]"
    initial={false}
    animate={{
      y: visible ? 0 : 40,
      opacity: visible ? 1 : 0,
    }}
    transition={{
      duration: reduceMotion ? 0 : 0.9,
      ease,
    }}
  >
    <h3
      id={boxHeadingId}
      className="max-w-[1000px] text-[clamp(2rem,3.4vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.035em] [text-wrap:balance]"
    >
      A seamless journey begins with a conversation.
    </h3>

    <p className="mt-6 max-w-[1100px] text-base leading-7 text-white/90 md:text-xl md:leading-8">
      Our Client Experience Team is trained to give immaculate care and
      attention to every detail. They listen, they anticipate, and they
      arrange the chauffeur and vehicle service that makes your journey
      unforgettable.
    </p>

    <a
      href={contactHref}
      className="mt-8 inline-flex min-h-14 max-w-full items-center justify-between gap-5 border border-black bg-[#957E5E] px-6 py-4 text-left text-sm font-medium leading-6 text-black hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-base"
    >
      <span>
        Speak with our Client Experience Team for immediate assistance.
      </span>

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
        className="shrink-0"
      >
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </a>
  </motion.div>
</div>
        </section>
      </div>
    </motion.section>
  );
}