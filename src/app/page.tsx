import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { HashScroll } from "@/components/HashScroll";
import About from "@/components/About";
import Ecosystem from "@/components/Ecosystem";
import WhyTrust from "@/components/WhyTrust";
import EngineeringPrinciples from "@/components/EngineeringPrinciples";
import Industries from "@/components/Industries";
import Portfolio from "@/components/Portfolio";
import Vision from "@/components/Vision";
import Testimonials from "@/components/Testimonials";
import EnterpriseCTA from "@/components/EnterpriseCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <HashScroll />
      <div className="grain-overlay" />
      <LoadingScreen />
      <CustomCursor />
      <main className="relative bg-melhek-dark overflow-x-hidden">
        <Navbar />
        <Hero />
        <StatsBar />
        <About />
        <Ecosystem />
        <WhyTrust />
        <EngineeringPrinciples />
        <Industries />
        <Portfolio />
        <Vision />
        <Testimonials />
        <EnterpriseCTA />
        <Contact />
        <Footer />
        
        {/* Global Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none -z-50">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-melhek-blue/5 blur-[150px] opacity-30" />
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-melhek-navy/20 blur-[150px] opacity-20" />
        </div>
      </main>
    </SmoothScroll>
  );
}
