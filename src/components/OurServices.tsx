"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// TODO: download these from the Figma asset URLs (they expire in ~7 days)
// and move them into /public, then point these at local paths.
const imgAi =
  "https://www.figma.com/api/mcp/asset/6cdb35dd-bd70-43e3-b894-a477a1d3070b.png";
const imgAi1 =
  "https://www.figma.com/api/mcp/asset/713aa394-4af1-4fd9-a0df-24a80614aed9.png";
const imgAi2 =
  "https://www.figma.com/api/mcp/asset/ea5a8b2f-7543-4049-8f38-d15724f43887.png";
const arrowIcon =
  "https://www.figma.com/api/mcp/asset/aa97677c-1a63-41c4-b333-44382303153a.svg";

const sharedContent = {
  paragraph:
    "Experience a punctual, seamless journey as your professional driver handles all regional navigation and luggage logistics.",
  images: [imgAi, imgAi1, imgAi2],
};

const steps = [
  { number: "01", title: "Fill the Booking Form", ...sharedContent },
  { number: "02", title: "Get Ride Confirmation", ...sharedContent },
  { number: "03", title: "Enjoy the Ride", ...sharedContent },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function OurServices() {
  // Third item open by default, matching the design.
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className="flex w-full flex-col items-start gap-16 px-6 pb-20 md:px-[72px]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 140% 90% at 0% 0%, rgba(1,1,1,1) 0%, rgba(0,0,0,1) 100%)",
      }}
    >
      {/* Heading */}
      <motion.div
        className="flex w-full flex-col items-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 0.9,
          ease,
        }}
      >
        <p className="text-center text-lg font-medium text-[#9c9c9c]">
          Booking
        </p>

        <h2 className="max-w-[737px] text-center text-2xl uppercase text-white md:text-[28px] md:leading-[44px]">
          Ride Confidently in 3 Simple Steps
        </h2>
      </motion.div>

      <div className="flex w-full flex-col items-start">
        {steps.map((step, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={step.number}
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease,
              }}
            >
              {/* Accordion trigger */}
              <motion.button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between p-6 text-left"
                whileHover={{ x: 4 }}
                transition={{
                  duration: 0.35,
                  ease,
                }}
              >
                <div className="flex items-start gap-10">
                  <span
                    className={`text-2xl tracking-wide transition-colors duration-500 md:text-[28px] md:leading-[44px] ${
                      isOpen ? "text-[#c9a227]" : "text-white"
                    }`}
                  >
                    {step.number}
                  </span>

                  <span
                    className="bg-clip-text text-2xl tracking-wide text-transparent md:text-[28px] md:leading-[44px]"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgb(255,255,255) 10.285%, rgba(255,255,255,0) 145.86%)",
                    }}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Arrow */}
                <motion.span
                  className="relative flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#9c9c9c]"
                  animate={{
                    borderColor: isOpen ? "#c9a227" : "#9c9c9c",
                  }}
                  transition={{
                    duration: 0.4,
                    ease,
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      scale: isOpen ? 1.05 : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      ease,
                    }}
                  >
                    <Image
                      src={arrowIcon}
                      alt=""
                      width={30}
                      height={30}
                    />
                  </motion.div>
                </motion.span>
              </motion.button>

              {/* Accordion content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: {
                        duration: 0.65,
                        ease,
                      },
                      opacity: {
                        duration: 0.35,
                        ease,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col items-end gap-5 pb-8">
                      {/* Description */}
                      <motion.div
                        className="flex w-full items-start gap-4 py-2 pl-6 pr-2"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1,
                          ease,
                        }}
                      >
                        <div className="w-px shrink-0 self-stretch bg-[#9c9c9c]" />

                        <p className="max-w-[812px] flex-1 text-lg leading-7 tracking-wide text-[#9c9c9c]">
                          {step.paragraph}
                        </p>
                      </motion.div>

                      {/* Images */}
                      <motion.div
                        className="flex w-full flex-wrap items-start gap-6 px-6"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.08,
                              delayChildren: 0.15,
                            },
                          },
                        }}
                      >
                        {step.images.map((src, i) => (
                          <motion.div
                            key={i}
                            className="relative h-[200px] w-[298px] shrink-0 overflow-hidden"
                            variants={{
                              hidden: {
                                opacity: 0,
                                y: 20,
                                scale: 0.98,
                              },
                              visible: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                  duration: 0.65,
                                  ease,
                                },
                              },
                            }}
                          >
                            <Image
                              src={src}
                              alt=""
                              fill
                              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                            />

                            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 hover:bg-black/10" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div className="h-px w-full bg-[#2a2a2a]" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}