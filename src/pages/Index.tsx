import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ForClientsSection } from "@/components/sections/ForClientsSection";
import { ForCandidatesSection } from "@/components/sections/ForCandidatesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <BrandsSection />
        <StatsSection />
        <WhyUsSection />
        <ForClientsSection />
        <ForCandidatesSection />
        <TestimonialsSection />
        <LeadershipSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* WhatsApp Quick Contact - Update phone number as needed */}
      <WhatsAppButton phoneNumber="916355523072" />
    </div>
  );
};

export default Index;
