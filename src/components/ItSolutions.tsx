"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// TODO: download these from the Figma asset URLs (they expire in ~7 days)
// and move them into /public, then point these at local paths.
const iconPlane =
  "https://www.figma.com/api/mcp/asset/dce7c86e-72ba-4ba8-8305-1113a7e17111.png";

const iconWedding =
  "https://www.figma.com/api/mcp/asset/cf8b0e56-2e52-4bea-bfc8-79fea2d1b459.png";

const iconLimousine =
  "https://www.figma.com/api/mcp/asset/23c693f9-50bd-49e2-adc8-05468554cd7d.png";

const dividerLine =
  "https://www.figma.com/api/mcp/asset/eb21323a-9f1a-47b3-a572-e3a12721260b.svg";

type FeatureCardData = {
  icon: string;
  title: string;
  description: string;
  highlighted?: boolean;
};

const cards: FeatureCardData[] = [
  {
    icon: iconPlane,
    title: "Airport Transfers",
    description:
      "Secure a premium arrival with our high-frequency airport solutions. We prioritize flight arrival synchronization and curbside efficiency at Washington-",
  },
  {
    icon: iconWedding,
    title: "Wedding Limousine",
    description:
      "Our bridal fleet features pristine, latest-model interiors designed for grand entrances. We manage all venue schedules and group logistics to guarantee",
    highlighted: true,
  },
  {
    icon: iconPlane,
    title: "Private Aviation",
    description:
      "We provide exclusive tarmac-side coordination and FBO logistics for elite travelers. Our chauffeurs synchronize arrivals with private flight manifests",
  },
  {
    icon: iconLimousine,
    title: "DC Chauffeur Service",
    description:
      "Navigate the Capital Beltway with professional drivers who specialize in executive roadshows. PitDrives delivers secure, hourly as-directed transport for high-",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function FeatureCard({
  icon,
  title,
  description,
  highlighted,
}: FeatureCardData) {
  return (
    <motion.div
      className={`group relative flex h-full min-h-[390px] w-full flex-col items-start gap-10 rounded-xl bg-white/5 px-5 py-6 transition-[background-color,border-color,box-shadow] duration-500 ease-out sm:min-h-[400px] lg:min-h-[390px] ${
        highlighted
          ? "border border-transparent hover:border-white/70"
          : "border border-transparent"
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease,
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.45,
          ease,
        },
      }}
    >
      {/* Very subtle hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-white/[0.025] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <motion.div
        className="relative z-10 size-20 shrink-0 overflow-hidden rounded-[30px]"
        whileHover={{
          y: -3,
          rotate: -2,
          scale: 1.04,
        }}
        transition={{
          duration: 0.5,
          ease,
        }}
      >
        <Image
          src={icon}
          alt=""
          width={54}
          height={54}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      </motion.div>

      <div className="relative z-10 flex flex-1 flex-col items-start gap-8">
        {/* Title */}
        <p
          className="bg-clip-text text-2xl font-semibold leading-tight tracking-wide text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(118deg, rgb(255,255,255) 26.306%, rgba(255,255,255,0.4) 110.92%)",
          }}
        >
          {title}
        </p>

        {/* Divider */}
        <motion.div
          className="relative h-px w-[120px]"
          initial={{ scaleX: 0.7, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease,
          }}
        >
          <Image
            src={dividerLine}
            alt=""
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Description */}
        <p className="max-w-[264px] text-lg leading-7 tracking-wide text-white/95">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ItSolutions() {
  return (
    <section className="flex w-full justify-center bg-[#011638] px-6 pb-[90px] pt-6 sm:pb-[110px] md:px-[72px] md:pb-[120px]">
      <div className="w-full max-w-[1280px]">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="w-full"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.75,
                delay: index * 0.08,
                ease,
              }}
            >
              <FeatureCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}