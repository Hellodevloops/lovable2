import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/luxury-showroom.jpg";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Luxury boutique showroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 lg:px-12 pt-20">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-primary text-xs md:text-sm tracking-luxury uppercase mb-6 font-medium"
          >
            Boutique Luxury Recruitment
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground font-medium leading-[1.1] mb-8"
          >
            Curating Talent for the{" "}
            <span className="text-primary italic">World's Finest</span>{" "}
            Brands
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          >
            Connecting iconic luxury brands with exceptional professionals across fashion, retail, jewelry, and lifestyle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a2332] text-white font-medium text-sm tracking-wider uppercase hover:bg-[#2a3342] transition-colors duration-300"
            >
              Hire With Us
              <ArrowRight size={18} />
            </a>
            <a 
              href="#for-candidates" 
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-foreground/20 text-foreground font-medium text-sm tracking-wider uppercase hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300"
            >
              Explore Opportunities
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
