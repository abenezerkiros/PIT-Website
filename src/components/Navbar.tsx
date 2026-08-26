"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// TODO: download this from the Figma asset URL (it expires in ~7 days)
// and move it into /public, then point this at the local path.
const logoImage =
  "https://www.figma.com/api/mcp/asset/dcd7357a-3558-4c66-b5c6-5d8fd7ba61d2.png";

const navLinks = [
  { label: "Airport", href: "#airport" },
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Shuttle Service", href: "#shuttle" },
];

const BOOKING_URL = "https://book.mylimobiz.com/v4/pittransportation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const SCROLL_THRESHOLD = 20;
    const HIDE_THRESHOLD = 120;
    const DIRECTION_THRESHOLD = 8;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const previousY = lastScrollY.current;
        const delta = currentY - previousY;

        // Switch to the translucent navbar after leaving the top.
        const scrolled = currentY > SCROLL_THRESHOLD;

        setIsScrolled((current) =>
          current === scrolled ? current : scrolled
        );

        // Always show the navbar near the top.
        if (currentY < HIDE_THRESHOLD) {
          setIsHidden(false);
        }
        // Ignore tiny movements caused by Lenis/smooth-scroll settling.
        else if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
          if (delta > 0) {
            // Meaningfully scrolling down.
            setIsHidden(true);
          } else {
            // Meaningfully scrolling up.
            setIsHidden(false);
          }

          lastScrollY.current = currentY;
        }

        ticking = false;
      });
    };

    lastScrollY.current = window.scrollY;

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,backdrop-filter,padding,box-shadow,transform] duration-[350ms] ease-out ${
        isScrolled
          ? "bg-black/70 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "bg-black py-4"
      } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="flex items-center justify-between px-6 md:px-[72px]">
        <a
          href="#top"
          className={`relative shrink-0 transition-all duration-500 ease-out ${
            isScrolled ? "h-11 w-[132px]" : "h-14 w-[168px]"
          }`}
        >
          <Image
            src={logoImage}
            alt="Premier International Transportation"
            fill
            className="object-contain object-left"
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center justify-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="p-2.5 text-lg uppercase text-white/80 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop booking */}
        <a
  href={BOOKING_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="hidden shrink-0 items-center justify-center rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black md:flex"
>
  Online Booking
</a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="relative flex size-9 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />

          <span
            className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />

          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out md:hidden ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-start gap-1 bg-black/90 px-6 pb-6 pt-2 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 text-lg uppercase text-white/80 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-3 flex w-full items-center justify-center rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white"
          >
            Online Booking
          </a>
        </div>
      </div>
    </header>
  );
}