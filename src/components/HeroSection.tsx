"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

const arrowDownIcon = "/ArrowDown.png";
const BOOKING_URL =
  "https://book.mylimobiz.com/v4/pittransportation";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(heroRef, {
    once: false,
    amount: 0.25,
  });

  const visible = reduceMotion || inView;

  return (
    <section
      ref={heroRef}
      className="relative isolate flex min-h-[100vh] w-full flex-col items-center justify-center gap-[68px] overflow-hidden px-6 py-24 md:px-[72px]"
    >
      {/* Image background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: visible ? 1 : 1.04 }}
          transition={{
            duration: reduceMotion ? 0 : inView ? 2 : 0.4,
            ease,
          }}
        >
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%), radial-gradient(ellipse at 50% 98%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>

      {/* Heading and reservation button */}
      <div className="flex flex-col items-center gap-6 text-center text-white">
        <motion.h1
          className="max-w-[1018px] break-words text-3xl uppercase leading-tight tracking-wide md:text-5xl md:leading-[72px]"
          initial={false}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 85,
            scale: visible ? 1 : 0.92,
          }}
          transition={{
            duration: reduceMotion ? 0 : inView ? 1.4 : 0.4,
            ease: [0.16, 1, 0.3, 1],
            delay: !reduceMotion && inView ? 0.25 : 0,
          }}
        >
          World class chauffeured transportation for the world&apos;s most important journeys.
        </motion.h1>

        <motion.div
          className="mt-5"
          initial={false}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 12,
          }}
          transition={{
            duration: reduceMotion ? 0 : inView ? 0.8 : 0.3,
            ease,
            delay: !reduceMotion && inView ? 0.95 : 0,
          }}
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reserve-button relative isolate inline-flex min-h-[58px] min-w-[250px] items-center justify-center overflow-hidden px-10 py-4 text-base font-semibold tracking-[0.06em] md:min-h-[64px] md:min-w-[300px] md:text-lg"
          >
            <span
              aria-hidden="true"
              className="reserve-shine pointer-events-none absolute inset-y-0"
            />

            <span className="relative z-10">RESERVE NOW</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="flex h-[46px] flex-col items-center justify-center gap-[6px]"
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 10,
        }}
        transition={{
          duration: reduceMotion ? 0 : inView ? 0.8 : 0.3,
          ease,
          delay: !reduceMotion && inView ? 1.25 : 0,
        }}
      >
        <p className="text-center text-base tracking-wide text-white">
        Experience the Premier Standard
        </p>

        <motion.div
          className="relative size-6 shrink-0"
          animate={{
            y: reduceMotion || !inView ? 0 : [0, 4, 0],
          }}
          transition={{
            duration: reduceMotion || !inView ? 0 : 2.2,
            repeat: reduceMotion || !inView ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={arrowDownIcon}
            alt=""
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      <style jsx>{`
        .reserve-button {
          background-color: #806b43;
          color: #ffffff;
          transition:
            background-color 350ms ease,
            color 250ms ease;
        }

        .reserve-button:focus-visible {
          background-color: #a38d65;
          color: #080808;
          outline: 2px solid #d5bc89;
          outline-offset: 5px;
        }

        .reserve-shine {
          left: -40%;
          width: 30%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 8%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.2) 92%,
            transparent 100%
          );
          transform: translateX(0) skewX(-25deg);
          transition: transform 400ms cubic-bezier(0.45, 0, 0.55, 1);
        }

        @media (hover: hover) {
          .reserve-button:hover {
            background-color: #a38d65;
            color: #080808;
          }

          .reserve-button:hover .reserve-shine {
            transform: translateX(500%) skewX(-25deg);
          }
        }

        .reserve-button:focus-visible .reserve-shine {
          transform: translateX(500%) skewX(-25deg);
        }

        @media (prefers-reduced-motion: reduce) {
          .reserve-button {
            transition: none;
          }

          .reserve-button .reserve-shine {
            display: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}