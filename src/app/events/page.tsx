import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventMobility from "@/components/events/EventMobility";
import { ServiceStructuredData } from "@/components/StructuredData";

const title =
  "Wedding & Event Transportation | Premier International Transportation";

const description =
  "Effortless mobility for life’s defining days. Chauffeur service and coordinated guest transportation for weddings, galas, and celebrations.";

const url = "https://www.pitdrives.com/events";
const image = "https://www.pitdrives.com/hero.png";

export const metadata: Metadata = {
  title,
  description,

  alternates: {
    canonical: url,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Premier International Transportation",
    url,
    title,
    description,
    images: [
      {
        url: image,
        alt: "Premier International Transportation — Weddings & Events",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function EventsPage() {
  return (
    <>
      <ServiceStructuredData service="events" />
      <Navbar />
      <EventMobility />
      <Footer />
    </>
  );
}