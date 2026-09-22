"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const partners = [
  { src: "/Partnerlogo1.jpeg", name: "Partner institution 1" },
  { src: "/Partnerlogo2.png", name: "Partner institution 2" },
  { src: "/Partnerlogo3.png", name: "Partner institution 3" },
  { src: "/Partnerlogo4.png", name: "Partner institution 4" },
  { src: "/Partnerlogo5.png", name: "Partner institution 5" },
  { src: "/Partnerlogo6.png", name: "Partner institution 6" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function PartnersSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="w-full overflow-hidden bg-white py-16 text-black md:py-24"
    >
      <motion.div
        className="mx-auto max-w-[1440px] px-6 md:px-[72px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.18,
            },
          },
        }}
      >
        <motion.p
          className="mb-4 text-center text-xs font-medium uppercase tracking-[0.24em] text-[#c9a227]"
          variants={{
            hidden: {
              opacity: reduceMotion ? 1 : 0,
              y: reduceMotion ? 0 : 35,
              transition: { duration: reduceMotion ? 0 : 0.35 },
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: reduceMotion ? 0 : 0.9,
                ease,
              },
            },
          }}
        >
          Partners
        </motion.p>

        <motion.h2
          id="partners-heading"
          className="mx-auto max-w-[850px] text-center text-2xl font-medium leading-snug tracking-[-0.025em] md:text-4xl"
          variants={{
            hidden: {
              opacity: reduceMotion ? 1 : 0,
              y: reduceMotion ? 0 : 65,
              scale: reduceMotion ? 1 : 0.94,
              transition: { duration: reduceMotion ? 0 : 0.35 },
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: reduceMotion ? 0 : 1.15,
                ease,
              },
            },
          }}
        >
          Explore the institutions that have placed their trust in
          Premier.
        </motion.h2>
      </motion.div>

      <div
        className="partners-window mt-12 md:mt-16"
        style={{
          width: "calc(100% - 48px)",
          maxWidth: "1100px",
          marginInline: "auto",
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="partners-track"
          style={{
            display: "flex",
            width: "max-content",
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="partners-group"
              aria-hidden={copy === 1 ? true : undefined}
              style={{
                display: "flex",
                flex: "0 0 auto",
                alignItems: "center",
                gap: "clamp(48px, 6vw, 80px)",
                paddingRight: "clamp(48px, 6vw, 80px)",
              }}
            >
              {partners.map((partner) => (
                <div
                  key={partner.src}
                  className="partner-logo"
                  style={{
                    position: "relative",
                    flex: "0 0 auto",
                    width: "clamp(130px, 23.44vw, 180px)",
                    height: "clamp(82px, 23.44vw, 180px)",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={partner.src}
                    alt={copy === 0 ? partner.name : ""}
                    width={180}
                    height={180}
                    sizes="(min-width: 768px) 180px, (max-width: 554px) 130px, 23.44vw"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .partners-track {
          animation: partners-scroll 36s linear infinite;
        }

        .partners-window:hover .partners-track {
          animation-play-state: paused;
        }

        @keyframes partners-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partners-track {
            width: 100% !important;
            animation: none;
          }

          .partners-group {
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            gap: 32px !important;
            padding-right: 0 !important;
          }

          .partners-group[aria-hidden="true"] {
            display: none !important;
          }

          .partners-window {
            -webkit-mask-image: none !important;
            mask-image: none !important;
          }
        }
      `}</style>
    </section>
  );
}