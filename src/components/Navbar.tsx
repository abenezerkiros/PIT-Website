"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const BOOKING_URL =
  "https://book.mylimobiz.com/v4/pittransportation";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

function ReserveButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`reserve-button relative isolate min-h-[44px] shrink-0 items-center justify-center overflow-hidden rounded-sm px-5 py-3 text-[13px] font-semibold leading-5 tracking-[0.06em] ${className}`}
    >
      <span
        aria-hidden="true"
        className="reserve-shine pointer-events-none absolute inset-y-0"
      />
      <span className="relative z-10 whitespace-nowrap">
        RESERVE NOW
      </span>
    </a>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY.current;

      setIsScrolled(currentY > 20);

      if (currentY < 120) {
        setIsHidden(false);
        lastScrollY.current = currentY;
      } else if (Math.abs(delta) >= 8) {
        setIsHidden(delta > 0);
        lastScrollY.current = currentY;
      }

      frame = null;
    };

    const handleScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(update);
      }
    };

    lastScrollY.current = window.scrollY;
    update();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // Allow enough space for the logo, links, and reservation button.
    const desktop = window.matchMedia("(min-width: 1280px)");

    const closeOnDesktop = () => {
      if (desktop.matches) setIsMobileMenuOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow,transform] duration-300 ease-out motion-reduce:transition-none ${
        isScrolled || isMobileMenuOpen
          ? "bg-black/90 shadow-[0_6px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl"
          : "bg-black"
      } ${
        isHidden && !isMobileMenuOpen
          ? "-translate-y-full"
          : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[78px] w-full max-w-[1600px] items-center justify-between gap-4 px-5 md:px-8 lg:h-[90px] lg:px-12 xl:px-[72px]"
      >
        {/* Logo */}
        <a
          href="#top"
          onClick={() => setIsMobileMenuOpen(false)}
          className="relative block h-[62px] w-[186px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227] lg:h-[74px] lg:w-[222px]"
        >
          <Image
            src="/logo.png"
            alt="Premier International Transportation"
            fill
            sizes="(min-width: 1024px) 222px, 186px"
            className="object-contain object-left"
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-3 xl:flex 2xl:gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center whitespace-nowrap px-2 text-[16px] font-medium uppercase leading-none tracking-[0.06em] text-[#b7a071] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Reservation button and mobile toggle */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <ReserveButton className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="premier-mobile-menu"
            className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a227] xl:hidden"
          >
            <span
              aria-hidden="true"
              className={`absolute h-[2px] w-[24px] bg-current transition-transform duration-300 motion-reduce:transition-none ${
                isMobileMenuOpen
                  ? "rotate-45"
                  : "-translate-y-[7px]"
              }`}
            />

            <span
              aria-hidden="true"
              className={`absolute h-[2px] w-[24px] bg-current transition-opacity duration-200 motion-reduce:transition-none ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              aria-hidden="true"
              className={`absolute h-[2px] w-[24px] bg-current transition-transform duration-300 motion-reduce:transition-none ${
                isMobileMenuOpen
                  ? "-rotate-45"
                  : "translate-y-[7px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <nav
          id="premier-mobile-menu"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-78px)] overflow-y-auto border-t border-white/10 bg-black/95 px-5 py-4 shadow-xl backdrop-blur-xl md:px-8 lg:max-h-[calc(100dvh-90px)] xl:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex min-h-[50px] items-center border-b border-white/[0.06] px-2 text-[16px] font-medium uppercase tracking-[0.06em] text-[#b7a071] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a227]"
            >
              {link.label}
            </a>
          ))}

          <ReserveButton
            className="mt-5 flex w-full sm:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </nav>
      )}

      <style jsx global>{`
        .reserve-button {
          background-color: #806b43;
          color: #ffffff;
          transition:
            background-color 350ms ease,
            color 250ms ease;
        }

        .reserve-button:focus-visible {
          background-color: #a38d65;
          color: #080808;
          outline: 2px solid #d5bc89;
          outline-offset: 5px;
        }

        .reserve-button .reserve-shine {
          left: -40%;
          width: 30%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 8%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.2) 92%,
            transparent 100%
          );
          transform: translateX(0) skewX(-25deg);
          transition: transform 400ms cubic-bezier(0.45, 0, 0.55, 1);
        }

        @media (hover: hover) {
          .reserve-button:hover {
            background-color: #a38d65;
            color: #080808;
          }

          .reserve-button:hover .reserve-shine {
            transform: translateX(500%) skewX(-25deg);
          }
        }

        .reserve-button:focus-visible .reserve-shine {
          transform: translateX(500%) skewX(-25deg);
        }

        @media (prefers-reduced-motion: reduce) {
          .reserve-button {
            transition: none;
          }

          .reserve-button .reserve-shine {
            display: none;
            transition: none;
          }
        }
      `}</style>
    </header>
  );
}