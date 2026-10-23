import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExecutiveMobility from "@/components/executive/ExecutiveMobility";

export const metadata: Metadata = {
  title: "Executive Mobility | Premier International Transportation",
  description:
    "Executive mobility for today’s global leaders. Meticulous preparation, fully vetted chauffeurs, and coordinated movements that support your protection detail.",
};

export default function ExecutivesPage() {
  return (
    <>
      <Navbar />
      <ExecutiveMobility />
      <Footer />
    </>
  );
}
