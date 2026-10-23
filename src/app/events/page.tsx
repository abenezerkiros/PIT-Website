import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventMobility from "@/components/events/EventMobility";

export const metadata: Metadata = {
  title:
    "Wedding & Event Transportation | Premier International Transportation",
  description:
    "Effortless mobility for life’s defining days. Chauffeur service and coordinated guest transportation for weddings, galas, and celebrations.",
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <EventMobility />
      <Footer />
    </>
  );
}
