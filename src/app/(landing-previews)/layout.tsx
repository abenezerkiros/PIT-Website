import type { Metadata } from "next";
import "./landing-previews.css";

// Comparison pages should not compete with the public homepage in search.
export const metadata: Metadata = {
  title: "Premier | Landing Page Design Options",
  robots: { index: false, follow: false },
};

export default function LandingPreviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="premier-landing-preview">{children}</div>;
}
