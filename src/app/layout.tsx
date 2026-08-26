import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Manrope is used for body text in the design.
// The design's heading font ("Neutral Face") isn't a standard web font —
// add it via a local @font-face or swap in a Google Font that matches, then
// wire it up in tailwind.config.ts under fontFamily.heading.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Luxury Chauffeur Services | District of Columbia",
  description:
    "Experience Washington in comfort, style & professional elegance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-body`}><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
