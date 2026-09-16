"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// TODO: download this from the Figma asset URL (it expires in ~7 days)
// and move it into /public, then point this at the local path.
const ctaBackgroundImage =
  "/Airport.jpeg";

const arrowOutwardIcon =
  "https://www.figma.com/api/mcp/asset/8d3b17e1-dc7e-40ef-9415-e9b053aba2ce.svg";

const ease = [0.22, 1, 0.36, 1] as const;
const BOOKING_URL = "https://book.mylimobiz.com/v4/pittransportation";
export default function AirportCta() {
  return (
    <section
      className="flex w-full flex-col items-start px-6 py-[100px] md:px-[72px] md:py-[110px]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 140% 90% at 0% 0%, rgba(30,30,30,1) 0%, rgba(18,18,18,1) 100%)",
      }}
    >
      <motion.div
        className="group relative h-[400px] w-full overflow-hidden rounded-[20px] md:h-[580px]"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.9,
          ease,
        }}
      >
        {/* Background image */}
        <motion.div
          className="absolute inset-0"
          initial={{
            scale: 1.04,
          }}
          whileInView={{
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 1.4,
            ease,
          }}
        >
          <Image
            src={ctaBackgroundImage}
            alt="Passengers smiling in the back of a chauffeured car"
            fill
            className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025]"
          />
        </motion.div>

        {/* Image overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Content */}
        <motion.div
          className="absolute bottom-0 left-0 flex w-full flex-col items-start gap-7 px-6 py-8 md:gap-[30px] md:px-[50px] md:py-[50px]"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease,
          }}
        >
          <div className="flex flex-col items-start gap-5 md:max-w-[916px] md:gap-[22px]">
            <p className="text-3xl leading-tight text-white md:text-5xl md:leading-[1.2]">
              To the Airport
              <br />
              With Maximum Comfort
            </p>

            <p className="text-base font-bold text-white/75 md:text-lg">
              Call Us On{" "}
              <a
                href="tel:+12029990346"
                className="text-[#c9a227]/75 underline decoration-[#c9a227]/50 underline-offset-2 transition-colors duration-300 hover:text-[#c9a227]"
              >
                +1 (202) 999-0346
              </a>{" "}
              or Email{" "}
              <a
                href="mailto:info@pitdrives.com"
                className="text-[#c9a227] underline decoration-[#c9a227]/50 underline-offset-2 transition-colors duration-300 hover:text-[#d7b43b]"
              >
                Info@pitdrives.com
              </a>
            </p>
          </div>

          {/* CTA */}
          <motion.button
            type="button"
            whileHover={{
              y: -2,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              duration: 0.3,
              ease,
            }}
            className="flex items-center justify-center gap-2.5 rounded-full bg-[#c9a227] px-[30px] py-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
          >
            <span className="text-lg font-semibold text-white">
            <a
  href={BOOKING_URL}
  target="_blank"
  rel="noopener noreferrer"
>
BOOK
</a>
            </span>

            <motion.span
              whileHover={{
                x: 2,
              }}
              transition={{
                duration: 0.3,
                ease,
              }}
            >
         
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}