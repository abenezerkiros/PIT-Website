"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// TODO: download this from the Figma asset URL (it expires in ~7 days)
// and move it into /public, then point this at the local path.
const logoImage ="/logo.png"
type FooterColumn = {
  title: string;
  links: string[];
};

const columns: FooterColumn[] = [
  {
    title: "About us",
    links: ["About Premier", "Our Team", "Mission & Values", "Careers", "Blogs"],
  },
  {
    title: "Services",
    links: ["Airport Transfer", "Shuttle", "Wedding Limo", "Bus", "City Tour"],
  },
  {
    title: "Solutions",
    links: [
      "Industry Solutions",
      "Custom Solutions",
      "Case Studies",
      "Client Success",
      "Testimonials",
    ],
  },
  {
    title: "Resources",
    links: ["Blog", "Whitepapers", "Webinars", "FAQs", "Knowledge Base"],
  },
  {
    title: "Contact us",
    links: ["Get in Touch", "Support", "Sales", "Locations", "Contact Form"],
  },
  {
    title: "Connect",
    links: [
      "Newsletter",
      "Social Media",
      "Events",
      "Partnership",
      "Community Involvement",
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-black px-6 pt-10 md:px-[72px] md:pt-12">
      <div className="flex w-full flex-col gap-12 pb-12 md:gap-16 md:pb-14">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease,
          }}
          whileHover={{
            y: -3,
            transition: {
              duration: 0.4,
              ease,
            },
          }}
          className="relative h-[65px] w-[195px] sm:h-[77px] sm:w-[230px]"
        >
          <Image
            src={logoImage}
            alt="Premier International Transportation"
            fill
            className="object-contain object-left"
          />
        </motion.div>

        {/* Footer columns */}
   
      </div>

      {/* Copyright */}
      <motion.div
        className="flex w-full items-center justify-center border-t border-white/20 py-8 md:py-9"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease,
        }}
      >
        <p className="max-w-[854px] text-center text-sm leading-5 text-white/90 sm:text-base">
          Copyright &copy; {new Date().getFullYear()} Premier Transportation |
          All Rights Reserved
        </p>
      </motion.div>
    </footer>
  );
}