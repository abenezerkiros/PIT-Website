import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotelMobility from "@/components/hotels/HotelMobility";
import { ServiceStructuredData } from "@/components/StructuredData";

const title =
  "Hotel Partnerships | Premier International Transportation";

const description =
  "Gracious mobility for distinguished hotels. Premier partners with your concierge team to care for every guest journey, from airport transfers to the last departure.";

const url = "https://www.pitdrives.com/hotels";
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
        alt: "Premier International Transportation — Hotel Partnerships",
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

export default function HotelsPage() {
  return (
    <>
      	<ServiceStructuredData service="hotels" />
      <Navbar />
      <HotelMobility />
      <Footer />
    </>
  );
}