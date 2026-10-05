"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/pitdrives",
    icon: "twitter",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/PitDrives/",
    icon: "facebook",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/premier-international-transportation/",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/pitdrives/",
    icon: "instagram",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCHs70M4yAQCRipDzzSQNq_g",
    icon: "youtube",
  },
  {
    name: "Yelp",
    href: "https://www.yelp.com/biz/premier-international-transportation-washington-dc",
    icon: "yelp",
  },
] as const;

type SocialIconName = (typeof socialLinks)[number]["icon"];

function SocialIcon({ name }: { name: SocialIconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      {name === "twitter" && (
        <path d="M23.95 4.57a10 10 0 0 1-2.82.78 4.93 4.93 0 0 0 2.16-2.72 9.99 9.99 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.38 4.48A13.98 13.98 0 0 1 1.64 3.16a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83 4.93 4.93 0 0 1-2.22.08 4.94 4.94 0 0 0 4.6 3.42A9.88 9.88 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.06 0 14.01-7.5 14.01-14.01l-.02-.64a10 10 0 0 0 2.46-2.55Z" />
      )}

      {name === "facebook" && (
        <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1 .3-1.75 1.75-1.75H17V2.3c-.3-.04-1.35-.13-2.6-.13-2.58 0-4.4 1.58-4.4 4.48V9.5H7V13h3v9h3.5Z" />
      )}

      {name === "linkedin" && (
        <>
          <path d="M3 8h4v13H3zM9.5 8h3.8v1.8h.05C13.88 8.79 15.17 7.7 17.05 7.7c3.96 0 4.7 2.6 4.7 5.98V21h-4v-6.49c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V21H9.5V8Z" />
          <circle cx="5" cy="4" r="2.2" />
        </>
      )}

      {name === "instagram" && (
        <>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="17.5" cy="6.5" r="1" />
        </>
      )}

      {name === "youtube" && (
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.4.5A3 3 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12a31.9 31.9 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.85.5 9.4.5 9.4.5s7.55 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.9 31.9 0 0 0 24 12a31.9 31.9 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      )}

      {name === "yelp" && (
        <g transform="translate(1 1) scale(.88)">
          <path d="m12.1 10.8-3-8.1c-.2-.6.1-1.2.7-1.4L13.3.2c.7-.2 1.3.3 1.3 1l-.4 9.2c0 1.1-1.7 1.4-2.1.4Zm-2.2 3.4-7-2.3c-.6-.2-.9-.9-.6-1.5l1.5-3c.3-.6 1.1-.8 1.6-.3l5.6 4.9c.8.8 0 2.6-1.1 2.2Zm.8 3.1-4.4 5.9c-.4.5-1.2.6-1.6.1l-2.3-2.5c-.5-.5-.3-1.3.3-1.6l6.5-3.7c1-.5 2.2.9 1.5 1.8Zm4.2-.6 4.5 5.9c.4.5.1 1.3-.5 1.5l-3.3 1c-.7.2-1.3-.3-1.3-.9l-.9-7.4c-.1-1.1 1-1.1 1.5-.1Zm1.1-4.9 6.5-3.6c.6-.3 1.3 0 1.5.6l.9 3.3c.2.7-.3 1.3-1 1.3l-7.4.4c-1.1.1-1.5-1.5-.5-2Z" />
        </g>
      )}
    </svg>
  );
}

const linkClass =
  "transition-colors duration-200 hover:text-[#d5bc89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b7a071] motion-reduce:transition-none";

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="w-full overflow-hidden bg-black px-6 pt-12 text-white md:px-[72px] md:pt-16">
      <div className="mx-auto w-full max-w-[1440px]">
        <motion.div
          className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 sm:gap-12 md:pb-16 lg:grid-cols-[1fr_1.2fr_0.8fr] lg:gap-16"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease }}
        >
          {/* Logo */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#top"
              aria-label="Premier International Transportation — back to top"
              className="relative block h-[77px] w-[230px] max-w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b7a071]"
            >
              <Image
                src="/logo.png"
                alt="Premier International Transportation"
                fill
                sizes="230px"
                className="object-contain object-left"
              />
            </a>
          </div>

          {/* Contact details */}
          <div>
            <h2
              className="mb-6 text-[12px] font-medium uppercase tracking-[0.2em] text-[#b7a071]"
              style={{
                fontFamily: "var(--font-body), Arial, sans-serif",
              }}
            >
              Contact details
            </h2>

            <address className="flex flex-col items-start gap-2 text-[15px] not-italic leading-7 text-white/70">
              <a
                href="https://maps.app.goo.gl/RPR8BWbtPZzaEvzL8"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-start gap-3 ${linkClass}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[#b7a071]"
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                <span>
                  1250 Connecticut Ave NW Ste 700
                  <br />
                  Washington, DC 20036
                </span>
              </a>

              <a
                href="tel:+12029990346"
                className={`inline-flex items-center gap-3 py-1 ${linkClass}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 text-[#b7a071]"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z" />
                </svg>

                <span>(202) 999-0346</span>
              </a>

              <a
                href="mailto:info@pitdrives.com"
                className={`inline-flex items-center gap-3 py-1 ${linkClass}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 text-[#b7a071]"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <span>Info@pitdrives.com</span>
              </a>
            </address>
          </div>

          {/* Social icons */}
          <div>
            <h2
              className="mb-6 text-[12px] font-medium uppercase tracking-[0.2em] text-[#b7a071]"
              style={{
                fontFamily: "var(--font-body), Arial, sans-serif",
              }}
            >
              Follow us now
            </h2>

            <nav
              aria-label="Premier social media"
              className="-ml-3 flex flex-wrap items-center gap-1"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} (opens in a new tab)`}
                  title={social.name}
                  className="inline-flex h-[44px] w-[44px] items-center justify-center rounded text-[#b7a071] transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7a071] motion-reduce:transition-none"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="border-t border-white/15 py-6 pl-2 pr-16 md:py-7 md:pl-0 md:pr-0">
          <p className="text-center text-[12px] leading-6 text-white/45 sm:text-[13px]">
            Copyright &copy; {new Date().getFullYear()} Premier
            Transportation
            <span className="mx-2 text-white/25">|</span>
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}