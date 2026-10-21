"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const bannerImage = "/final.jpg";
const ease = [0.22, 1, 0.36, 1] as const;

export default function GetAQuote() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate flex h-[260px] w-full items-end bg-black md:h-[300px]"
      style={{ clipPath: "inset(0)" }}
    >
      {/* Stationary image clipped to this section */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <Image
          src={bannerImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>


<div
  aria-hidden="true"
  className="pointer-events-none absolute -inset-[2px] bg-black/60"
/>


<div
  aria-hidden="true"
  className="pointer-events-none absolute -inset-[2px] bg-gradient-to-t from-black/50 via-black/10 to-transparent"
/>

      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-6 md:px-[72px] md:pb-8">
        <motion.p
          style={{
            fontFamily: "var(--font-heading), Georgia, serif",
          }}
          className="max-w-[1000px] text-3xl font-normal leading-[1.15] tracking-[-0.02em] text-[#d4bf94] md:text-5xl lg:text-[56px]"          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease }}
        >
          See people. Know people. Serve people.
        </motion.p>
      </div>
    </section>
  );
}