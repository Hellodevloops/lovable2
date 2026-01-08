import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Boutique Approach",
    description: "A personalised, high-touch service tailored to the distinctive needs of luxury brands.",
  },
  {
    icon: Users,
    title: "Elite Talent Network",
    description: "Exclusive access to a meticulously curated network of exceptional luxury professionals.",
  },
  {
    icon: Shield,
    title: "Discretion & Excellence",
    description: "Confidential partnerships that honour your brand's prestige and exacting standards.",
  },
  {
    icon: Globe,
    title: "Global Presence",
    description: "Serving premier luxury markets worldwide with deep regional expertise.",
  },
];

export const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 lg:py-28 relative bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-primary text-xs font-medium tracking-luxury uppercase mb-4">
            Why LuxeHire
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-6">
            The Art of Luxury Recruitment
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            We recognise that luxury recruitment is an art form. Our boutique philosophy combines 
            profound industry insight with meticulous attention, ensuring seamless alignment of 
            culture, capability, and vision.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="luxury-card p-6 md:p-8 rounded-sm text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-base md:text-lg mb-3">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
