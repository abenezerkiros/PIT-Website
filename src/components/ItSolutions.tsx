"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

const pillars = [
  {
    icon: "communications",
    title: "A Communications Team Always at Your Service",
    description:
      "Whatever the hour, wherever you are, a Client Experience Lead is available—listening, understanding, and making sure nothing is left to chance.",
      src:"/conversation.jpg"
  },
  {
    icon: "journey",
    title: "Your Journey, Curated with Intelligence",
    description:
      "Before your journey begins, your preferences become your chauffeur’s briefing. They arrive knowing more than the route. They arrive knowing you.",
      src:"/Curated-trip.png"
  },
  {
    icon: "chauffeur",
    title: "White Glove Chauffeur Service",
    description:
      "Every Premier chauffeur is rigorously trained. The difference is the match—we choose the person whose character fits your journey, not whoever is closest.",
            src:"/white-glove.png"
  },
  {
    icon: "vehicle",
    title: "Vehicles That Ensure You Arrive Like No Other",
    description:
      "A fleet of the latest luxury vehicles, European and American, increasingly electric—selected and prepared for each journey.",
            src:"/Fleet.png"
  },
] as const;

const pillarLabels = [
  "Client communications",
  "Curated journeys",
  "Chauffeur service",
  "Our fleet",
] as const;

function FeatureCard({
  pillar,
  index,
  contactHref,
  hasEntered,
}: {
  pillar: (typeof pillars)[number];
  index: number;
  contactHref: string;
  hasEntered: boolean;
}) {
  const reduceMotion = useReducedMotion();
  // Only the first pair enters on vertical arrival. Later slides are static.
  const show = reduceMotion || hasEntered || index >= 2;
  const entranceX = index % 2 === 0 ? -100 : 100;

  return (
    <div className="grid min-w-0 overflow-hidden rounded-[20px]">
    <motion.article
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        x: show ? 0 : entranceX,
      }}
      transition={{
        duration: reduceMotion || index >= 2 ? 0 : 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label={`${index + 1} of ${pillars.length}: ${pillarLabels[index]}`}
      className="group flex min-w-0 flex-col rounded-[20px] p-2 pb-6 hover:bg-[var(--pillar-surface)] focus-within:bg-[var(--pillar-surface)]"
    >
      <div className="relative aspect-[2.06/1] overflow-hidden rounded-[10px] bg-black/[0.035]">
        <Image
          src={pillar.src}
          alt="Mercedes-Benz S-Class"
          fill
          sizes="(min-width: 1424px) 616px, (min-width: 768px) calc((100vw - 192px) / 2), calc(100vw - 64px)"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-3 pt-6 md:px-3 md:pt-7">
        <p className="mb-2 text-sm text-[#c9a227] font-medium opacity-60 md:text-base">
          {pillarLabels[index]}
        </p>
        <h3 className="text-2xl font-semibold leading-[1.18] tracking-[-0.025em] md:text-[30px] lg:text-[32px]">
          {pillar.title}
        </h3>
        <p className="mt-3 text-base leading-[1.5] md:text-lg">
          {pillar.description}
        </p>
     
      </div>
    </motion.article>
    </div>
  );
}

function PillarsCarousel({ contactHref }: { contactHref: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  // The stationary carousel viewport triggers once, independently of its slides.
  const hasEntered = useInView(trackRef, { once: false, amount: 0.18 });
  const trackId = useId();
  const reduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      setPosition({
        start: track.scrollLeft <= 2,
        end: track.scrollLeft >= track.scrollWidth - track.clientWidth - 2,
      });
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (track.clientWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="The four pillars of Premier service">
      <div
        id={trackId}
        ref={trackRef}
        tabIndex={0}
        aria-label="Scroll horizontally to explore all four pillars"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        className="grid auto-cols-[100%] grid-flow-col items-stretch gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory rounded-[20px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
      >
        {[0, 2].map((startIndex) => (
          <div
            key={startIndex}
            role="group"
            aria-label={`Pillars ${startIndex + 1} and ${startIndex + 2}`}
            className="grid min-w-0 snap-start snap-always grid-cols-1 gap-6 md:grid-cols-2"
          >
            {pillars.slice(startIndex, startIndex + 2).map((pillar, offset) => (
              <FeatureCard
                key={pillar.icon}
                pillar={pillar}
                index={startIndex + offset}
                contactHref={contactHref}
                hasEntered={hasEntered}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-7 flex justify-center">
        <div
          className="inline-flex items-center gap-4 rounded-full border p-2 shadow-[0_5px_24px_rgba(0,0,0,0.08)]"
          style={{ borderColor: "var(--pillar-border)" }}
        >
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={direction === -1 ? "Previous pillars" : "Next pillars"}
              aria-controls={trackId}
              disabled={direction === -1 ? position.start : position.end}
              onClick={() => move(direction)}
              className="relative flex size-10 items-center justify-center rounded-full transition-opacity hover:opacity-70 disabled:cursor-default disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-current opacity-[0.04]" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={direction === -1 ? "m14 5-7 7 7 7" : "m10 5 7 7-7 7"} />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ItSolutions({
  contactHref = "/contact",
}: {
  contactHref?: string;
}) {
  const introRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const introTextVariants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };


  // Finish shrinking while the heading is moving out through the top.
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "center start"],
  });

  const introScale = useTransform(
    introProgress,
    [0, 1],
    [1.12, 0.4],
  );

  // The services are already present as they enter the viewport.
  // Only their colors change with this scroll progress.
  const { scrollYProgress: colorProgress } = useScroll({
    target: servicesRef,
    offset: ["start 85%", "start 30%"],
  });

  const backgroundColor = useTransform(
    colorProgress,
    [0, 1],
    ["#000000", "#ffffff"],
  );

  const foregroundColor = useTransform(
    colorProgress,
    [0, 1],
    ["#ffffff", "#111111"],
  );

  const pillarBorder = useTransform(
    colorProgress,
    [0, 1],
    ["rgba(255,255,255,0.15)", "rgba(0,0,0,0.12)"],
  );

  const pillarSurface = useTransform(
    colorProgress,
    [0, 1],
    ["rgba(255,255,255,0.035)", "rgba(0,0,0,0.02)"],
  );

  const themeStyle = {
    backgroundColor: reduceMotion ? "#ffffff" : backgroundColor,
    color: reduceMotion ? "#111111" : foregroundColor,
    "--pillar-border": reduceMotion
      ? "rgba(0,0,0,0.12)"
      : pillarBorder,
    "--pillar-surface": reduceMotion
      ? "rgba(0,0,0,0.02)"
      : pillarSurface,
  };

  return (
    <motion.div
      className="relative isolate w-full"
      style={themeStyle}
      id="about"
    >
      {/* Intro: both lines zoom together, following scroll position. */}
      <div
        ref={introRef}
        className="relative flex min-h-[85svh] items-center justify-center overflow-hidden px-8 py-28 md:min-h-[90svh] md:px-[90px] md:py-36"
        style={
          reduceMotion
            ? {
                backgroundColor: "#000000",
                color: "#ffffff",
              }
            : undefined
        }
      >
        <motion.div
        className="mx-auto w-full max-w-[1600px] text-center"
          style={{
            scale: reduceMotion ? 1 : introScale,
            transformOrigin: "50% 50%",
          }}
        >
      <h2 className="text-[clamp(2.75rem,5.6vw,6.5rem)] font-medium leading-[1.08] tracking-[-0.045em]">
  <span className="block xl:whitespace-nowrap">
    Premier is the mobility partner for
  </span>
  <span className="block">global leaders.</span>
</h2>

          <p className="mx-auto mt-7 max-w-[780px] text-base leading-7 tracking-[-0.01em] opacity-75 [text-wrap:balance] md:mt-9 md:text-xl md:leading-8">
            Where the standard is being seen, known, and served with
            anticipation.
          </p>
        </motion.div>
      </div>

      {/* Always visible; inherits the animated background and text colors. */}
      <section
        ref={servicesRef}
        aria-labelledby="premier-service-heading"
        className="relative px-6 pb-20 pt-16 md:px-[72px] md:pb-28 md:pt-20 lg:pb-32"
      >
        <div className="mx-auto w-full max-w-[1280px]" id="services">
          <motion.div
            className="mx-auto mb-14 flex max-w-[850px] flex-col items-center text-center md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.16,
                },
              },
            }}
          >
            <motion.p variants={introTextVariants} className="mb-6 text-xs font-medium uppercase tracking-[0.24em] opacity-60">
              The Four Pillars of Premier Service
            </motion.p>

            <motion.h2
              variants={introTextVariants}
              id="premier-service-heading"
              className="text-4xl font-medium leading-[1.15] tracking-[-0.035em] md:text-5xl lg:text-6xl"
            >
              At Premier, luxury is personal.
            </motion.h2>

            <motion.p variants={introTextVariants} className="mt-7 max-w-[720px] text-lg leading-8 opacity-70 md:text-xl md:leading-9">
              Premier learns who you are, how you move, what you need,
              and who you trust—then ensures every journey feels
              designed for your tailored experience.
            </motion.p>
          </motion.div>

          <PillarsCarousel contactHref={contactHref}  />

        </div>
      </section>
    </motion.div>
  );
}