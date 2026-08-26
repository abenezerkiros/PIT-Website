"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// TODO: download these from the Figma asset URLs (they expire in ~7 days)
// and move them into /public, then point these at local paths.
const avatarImage =
  "https://www.figma.com/api/mcp/asset/af85e13c-b65b-4265-8ef9-d2be4111ebbe.png";

const arrowLeftIcon =
  "https://www.figma.com/api/mcp/asset/a74ba5a1-fde0-4cec-bc24-71011877e884.svg";

const arrowRightIcon =
  "https://www.figma.com/api/mcp/asset/1b6487e1-d927-423e-ba7b-c4ffb3f9b3ab.svg";

const fiveStarRating =
  "https://www.figma.com/api/mcp/asset/b5193064-fd28-456a-baaf-c3e564945101.svg";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: string;
};

const sharedQuote =
  "Lorem ipsum dolor sit amet consectetur. Ultrices vel pretium placerat odio massa. Lorem duis rhoncus platea facilisis nunc. Rhoncus blandit nisl faucibus molestie sed libero aliquet. Feugiat accumsan odio laoreet hendrerit blandit pellentesque nunc integer leo.";

const testimonials: Testimonial[] = Array.from({ length: 8 }, () => ({
  quote: sharedQuote,
  name: "Joseph Cole",
  role: "CEO",
  avatar: avatarImage,
  rating: fiveStarRating,
}));

const CARD_WIDTH = 345;
const CARD_GAP = 52;

const ease = [0.22, 1, 0.36, 1] as const;

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      className="relative shrink-0 snap-start"
      style={{ width: CARD_WIDTH }}
      initial={{
        opacity: 0,
        y: 18,
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
        duration: 0.7,
        delay: Math.min(index * 0.06, 0.3),
        ease,
      }}
    >
      <motion.div
        whileHover={{
          y: -5,
        }}
        transition={{
          duration: 0.45,
          ease,
        }}
        className="relative flex flex-col gap-5 rounded-2xl bg-white px-7 py-7 pb-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
      >
        <p className="text-lg leading-[1.65] text-[#696969]">
          {testimonial.quote}
        </p>

        <Image
          src={testimonial.rating}
          alt="5 star rating"
          width={128}
          height={25}
        />

        {/* Speech bubble tail */}
        <div className="absolute -bottom-3 left-10 h-6 w-6 rotate-45 bg-white" />
      </motion.div>

      {/* Client information */}
      <div className="mt-7 flex items-center gap-4 pl-4">
        <motion.div
          className="relative size-[64px] shrink-0 overflow-hidden rounded-full"
          whileHover={{
            scale: 1.04,
          }}
          transition={{
            duration: 0.35,
            ease,
          }}
        >
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </motion.div>

        <div>
          <p className="text-xl font-bold text-black">
            {testimonial.name}
          </p>

          <p className="text-sm font-medium text-[#696969]">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;

    if (!container) return;

    const clamped = Math.max(
      0,
      Math.min(index, testimonials.length - 1)
    );

    container.scrollTo({
      left: clamped * (CARD_WIDTH + CARD_GAP),
      behavior: "smooth",
    });

    setActiveIndex(clamped);
  }, []);

  const handleScroll = () => {
    const container = scrollRef.current;

    if (!container) return;

    const index = Math.round(
      container.scrollLeft / (CARD_WIDTH + CARD_GAP)
    );

    const clamped = Math.max(
      0,
      Math.min(index, testimonials.length - 1)
    );

    setActiveIndex(clamped);
  };

  return (
    <section className="flex w-full flex-col items-center justify-center gap-16 overflow-hidden bg-white px-6 py-[110px] md:px-[72px] md:py-[120px]">
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
          amount: 0.3,
        }}
        transition={{
          duration: 0.8,
          ease,
        }}
      >
        <p className="text-center text-lg font-medium text-[#9c9c9c]">
          Testimonials
        </p>

        <h2 className="max-w-[772px] text-center text-2xl uppercase text-black md:text-[28px] md:leading-[44px]">
          Voices of Trust: Client Stories, Testimonials that Illuminate Our
          Shared Success.
        </h2>

        <motion.div
          className="flex flex-col items-center gap-2 pt-2"
          initial={{
            opacity: 0,
            y: 8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease,
          }}
        >
          <p className="text-center font-serif text-3xl font-bold capitalize text-[#010101] md:text-5xl">
            We&rsquo;re as good as they say we are
          </p>

          <motion.div
            className="h-[3px] w-[75px] bg-[#fdc65c]"
            initial={{
              width: 0,
            }}
            whileInView={{
              width: 75,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Slider */}
      <div className="flex w-full max-w-[1296px] flex-col items-center gap-10">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full snap-x snap-mandatory gap-[52px] overflow-x-auto scroll-smooth pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          className="flex items-center gap-4"
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease,
          }}
        >
          <motion.button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous testimonials"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.3,
              ease,
            }}
            className="flex size-11 items-center justify-center rounded-full border border-black/20 transition-colors duration-300 hover:border-black/50 disabled:pointer-events-none disabled:opacity-30"
          >
            <Image
              src={arrowLeftIcon}
              alt=""
              width={20}
              height={20}
              className="rotate-90"
            />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={
              activeIndex === testimonials.length - 1
            }
            aria-label="Next testimonials"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.3,
              ease,
            }}
            className="flex size-11 items-center justify-center rounded-full border border-black/20 transition-colors duration-300 hover:border-black/50 disabled:pointer-events-none disabled:opacity-30"
          >
            <Image
              src={arrowRightIcon}
              alt=""
              width={20}
              height={20}
                className="-rotate-90"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}