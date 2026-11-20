import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExecutiveMobility from "@/components/executive/ExecutiveMobility";
import { ServiceStructuredData } from "@/components/StructuredData";

const title =
  "Executive Mobility | Premier International Transportation";

const description =
  "Executive mobility for today’s global leaders. Meticulous preparation, fully vetted chauffeurs, and coordinated movements that support your protection detail.";

const url = "https://www.pitdrives.com/executives";
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
        alt: "Premier International Transportation — Executive Mobility",
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

export default function ExecutivesPage() {
  return (
    <>
      <ServiceStructuredData service="executives" />
      <Navbar />
      <ExecutiveMobility />
      <Footer />
    </>
  );
}