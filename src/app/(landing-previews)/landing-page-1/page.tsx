"use client";
import BookingForm from "@/components/landing-previews/BookingForm";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  Phone,
  Check,
  Plus,
  Minus,
} from "lucide-react";
const BOOK = "https://book.mylimobiz.com/v4/pittransportation";
const moments = [
  {
    label: "Your arrival",
    title: (
      <>
        Your flight changed.
        <br />
        Your welcome didn’t.
      </>
    ),
    text: "A longer flight. A different arrival time. One less thing to think about. We follow your arrival and adjust the arrangements, so your welcome is ready when you are.",
    detail: "Flight followed. Chauffeur informed. Welcome waiting.",
    image: "hero.webp",
    position: "center 62%",
  },
  {
    label: "Your working day",
    title: (
      <>
        Your next meeting.
        <br />
        Already considered.
      </>
    ),
    text: "The route is planned. Your chauffeur is briefed. As the day moves, we move with it—giving you room to finish the conversation and arrive composed.",
    detail: "Your itinerary, quietly taken care of.",
    image: "conversation.webp",
    position: "center",
  },
  {
    label: "Your occasion",
    title: (
      <>
        Be in the moment.
        <br />
        We’ll take you there.
      </>
    ),
    text: "A celebration worth being present for. From the first pickup to the last goodnight, let someone else think about the timing, the traffic, and the way home.",
    detail: "Every arrival. Every departure. Thoughtfully arranged.",
    image: "final.webp",
    position: "center",
  },
];
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("shown", entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
export default function LandingPage1() {
  const [menu, setMenu] = useState(false);
  const [moment, setMoment] = useState(0);
  const [faq, setFaq] = useState<number | null>(null);
  const m = moments[moment];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a href="#top" aria-label="Premier home">
          <img
            className="logo"
            src="/landing-previews/images/logo.png"
            alt="Premier International Transportation"
          />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#experience">The experience</a>
          <a href="https://www.pitdrives.com/#fleet">Your vehicle</a>
          <a href="#care">Our care</a>
        </nav>
        <div className="nav-right">
          <a className="nav-phone" href="tel:+18884129150">
            +1 888 412 9150
          </a>
          <a
            className="gold-button nav-book"
            href={BOOK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve your journey <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-label={menu ? "Close menu" : "Open menu"}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {[
              ["The experience", "#experience"],
              ["Your vehicle", "https://www.pitdrives.com/#fleet"],
              ["Our care", "#care"],
              ["Plan your journey", "#reserve"],
            ].map(([t, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)}>
                {t}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero" id="top">
          <img
            className="hero-image"
            src="/landing-previews/images/final.webp"
            alt="A chauffeur welcomes a guest into a Mercedes-Benz"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow hero-enter">THE PREMIER EXPERIENCE</p>
            <h1 className="hero-enter">
              You’ve arrived.
              <br />
              <span>
                We’ve considered
                <br />
                the rest.
              </span>
            </h1>
            <p className="hero-sub hero-enter">
              Your chauffeur. Your preferences. Your next destination.
              <br className="desktop-break" /> Already arranged.
            </p>
            <a className="text-link hero-enter" href="#experience">
              Discover the feeling{" "}
              <span className="round-arrow">
                <ArrowDown size={18} />
              </span>
            </a>
          </div>
          <div className="hero-bottom">
            <span>WASHINGTON, D.C. & BEYOND</span>
            <a href="#reserve">
              Your day, already considered. <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section className="intro" id="experience">
          <Reveal>
            <p className="eyebrow">A DIFFERENT WAY TO MOVE</p>
            <h2>
              Some journeys take you somewhere.
              <br />
              <span>Ours give you something back.</span>
            </h2>
            <p>
              Time to think. Space to breathe. The reassuring feeling
              <br className="desktop-break" /> that someone has already thought
              of everything.
            </p>
          </Reveal>
          <div className="fine-line" />
        </section>
        <section className="moments section-pad">
          <div
            className="moment-tabs"
            role="tablist"
            aria-label="Explore your journey"
          >
            {moments.map((item, i) => (
              <button
                key={item.label}
                id={`moment-tab-${i}`}
                role="tab"
                aria-selected={moment === i}
                aria-controls="moment-panel"
                tabIndex={moment === i ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const n = (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                    setMoment(n);
                    document.getElementById(`moment-tab-${n}`)?.focus();
                  }
                }}
                onClick={() => setMoment(i)}
              >
                <span className="tab-dot" />
                {item.label}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          <div
            className="moment-panel"
            id="moment-panel"
            role="tabpanel"
            aria-labelledby={`moment-tab-${moment}`}
          >
            <div className="moment-photo">
              <img
                key={m.image}
                src={`/landing-previews/images/${m.image}`}
                alt={
                  moment === 0
                    ? "A chauffeur waiting beside a Mercedes-Benz"
                    : moment === 1
                      ? "A guest finishing a call as he arrives"
                      : "A guest being welcomed by her chauffeur"
                }
                style={{ objectPosition: m.position }}
                loading="lazy"
              />
              <span className="photo-caption">THE ART OF BEING EXPECTED</span>
            </div>
            <Reveal className="moment-copy">
              <p className="eyebrow">BEFORE YOU EVEN ASK</p>
              <h2 key={moment}>{m.title}</h2>
              <p>{m.text}</p>
              <div className="assurance">
                <Check size={17} />
                <span>{m.detail}</span>
              </div>
              <a className="underlined" href="#reserve">
                Let us take care of your journey <ArrowUpRight size={17} />
              </a>
            </Reveal>
          </div>
        </section>
        <section className="details" id="care">
          <Reveal className="details-copy">
            <p className="eyebrow">KNOWN. NOT JUST EXPECTED.</p>
            <h2>
              The relief of
              <br />
              not having to <br />
              <em>explain twice.</em>
            </h2>
            <p>
              Your preferences reach your chauffeur before you do. The water you
              like. The temperature you prefer. A conversation—or the comfort of
              quiet.
            </p>
            <p className="small-note">It’s personal before the door opens.</p>
          </Reveal>
          <div className="detail-photo">
            <img
              src="/landing-previews/images/interior.webp"
              alt="Prepared Mercedes-Benz interior with water and thoughtful amenities"
              loading="lazy"
            />
            <div className="detail-caption">
              <span>SMALL DETAILS.</span>
              <span>A different feeling.</span>
            </div>
          </div>
        </section>
        <section className="quiet">
          <div className="quiet-bg" />
          <div className="quiet-overlay" />
          <Reveal className="quiet-copy">
            <p className="eyebrow">BETWEEN HERE AND THERE</p>
            <h2>
              A moment that
              <br />
              belongs to <em>you.</em>
            </h2>
            <p>
              Prepare for the meeting. Finish the conversation.
              <br />
              Or simply enjoy the quiet.
            </p>
            <span className="quiet-line" />
          </Reveal>
          <span className="quiet-bottom">THE WORLD CAN WAIT A MOMENT.</span>
        </section>
        {/* Optional: insert your existing fleet component here. */}
        <section className="people section-pad">
          <div className="people-photo">
            <img
              src="/landing-previews/images/chauffeurs.webp"
              alt="Premier's chauffeur team standing with their vehicles"
              loading="lazy"
            />
          </div>
          <Reveal className="people-copy">
            <p className="eyebrow">THE PEOPLE BEHIND THE FEELING</p>
            <h2>
              You’ll know
              <br />
              who’s waiting.
            </h2>
            <p>
              A name before you arrive. A familiar face at the curb. A chauffeur
              briefed on your journey, supported by a team that stays attentive
              from start to finish.
            </p>
            <a className="underlined" href="https://www.pitdrives.com/#about">
              Meet the Premier standard <ArrowUpRight size={17} />
            </a>
          </Reveal>
        </section>
        <section className="section-pad restored-form" id="reserve">
          <BookingForm />
        </section>
        <section className="faq section-pad">
          <p className="eyebrow">A FEW THINGS, ALREADY ANSWERED</p>
          {[
            {
              q: "What if my flight or itinerary changes?",
              a: "Our team follows your arrival and adjusts the arrangements as your plans change. Contact your Client Experience Lead to share any updates to your journey.",
            },
            {
              q: "Can I share my preferences before I travel?",
              a: "Yes. Tell our Client Experience Team what would make your journey comfortable—from water and temperature to space for luggage or a quiet ride.",
            },
            {
              q: "Can you arrange travel for a group?",
              a: "Yes. Premier can coordinate sedans, SUVs, Sprinters, and coaches around your itinerary. Speak with our team about the number of guests and the journeys you have in mind.",
            },
          ].map((item, i) => (
            <div className="faq-item" key={item.q}>
              <h3>
                <button
                  aria-expanded={faq === i}
                  aria-controls={`answer-${i}`}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  {item.q}
                  {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <div id={`answer-${i}`} hidden={faq !== i}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className="section-pad">
        <div className="footer-top">
          <a href="#top">
            <img
              src="/landing-previews/images/logo.png"
              alt="Premier International Transportation"
            />
          </a>
          <p>See people. Know people. Serve people.</p>
          <a href="mailto:info@pitdrives.com">
            Let’s begin a conversation <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Premier International Transportation
          </span>
          <a
            href="https://maps.app.goo.gl/RPR8BWbtPZzaEvzL8"
            target="_blank"
            rel="noopener noreferrer"
          >
            1250 Connecticut Ave NW, Washington, D.C.
          </a>
          <a href="/landing-page-2">View second design ↗</a>
        </div>
      </footer>
    </>
  );
}
