"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// TODO: download these from the Figma asset URLs (they expire in ~7 days)
// and move them into /public, then point these at local paths.
const carImageMercedes =
  "https://www.figma.com/api/mcp/asset/7681af29-27dd-4e5e-9d43-9d32e0b81cf7.png";

const carImageBmw =
  "https://www.figma.com/api/mcp/asset/6e896975-9352-47ed-a849-690108a705d6.png";

const arrowBackIcon =
  "https://www.figma.com/api/mcp/asset/56e36fc4-80f3-4512-8d91-a3c92b900d26.svg";

const personIcon =
  "https://www.figma.com/api/mcp/asset/e3f3e1ea-7258-449c-be79-784261c99473.svg";

const workIcon =
  "https://www.figma.com/api/mcp/asset/286da6ee-33bd-473a-acb0-1f3483a8c5c7.svg";

const arrowOutwardIcon =
  "https://www.figma.com/api/mcp/asset/51f384d0-df4b-40bd-951f-c42841ae7ca3.svg";
  const BOOKING_URL = "https://book.mylimobiz.com/v4/pittransportation";
type Car = {
  name: string;
  seats: number;
  luggage: number;
  image: string;
};

const categories = [
  "ALL",
  "BUSINESS CLASS",
  "FIRST CLASS",
  "BUSINESS VAN",
  "MINI BUS",
  "BUS",
  "AVIATION",
];

const categoryCars: Record<string, Car[]> = {
  ALL: [
    {
      name: "Mercedes Benz E-Class",
      seats: 3,
      luggage: 3,
      image: carImageMercedes,
    },
    {
      name: "BMW 5er Limousine",
      seats: 3,
      luggage: 3,
      image: carImageBmw,
    },
    {
      name: "Mercedes Benz E-Class",
      seats: 3,
      luggage: 3,
      image: carImageMercedes,
    },
    {
      name: "BMW 5er Limousine",
      seats: 3,
      luggage: 3,
      image: carImageBmw,
    },
  ],

  "BUSINESS CLASS": [
    {
      name: "Mercedes Benz E-Class",
      seats: 3,
      luggage: 3,
      image: carImageMercedes,
    },
    {
      name: "BMW 5er Limousine",
      seats: 3,
      luggage: 3,
      image: carImageBmw,
    },
  ],

  "FIRST CLASS": [
    {
      name: "Mercedes Benz E-Class",
      seats: 3,
      luggage: 3,
      image: carImageMercedes,
    },
    {
      name: "BMW 5er Limousine",
      seats: 3,
      luggage: 3,
      image: carImageBmw,
    },
  ],

  "BUSINESS VAN": [
    {
      name: "Mercedes Benz E-Class",
      seats: 3,
      luggage: 3,
      image: carImageMercedes,
    },
    {
      name: "BMW 5er Limousine",
      seats: 3,
      luggage: 3,
      image: carImageBmw,
    },
  ],

  "MINI BUS": [
    {
      name: "Mercedes Benz E-Class",
      seats: 3,
      luggage: 3,
      image: carImageMercedes,
    },
    {
      name: "BMW 5er Limousine",
      seats: 3,
      luggage: 3,
      image: carImageBmw,
    },
  ],

  BUS: [
    {
      name: "Mercedes Benz E-Class",
      seats: 3,
      luggage: 3,
      image: carImageMercedes,
    },
    {
      name: "BMW 5er Limousine",
      seats: 3,
      luggage: 3,
      image: carImageBmw,
    },
  ],

  AVIATION: [
    {
      name: "Mercedes Benz E-Class",
      seats: 3,
      luggage: 3,
      image: carImageMercedes,
    },
    {
      name: "BMW 5er Limousine",
      seats: 3,
      luggage: 3,
      image: carImageBmw,
    },
  ],
};

const ease = [0.22, 1, 0.36, 1] as const;

function CarCard({ car }: { car: Car }) {
  return (
    <motion.div
      className="relative h-[411px] w-[657px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-[#efefef]"
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.5,
        ease,
      }}
    >
      {/* Information */}
      <div className="absolute left-0 top-0 z-10 flex flex-col items-start gap-2.5 p-[30px]">
        <p className="whitespace-nowrap text-lg font-semibold text-black">
          {car.name}
        </p>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-[3px] rounded bg-black px-2 py-0.5">
            <Image
              src={personIcon}
              alt=""
              width={19}
              height={19}
            />
            <p className="text-base text-white">{car.seats}</p>
          </div>

          <div className="flex items-center gap-[3px] rounded bg-black px-2 py-0.5">
            <Image
              src={workIcon}
              alt=""
              width={16}
              height={16}
            />
            <p className="text-base text-white">{car.luggage}</p>
          </div>
        </div>
      </div>

      {/* Car */}
      <div className="absolute inset-x-0 bottom-0 top-[100px] flex items-center justify-center px-16 pb-10">
        <motion.div
          className="relative"
          whileHover={{
            scale: 1.025,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
        >
          <Image
            src={car.image}
            alt={car.name}
            width={541}
            height={224}
            className="max-h-full w-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Book */}
      <motion.button
        type="button"
        className="absolute bottom-[20px] right-[20px] z-10 flex items-center gap-2.5"
        whileHover={{
          x: -2,
        }}
        transition={{
          duration: 0.3,
          ease,
        }}
      >
        <span className="text-lg font-semibold text-[#c9a227]">
        <a
  href={BOOKING_URL}
  target="_blank"
  rel="noopener noreferrer"
>
Book Now
</a>
        </span>

        <motion.span
          className="flex size-[30px] items-center justify-center rounded-full bg-[#c9a227]"
          whileHover={{
            scale: 1.06,
          }}
          transition={{
            duration: 0.3,
            ease,
          }}
        >
          <Image
            src={arrowOutwardIcon}
            alt=""
            width={16}
            height={16}
          />
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const cars = categoryCars[activeCategory];

  const CARD_WIDTH = 657;
  const CARD_GAP = 40;
  const CARD_STEP = CARD_WIDTH + CARD_GAP;

  /*
   * Cinematic slider.
   *
   * Instead of relying on browser scroll-behavior, this gives us
   * control over the acceleration/deceleration curve.
   */
  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollRef.current;

      if (!container) return;

      const clamped = Math.max(
        0,
        Math.min(index, cars.length - 1)
      );

      const start = container.scrollLeft;
      const target = clamped * CARD_STEP;
      const distance = target - start;

      if (Math.abs(distance) < 1) {
        setActiveIndex(clamped);
        return;
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const duration = 900;
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Very soft ease-out.
        const eased =
          1 - Math.pow(1 - progress, 3);

        container.scrollLeft =
          start + distance * eased;

        if (progress < 1) {
          animationRef.current =
            requestAnimationFrame(animate);
        } else {
          setActiveIndex(clamped);
        }
      };

      animationRef.current =
        requestAnimationFrame(animate);
    },
    [cars.length]
  );

  const handlePrev = () => {
    scrollToIndex(activeIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(activeIndex + 1);
  };

  /*
   * Category changes:
   *
   * No dramatic card animation.
   * The entire carousel softly dissolves and settles upward
   * by only a few pixels.
   */
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const container = scrollRef.current;

    if (container) {
      container.scrollLeft = 0;
    }

    setActiveIndex(0);
  }, [activeCategory]);

  /*
   * Keep pagination synchronized with manual mouse/touch scrolling.
   */
  const handleScroll = () => {
    const container = scrollRef.current;

    if (!container) return;

    const index = Math.round(
      container.scrollLeft / CARD_STEP
    );

    const clamped = Math.max(
      0,
      Math.min(index, cars.length - 1)
    );

    setActiveIndex(clamped);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      className="flex w-full flex-col items-center gap-16 overflow-hidden px-6 pb-[102px] pt-[71px] md:px-[72px]"
      style={{
        backgroundColor: "#121212",
      }}
    >
      {/* Heading */}
      <motion.div
        className="flex flex-col items-center gap-4"
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
          amount: 0.4,
        }}
        transition={{
          duration: 0.8,
          ease,
        }}
      >
        <p className="text-center text-lg font-medium text-[#9c9c9c]">
          FLEET
        </p>

        <h2 className="max-w-[737px] text-center text-2xl uppercase text-white md:text-[28px] md:leading-[44px]">
          Our Fleet
        </h2>
      </motion.div>

      <div className="flex w-full flex-col items-start gap-10">
        {/* Categories + controls */}
        <motion.div
          className="flex w-full flex-wrap items-center justify-between gap-4"
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease,
          }}
        >
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const active =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className="relative whitespace-nowrap rounded px-[25px] py-[10px] text-lg font-semibold"
                >
                  {/* Animated active background */}
                  {active && (
                    <motion.span
                      layoutId="fleet-active-tab"
                      className="absolute inset-0 rounded bg-white"
                      transition={{
                        duration: 0.45,
                        ease,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      active
                        ? "text-black"
                        : "text-white hover:text-white/70"
                    }`}
                  >
                    {category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous car"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="flex size-[30px] items-center justify-center rounded-full bg-white disabled:cursor-default disabled:opacity-40"
            >
              <Image
                src={arrowBackIcon}
                alt=""
                width={16}
                height={16}
              />
            </motion.button>

            <motion.button
              type="button"
              onClick={handleNext}
              disabled={
                activeIndex === cars.length - 1
              }
              aria-label="Next car"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="flex size-[30px] items-center justify-center rounded-full bg-white disabled:cursor-default disabled:opacity-40"
            >
              <Image
                src={arrowBackIcon}
                alt=""
                width={16}
                height={16}
                className="rotate-180"
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="w-full"
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            transition={{
              duration: 0.4,
              ease,
            }}
          >
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex w-full snap-x snap-mandatory gap-10 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{
                scrollBehavior: "auto",
              }}
            >
              {cars.map((car, index) => (
                <CarCard
                  key={`${activeCategory}-${car.name}-${index}`}
                  car={car}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex w-full items-center justify-center gap-[11px]">
          {cars.map((_, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() =>
                scrollToIndex(index)
              }
              aria-label={`Go to car ${index + 1}`}
              animate={{
                width:
                  index === activeIndex
                    ? 69
                    : 35,
                opacity:
                  index === activeIndex
                    ? 1
                    : 0.5,
              }}
              transition={{
                duration: 0.4,
                ease,
              }}
              className="h-[5px] rounded-full bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  );
}