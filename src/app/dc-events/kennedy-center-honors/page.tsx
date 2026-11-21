import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE = "https://www.pitdrives.com";
const PATH = "/dc-events/kennedy-center-honors";
const CONTACT = "/#contact";
const BOOKING = "https://book.mylimobiz.com/v4/pittransportation";
const PHONE = "tel:+18884129150";
const DIRECTIONS = "https://www.capitalonearena.com/plan-your-visit/directions-parking";
const MPD = "https://mpdc.dc.gov/newsroom";
const ANNOUNCEMENT = "https://www.paramountpressexpress.com/cbs-entertainment/shows/the-49th-annual-kennedy-center-honors/releases/?view=113629-the-49th-annual-kennedy-center-honors-will-broadcast-sunday-dec-27-on-cbs-and-stream-on-paramount";

// Existing Premier photography. These are not photographs of the arena or event.
// Replace with licensed event/venue photographs if desired; update alt text too.
const photos = {
  hero: "/hero.jpg",
  guests: "/Event-Table-setup.jpg",
  production: "/Event-Rehersal-kennedy.jpg",
  closing: "/final.jpg",
};

const title = "Kennedy Center Honors 2026 Chauffeur | Capital One Arena";
const description = "The 2026 Kennedy Center Honors move to Capital One Arena on Monday, December 7. Chauffeured cars for guests, hosts and sponsors, all in your budget.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE}${PATH}` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Premier International Transportation",
    url: `${SITE}${PATH}`,
    title,
    description,
    images: [{ url: `${SITE}${photos.hero}`, alt: "Premier chauffeur service in Washington, DC" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE}${photos.hero}`] },
};

const questions = [
  {
    question: "When are the 2026 Kennedy Center Honors?",
    answer: "Monday, December 7, 2026. This is the ceremony date; the television broadcast is scheduled for December 27.",
  },
  {
    question: "Where are the 2026 Kennedy Center Honors?",
    answer: "At Capital One Arena, 601 F Street NW, Washington, DC 20004, in Penn Quarter and Chinatown. The 2026 ceremony moves downtown from the Kennedy Center’s riverfront venue.",
  },
  {
    question: "What’s the closest Metro stop to Capital One Arena?",
    answer: "Gallery Place/Chinatown, on the Red, Green and Yellow lines. Judiciary Square, Metro Center and Archives-Navy Memorial-Penn Quarter are also within walking distance. Check WMATA for service changes before travelling.",
  },
  {
    question: "Is there parking at Capital One Arena?",
    answer: "The arena’s directions page provides garage information and links to SpotHero for nearby reserved parking. Availability and access can vary by event, so check the arena’s directions page before you go.",
    href: DIRECTIONS,
    link: "Arena directions & parking",
  },
  {
    question: "Will there be road closures around Capital One Arena on December 7?",
    answer: "Event-specific restrictions can change close to the date. Check MPD’s latest traffic advisories for confirmed closures and security perimeters. We review announcements in the week before the event and adjust the plan accordingly.",
    href: MPD,
    link: "Check MPD traffic advisories",
  },
  {
    question: "Can you arrange cars for a group of guests or a production team?",
    answer: "Yes. We plan every car for the night or the whole week, from one sedan to Sprinters, Mini Buses and coaches, around your schedule and budget.",
  },
];

const approaches = [
  {
    title: "From downtown and the Penn Quarter hotels",
    text: "Most downtown hotels are a short drive away, and some are close enough to walk on a dry night. Gowns and dress shoes in December make a car the better choice, even for a short trip.",
    label: "DOWNTOWN HOTELS",
  },
  {
    title: "From Georgetown, the West End and Foggy Bottom",
    text: "Guests used to a short hop down to the river are now crossing downtown, so leave more time than in past years.",
    label: "ACROSS THE CITY",
  },
  {
    title: "From Reagan National (DCA)",
    text: "Guests flying in the same day should land with plenty of room to reach the hotel, change and head out again. The drive into downtown on a weekday evening rarely goes quickly.",
    label: "AIRPORT ARRIVALS",
  },
  {
    title: "By Metro",
    text: "Gallery Place/Chinatown is the closest stop, on the Red, Green and Yellow lines. Judiciary Square, Metro Center and Archives-Navy Memorial-Penn Quarter are all within walking distance.",
    label: "BY RAIL",
  },
];

const wrap = "mx-auto w-full max-w-[1320px] px-6 md:px-10 xl:px-16";
const heading = "text-[clamp(2rem,3.4vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.035em] [text-wrap:balance]";
const prose = "space-y-5 text-base leading-8 text-[#57534d] md:text-lg";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b7a071]";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[11px] font-medium uppercase leading-6 tracking-[0.2em] ${light ? "text-[#dfc69b]" : "text-[#806b43]"}`}>{children}</p>;
}

function Button({ children, href = CONTACT, outline = false, className = "" }: { children: ReactNode; href?: string; outline?: boolean; className?: string }) {
  const external = href.startsWith("https://");
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex min-h-12 max-w-full items-center justify-between gap-5 border px-6 py-3.5 text-sm font-medium leading-6 transition-colors duration-300 motion-reduce:transition-none ${outline ? "border-[#a59067]/60 bg-transparent text-[#e6d3ad] hover:bg-white/10" : "border-[#957e5e] bg-[#957e5e] text-white hover:border-[#806b43] hover:bg-[#806b43]"} ${focus} ${className}`}>
      <span>{children}</span><Arrow className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
    </a>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`underline decoration-[#957e5e]/50 underline-offset-4 hover:text-[#806b43] ${focus}`}>{children}</a>;
}

function StructuredData() {
  // This is a chauffeur-service landing page, not an organizer or ticket-sales page.
  // BusinessStructuredData remains in your existing root layout.
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE}${PATH}#webpage`,
        url: `${SITE}${PATH}`,
        name: title,
        description,
        isPartOf: { "@id": `${SITE}/#website` },
        breadcrumb: { "@id": `${SITE}${PATH}#breadcrumb` },
        mainEntity: { "@id": `${SITE}${PATH}#service` },
      },
      {
        "@type": "Service",
        "@id": `${SITE}${PATH}#service`,
        name: "Kennedy Center Honors 2026 Chauffeur Service",
        url: `${SITE}${PATH}`,
        description,
        serviceType: "Chauffeured transportation for guests and production teams",
        provider: { "@id": `${SITE}/#organization` },
        areaServed: [
          { "@type": "AdministrativeArea", name: "District of Columbia" },
          { "@type": "Place", name: "Northern Virginia" },
          { "@type": "AdministrativeArea", name: "Maryland" },
        ],
        audience: { "@type": "Audience", audienceType: "Hosts, guests, sponsors, donors, assistants and production teams" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE}${PATH}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Events & Celebrations", item: `${SITE}/events` },
          { "@type": "ListItem", position: 3, name: "Kennedy Center Honors", item: `${SITE}${PATH}` },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default function KennedyCenterHonorsPage() {
  return (
    <>
      <Navbar />
      <StructuredData />
      <main id="top" className="overflow-x-clip bg-[#f8f6f1] text-[#211f1b] selection:bg-[#dfc69b] selection:text-black">
        <section aria-labelledby="honors-heading" className="relative isolate overflow-hidden bg-[#111310] text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 lg:left-[40%]">
            <Image src={photos.hero} alt="" fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover object-center opacity-45 lg:opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111310] via-[#111310]/65 to-[#111310]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-transparent to-[#111310]/30" />
          </div>
          <div className={wrap}>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-7 text-xs leading-6 text-white/65">
              <a href="/" className={`hover:text-white ${focus}`}>Home</a><span aria-hidden="true">/</span>
              <a href="/events" className={`hover:text-white ${focus}`}>Events &amp; Celebrations</a><span aria-hidden="true">/</span>
              <span aria-current="page" className="text-[#dfc69b]">Kennedy Center Honors</span>
            </nav>
            <div className="grid items-end gap-12 pb-16 pt-14 md:pb-20 md:pt-20 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
              <div className="max-w-[760px]">
                <Eyebrow light>Washington, DC · December 7, 2026</Eyebrow>
                {/* Always visible on first paint; no opacity-zero hero wrapper. */}
                <h1 id="honors-heading" className="mt-6 text-[clamp(2.75rem,5.5vw,5.25rem)] font-normal leading-[1.03] tracking-[-0.045em] [text-wrap:balance]">
                  Kennedy Center Honors{" "}<span className="mt-2 block text-[#dfc69b]">at Capital One Arena</span>
                </h1>
                <p className="mt-7 max-w-[520px] text-lg leading-8 text-white/85 md:text-xl">One plan for every car, from the first arrival to the last ride home.</p>
                <Button className="mt-9">Plan your guests’ evening</Button>
              </div>
              <aside aria-label="Event date and assistance" className="border-t border-[#dfc69b]/40 pt-6 lg:mb-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#dfc69b]">The 49th Kennedy Center Honors</p>
                <time dateTime="2026-12-07" className="mt-4 flex items-center gap-5">
                  <span className="text-7xl font-light leading-none tracking-[-0.06em] md:text-8xl">07</span>
                  <span className="border-l border-white/25 pl-5 text-sm leading-7 text-white/80">Monday<br />December 2026</span>
                </time>
                <p className="mt-6 text-sm leading-6 text-white/65">Your evening. Thoughtfully arranged.</p>
                <a href={PHONE} className={`mt-5 inline-flex min-h-11 flex-col justify-center text-base text-[#dfc69b] hover:text-white ${focus}`}><span>+1-888-412-9150</span><span className="mt-1 text-xs text-white/55">Call us 24 hours a day</span></a>
              </aside>
            </div>
            <nav aria-label="On this page" className="flex flex-wrap gap-x-7 gap-y-1 border-t border-white/15 py-4 text-xs text-white/70">
              {[['#hosting', 'For hosts & guests'], ['#production', 'For production teams'], ['#arrival-guide', 'The arrival guide'], ['#ways-to-book', 'Ways to book'], ['#questions', 'Questions']].map(([href, text]) => <a key={href} href={href} className={`inline-flex min-h-10 items-center hover:text-[#dfc69b] ${focus}`}>{text}</a>)}
            </nav>
          </div>
        </section>

        <section aria-label="Your Honors week" className={`${wrap} py-16 md:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <Eyebrow>A Washington evening, in good hands</Eyebrow>
              <p className="mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.5] tracking-[-0.025em] [font-family:var(--font-heading),Georgia,serif]">Premier International Transportation is a Washington, DC chauffeur company. For Honors week we look after guests, hosts, sponsors and production teams: airport arrivals, dinners, the arena, receptions and the ride home.</p>
              <p className="mt-7 max-w-[620px] text-lg leading-8 text-[#57534d]">Share the schedule and the budget you’re working with, and we’ll build the whole movement inside it.</p>
            </div>
            <aside className="border border-[#d7cbb5] bg-white/65 p-7 md:p-9" aria-labelledby="event-details-heading">
              <h2 id="event-details-heading" className="text-2xl font-normal tracking-tight">The evening, at a glance.</h2>
              <dl className="mt-6 divide-y divide-[#ddd6ca] text-sm leading-6">
                <div className="py-4"><dt className="text-[10px] uppercase tracking-[0.18em] text-[#806b43]">Event</dt><dd className="mt-1">The 49th Kennedy Center Honors</dd></div>
                <div className="py-4"><dt className="text-[10px] uppercase tracking-[0.18em] text-[#806b43]">Date</dt><dd className="mt-1">Monday, December 7, 2026</dd></div>
                <div className="py-4"><dt className="text-[10px] uppercase tracking-[0.18em] text-[#806b43]">Venue</dt><dd className="mt-1">Capital One Arena<br />601 F Street NW, Washington, DC 20004</dd></div>
                <div className="py-4"><dt className="text-[10px] uppercase tracking-[0.18em] text-[#806b43]">Closest Metro</dt><dd className="mt-1">Gallery Place/Chinatown<br /><span className="inline-flex flex-wrap gap-3 pt-2">{[['Red', 'bg-red-700'], ['Green', 'bg-green-700'], ['Yellow', 'bg-yellow-500']].map(([name, color]) => <span key={name} className="inline-flex items-center gap-1.5 text-xs"><span aria-hidden="true" className={`size-2 rounded-full ${color}`} />{name}</span>)}</span></dd></div>
                <div className="pt-4"><dt className="text-[10px] uppercase tracking-[0.18em] text-[#806b43]">Who we plan for</dt><dd className="mt-1">Hosts and their guests, sponsors, donors, assistants booking for someone else, and production teams.</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        <section aria-labelledby="new-stage-heading" className="border-y border-[#ded7ca] bg-[#eeebe3] py-14 md:py-20">
          <div className={`${wrap} grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16`}>
            <div><Eyebrow>A different arrival</Eyebrow><h2 id="new-stage-heading" className={`${heading} mt-4`}>A new stage<br />for the Honors.</h2></div>
            <div className={prose}>
              <p>For decades, the Honors have been associated with the Kennedy Center’s riverfront setting in Foggy Bottom. In 2026, the 49th ceremony moves to Capital One Arena in the middle of downtown.</p>
              <p>That changes the evening for anyone who’s been before. The familiar riverfront arrival gives way to a working downtown on a Monday evening, with closures that may only be confirmed that week.</p>
              <p className="text-xl text-[#211f1b] [font-family:var(--font-heading),Georgia,serif]">It’s a night that rewards a plan.</p>
            </div>
          </div>
        </section>

        <section id="hosting" aria-labelledby="hosting-heading" className={`${wrap} scroll-mt-28 py-16 md:py-24`}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#d6d0c4] md:aspect-[5/4]">
                <Image src={photos.guests} alt="Premier chauffeur service" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-center" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-7 left-7 right-7 text-2xl leading-snug text-white [font-family:var(--font-heading),Georgia,serif]">The welcome begins<br />before the evening does.</p>
              </div>
              <div className="relative ml-6 border-l-2 border-[#957e5e] bg-[#eeebe3] px-6 py-5 sm:ml-10"><p className="text-xs uppercase tracking-[0.15em] text-[#806b43]">One quote · One invoice · One lead</p></div>
            </div>
            <div><Eyebrow>For hosts, sponsors & guests</Eyebrow><h2 id="hosting-heading" className={`${heading} mt-4`}>Hosting guests<br />that night.</h2>
              <div className={`${prose} mt-7`}>
                <p>Hosting a table means looking after your guests from the moment they land until they’re back at their hotel, often with a dinner before the show or a reception after it.</p>
                <p>Send us the guest list, the hotels and the evening’s schedule, and we’ll plan every car around it, with everything kept inside your budget.</p>
                <p>Your guests ride in chauffeured sedans and SUVs, and when the whole party moves together, a Sprinter, Mini Bus or coach.</p>
                <p>You get one quote and one invoice, and a Client Experience Lead who builds the plan with you and is on the ground on December 7.</p>
              </div><Button className="mt-8">Plan your guests’ evening</Button>
            </div>
          </div>
        </section>

        <section id="production" aria-labelledby="production-heading" className="scroll-mt-28 bg-[#151713] py-16 text-white md:py-24">
          <div className={wrap}>
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <div><Eyebrow light>Beyond show night</Eyebrow><h2 id="production-heading" className={`${heading} mt-4`}>Talent, crew<br />and rehearsal week.</h2>
                <div className="mt-7 space-y-5 text-base leading-8 text-white/75 md:text-lg">
                  <p>Rehearsals start in the days before December 7, and talent and crews move between airports, hotels and the arena that week. When call times shift, your Client Experience Lead reworks the cars around the new schedule.</p>
                  <p>We arrange it as one plan: arrivals at Reagan National, Dulles, BWI or the private terminals, hotel-to-arena runs built around the rehearsal schedule, show night, and departures once it’s over.</p>
                  <p>Talent rides in a chauffeured sedan or SUV, and crew and band move together in a Sprinter or Mini Bus. It all sits on one quote.</p>
                </div><Button outline className="mt-8">Send us your schedule</Button>
              </div>
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#282a24] lg:aspect-[4/5]"><Image src={photos.production} alt="A journey prepared by Premier" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" /></div>
                <ol aria-label="Transport planning stages" className="mt-6 grid grid-cols-3 gap-2 border-t border-white/20 pt-5 text-[10px] uppercase tracking-[0.12em] text-[#dfc69b]"><li>Airport arrivals</li><li className="text-center">Rehearsals</li><li className="text-right">Show & departure</li></ol>
              </div>
            </div>
          </div>
        </section>

        <section id="arrival-guide" aria-labelledby="arrival-heading" className={`${wrap} scroll-mt-28 py-16 md:py-24`}>
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div><Eyebrow>The arrival guide</Eyebrow><h2 id="arrival-heading" className={`${heading} mt-4`}>Getting to<br />Capital One Arena.</h2>
              <p className="mt-6 text-base leading-8 text-[#57534d]">The arena sits on F Street NW between 6th and 7th Streets, right where Chinatown meets Penn Quarter.</p>
              <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className={`mt-7 inline-flex min-h-11 items-center gap-4 border-b border-[#957e5e]/50 text-sm text-[#806b43] ${focus}`}>Arena directions & parking<Arrow /></a>
            </div>
            <div className="divide-y divide-[#d9d1c3] border-t border-[#d9d1c3]">{approaches.map((item) => (
              <article key={item.title} className="grid gap-4 py-7 sm:grid-cols-[145px_1fr] sm:gap-7">
                <p className="pt-1 text-[10px] font-medium leading-6 tracking-[0.15em] text-[#806b43]">{item.label}</p>
                <div><h3 className="text-xl font-normal leading-snug tracking-tight md:text-2xl">{item.title}</h3><p className="mt-3 text-base leading-8 text-[#57534d]">{item.text}</p></div>
              </article>
            ))}</div>
          </div>
          <div className="mt-12 grid gap-8 border-t border-[#d9d1c3] pt-12 md:mt-16 md:grid-cols-2 md:gap-16">
            <article><Eyebrow>After the applause</Eyebrow><h2 className="mt-4 text-3xl font-normal leading-tight tracking-tight">Drop-off, parking<br />and the ride home.</h2><div className={`${prose} mt-6`}>
              <p>When a show lets out, the blocks around 7th and F fill up fast. Consult the arena’s <ExternalLink href={DIRECTIONS}>directions page</ExternalLink> for current access information; your pickup plan should be agreed before the evening begins.</p>
              <p>Before the show, we choose where each chauffeur will wait, close by but clear of the busiest block, and every guest knows where to find their car before they go in.</p>
              <p>If closures move things, we move the meeting point and tell you.</p>
              <p>If guests are driving themselves, check the arena’s garage information and its SpotHero link for parking nearby. Availability can vary, so check again close to the date.</p>
            </div></article>
            <article className="self-start border border-[#d7cbb5] bg-[#eeebe3] p-7 md:p-9"><Eyebrow>Plan for the city, too</Eyebrow><h2 className="mt-4 text-3xl font-normal tracking-tight">Road closures.</h2><div className={`${prose} mt-6`}>
              <p>Big nights downtown can bring street closures and security perimeters, and the details are usually confirmed only a few days out.</p>
              <p>For a red-carpet event at the arena in 2022, MPD closed F Street between 6th and 7th Streets. Past restrictions are a planning reminder, not a prediction of this year’s closures.</p>
              <p>Traffic advisories for special events go up in <ExternalLink href={MPD}>MPD’s newsroom</ExternalLink>, and we check it daily in the week before December 7 and plan routes around what’s announced.</p>
            </div></article>
          </div>
        </section>

        <section id="ways-to-book" aria-labelledby="booking-heading" className="scroll-mt-28 bg-[#e9e2d5] py-16 md:py-20">
          <div className={wrap}>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><Eyebrow>Start with what you need</Eyebrow><h2 id="booking-heading" className={`${heading} mt-4`}>Ways to book.</h2></div><p className="max-w-[340px] text-base leading-7 text-[#57534d]">A single arrival or an entire week.<br />We’ll take it from here.</p></div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <article className="flex flex-col border border-[#cec1ab] bg-[#f8f6f1] p-7 md:p-8"><Eyebrow>Private travel</Eyebrow><h3 className="mt-5 text-3xl font-normal leading-tight tracking-tight">One car, or<br />a few people.</h3><p className="mb-8 mt-5 text-base leading-7 text-[#57534d]">Reserve online, or call <a href={PHONE} className={`whitespace-nowrap underline decoration-[#957e5e]/50 underline-offset-4 ${focus}`}>+1-888-412-9150</a>.</p><Button href={BOOKING} className="mt-auto w-full">Reserve a car</Button></article>
              <article className="flex flex-col border border-[#151713] bg-[#151713] p-7 text-white md:p-8"><Eyebrow light>Hosted & group travel</Eyebrow><h3 className="mt-5 text-3xl font-normal leading-tight tracking-tight">A whole table,<br />or a whole evening.</h3><p className="mb-8 mt-5 text-base leading-7 text-white/75">A company’s evening or a production: tell us who’s coming and when, and we’ll build the plan around your budget.</p><Button className="mt-auto w-full">Tell us about your night</Button></article>
              <article className="flex flex-col border border-[#cec1ab] bg-[#f8f6f1] p-7 md:p-8"><Eyebrow>Venue & partner teams</Eyebrow><h3 className="mt-5 text-3xl font-normal leading-tight tracking-tight">Working<br />the event itself.</h3><p className="mb-8 mt-5 text-base leading-7 text-[#57534d]">Venue, production and partner teams: we’ll plan arrivals and the ride home around your curb and your schedule.</p><Button className="mt-auto w-full">speak with our client experience team</Button></article>
            </div>
          </div>
        </section>

        <section aria-labelledby="assistants-heading" className={`${wrap} grid gap-7 py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-20`}>
          <div><Eyebrow>For the person behind the plan</Eyebrow><h2 id="assistants-heading" className="mt-4 text-3xl font-normal leading-tight tracking-tight md:text-4xl">Booking for your boss<br />or your guests?</h2></div>
          <div className={prose}><p>Assistants and hosts book with us for someone else all the time. Send the guest’s name, hotel and where they need to be that night, and we’ll take it from there.</p><p>Looking after donors or VIPs for an organization? Send them this page. They book with us directly, so your team doesn’t have to arrange their cars.</p></div>
        </section>

        <section id="questions" aria-labelledby="questions-heading" className="scroll-mt-28 border-t border-[#ded7ca] bg-white py-16 md:py-20">
          <div className={`${wrap} grid gap-9 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
            <div><Eyebrow>Before the evening</Eyebrow><h2 id="questions-heading" className={ `${heading} mt-4` }>Questions about the Honors at Capital One Arena.</h2><a href={PHONE} className={`mt-7 inline-flex min-h-11 items-center gap-3 text-sm text-[#806b43] ${focus}`}>Talk it through with us<Arrow /></a></div>
            <div className="divide-y divide-[#ded7ca] border-y border-[#ded7ca]">{questions.map(({ question, answer, href, link }) => <details key={question} className="group py-1"><summary className={`flex min-h-[76px] cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-medium leading-7 [&::-webkit-details-marker]:hidden ${focus}`}><span>{question}</span><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-[#806b43]"><path d="M4 12h16" /><path d="M12 4v16" className="group-open:hidden" /></svg></summary><div className="pb-6 pr-8 text-base leading-8 text-[#57534d]"><p>{answer}</p>{href && <p className="mt-3"><ExternalLink href={href}>{link}</ExternalLink></p>}</div></details>)}</div>
          </div>
        </section>

        <section aria-labelledby="closing-heading" className="relative isolate bg-[#111310] text-white [clip-path:inset(0)]">
          {/* No transformed ancestor: desktop image stays fixed, clipped to this box. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 md:fixed motion-reduce:!absolute"><Image src={photos.closing} alt="" fill sizes="100vw" className="object-cover object-center" /></div>
          {/* Overlay belongs to the section, so it always covers its complete height. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-black/75" />
          <div className={`${wrap} flex flex-col justify-between gap-9 py-16 md:py-20 lg:flex-row lg:items-end`}>
            <div className="max-w-[650px]"><Eyebrow light>Monday, December 7 · Washington, DC</Eyebrow><h2 id="closing-heading" className={`${heading} mt-5`}>From the first arrival<br />to the last ride home.</h2><p className="mt-5 text-lg leading-8 text-white/75">Share the schedule. We’ll look after the movement.</p></div><Button className="self-start lg:shrink-0">Plan your guests’ evening</Button>
          </div>
        </section>
        <div className={`${wrap} py-8`}>
          <p className="max-w-[1000px] text-xs leading-6 text-[#686259]">Premier is an independent chauffeur company and isn’t connected to the Kennedy Center, the Kennedy Center Honors or Capital One Arena. Event details come from public announcements and should be checked again close to the date.</p>
          <p className="mt-3 text-xs leading-6 text-[#686259]">Event information checked November 21, 2026. <ExternalLink href={ANNOUNCEMENT}>Official ceremony announcement</ExternalLink> · <ExternalLink href={DIRECTIONS}>Venue information</ExternalLink> · <ExternalLink href={MPD}>Traffic advisories</ExternalLink></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
