import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, TrendingUp, HandshakeIcon, Eye, Star, Globe } from "lucide-react";

const benefits = [
  {
    icon: Briefcase,
    title: "Exclusive Opportunities",
    description: "Access confidential positions with prestigious maisons that are never publicly advertised.",
  },
  {
    icon: TrendingUp,
    title: "Strategic Career Growth",
    description: "We focus on roles offering meaningful advancement aligned with your long-term aspirations.",
  },
  {
    icon: HandshakeIcon,
    title: "Bespoke Guidance",
    description: "Receive tailored counsel on positioning, interview preparation, and compensation negotiation.",
  },
  {
    icon: Eye,
    title: "Absolute Confidentiality",
    description: "Your career exploration remains entirely private—we never share details without your explicit consent.",
  },
  {
    icon: Star,
    title: "Sector Expertise",
    description: "Benefit from our profound understanding of luxury retail, fashion, and premium lifestyle sectors.",
  },
  {
    icon: Globe,
    title: "International Reach",
    description: "Connect with exceptional opportunities across India, the Middle East, Europe, and beyond.",
  },
];

export const ForCandidatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="for-candidates" className="py-20 lg:py-28 relative bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-primary text-xs font-medium tracking-luxury uppercase mb-4">
            For Talent
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-6">
            Elevate Your Career in Luxury
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Whether you are a seasoned executive or an emerging leader, we connect ambitious 
            professionals with extraordinary opportunities at the world's most coveted brands.
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
          <a href="/candidate-contact" className="btn-luxury-filled inline-block">
            Submit Your Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};
