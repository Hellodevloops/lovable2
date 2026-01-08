import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 lg:py-28 relative bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-primary text-xs font-medium tracking-luxury uppercase mb-4">
            About Us
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-6 leading-tight">
            Specialists in Luxury Retail Recruitment
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
            LuxeHire is a boutique executive search firm dedicated to the luxury retail sector. 
            Based in India with a global network, we specialise in placing senior leadership 
            for fashion houses, fine jewellery brands, premium beauty companies, and lifestyle labels.
          </p>
          <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t border-border">
            {[
              { value: "150+", label: "Placements" },
              { value: "50+", label: "Brands" },
              { value: "98%", label: "Retention" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl md:text-2xl lg:text-3xl font-serif text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
