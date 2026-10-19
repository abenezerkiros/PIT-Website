"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
const BOOKING_URL = "https://book.mylimobiz.com/v4/pittransportation";
const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Fleet", href: "/#fleet" },
  { label: "Partners", href: "/#partners" },
  { label: "Contact", href: "/#contact" },
];

const serviceLinks = [
  {
    label: "Executive Mobility",
    href: "/executives",
    description: "Prepared for today’s global leaders.",
  },
  {
    label: "Hotel Partnerships",
    href: "/hotels",
    description: "Gracious mobility for distinguished hotels.",
  },
  {
    label: "Corporate Mobility",
    href: "/corporate",
    description: "Roadshows, conferences, and corporate events.",
  },
];

function ServicesMenu({
  mobile = false,
  onNavigate,
  onOpenChange,
}: {
  mobile?: boolean;
  onNavigate: () => void;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = mobile ? "mobile-services-links" : "desktop-services-links";

  function toggle(next: boolean) {
    setOpen(next);
    onOpenChange?.(next);
  }

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setOpen(false);
        onOpenChange?.(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        onOpenChange?.(false);
        triggerRef.current?.focus();
      }
    }
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    function onBreakpoint() {
      setOpen(false);
      onOpenChange?.(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    breakpoint.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      breakpoint.removeEventListener("change", onBreakpoint);
    };
  }, [open, onOpenChange]);

  return (
    <div
      ref={rootRef}
      className={mobile ? "border-b border-white/[0.06]" : "relative"}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          toggle(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => toggle(!open)}
        className={`inline-flex items-center gap-2 px-2 text-[16px] font-medium uppercase tracking-[0.06em] text-[#b7a071] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227] ${mobile ? "min-h-[50px] w-full justify-between" : "min-h-[44px] whitespace-nowrap leading-none"}`}
      >
        Services
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          id={panelId}
          className={
            mobile
              ? "mb-3 ml-2 border-l border-[#b7a071]/40 pl-3"
              : "absolute left-0 top-full z-50 w-[300px] rounded-sm border border-[#b7a071]/25 bg-[#111210] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          }
        >
          {serviceLinks.map((service) => (
            <a
              key={service.href}
              href={service.href}
              onClick={() => {
                toggle(false);
                onNavigate();
              }}
              className="group block rounded-sm px-4 py-3 transition-colors hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a227]"
            >
              <span className="flex items-center justify-between gap-4 text-[15px] font-medium text-[#d5bc89] group-hover:text-white">
                {service.label}
                <span aria-hidden="true">↗</span>
              </span>
              <span className="mt-1 block text-xs leading-5 text-white/55">
                {service.description}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function PhoneLink({
  expanded = false,
  onClick,
}: {
  expanded?: boolean;
  onClick: () => void;
}) {
  return (
    <a
      href="tel:+18884129150"
      aria-label="Call Premier at +1-888-412-9150"
      onClick={onClick}
      className={`group inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center gap-2.5 text-[#b7a071] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227] motion-reduce:transition-none ${
        expanded
          ? "mt-4 w-full rounded-md px-2 py-3 hover:bg-white/5"
          : "justify-center rounded-full border border-[#b7a071]/25 hover:border-[#b7a071]/60 md:justify-start md:rounded-none md:border-0"
      }`}
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z" />
      </svg>
      <span
        className={`${expanded ? "flex" : "hidden md:flex"} flex-col gap-1`}
      >
        <span className="text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-white/45">
          Call Premier
        </span>
        <span
          className={`${expanded ? "text-[16px]" : "text-[14px]"} whitespace-nowrap font-medium leading-5 tracking-[0.02em] text-white/85 transition-colors group-hover:text-[#d5bc89]`}
        >
          +1-888-412-9150
        </span>
      </span>
    </a>
  );
}

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
      <span className="relative z-10 whitespace-nowrap">RESERVE NOW</span>
    </a>
  );
}
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
        isHidden && !isMobileMenuOpen && !isServicesOpen
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
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="relative block h-[62px] w-[min(168px,42vw)] shrink-0 sm:w-[186px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227] lg:h-[74px] lg:w-[222px]"
        >
          <Image
            src="/logo.png"
            alt="Premier International Transportation"
            fill
            sizes="(min-width: 1024px) 222px, (min-width: 640px) 186px, 168px"
            className="object-contain object-left"
            priority
          />
        </a>
        {/* Desktop links */}
        <div className="hidden items-center gap-3 xl:flex 2xl:gap-5">
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <ServicesMenu
                key="services"
                onOpenChange={setIsServicesOpen}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-[44px] items-center whitespace-nowrap px-2 text-[16px] font-medium uppercase leading-none tracking-[0.06em] text-[#b7a071] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227]"
              >
                {link.label}
              </a>
            ),
          )}
        </div>
        {/* Phone, reservation button and mobile toggle */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <PhoneLink onClick={() => setIsMobileMenuOpen(false)} />

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
                isMobileMenuOpen ? "rotate-45" : "-translate-y-[7px]"
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
                isMobileMenuOpen ? "-rotate-45" : "translate-y-[7px]"
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
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <ServicesMenu
                key="services"
                mobile
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-[50px] items-center border-b border-white/[0.06] px-2 text-[16px] font-medium uppercase tracking-[0.06em] text-[#b7a071] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a227]"
              >
                {link.label}
              </a>
            ),
          )}
          <PhoneLink expanded onClick={() => setIsMobileMenuOpen(false)} />
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
