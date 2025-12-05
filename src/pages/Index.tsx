import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PortfolioSection from "@/components/PortfolioSection";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <PortfolioSection />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
