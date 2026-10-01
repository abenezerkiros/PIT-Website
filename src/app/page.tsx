import HeroSection from "@/components/HeroSectionTest";
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
import Booking from "@/components/Booking";
import GlobalStandard from "@/components/GlobalStandard";
import ConversationSection from "@/components/ConversationSection";
import PartnersSection from "@/components/PartnersSection";
export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroSection />

  
      <ItSolutions/>
      <GlobalStandard imageSrc="/globe-image.png" />
      <ConversationSection
  imageSrc="/capital-hill.jpg"
  contactHref="/contact"
/>
      <Fleet />
      <PartnersSection/>

  



      <GetAQuote/>
      <Footer/>
    </main>
  );
}
