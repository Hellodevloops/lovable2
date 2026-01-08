import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Target, Users2, Briefcase } from "lucide-react";

const services = [
  {
    icon: Crown,
    title: "Executive Search",
    description: "C-suite, VP, and Director placements for luxury brands.",
  },
  {
    icon: Target,
    title: "Talent Mapping",
    description: "Strategic intelligence on competitor talent landscapes.",
  },
  {
    icon: Users2,
    title: "Leadership Assessment",
    description: "In-depth evaluation for cultural and competency fit.",
  },
  {
    icon: Briefcase,
    title: "Boutique Placements",
    description: "Store managers, visual merchandisers, and client advisors.",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 lg:py-28 relative bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-primary text-xs font-medium tracking-luxury uppercase mb-4">
            Services
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium">
            What We Offer
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="luxury-card p-6 rounded-sm text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-base mb-2">{service.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
