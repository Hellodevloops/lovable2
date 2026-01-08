import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Search, Users, Shield, Clock, Award } from "lucide-react";

const benefits = [
  {
    icon: Search,
    title: "Precision Executive Search",
    description: "We identify and engage distinguished candidates who embody your brand's culture and strategic vision.",
  },
  {
    icon: Users,
    title: "Exclusive Talent Access",
    description: "Gain entry to our private network of pre-qualified luxury professionals across all leadership tiers.",
  },
  {
    icon: Shield,
    title: "Absolute Discretion",
    description: "Confidential engagements that safeguard your brand's reputation and competitive position.",
  },
  {
    icon: Clock,
    title: "Expedited Delivery",
    description: "A refined process that presents exceptional shortlists within weeks, not months.",
  },
  {
    icon: Award,
    title: "Performance Assurance",
    description: "Our industry-leading placement guarantee protects your investment and ensures lasting success.",
  },
  {
    icon: Building2,
    title: "Brand Immersion",
    description: "We invest in understanding your brand essence to ensure impeccable cultural alignment.",
  },
];

export const ForClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="for-clients" className="py-20 lg:py-28 relative bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-primary text-xs font-medium tracking-luxury uppercase mb-4">
            For Brands
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-6">
            Building Exceptional Leadership Teams
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Whether you are expanding into new territories, assembling a leadership team, or 
            securing a pivotal hire, we deliver candidates who exemplify luxury excellence.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="luxury-card p-6 md:p-8 rounded-sm group"
            >
              <div className="w-12 h-12 mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <benefit.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-base md:text-lg mb-3">{benefit.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-luxury-filled inline-block">
            Discuss Your Requirements
          </a>
        </motion.div>
      </div>
    </section>
  );
};
