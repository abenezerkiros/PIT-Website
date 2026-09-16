"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const arrowDownIcon = "/ArrowDown.png"

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100vh] w-full flex-col items-center justify-center gap-[68px] overflow-hidden px-6 py-24 md:px-[72px]">
      {/* Video background */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            ease,
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </motion.video>

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%), radial-gradient(ellipse at 50% 98%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>

      {/* Heading + subheading */}
      <motion.div
        className="flex flex-col items-center gap-6 text-center text-white"
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease,
          delay: 0.2,
        }}
      >
        <motion.h1
          className="max-w-[1018px] break-words text-3xl uppercase leading-tight tracking-wide md:text-5xl md:leading-[72px]"
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease,
            delay: 0.3,
          }}
        >
          Mobility for the world&apos;s most important journeys, wherever that
          journey may take you.
        </motion.h1>

        <motion.p
          className="max-w-[443px] text-lg tracking-wide md:text-2xl"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease,
            delay: 0.5,
          }}
        >
          Premier is the transportation partner for global leaders, where true
          luxury is being seen, known, and served before you arrive.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="flex h-[46px] flex-col items-center justify-center gap-[6px]"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease,
          delay: 0.8,
        }}
      >
        <p className="text-center text-base tracking-wide text-white">
          Enter the Premier Standard.
        </p>

        <motion.div
          className="relative size-6 shrink-0"
          animate={{
            y: [0, 4, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
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
    </section>
  );
}