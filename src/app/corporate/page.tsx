import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CorporateMobility from "@/components/corporate/CorporateMobility";

export const metadata: Metadata = {
  title:
    "Corporate Mobility & Roadshows | Premier International Transportation",
  description:
    "Composed mobility for companies on the move. Corporate roadshows, conferences, and events, carefully coordinated from the first itinerary to the final invoice.",
};
export default function CorporatePage() {
  return (
    <>
      <Navbar />
      <CorporateMobility />
      <Footer />
    </>
  );
}
