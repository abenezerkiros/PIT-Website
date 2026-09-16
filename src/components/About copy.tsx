"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const aboutImage = "/image.png";
const BOOKING_URL = "https://book.mylimobiz.com/v4/pittransportation";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutUsCopy() {
  return (
    <section className="flex w-full flex-col items-center gap-16 bg-white px-6 pb-[120px] pt-[59px] md:px-[72px]">
      {/* Heading */}
      <motion.div
        className="flex w-full max-w-[1280px] flex-col items-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 0.9,
          ease,
        }}
      >
        <p className="text-center text-lg font-medium text-[#9c9c9c]">
          ABOUT US
        </p>

        <h2 className="max-w-[737px] text-center text-2xl uppercase text-black md:text-[28px] md:leading-[44px]">
          Washington DC Chauffeur Service for Professional Reliability
        </h2>
      </motion.div>

      {/* Main content */}
      <div className="flex w-full max-w-[1280px] flex-col items-start gap-6 lg:flex-row">
        {/* Image */}
        <motion.div
          className="relative h-[300px] w-full shrink-0 overflow-hidden lg:h-[470px] lg:w-[calc(50%-12px)]"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 1.1,
            ease,
          }}
        >
          <Image
            src={aboutImage}
            alt="Chauffeur opening the door of a luxury car"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex w-full flex-col items-start gap-12 lg:w-[calc(50%-12px)] lg:pl-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1,
            ease,
          }}
        >
          <div className="flex w-full flex-col items-start gap-9">
            <motion.p
              className="max-w-[526px] text-2xl tracking-wide text-black md:leading-[48px]"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease,
              }}
            >
              Empowering Progress: Our Story, Your Journey, Shared Excellence.
            </motion.p>

            <motion.div
              className="flex max-w-[416px] flex-col items-start gap-6"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease,
              }}
            >
              <p className="text-xl leading-[30px] text-black">
                Embark on a journey through our narrative, where innovation
                meets purpose.
              </p>

              <p className="text-xl leading-[30px] text-black">
                Lorem ipsum dolor sit amet consectetur. Sit non diam justo
                fames. Blandit et purus mollis convallis malesuada egestas
                risus quam enim. Semper lorem rhoncus et felis tristique
                tellus volutpat orci. Dui elementum a sed.
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.button
            type="button"
            className="flex items-center justify-center gap-3 rounded-lg border border-[#c9a227] px-9 py-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
            transition={{
              duration: 0.7,
              ease,
            }}
          >
            <span className="text-base font-medium tracking-wide text-[#c9a227]">
            <a
  href={BOOKING_URL}
  target="_blank"
  rel="noopener noreferrer"
>
BOOK
</a>
            </span>

        
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}