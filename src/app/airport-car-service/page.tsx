import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE = "https://www.pitdrives.com";
const URL = `${SITE}/airport-car-service`;
const BOOK = "https://book.mylimobiz.com/v4/pittransportation";
// Existing public-site images. Swap these for your preferred airport photographs.
const IMAGES = { hero: "/executive-in-airport.webp", team: "/reciving-guest-airport.webp", closing: "/final.jpg" };
const title = "Airport Car Service DC: Dulles, Reagan & BWI | Premier";
const description = "Chauffeured car service at Dulles, Reagan National and BWI, for one traveler or a whole team on different flights, planned around your budget.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: URL },
  openGraph: { type: "website", url: URL, title, description, siteName: "Premier International Transportation", images: [{ url: `${SITE}${IMAGES.hero}`, alt: "Premier International Transportation" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE}${IMAGES.hero}`] },
};
const shell = "mx-auto w-full max-w-[1440px] px-6 md:px-12 xl:px-[72px]";
const heading = "text-[clamp(2.25rem,4.5vw,4.5rem)] font-normal leading-[1.06] tracking-[-0.035em] [text-wrap:balance]";
const body = "text-lg leading-[1.85] md:text-xl";
const inline = "underline decoration-[#957e5e]/50 underline-offset-4 transition-colors hover:text-[#957e5e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#957e5e]";
function Arrow() { return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>; }
function Label({ children }: { children: ReactNode }) { return <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#ad9061]">{children}</p>; }
function Button({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
  return <a href={href} {...(href === BOOK ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`group inline-flex min-h-14 max-w-full items-center justify-between gap-6 border px-6 py-4 text-sm font-medium leading-6 transition-colors duration-300 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227] ${outline ? "border-white/30 text-white hover:bg-white/10" : "border-[#957e5e] bg-[#957e5e] text-white hover:border-[#ad9061] hover:bg-[#ad9061]"}`}><span>{children}</span><Arrow /></a>;
}
function External({ href, children }: { href: string; children: ReactNode }) { return <a className={inline} href={href} target="_blank" rel="noopener noreferrer">{children}</a>; }
const faqs = [
  ["How do I find my chauffeur when I land?", "Your chauffeur’s name and contact details are sent ahead of the pickup, to you or to whoever booked the car, so you can call them directly when you land."],
  ["How far is Dulles from downtown DC?", "About 26 miles, according to the airport."],
  ["How long is the drive from BWI to Washington, DC?", "About 45 minutes by the airport’s estimate, and longer at rush hour."],
  ["Is the cell phone lot at Reagan National open?", "Not right now. The airport closed it during roadway construction and says its Parking 1 and Parking 2 garages are free for up to 60 minutes instead. Check the airport’s current guidance before traveling."],
  ["Can you meet a private flight?", "Yes. Send us the tail number, the private terminal and the expected arrival time, and your chauffeur waits there."],
  ["Can you plan cars for a group landing at different airports?", "Yes. We plan all the arrivals together as one set, inside your budget."],
];
const schema = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${URL}#webpage`, url: URL, name: title, description, isPartOf: { "@id": `${SITE}/#website` }, breadcrumb: { "@id": `${URL}#breadcrumb` }, mainEntity: { "@id": `${URL}#service` } },
    { "@type": "Service", "@id": `${URL}#service`, name: "Airport Chauffeur Service at Dulles, Reagan National and BWI", serviceType: "Airport chauffeur transportation", url: URL, description, provider: { "@id": `${SITE}/#organization` }, areaServed: ["Washington, DC", "Northern Virginia", "Maryland"], audience: { "@type": "Audience", audienceType: "Travelers, executive assistants, travel managers, protocol offices and hotel teams" } },
    { "@type": "BreadcrumbList", "@id": `${URL}#breadcrumb`, itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Airport Chauffeur Service", item: URL } ] },
  ],
};

export default function AirportCarServicePage() {
  return <>
    <Navbar />
    <main id="top" className="overflow-x-clip bg-[#f5f3ee] text-[#20201e]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="relative isolate overflow-hidden bg-[#101112] text-white">
        <div className="absolute inset-0 -z-10"><Image src={IMAGES.hero} alt="" fill priority sizes="100vw" className="object-cover object-center" /><div className="absolute inset-0 bg-black/65" /><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" /></div>
        <div className={`${shell} pb-12 pt-8 md:pb-16`}>
          <nav aria-label="Breadcrumb" className="mb-16 flex flex-wrap gap-3 text-xs text-white/65 md:mb-24"><a href="/" className="hover:text-white">Home</a><span aria-hidden="true">/</span><span aria-current="page">Airport chauffeur service</span></nav>
          <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <div><Label>Washington arrivals · Premier</Label>
              <h1 className="max-w-[850px] text-[clamp(2.65rem,5.5vw,5.5rem)] font-normal leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">Airport Chauffeur Service at Dulles, Reagan National and BWI</h1>
              <p className="mt-7 max-w-[620px] text-xl leading-relaxed text-white/80 md:text-2xl">From landing to the flight home, your traveler&apos;s whole visit arranged together.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Button href={BOOK}>Reserve a car</Button><Button href="tel:+18884129150" outline>Call +1-888-412-9150</Button></div>
            </div>
            <div><div className="border border-white/20 bg-black/40 p-6 backdrop-blur-md md:p-8">
              <p className="mb-6 text-[10px] uppercase tracking-[0.24em] text-white/60">Three airports. One considered plan.</p>
              {[['IAD','Washington Dulles','iad'],['DCA','Reagan National','dca'],['BWI','BWI Marshall','bwi']].map(([code,name,id]) => <a key={code} href={`#${id}`} className="group flex items-center justify-between gap-4 border-t border-white/15 py-5 hover:text-[#dfbf84]"><span className="font-mono text-3xl tracking-wider">{code}</span><span className="flex-1 text-sm text-white/75">{name}</span><Arrow /></a>)}
              <a href="/#contact" className="mt-5 block border-t border-[#ad9061]/60 pt-5 text-sm leading-6 text-[#dfbf84] hover:text-white">Bringing in a team?<br /><span className="inline-flex items-center gap-3">Plan your group&apos;s arrivals <Arrow /></span></a>
            </div></div>
          </div>
        </div>
      </section>

      <section className={`${shell} py-16 md:py-24`}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div><Label>The whole visit, considered</Label><div className={`${body} space-y-6`}><p>Premier International Transportation is a Washington, DC chauffeur company. We pick up <a href="/executives" className={inline}>executives</a>, <a href="/diplomatic" className={inline}>diplomats</a> and visiting teams at Dulles, Reagan National, BWI and the private aviation terminals.</p><p>Send us the flight, where your traveler is going and a budget for the trip, and we&apos;ll plan every leg of the visit to fit it.</p></div></div>
          <div><dl className="divide-y divide-black/10 border-y border-black/10 text-sm leading-7">{[
            ["Airports", "Washington Dulles (IAD), Reagan National (DCA), BWI Marshall (BWI) and their private aviation terminals"],
            ["Areas", "Washington, DC, Northern Virginia and Maryland"],
            ["Vehicles", "Sedans, SUVs, Sprinters, Mini Buses and coaches"],
            ["Who books with us", "Travelers, executive assistants, travel managers, protocol offices and hotel teams"],
          ].map(([label,value]) => <div key={label} className="py-4"><dt className="mb-1 text-xs font-medium uppercase tracking-widest text-[#806b43]">{label}</dt><dd>{value}</dd></div>)}<div className="py-4"><dt className="text-xs uppercase tracking-widest text-[#806b43]">Call us 24 hours a day</dt><dd><a href="tel:+18884129150" className={inline}>+1-888-412-9150</a></dd></div></dl></div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/60">
        <div className={`${shell} grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-24`}>
          <div><Label>Before you land</Label><h2 className={heading}>How an airport pickup works with us</h2></div>
          <div><div className={`${body} space-y-6 text-black/70`}><p>Add the flight number to the booking, along with your traveler&apos;s first stop after landing. When you book more than a day ahead, your chauffeur&apos;s name and contact details reach you at least 24 hours before the pickup.</p><p>Dinner that evening, a meeting the next morning and the flight home can be booked at the same time, so nothing has to be arranged twice.</p></div></div>
        </div>
      </section>

      <section aria-labelledby="airports-heading" className={`${shell} py-16 md:py-24`}>
        <div><Label>Your arrival airport</Label><h2 id="airports-heading" className={`${heading} mb-12 max-w-[800px]`}>Three gateways.<br />The same care.</h2></div>
        <div className="divide-y divide-black/15 border-y border-black/15">
          <article id="iad" className="scroll-mt-28 py-10 md:py-14"><div><div className="grid gap-6 md:grid-cols-[110px_1fr] lg:grid-cols-[160px_0.9fr_1.1fr] lg:gap-10"><span aria-hidden="true" className="font-mono text-5xl tracking-tight text-[#957e5e] md:text-6xl">IAD</span><h3 className="max-w-[400px] text-3xl font-normal leading-tight md:text-4xl">Dulles airport car service (IAD)</h3><div className={`${body} space-y-5 text-black/70 md:col-start-2 lg:col-auto`}><p>Dulles is <External href="https://www.flydulles.com/airport-overview">about 26 miles from downtown Washington</External>, the airport says, and weekday traffic can stretch that drive, so we time Dulles pickups around rush hour.</p><p>Dulles requires sedan and limousine pickups to be reserved ahead of time, so book the car before the flight lands.</p></div></div></div></article>
          <article id="dca" className="scroll-mt-28 py-10 md:py-14"><div><div className="grid gap-6 md:grid-cols-[110px_1fr] lg:grid-cols-[160px_0.9fr_1.1fr] lg:gap-10"><span aria-hidden="true" className="font-mono text-5xl tracking-tight text-[#957e5e] md:text-6xl">DCA</span><h3 className="max-w-[400px] text-3xl font-normal leading-tight md:text-4xl">Reagan airport car service (DCA)</h3><div className={`${body} space-y-5 text-black/70 md:col-start-2 lg:col-auto`}><p>Reagan National is the closest airport to downtown. Its terminals were renamed in 2022: the old Terminal A is now Terminal 1, and the old Terminals B and C are now Terminal 2. The two have separate curbs, so it helps to know which one your traveler lands at.</p><p>The airport&apos;s <External href="https://www.flyreagan.com/parking-transportation/parking-information/cell-phone-lot-closed">cell phone lot is closed</External> during roadway construction. With the chauffeur&apos;s number in hand before landing, your traveler can call and find the car.</p></div></div></div></article>
          <article id="bwi" className="scroll-mt-28 py-10 md:py-14"><div><div className="grid gap-6 md:grid-cols-[110px_1fr] lg:grid-cols-[160px_0.9fr_1.1fr] lg:gap-10"><span aria-hidden="true" className="font-mono text-5xl tracking-tight text-[#957e5e] md:text-6xl">BWI</span><h3 className="max-w-[400px] text-3xl font-normal leading-tight md:text-4xl">BWI car service to and from Washington, DC</h3><div className={`${body} text-black/70 md:col-start-2 lg:col-auto`}><p>BWI is <External href="https://bwiairport.com/to-and-from-bwi/transportation/regional-destinations/washington-dc/">about 45 minutes from Washington by car</External>, by the airport&apos;s own estimate, and longer at rush hour. We bring travelers from BWI into DC, Northern Virginia or Montgomery County, and back out for the departure.</p></div></div></div></article>
        </div>
        <div><aside className="mt-10 grid gap-5 border-l-2 border-[#957e5e] bg-[#eae5db] p-7 md:grid-cols-[1fr_2fr] md:gap-12 md:p-10"><h3 className="text-3xl font-normal">Private jet arrivals</h3><p className={`${body} text-black/70`}>Not every principal comes through the main terminal. Send us the tail number, the private terminal and the expected arrival time, and we plan the pickup there instead of the main curb.</p></aside></div>
      </section>

      <section className="bg-[#121513] text-white">
        <div className={`${shell} grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-20`}>
          <div><div className="relative aspect-[4/5] max-h-[650px] overflow-hidden bg-[#262b26]"><Image src={IMAGES.team} alt="Premier transportation coordination" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" /><p className="absolute bottom-8 left-8 right-8 text-3xl leading-tight text-white" style={{fontFamily:"var(--font-heading), Georgia, serif"}}>Different flights.<br />One arrivals plan.</p></div></div>
          <div><Label>Arriving together, even when you don&apos;t</Label><h2 className={heading}>When a team lands on different flights</h2><div className={`${body} mt-8 space-y-6 text-white/75`}><p><a href="/corporate" className={inline}>Conference teams</a> and delegations often land on different flights, sometimes at different airports.</p><p>Send us every flight and every hotel, and we work out which car meets which flight, from a chauffeured sedan or SUV for the principals to a Sprinter, Mini Bus or coach for the team.</p><p>Every car is priced to fit your budget on one all-inclusive quote. When a flight time changes, your Client Experience Lead updates the pickups with you.</p></div><div className="mt-9"><Button href="/#contact">Plan your group&apos;s arrivals</Button></div></div>
        </div>
      </section>

      <section className={`${shell} py-16 md:py-24`}>
        <div><div className="grid gap-8 lg:grid-cols-2 lg:gap-24"><div><Label>Beyond the terminal</Label><h2 className={heading}>Where we pick up and drop off</h2></div><div><p className={`${body} text-black/70`}>We drive to and from all three airports across Washington, DC, Northern Virginia and Maryland, from Bethesda, Silver Spring and College Park to Arlington, Alexandria, Tysons, Reston and Ashburn.</p><div className="mt-7 flex flex-wrap gap-2">{['Washington, DC','Northern Virginia','Maryland'].map(area => <span key={area} className="border border-[#957e5e]/35 px-4 py-2 text-xs uppercase tracking-wider text-[#806b43]">{area}</span>)}</div></div></div></div>
      </section>

      <section id="airport-booking" className="scroll-mt-28 bg-[#e9e2d5]">
        <div className={`${shell} py-16 md:py-24`}><div><Label>Make the next move</Label><h2 className={`${heading} mb-12`}>Ways to book</h2></div><div className="grid gap-5 md:grid-cols-2">
          <div className="border border-black/15 bg-[#f9f7f2] p-7 md:p-10"><p className="mb-8 text-xs uppercase tracking-widest text-[#806b43]">Individual journeys</p><h3 className="text-4xl font-normal">One traveler</h3><p className={`${body} mb-8 mt-5`}>Reserve online, or call <a className={`${inline} whitespace-nowrap`} href="tel:+18884129150">+1-888-412-9150</a>.</p><Button href={BOOK}>Reserve a car</Button></div>
          <div className="bg-[#151816] p-7 text-white md:p-10"><p className="mb-8 text-xs uppercase tracking-widest text-[#c5ad85]">Coordinated arrivals</p><h3 className="text-4xl font-normal">A group, or several arrivals</h3><p className={`${body} mb-8 mt-5 text-white/75`}>Send us the flight list and the hotels, and you&apos;ll get back one arrivals plan, priced inside your budget.</p><Button href="/#contact">Tell us about your arrivals</Button></div>
        </div></div>
      </section>

      <section className={`${shell} py-16 md:py-24`}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div><Label>Ahead of the journey</Label><h2 className={heading}>Questions about airport pickups in Washington, DC</h2></div><div className="border-t border-black/15">{faqs.map(([question,answer]) => <details key={question} className="group border-b border-black/15 py-6"><summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium leading-relaxed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#957e5e] [&::-webkit-details-marker]:hidden"><span>{question}</span><span aria-hidden="true" className="mt-1 text-[#806b43] group-open:hidden">+</span><span aria-hidden="true" className="mt-1 hidden text-[#806b43] group-open:block">−</span></summary><p className="mt-4 max-w-[650px] text-lg leading-relaxed text-black/65">{answer}</p></details>)}</div></div>
      </section>

      <section className="relative isolate bg-[#101112] text-white [clip-path:inset(0)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 md:fixed motion-reduce:!absolute"><Image src={IMAGES.closing} alt="" fill sizes="100vw" className="object-cover object-center" /></div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-black/75" />
        <div className={`${shell} py-20 md:py-28`}><div><div className="max-w-[900px]"><Label>For the person making the arrangements</Label><h2 className={heading}>Booking for an executive, a guest or a delegation?</h2><p className={`${body} mt-8 text-white/80`}>Many airport pickups are booked by an executive assistant, a travel manager, a protocol office or <a href="/hotels" className={inline}>a hotel team</a>. Tell us who&apos;s flying in, their flight and their first stop, and the confirmation and the chauffeur&apos;s details come straight to you. Your traveler can also book with us directly.</p><div className="mt-9"><Button href="/#contact">Tell us about your arrivals</Button></div></div></div></div>
      </section>
      <div className={`${shell} py-8`}><p className="max-w-[1100px] text-xs leading-6 text-black/55">Premier is an independent chauffeur company and isn&apos;t connected to the Metropolitan Washington Airports Authority, BWI Marshall Airport or the Maryland Aviation Administration. Airport details come from the airports&apos; own public pages and were last checked on November 27, 2026.</p></div>
    </main>
    <Footer />
  </>;
}
