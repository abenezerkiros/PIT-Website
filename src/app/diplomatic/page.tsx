import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DiplomaticMobility from "@/components/diplomatic/DiplomaticMobility";
import { ServiceStructuredData } from "@/components/StructuredData";

const title =
  "Diplomatic Mobility | Premier International Transportation";

const description =
  "Discreet mobility for those who represent nations. Chauffeur briefings, coordinated delegation transport, and attentive care throughout every movement.";

const url = "https://www.pitdrives.com/diplomatic";
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
        alt: "Premier International Transportation — Diplomatic Mobility",
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

export default function DiplomaticPage() {
  return (
    <>
      <ServiceStructuredData service="diplomatic" />
      <Navbar />
      <DiplomaticMobility />
      <Footer />
    </>
  );
}