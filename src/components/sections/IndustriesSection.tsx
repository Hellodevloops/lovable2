import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const industries = [
  {
    name: "Fashion & Apparel",
    description: "From haute couture to ready-to-wear, we understand the creative pulse of fashion.",
  },
  {
    name: "Fine Jewellery & Watches",
    description: "Heritage maisons to contemporary brands—crafting excellence in every detail.",
  },
  {
    name: "Luxury Retail",
    description: "Flagship boutiques to omnichannel experiences, elevating customer journeys.",
  },
  {
    name: "Beauty & Cosmetics",
    description: "Premium beauty brands seeking leaders who understand luxury aesthetics.",
  },
  {
    name: "Hospitality & Travel",
    description: "Ultra-luxury hotels, private aviation, and bespoke travel experiences.",
  },
  {
    name: "Automotive & Yachts",
    description: "Prestige automobiles and superyachts demanding exceptional leadership.",
  },
];

export const IndustriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="industries" className="py-16 md:py-24 lg:py-32 bg-secondary relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Left - Heading */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32 lg:h-fit"
          >
            <p className="text-primary text-xs md:text-sm font-medium tracking-luxury uppercase mb-3 md:mb-4">
              Industries We Serve
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-6 leading-tight">
              Deep Expertise in{" "}
              <span className="text-gradient-taupe italic">Luxury Sectors</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              Our specialisation in luxury means we understand the subtle 
              differences between sectors—and the unique leadership qualities 
              each demands. Whether it's creative vision in fashion or precision 
              in watchmaking, we find leaders who fit perfectly.
            </p>
            <a href="#contact" className="btn-luxury inline-block text-xs">
              Discuss Your Needs
            </a>
          </motion.div>

          {/* Right - Industries Grid */}
          <div className="space-y-3 md:space-y-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="luxury-card p-5 md:p-6 rounded-sm group cursor-default"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-base md:text-lg mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300">
                      {industry.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                  <span className="text-primary/30 font-serif text-xl md:text-2xl group-hover:text-primary/60 transition-colors duration-300 flex-shrink-0">
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
