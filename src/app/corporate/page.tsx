import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CorporateMobility from "@/components/corporate/CorporateMobility";
import { ServiceStructuredData } from "@/components/StructuredData";
const title =
  "Corporate Mobility & Roadshows | Premier International Transportation";

const description =
  "Composed mobility for companies on the move. Corporate roadshows, conferences, and events, carefully coordinated from the first itinerary to the final invoice.";

const url = "https://www.pitdrives.com/corporate";
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
        alt: "Premier International Transportation — Corporate Mobility & Roadshows",
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

export default function CorporatePage() {
  return (
    <>
      <ServiceStructuredData service="corporate" />
      <Navbar />
      <CorporateMobility />
      <Footer />
    </>
  );
}