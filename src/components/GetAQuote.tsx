"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const bannerImage = "/footer.png";
const ease = [0.22, 1, 0.36, 1] as const;
const BOOKING_URL =
  "https://book.mylimobiz.com/v4/pittransportation";

export default function GetAQuote() {
  return (
    <section
      className="relative isolate flex w-full items-center bg-black py-16 md:h-[300px] md:py-0"
      style={{
        clipPath: "inset(0)",
      }}
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

<div className="absolute inset-0 bg-black/60" />
<div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/15" />
      </div>

      {/* Content scrolls normally */}
      <div className="relative flex w-full flex-col items-start gap-8 px-6 md:flex-row md:items-center md:justify-between md:px-[139px]">
      <motion.p
  style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
  className="text-3xl font-bold leading-tight text-[#c9a227] md:text-[64px] md:leading-[64px]"
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.9, ease }}
>
          See people. Know people.
          <br />
          Serve people.
        </motion.p>

       
      </div>
    </section>
  );
}