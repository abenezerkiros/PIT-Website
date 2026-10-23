import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DiplomaticMobility from "@/components/diplomatic/DiplomaticMobility";

export const metadata: Metadata = {
  title: "Diplomatic Mobility | Premier International Transportation",
  description:
    "Discreet mobility for those who represent nations. Chauffeur briefings, coordinated delegation transport, and attentive care throughout every movement.",
};

export default function DiplomaticPage() {
  return (
    <>
      <Navbar />
      <DiplomaticMobility />
      <Footer />
    </>
  );
}
