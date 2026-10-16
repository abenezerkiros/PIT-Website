import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotelMobility from "@/components/hotels/HotelMobility";

export const metadata: Metadata = {
  title: "Hotel Partnerships | Premier International Transportation",
  description:
    "Gracious mobility for distinguished hotels. Premier partners with your concierge team to care for every guest journey, from airport transfers to the last departure.",
};

export default function HotelsPage() {
  return (
    <>
      <Navbar />
      <HotelMobility />
      <Footer />
    </>
  );
}
