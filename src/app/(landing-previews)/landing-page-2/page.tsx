"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  MapPin,
  CalendarDays,
  Phone,
  VolumeX,
  MessageCircle,
  Check,
} from "lucide-react";
import BookingForm from "@/components/landing-previews/BookingForm";
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => node.classList.toggle("is-visible", e.isIntersecting),
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={el} className={`v-reveal ${className}`}>
      {children}
    </div>
  );
}
export default function LandingPage2() {
  const [menu, setMenu] = useState(false);
  const [mood, setMood] = useState("quiet");
  const [pickup, setPickup] = useState("");
  const [date, setDate] = useState("");
  const [active, setActive] = useState(0);
  const scenes = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.scene));
      },
      { rootMargin: "-35% 0px -35% 0px" },
    );
    scenes.current.forEach((e) => e && io.observe(e));
    return () => io.disconnect();
  }, []);
  function start(e: React.FormEvent) {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("premier-start", { detail: { pickup, date } }),
    );
    document
      .getElementById("request")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  }
  return (
    <div className="v2">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="v-nav">
        <a href="#top" aria-label="Premier home">
          <img
            src="/landing-previews/images/logo.png"
            alt="Premier International Transportation"
          />
        </a>
        <nav aria-label="Main navigation">
          <a href="#experience">The experience</a>
          <a href="https://www.pitdrives.com/#fleet">
            Our fleet <ArrowUpRight size={11} />
          </a>
          <a href="#care">The Premier standard</a>
        </nav>
        <div className="v-nav-right">
          <a className="v-phone" href="tel:+18884129150">
            <Phone size={13} />
            <span>888 412 9150</span>
          </a>
          <a href="#request" className="v-reserve">
            Begin your journey <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            className="v-menu"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <div className="v-mobile">
            {[
              ["The experience", "#experience"],
              ["Our fleet", "https://www.pitdrives.com/#fleet"],
              ["The Premier standard", "#care"],
              ["Begin your journey", "#request"],
            ].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        )}
      </header>
      <main id="main">
        <section id="top" className="v-hero">
          <div className="v-hero-visual">
            <img
              src="/landing-previews/images/hero.webp"
              alt="Your chauffeur waiting beside a Mercedes-Benz outside a grand hotel"
              fetchPriority="high"
            />
            <div />
            <span>YOUR WELCOME IS ALREADY WAITING.</span>
          </div>
          <div className="v-hero-type">
            <p className="v-kicker">
              <span />
              THE PREMIER EXPERIENCE
            </p>
            <h1>
              The day
              <br />
              is <em>yours.</em>
            </h1>
            <p className="v-hero-sub">
              We’ll take care
              <br />
              of the journey.
            </p>
            <a href="#experience" className="v-explore">
              <span>Step into a different standard</span>
              <ArrowDown size={17} />
            </a>
          </div>
          <div className="v-hero-foot">
            <span>
              WASHINGTON, D.C. <i /> WHEREVER LIFE TAKES YOU
            </span>
            <p>Seen. Known. Already considered.</p>
          </div>
        </section>
        <div className="v-starter-wrap">
          <form className="v-starter" onSubmit={start}>
            <div className="v-starter-intro">
              <span className="v-kicker">LET’S BEGIN</span>
              <p>Your next destination?</p>
            </div>
            <label>
              <span>
                <MapPin size={13} />
                PICK-UP LOCATION
              </span>
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Airport, hotel, or address"
                aria-label="Starting pick-up location"
                maxLength={500}
              />
            </label>
            <label>
              <span>
                <CalendarDays size={13} />
                DATE OF YOUR JOURNEY
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-label="Starting journey date"
              />
            </label>
            <button type="submit">
              Plan my journey <ArrowRight size={18} />
            </button>
          </form>
        </div>
        <section className="v-opening" id="experience">
          <Reveal>
            <p className="v-kicker">THE LUXURY OF NOT HAVING TO ASK</p>
            <h2>
              You have places to be.
              <br />
              <span>
                For a moment, just <em>be.</em>
              </span>
            </h2>
            <p>
              Let the logistics fade into the background.
              <br />
              The welcome, the timing, the little things—already in hand.
            </p>
          </Reveal>
          <span className="v-thread" />
        </section>
        <section className="v-story">
          <aside className="v-chapters" aria-label="Journey chapters">
            <span>YOUR JOURNEY</span>
            {["Before you arrive", "As you settle in", "On your way"].map(
              (label, i) => (
                <a
                  href={`#chapter-${i}`}
                  key={label}
                  className={active === i ? "active" : ""}
                >
                  <i />
                  {label}
                </a>
              ),
            )}
          </aside>
          <div className="v-scenes">
            <section
              id="chapter-0"
              className="v-scene v-arrival"
              data-scene="0"
              ref={(e) => {
                if (e) scenes.current[0] = e;
              }}
            >
              <div className="v-scene-image">
                <img
                  src="/landing-previews/images/final.webp"
                  alt="A guest smiles as her chauffeur opens the car door"
                  loading="lazy"
                />
                <div className="v-image-caption">
                  <span>BEFORE YOU ARRIVE</span>
                  <span>Someone is already thinking of you.</span>
                </div>
              </div>
              <Reveal className="v-scene-copy">
                <p className="v-kicker">THE ARRIVAL</p>
                <h2>
                  No looking around.
                  <br />
                  No wondering.
                  <br />
                  <em>Just a welcome.</em>
                </h2>
                <p>
                  Your chauffeur is assigned in advance. Your arrival is
                  followed. And when plans change, the arrangements change with
                  them.
                </p>
                <div className="v-tiny-proof">
                  <Check size={15} />
                  <span>A name before you arrive. A welcome when you do.</span>
                </div>
              </Reveal>
            </section>
            <section
              id="chapter-1"
              className="v-scene v-settle"
              data-scene="1"
              ref={(e) => {
                if (e) scenes.current[1] = e;
              }}
            >
              <Reveal className="v-scene-copy">
                <p className="v-kicker">THE LITTLE THINGS</p>
                <h2>
                  Your seat.
                  <br />
                  Your pace.
                  <br />
                  <em>Your kind of quiet.</em>
                </h2>
                <p>
                  A cool drink waiting. The cabin just right. A chauffeur who
                  knows when to talk—and when to leave the moment to you.
                </p>
                <div className="v-mood-label">
                  HOW WOULD YOU LIKE TO TRAVEL?
                </div>
                <div
                  className="v-mood"
                  aria-label="Choose your preferred atmosphere"
                >
                  <button
                    aria-pressed={mood === "quiet"}
                    onClick={() => setMood("quiet")}
                  >
                    <VolumeX size={15} />A little quiet
                  </button>
                  <button
                    aria-pressed={mood === "conversation"}
                    onClick={() => setMood("conversation")}
                  >
                    <MessageCircle size={15} />
                    Good conversation
                  </button>
                </div>
                <p className="v-mood-response" aria-live="polite">
                  {mood === "quiet"
                    ? "Space to think. Or permission not to."
                    : "A familiar voice in an unfamiliar city."}
                </p>
                <small className="v-mood-note">
                  A glimpse of the care. Share your preferences in your request.
                </small>
              </Reveal>
              <div className="v-detail-composition">
                <img
                  src="/landing-previews/images/interior.webp"
                  alt="The prepared interior of a Premier Mercedes-Benz"
                  loading="lazy"
                />
                <div className="v-detail-note">
                  <span className="v-kicker">PERSONAL, BEFORE YOU ASK.</span>
                  <p>
                    Not another ride.
                    <br />
                    <em>Your ride.</em>
                  </p>
                </div>
              </div>
            </section>
            <section
              id="chapter-2"
              className="v-onward"
              data-scene="2"
              ref={(e) => {
                if (e) scenes.current[2] = e;
              }}
            >
              <div className="v-onward-bg" />
              <div className="v-onward-shade" />
              <Reveal>
                <p className="v-kicker">THE TIME IN BETWEEN</p>
                <h2>
                  A little less
                  <br />
                  to manage.
                  <br />
                  <em>A little more life.</em>
                </h2>
                <p>
                  Finish the call. Watch the city go by.
                  <br />
                  Arrive with your mind on what matters.
                </p>
              </Reveal>
              <div className="v-onward-footer">
                <span>EVERY TURN, CONSIDERED.</span>
                <span>EVERY MOMENT, YOURS.</span>
              </div>
            </section>
          </div>
        </section>
        {/* Optional: insert your existing fleet component here. */}
        <section id="care" className="v-care">
          <Reveal>
            <p className="v-kicker">THERE’S A TEAM BEHIND THAT FEELING.</p>
            <h2>
              You don’t have to see everything
              <br />
              we do. <em>You’ll feel it.</em>
            </h2>
          </Reveal>
          <div className="v-care-grid">
            <div className="v-team-image">
              <img
                src="/landing-previews/images/chauffeurs.webp"
                alt="The Premier chauffeur team"
                loading="lazy"
              />
            </div>
            <div className="v-care-promises">
              {[
                [
                  "Already briefed.",
                  "Your preferences become your chauffeur’s briefing. The person opening your door already knows what your day needs.",
                ],
                [
                  "Quietly attentive.",
                  "Every movement is followed by our team. Changes are considered and your arrangements stay in step with your day.",
                ],
                [
                  "Always someone there.",
                  "One Client Experience Team to reach, at any hour. For the small requests and the plans that suddenly change.",
                ],
              ].map(([title, copy]) => (
                <Reveal key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="v-home">
          <div>
            <img
              src="/landing-previews/images/capital-hill.webp"
              alt="Washington, D.C., Premier's home city"
              loading="lazy"
            />
          </div>
          <Reveal>
            <p className="v-kicker">
              ROOTED IN WASHINGTON. AT HOME IN YOUR WORLD.
            </p>
            <h2>
              One standard.
              <br />
              <em>Everywhere.</em>
            </h2>
            <p>
              From your city to the other side of the world, the same duty of
              care follows you. The same discretion. The same attention.
            </p>
            <a href="https://www.pitdrives.com/#fleet">
              Find the vehicle for your journey <ArrowUpRight size={17} />
            </a>
          </Reveal>
        </section>
        <section id="request" className="v-request">
          <div className="v-request-heading">
            <Reveal>
              <p className="v-kicker">YOUR JOURNEY BEGINS HERE</p>
              <h2>
                Leave the details
                <br />
                <em>with us.</em>
              </h2>
              <p>
                A simple arrival. An important day.
                <br />A journey with a few moving parts.
                <br />
                Tell us what you have in mind.
              </p>
              <div className="v-contact">
                <span>YOUR CLIENT EXPERIENCE TEAM</span>
                <a href="tel:+18884129150">
                  +1 888 412 9150 <ArrowUpRight size={18} />
                </a>
                <small>Here for you. Around the clock.</small>
              </div>
            </Reveal>
          </div>
          <BookingForm />
        </section>
        <div className="v-last-word">
          <span>SEE PEOPLE.</span>
          <span>KNOW PEOPLE.</span>
          <span>SERVE PEOPLE.</span>
        </div>
      </main>
      <footer className="v-footer">
        <a href="#top">
          <img
            src="/landing-previews/images/logo.png"
            alt="Premier International Transportation"
          />
        </a>
        <div>
          <a href="mailto:info@pitdrives.com">info@pitdrives.com</a>
          <a
            href="https://maps.app.goo.gl/RPR8BWbtPZzaEvzL8"
            target="_blank"
            rel="noopener noreferrer"
          >
            1250 Connecticut Ave NW, Washington, D.C.
          </a>
        </div>
        <div>
          <a href="/landing-page-1">
            View first design <ArrowUpRight size={13} />
          </a>
          <span>
            © {new Date().getFullYear()} Premier International Transportation
          </span>
        </div>
      </footer>
    </div>
  );
}
