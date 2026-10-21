"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Reuses the public site's existing image paths. Change only these to swap photos.
const images = {
  hero: "/ExcecutivesHero.jpg",
  chauffeur: "/ExecutivesChuffer.jpg",
  coordination: "/Coordination.jpg",
  fleet: "/ExcutiveFleet.jpg",
  closing: "/final.jpg",
};
const bookingUrl = "https://book.mylimobiz.com/v4/pittransportation";
const ease = [0.22, 1, 0.36, 1] as const;

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      className={down ? "rotate-90" : undefined}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  image = false,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  image?: boolean;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // The observed wrapper never moves. Only its child is animated.
        // Reset once fully offscreen; enter after 15% becomes visible.
        if (!entry.isIntersecting) setVisible(false);
        else if (entry.intersectionRatio >= 0.15) setVisible(true);
      },
      { threshold: [0, 0.15] },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [reduced]);

  const shown = reduced || visible;
  return (
    <div ref={ref} className={className}>
      <motion.div
        className={image ? "absolute inset-0" : "w-full min-w-0"}
        initial={false}
        animate={{
          opacity: shown ? 1 : 0,
          x: shown || direction === "up" ? 0 : direction === "left" ? -90 : 90,
          y: shown ? 0 : direction === "up" ? 90 : 25,
          scale: shown ? 1 : 0.96,
        }}
        transition={{
          duration: reduced ? 0 : shown ? 1.15 : 0,
          delay: shown && !reduced ? delay : 0,
          ease,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p
      className={
        "text-[9px] font-medium leading-[1.6] tracking-[0.17em] text-[#957e5e]"
      }
    >
      {children}
    </p>
  );
}

export default function ExecutiveMobility() {
  return (
    <main
      id="top"
      className={
        "overflow-x-clip bg-white text-[#171717] [font-family:var(--font-body),Arial,sans-serif] [&_h1]:font-normal [&_h2]:font-normal [&_h1]:[font-family:var(--font-heading),Georgia,serif] [&_h2]:[font-family:var(--font-heading),Georgia,serif] [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#dfbf82]"
      }
    >
      <section
        className={
          "relative isolate flex min-h-[580px] items-stretch bg-[#101112] text-white md:min-h-[min(740px,82svh)]"
        }
        aria-labelledby="executive-heading"
      >
        <div
          className={
            "pointer-events-none absolute inset-0 -z-10 [&_img]:object-[60%_48%]"
          }
          aria-hidden="true"
        >
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className={"object-cover object-center"}
          />
        </div>
        <div
          className={
            "pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.76),rgba(0,0,0,0.34)_64%,rgba(0,0,0,0.12)),linear-gradient(0deg,rgba(0,0,0,0.55),transparent_45%)]"
          }
          aria-hidden="true"
        />
        <div
          className={`${"mx-auto w-[calc(100%-48px)] max-w-[1280px] md:w-[calc(100%-72px)] xl:w-[calc(100%-112px)]"} ${"relative flex flex-col pt-7"}`}
        >
          <nav
            className={
              "flex items-center gap-3 text-[11px] text-white/60 [&_a:hover]:text-[#dfbf82]"
            }
            aria-label="Breadcrumb"
          >
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Executive mobility</span>
          </nav>
          <Reveal
            className={
              "my-auto max-w-[880px] py-16 md:pb-[60px] md:pt-[90px] [&_h1]:text-[clamp(37px,4.5vw,68px)] [&_h1]:leading-[1.12] [&_h1]:tracking-[-0.035em] [&_h1]:[text-wrap:balance] [&_h1_span]:text-[#dfc69b] [&_p]:mb-6 [&_p]:text-[#dfc69b]"
            }
          >
            <p
              className={
                "text-[10px] font-medium uppercase leading-[1.7] tracking-[0.2em] text-[#957e5e]"
              }
            >
              THE PREMIER STANDARD / EXECUTIVE MOBILITY
            </p>
            <h1 id="executive-heading">
              Executive Mobility
              <br />
              For Today’s <span>Global Leaders</span>
            </h1>
            <div
              className={
                "mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7"
              }
            >
              <a
                className={
                  "inline-flex min-h-[50px] items-center justify-between gap-6 border border-[#a59067] bg-[#806b43] px-6 py-[15px] text-[11px] font-semibold uppercase leading-relaxed tracking-[0.09em] text-white transition-colors hover:bg-[#a38d65] [&_svg]:shrink-0"
                }
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reserve now
                <Arrow />
              </a>
              <a
                className={
                  "inline-flex items-center gap-4 border-b border-white/30 py-2.5 text-xs"
                }
                href="/#contact"
              >
                Speak with our team
                <Arrow />
              </a>
            </div>
          </Reveal>
          <div
            className={
              "flex items-center justify-between gap-5 border-t border-white/20 py-5 [&>span]:max-w-[300px] [&>span]:text-[9px] [&>span]:leading-relaxed [&>span]:tracking-[0.15em] [&>span]:text-white/80 [&>a]:grid [&>a]:size-11 [&>a]:place-items-center"
            }
          >
            <span>YOUR PRINCIPAL. YOUR MISSION. OUR PREPARATION.</span>
            <a
              href="#executive-introduction"
              aria-label="Read about Premier executive mobility"
            >
              <Arrow down />
            </a>
          </div>
        </div>
      </section>

      <section
        id="executive-introduction"
        className={`${"mx-auto w-[calc(100%-48px)] max-w-[1280px] md:w-[calc(100%-72px)] xl:w-[calc(100%-112px)]"} ${"grid scroll-mt-28 gap-8 py-[58px] md:grid-cols-[0.65fr_1.35fr] md:gap-12 md:pb-[100px] md:pt-[90px] xl:gap-[90px]"}`}
        aria-labelledby="intro-label"
      >
        <Reveal
          className={
            "pt-2 [&_span]:hidden md:[&_span]:block [&_p:last-child]:hidden md:[&_p:last-child]:block"
          }
        >
          <p
            id="intro-label"
            className={
              "text-[10px] font-medium uppercase leading-[1.7] tracking-[0.2em] text-[#957e5e]"
            }
          >
            EXECUTIVE MOBILITY
          </p>
          <span
            className={"my-7 block h-px w-12 bg-[#957e5e]"}
            aria-hidden="true"
          />
          <p
            className={
              "text-[clamp(25px,2.4vw,35px)] leading-[1.3] tracking-[-0.025em] text-[#333] [font-family:var(--font-heading),Georgia,serif]"
            }
          >
            An extension
            <br />
            of your detail.
          </p>
        </Reveal>
        <Reveal
          direction="right"
          className={
            "[&_p+p]:mt-6 [&_p+p]:text-[15px] [&_p+p]:leading-[1.9] [&_p+p]:text-[#666]"
          }
          delay={0.12}
        >
          <p
            className={
              "text-[clamp(23px,2.1vw,30px)] leading-[1.5] tracking-[-0.025em] text-[#262626] [font-family:var(--font-heading),Georgia,serif]"
            }
          >
            At Premier, we know what executive protection demands: exacting
            preparation, with every element meticulously perfected and arranged,
            because mission success for your team and your principal is the only
            goal.
          </p>
          <p>
            Our seasoned, fully vetted chauffeurs are never a variable you have
            to manage. They work as an extension of your detail, not beside it,
            anticipating every move and adjusting quietly to your operation as
            it changes. So you can stay focused on the principal, and we stay
            one step ahead of the route. Our service is a seamless part of your
            protection mission, never a gap in it.
          </p>
        </Reveal>
      </section>

      <section
        className={"bg-[#f6f5f2] py-[50px] md:py-20"}
        aria-label="The people behind your journey"
      >
        <div
          className={`${"mx-auto w-[calc(100%-48px)] max-w-[1280px] md:w-[calc(100%-72px)] xl:w-[calc(100%-112px)]"} ${"grid items-stretch gap-[38px] md:grid-cols-[1fr_1.05fr] md:gap-11 xl:gap-20"}`}
        >
          <Reveal
            image
            direction="left"
            className={
              "relative aspect-[4/4.5] bg-[#d6d2c9] sm:aspect-[5/4] md:aspect-auto md:min-h-[620px] xl:min-h-[580px]"
            }
          >
            <Image
              src={images.chauffeur}
              alt="Premier chauffeur service"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
              className={"object-cover object-center"}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
            />
            <div
              className={
                "absolute inset-x-6 bottom-7 z-10 flex flex-col gap-2.5 text-2xl text-white [font-family:var(--font-heading),Georgia,serif] [&>span:first-child]:text-[9px] [&>span:first-child]:text-[#dfc69b] [&>span:first-child]:[font-family:var(--font-body),Arial,sans-serif]"
              }
            >
              <span
                className={
                  "text-[10px] font-medium uppercase leading-[1.7] tracking-[0.2em] text-[#957e5e]"
                }
              >
                PREPARED. BRIEFED. READY.
              </span>
              <span>Before the first movement.</span>
            </div>
          </Reveal>
          <div className={"self-center md:py-2.5"}>
            <Reveal
              direction="left"
              className={
                "[&_h2]:mb-5 [&_h2]:mt-[19px] [&_h2]:text-[clamp(28px,2.7vw,39px)] [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.025em] [&_h2]:[text-wrap:balance] [&_h2+p]:text-sm [&_h2+p]:leading-[1.9] [&_h2+p]:text-[#626262]"
              }
            >
              <Label>PREPARATION</Label>
              <h2>Known Before You Arrive.</h2>
              <p>
                Our fully vetted chauffeurs are assigned in advance, and their
                names, vehicle information, and contact details reach your team
                at least 24 hours before service. Everyone on your detail knows
                the driver by name before the first movement, and the vehicle
                waiting for them has been prepared to an immaculate standard.
              </p>
            </Reveal>
            <Reveal
              className={`${"[&_h2]:mb-5 [&_h2]:mt-[19px] [&_h2]:text-[clamp(28px,2.7vw,39px)] [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.025em] [&_h2]:[text-wrap:balance] [&_h2+p]:text-sm [&_h2+p]:leading-[1.9] [&_h2+p]:text-[#626262]"} ${"mt-7 border-t border-[#957e5e]/25 pt-7 md:mt-9 md:pt-[35px]"}`}
              delay={0.08}
            >
              <Label>THE PEOPLE</Label>
              <h2>Chauffeurs Who Take Pride In Their Work.</h2>
              <p>
                Exacting attention to detail, unshakable composure, and a work
                ethic your team notices from the first movement. They do what it
                requires, then look, unprompted, for what else is needed.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className={
          "bg-[#0b0c0d] py-[52px] text-white md:pb-20 md:pt-[55px] [&_h2+p]:!text-white/65 [&_h2]:max-w-[530px]"
        }
        aria-label="Chauffeur intelligence and coordination"
      >
        <div
          className={`${"mx-auto w-[calc(100%-48px)] max-w-[1280px] md:w-[calc(100%-72px)] xl:w-[calc(100%-112px)]"} ${"mb-[38px] flex items-center justify-between gap-5 border-b border-white/15 pb-7 md:mb-[55px] md:pb-[35px] [&>p]:text-[#c2a474] [&>span]:hidden [&>span]:text-[9px] [&>span]:tracking-[0.15em] [&>span]:text-white/40 md:[&>span]:block"}`}
        >
          <p
            className={
              "text-[10px] font-medium uppercase leading-[1.7] tracking-[0.2em] text-[#957e5e]"
            }
          >
            CHAUFFEUR INTELLIGENCE
          </p>
          <span aria-hidden="true">PRECISION THROUGHOUT THE JOURNEY</span>
        </div>
        <div
          className={`${"mx-auto w-[calc(100%-48px)] max-w-[1280px] md:w-[calc(100%-72px)] xl:w-[calc(100%-112px)]"} ${"grid items-center gap-[38px] md:grid-cols-[1.1fr_0.9fr] md:gap-[55px] xl:gap-[100px]"}`}
        >
          <div className={"min-w-0"}>
            <Reveal
              direction="left"
              className={
                "[&_h2]:mb-5 [&_h2]:mt-[19px] [&_h2]:text-[clamp(28px,2.7vw,39px)] [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.025em] [&_h2]:[text-wrap:balance] [&_h2+p]:text-sm [&_h2+p]:leading-[1.9] [&_h2+p]:text-[#626262]"
              }
            >
              <Label>OVERSIGHT</Label>
              <h2>Monitored From Start to Finish.</h2>
              <p>
                Every movement is tracked live by your Chauffeur Intelligence
                Officer, who confirms that each chauffeur is on time and in
                position. Watchful throughout, they see a delay forming before
                it becomes one. If something shifts, your team hears it from us
                first.
              </p>
            </Reveal>
            <Reveal
              className={`${"[&_h2]:mb-5 [&_h2]:mt-[19px] [&_h2]:text-[clamp(28px,2.7vw,39px)] [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.025em] [&_h2]:[text-wrap:balance] [&_h2+p]:text-sm [&_h2+p]:leading-[1.9] [&_h2+p]:text-[#626262]"} ${"mt-7 border-t border-[#957e5e]/25 pt-7 md:mt-9 md:pt-[35px]"}`}
              delay={0.08}
            >
              <Label>CONTINUITY</Label>
              <h2>Briefed Before. Debriefed After.</h2>
              <p>
                Each day begins with a meticulous briefing from our Chauffeur
                Intelligence Team and closes with a thorough debrief after the
                final movement. Early starts, late nights, and changed plans are
                part of the work, and every lesson from one day shapes the next.
              </p>
            </Reveal>
          </div>
          <Reveal direction="right" className={"min-w-0"}>
            <div
              className={
                "relative aspect-[16/10] overflow-hidden bg-[#191a1c] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/30 after:to-transparent after:content-[''] md:aspect-[4/4.3]"
              }
            >
              <Image
                src={images.coordination}
                alt="A journey prepared by Premier"
                fill
                sizes="(max-width: 800px) 100vw, 40vw"
                className={"object-cover object-center"}
              />
            </div>
            <div
              className={
                "mt-[26px] flex justify-between gap-3 border-t border-[#957e5e]/40 pt-5 [&_span]:flex [&_span]:items-center [&_span]:gap-2 [&_span]:text-[10px] [&_span]:tracking-[0.05em] [&_span]:text-white/60 [&_i]:size-[5px] [&_i]:rounded-full [&_i]:bg-[#bca078]"
              }
              aria-label="Journey coordination sequence"
            >
              <span>
                <i aria-hidden="true" />
                Brief
              </span>
              <span>
                <i aria-hidden="true" />
                Monitor
              </span>
              <span>
                <i aria-hidden="true" />
                Debrief
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className={`${"mx-auto w-[calc(100%-48px)] max-w-[1280px] md:w-[calc(100%-72px)] xl:w-[calc(100%-112px)]"} ${"grid items-center gap-[22px] py-[55px] md:grid-cols-[1.15fr_0.85fr] md:gap-11 md:py-[85px] xl:gap-20"}`}
        aria-labelledby="executive-fleet-heading"
      >
        <Reveal
          image
          direction="left"
          className={
            "relative aspect-[16/9] bg-[radial-gradient(ellipse_at_center,#f1efea,transparent_70%)] md:aspect-auto md:min-h-[370px]"
          }
        >
          <Image
            src={images.fleet}
            alt="Premier vehicles for coordinated executive travel"
            fill
            sizes="(max-width: 800px) 100vw, 55vw"
            className={"object-contain object-center"}
          />
        </Reveal>
        <Reveal
          className={
            "[&_h2]:mb-5 [&_h2]:mt-[19px] [&_h2]:text-[clamp(28px,2.7vw,39px)] [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.025em] [&_h2]:[text-wrap:balance] [&_h2+p]:text-sm [&_h2+p]:leading-[1.9] [&_h2+p]:text-[#626262]"
          }
          delay={0.08}
        >
          <Label>COORDINATED MOVEMENTS</Label>
          <h2 id="executive-fleet-heading">
            One Team,
            <br />
            Two Vehicles.
          </h2>
          <p>
            A primary vehicle for the principal and a follow vehicle for the
            detail, working as one unit. Both chauffeurs know their roles
            precisely and keep your team informed of delays, traffic, and
            hazards before they matter.
          </p>
          <a
            href="/#fleet"
            className={
              "mt-[22px] inline-flex items-center gap-4 border-b border-[#957e5e]/40 py-2.5 text-xs text-[#806b43]"
            }
          >
            Explore our fleet
            <Arrow />
          </a>
        </Reveal>
      </section>

      <section
        className={"bg-[#f6f5f2] py-[50px] md:py-20"}
        aria-label="Adaptability and duty of care"
      >
        <div
          className={`${"mx-auto w-[calc(100%-48px)] max-w-[1280px] md:w-[calc(100%-72px)] xl:w-[calc(100%-112px)]"} ${"grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:gap-12 xl:gap-[90px]"}`}
        >
          <Reveal className={"[&_p+p]:mt-6"}>
            <p
              className={
                "text-[10px] font-medium uppercase leading-[1.7] tracking-[0.2em] text-[#957e5e]"
              }
            >
              THE DETAILS MATTER
            </p>
            <p
              className={
                "text-[clamp(25px,2.4vw,35px)] leading-[1.3] tracking-[-0.025em] text-[#333] [font-family:var(--font-heading),Georgia,serif]"
              }
            >
              Considered.
              <br />
              Before you ask.
            </p>
            <span
              className={"my-7 block h-px w-12 bg-[#957e5e]"}
              aria-hidden="true"
            />
          </Reveal>
          <Reveal className={"min-w-0"} delay={0.12}>
            <details
              className={
                "border-t border-[#d6d1c7] pb-[27px] pt-6 last:border-b [&_summary]:flex [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:items-center [&_summary]:gap-4 [&_summary::-webkit-details-marker]:hidden [&_summary:focus-visible]:outline [&_summary:focus-visible]:outline-[#957e5e] [&_h2]:flex-1 [&_h2]:text-[clamp(24px,2vw,30px)] [&_h2]:leading-[1.3] [&_h2]:tracking-[-0.025em] [&>p]:mt-5 [&>p]:text-sm [&>p]:leading-[1.9] [&>p]:text-[#626262] md:[&>p]:mr-[39px] [&[open]_svg]:rotate-0"
              }
              open
            >
              <summary>
                <h2>Ready when the plan changes.</h2>
                <svg
                  className={
                    "size-7 shrink-0 rotate-90 rounded-full border border-[#957e5e]/40 p-1 text-[#957e5e] transition-transform"
                  }
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="m8 5 7 7-7 7" />
                </svg>
              </summary>
              <p>
                Itineraries move, and details can arrive minutes before
                departure. Our chauffeurs know the city intimately, adjust the
                route swiftly and calmly, and offer sound, considered input on
                arrival and departure planning when asked.
              </p>
            </details>
            <details
              className={
                "border-t border-[#d6d1c7] pb-[27px] pt-6 last:border-b [&_summary]:flex [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:items-center [&_summary]:gap-4 [&_summary::-webkit-details-marker]:hidden [&_summary:focus-visible]:outline [&_summary:focus-visible]:outline-[#957e5e] [&_h2]:flex-1 [&_h2]:text-[clamp(24px,2vw,30px)] [&_h2]:leading-[1.3] [&_h2]:tracking-[-0.025em] [&>p]:mt-5 [&>p]:text-sm [&>p]:leading-[1.9] [&>p]:text-[#626262] md:[&>p]:mr-[39px] [&[open]_svg]:rotate-0"
              }
              open
            >
              <summary>
                <h2>Duty of care, down to the last detail.</h2>
                <svg
                  className={
                    "size-7 shrink-0 rotate-90 rounded-full border border-[#957e5e]/40 p-1 text-[#957e5e] transition-transform"
                  }
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="m8 5 7 7-7 7" />
                </svg>
              </summary>
              <p>
                We serve your team, and we serve your principal. The cold drinks
                are already in the car. The route suits the principal’s day. The
                small things are handled quietly, before anyone thinks to ask.
                Everything they request is delivered, and what they haven’t
                requested is already considered.
              </p>
            </details>
          </Reveal>
        </div>
      </section>

      <section
        className={
          "relative isolate flex min-h-[380px] items-center bg-[#101112] py-[65px] text-white [clip-path:inset(0)]"
        }
        aria-labelledby="executive-closing-heading"
      >
        <div
          className={
            "pointer-events-none absolute inset-0 -z-10 md:fixed motion-reduce:!absolute"
          }
          aria-hidden="true"
        >
          <Image
            src={images.closing}
            alt=""
            fill
            sizes="100vw"
            className={"object-cover object-center"}
          />
          <div
            className={
              "pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.82),rgba(0,0,0,0.6)),linear-gradient(0deg,rgba(0,0,0,0.33),transparent)]"
            }
          />
        </div>
        <Reveal
          className={`${"mx-auto w-[calc(100%-48px)] max-w-[1280px] md:w-[calc(100%-72px)] xl:w-[calc(100%-112px)]"} ${"[&_h2]:mb-[13px] [&_h2]:mt-[18px] [&_h2]:text-[clamp(34px,3.9vw,55px)] [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.03em] [&_p:first-child]:text-[#c6ad83]"}`}
        >
          <p
            className={
              "text-[10px] font-medium uppercase leading-[1.7] tracking-[0.2em] text-[#957e5e]"
            }
          >
            PREMIER INTERNATIONAL TRANSPORTATION
          </p>
          <h2 id="executive-closing-heading">Always one step ahead.</h2>
          <p
            className={
              "text-[clamp(15px,1.5vw,20px)] leading-[1.7] text-white/70"
            }
          >
            So your team can stay focused on what matters most.
          </p>
          <div
            className={
              "mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7"
            }
          >
            <a
              className={
                "inline-flex min-h-[50px] items-center justify-between gap-6 border border-[#a59067] bg-[#806b43] px-6 py-[15px] text-[11px] font-semibold uppercase leading-relaxed tracking-[0.09em] text-white transition-colors hover:bg-[#a38d65] [&_svg]:shrink-0"
              }
              href="/#contact"
            >
              Speak with our Client Experience Team
              <Arrow />
            </a>
            <a
              className={
                "border-b border-white/30 py-2.5 text-sm tracking-[0.02em]"
              }
              href="tel:+18884129150"
            >
              +1-888-412-9150
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
