import HeroSection from "@/components/HeroSection";
import OurServices from "@/components/OurServices";
import ItSolutions from "@/components/ItSolutions";
import Fleet from "@/components/Fleet";
import AboutUs from "@/components/About";
import AirportCta from "@/components/AirportCta";
import Testimonials from "@/components/Testimonials";
import Faqs from "@/components/Faqs";
import GetAQuote from "@/components/GetAQuote";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutUsCopy from "@/components/About copy";
export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroSection />
      <OurServices/>
      <AboutUsCopy/>
      <ItSolutions/>
      <Fleet/>
      <AboutUs/>
      <AirportCta/>
      <Testimonials/>
      <Faqs/>
      <GetAQuote/>
      <Footer/>
    </main>
  );
}
