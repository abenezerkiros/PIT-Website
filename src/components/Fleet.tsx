"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Category = "All" | "Individual Travel" | "Group Travel";

type Vehicle = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  category: Exclude<Category, "All">;
  image: string;
};

// Update these paths to match your vehicle images in /public.
const vehicles: Vehicle[] = [
  {
    id: "s-class",
    name: "Mercedes-Benz S-Class",
    tagline: "The Pinnacle of Private Travel",
    description:
      "The most elite sedan in our fleet. Absolute privacy, silence, and executive-grade comfort.",
    bestFor: "High-security transfers, CEO travel, diplomatic missions.",
    category: "Individual Travel",
    image: "/mercedes-s-class.png",
  },
  {
    id: "escalade",
    name: "Cadillac Escalade",
    tagline: "The Commanding SUV",
    description:
      "Presence and protection, with the space and elevation of a full-size vehicle.",
    bestFor: "Executive mobility, entertainment, family travel.",
    category: "Individual Travel",
    image: "/cadillac-escalade.png",
  },
  {
    id: "suburban",
    name: "Chevy Suburban",
    tagline: "The Discreet Protector",
    description:
      "Favored by security teams for its capability and low profile. Spacious, secure, unshakeable.",
    bestFor: "Security details, support vehicles, long-distance transfers.",
    category: "Individual Travel",
    image: "/chevy-suburban.png",
  },
  {
    id: "e-class",
    name: "Mercedes E-Class",
    tagline: "The Quiet Professional",
    description:
      "A classic European sedan. Clean, comfortable, and understated.",
    bestFor: "Business travel, point-to-point transfers, concierge service.",
    category: "Individual Travel",
    image: "/mercedes-e-class.png",
  },
  {
    id: "sprinter",
    name: "Mercedes Sprinter Van",
    tagline: "The Mobile Boardroom",
    description:
      "Configured for group productivity or group comfort. Ample luggage, flexible seating.",
    bestFor: "Corporate roadshows, delegations, production teams.",
    category: "Group Travel",
    image: "/sprinter-van.png",
  },
  {
    id: "mini-bus",
    name: "28-Passenger Mini Bus",
    tagline: "The Coordinated Movement",
    description:
      "When an entire group must arrive together, on time, and in order.",
    bestFor: "Corporate events, conferences, group airport transfers.",
    category: "Group Travel",
    image: "/mini-bus.png",
  },
  {
    id: "bus",
    name: "40-Passenger Bus",
    tagline: "The Command Carrier",
    description:
      "Built for scale, and for the kind of logistics that make a large event feel effortless.",
    bestFor: "Corporate events, conferences, wedding parties.",
    category: "Group Travel",
    image: "/mini-bus.png",
  },
  {
    id: "coach",
    name: "55-Passenger Coach Bus",
    tagline: "The Full Assembly",
    description:
      "For multi-day programs and full delegations that move together from arrival to departure.",
    bestFor: "Full delegations, conference shuttles, multi-day programs.",
    category: "Group Travel",
    image: "/charter-bus.png",
  },
];

const categories: Category[] = [
  "All",
  "Individual Travel",
  "Group Travel",
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`size-5 ${className}`}
    >
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  const open = hovered || expanded;
  const duration = reduceMotion ? 0 : 1.2;
  const detailsId = `fleet-details-${vehicle.id}`;

  return (
    <motion.article
      data-vehicle-card
      className="relative isolate h-[540px] w-full shrink-0 snap-start overflow-hidden rounded-[20px] bg-[#efefef] sm:h-[490px] sm:w-[580px] lg:w-[620px]"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      animate={{ y: open && !reduceMotion ? -4 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease }}
    >
      {/* Vehicle image */}
      <motion.div
        className="absolute inset-x-5 bottom-16 top-32 sm:inset-x-10"
        animate={{
          scale: open && !reduceMotion ? 1.035 : 1,
        }}
        transition={{ duration, ease }}
      >
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 639px) 90vw, 620px"
          className="object-contain"
        />
      </motion.div>

      {/* Black gradient rises slowly from the bottom */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.99) 48%, rgba(5,5,5,0.94) 75%, rgba(5,5,5,0.88) 100%)",
        }}
        initial={false}
        animate={{ y: open ? "0%" : "101%" }}
        transition={{ duration, ease }}
      />

      {/* Vehicle name */}
      <div className="absolute inset-x-0 top-0 z-20 p-6 sm:p-8">
        <p
          className={`mb-3 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 motion-reduce:transition-none ${
            open ? "text-white/55" : "text-black/50"
          }`}
        >
          {vehicle.category}
        </p>

        <h3
          className={`text-2xl font-medium leading-tight tracking-[-0.025em] transition-colors duration-500 motion-reduce:transition-none sm:text-[28px] ${
            open ? "text-white" : "text-[#161616]"
          }`}
        >
          {vehicle.name}
        </h3>
      </div>

      {/* Revealed description */}
      <motion.div
        id={detailsId}
        aria-hidden={!open}
        className="absolute inset-x-0 bottom-[88px] z-20 px-6 sm:px-8"
        style={{ pointerEvents: open ? "auto" : "none" }}
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          y: open || reduceMotion ? 0 : 24,
          visibility: open ? "visible" : "hidden",
        }}
        transition={{
          opacity: {
            duration: reduceMotion ? 0 : 0.3,
            delay: open && !reduceMotion ? 0.18 : 0,
          },
          y: {
            duration: reduceMotion ? 0 : 0.5,
            delay: open && !reduceMotion ? 0.12 : 0,
            ease,
          },
          visibility: {
            delay: open || reduceMotion ? 0 : 0.3,
          },
        }}
      >
        <p className="text-xl font-medium leading-snug tracking-[-0.02em] text-white sm:text-2xl">
          {vehicle.tagline}
        </p>

        <div
          aria-hidden="true"
          className="my-5 h-px w-14 bg-[#c9a227]/70"
        />

        <p className="max-w-[480px] text-base leading-7 text-white/75">
          {vehicle.description}
        </p>

        <div className="mt-5">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#d6b65b]">
            Best for
          </p>

          <p className="max-w-[470px] text-sm leading-6 text-white/65">
            {vehicle.bestFor}
          </p>
        </div>
      </motion.div>

      {/* Touch and keyboard access */}
      <button
  type="button"
  aria-expanded={open}
  aria-controls={detailsId}
  aria-label={`${open ? "Hide" : "View"} details for ${vehicle.name}`}
  onClick={() => {
    if (open) {
      setExpanded(false);
      setHovered(false);
    } else {
      setExpanded(true);
    }
  }}
  className={`absolute bottom-5 right-6 z-30 inline-flex min-h-11 items-center gap-3 rounded-sm px-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227] sm:right-8 ${
    open ? "text-[#dfbf64]" : "text-[#806315]"
  }`}
>
  <span>{open ? "Hide details" : "View details"}</span>

  <span
    aria-hidden="true"
    className={`flex size-8 items-center justify-center rounded-full border ${
      open ? "border-[#c9a227]/50" : "border-[#806315]/30"
    }`}
  >
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className="size-4"
    >
      <path d="M4 10h12" />
      {!open && <path d="M10 4v12" />}
    </svg>
  </span>
</button>
    </motion.article>
  );
}

function VehicleSlider({ items }: { items: Vehicle[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateControls = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;

      setCanPrev(container.scrollLeft > 2);
      setCanNext(container.scrollLeft < maxScroll - 2);
    };

    updateControls();

    const observer = new ResizeObserver(updateControls);
    observer.observe(container);

    container.addEventListener("scroll", updateControls, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", updateControls);
    };
  }, []);

  function move(direction: -1 | 1) {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-vehicle-card]")
    );

    if (!cards.length) return;

    const origin = cards[0].offsetLeft;
    const positions = cards.map((card) => card.offsetLeft - origin);
    const current = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    const target =
      direction === 1
        ? positions.find((position) => position > current + 4) ?? maxScroll
        : [...positions]
            .reverse()
            .find((position) => position < current - 4) ?? 0;

    container.scrollTo({
      left: Math.max(0, Math.min(target, maxScroll)),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <div>
      <div
        ref={scrollRef}
        role="region"
        aria-label="Fleet vehicles"
        tabIndex={0}
        className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 pt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs tracking-wide text-white/50">
          {items.length} vehicles · Scroll to explore
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!canPrev}
            aria-label="Previous vehicles"
            className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-25"
          >
            <Arrow className="rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => move(1)}
            disabled={!canNext}
            aria-label="Next vehicles"
            className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-25"
          >
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Fleet({
  contactHref = "/contact",
}: {
  contactHref?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const reduceMotion = useReducedMotion();

  const visibleVehicles =
    activeCategory === "All"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.category === activeCategory);

  return (
    <section
      aria-labelledby="fleet-heading"
      className="overflow-hidden bg-[#121212] px-6 py-20 text-white md:px-[72px] md:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Introduction */}
        <motion.div
          className="mx-auto max-w-[780px] text-center"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease }}
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-white/50">
            Our Vehicles
          </p>

          <h2
            id="fleet-heading"
            className="text-4xl font-medium leading-tight tracking-[-0.035em] md:text-5xl lg:text-6xl"
          >
            Our World Class Fleet
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] text-lg leading-8 text-white/65">
            Every vehicle is chosen for a reason and prepared to the same
            standard. Explore what&apos;s available for your journey.
          </p>
        </motion.div>

        {/* Original tab styling, aligned left */}
        <div
          role="group"
          aria-label="Filter vehicles by travel type"
          className="mb-8 mt-12 flex flex-wrap items-center justify-start gap-2 md:mt-16"
        >
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category)}
                className="relative whitespace-nowrap rounded px-[25px] py-[10px] text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {active && (
                  <motion.span
                    layoutId="fleet-active-tab"
                    className="absolute inset-0 rounded bg-white"
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      ease,
                    }}
                  />
                )}

                <span
                  className={`relative z-10 uppercase transition-colors duration-300 ${
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

        {/* Fleet carousel */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease }}
          >
            <VehicleSlider items={visibleVehicles} />
          </motion.div>
        </AnimatePresence>

        {/* Conversation invitation */}
        <div className="mt-14 flex flex-col items-start justify-between gap-7 border-t border-white/15 pt-10 md:mt-20 lg:flex-row lg:items-center lg:gap-12">
          <p className="max-w-[700px] text-xl leading-relaxed tracking-[-0.015em] text-white/80 md:text-2xl">
            Let our client experience team help you decide which vehicle is
            right for your journey!
          </p>

          <a
            href={contactHref}
            className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-6 rounded-sm border border-[#c9a227]/60 px-7 py-4 text-sm font-medium tracking-wide text-[#dfbf64] transition-colors duration-300 hover:bg-[#c9a227] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227]"
          >
            Start a Conversation
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
          </a>
        </div>
      </div>
    </section>
  );
}