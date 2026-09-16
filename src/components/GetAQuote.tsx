"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// TODO: download this from the Figma asset URL (it expires in ~7 days)
// and move it into /public, then point this at the local path.
const bannerImage =
"/FinalCta.jpeg"
const ease = [0.22, 1, 0.36, 1] as const;
const BOOKING_URL = "https://book.mylimobiz.com/v4/pittransportation";
export default function GetAQuote() {
  return (
    <section className="relative flex w-full items-center overflow-hidden py-16 md:h-[300px] md:py-0">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 1.4,
          ease,
        }}
      >
        <Image
          src={bannerImage}
          alt="Chauffeur assisting a client beside a luxury car"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/[0.78] backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative flex w-full flex-col items-start gap-8 px-6 md:flex-row md:items-center md:justify-between md:px-[139px]">
        <motion.p
          className="font-serif text-3xl font-bold leading-tight text-[#c9a227] md:text-[64px] md:leading-[64px]"
          initial={{
            opacity: 0,
            x: -20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
        >
          See people. Know people.
          <br />
          Serve people.
        </motion.p>

        <motion.button
          type="button"
          initial={{
            opacity: 0,
            x: 20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          whileHover={{
            y: -2,
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="flex shrink-0 items-center justify-center whitespace-nowrap rounded bg-[#011638] px-11 py-[18px] text-[15px] font-semibold tracking-tight text-white shadow-[-12px_12px_50px_0px_rgba(253,198,92,0.3)]"
        >
          
          <a
  href={BOOKING_URL}
  target="_blank"
  rel="noopener noreferrer"
>
BOOK A RESERVATION
</a>
        </motion.button>
      </div>
    </section>
  );
}