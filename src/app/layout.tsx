import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";

const geist = localFont({
  src: "../../public/fonts/Geist.ttf",
  variable: "--font-body",
  display: "swap",
});

const fragmentGlare = localFont({
  src: "../../public/fonts/pp-fragment-glare.ttf",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxury Chauffeur Services | District of Columbia",
  description:
    "World class chauffeured transportation for the world's most important journeys.",
  verification: {
    google: "0BymdbqSeGKrj8pnYAuxMcXnZnNIEh-8UeO55GZZh2c",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${fragmentGlare.variable}`}>
        <SmoothScroll>{children}</SmoothScroll>
        <WhatsAppButton />
      </body>
    </html>
  );
}