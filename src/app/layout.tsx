import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BusinessStructuredData } from "@/components/StructuredData";

const geist = localFont({
  src: "../../public/fonts/Geist.ttf",
  variable: "--font-body",
  display: "swap",
});
const syarifa = localFont({
  src: "../../public/fonts/Syarifa.ttf",
  variable: "--font-body",
  display: "swap",
});
const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
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
  metadataBase: new URL("https://www.pitdrives.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
<body className={`${geist.variable} ${fraunces.variable}`}>
          <BusinessStructuredData />
        <SmoothScroll>{children}</SmoothScroll>
        <WhatsAppButton />
        <Script id="microsoft-clarity" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "zj66zd36sx");
  `}
</Script>
      </body>

      <GoogleAnalytics gaId="G-15HQWPC4H4" />
    </html>
  );
}