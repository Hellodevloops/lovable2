import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail } from "lucide-react";

const leaders = [
  {
    name: "Pranshu Tiwari",
    role: "Co-Founder & Managing Partner",
    bio: "With over a decade of experience in luxury retail and executive search, Pranshu brings deep industry relationships and an unwavering commitment to excellence. His network spans leading fashion and jewellery houses across Asia and Europe.",
    email: "pranshu@luxehire.co",
    linkedin: "#",
  },
  {
    name: "Romil Trivedi",
    role: "Co-Founder & Partner",
    bio: "Romil specialises in strategic talent acquisition and leadership assessment. He has successfully placed senior executives across premium retail, hospitality, and lifestyle brands on a global scale.",
    email: "romil@luxehire.co",
    linkedin: "#",
  },
];

export const LeadershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leadership" className="py-16 md:py-24 lg:py-32 relative bg-cream-dark">
      <div className="section-divider mb-16 md:mb-24" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <p className="text-primary text-xs md:text-sm font-medium tracking-luxury uppercase mb-3 md:mb-4">
            Our Leadership
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-6">
            The Founders of LuxeHire
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base px-4">
            LuxeHire was founded by industry veterans who intimately understand the nuances of luxury talent acquisition. We unite deep market expertise with an authentic passion for connecting exceptional individuals with iconic brands.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="luxury-card rounded-sm overflow-hidden group"
            >
              {/* Placeholder for Photo */}
              <div className="h-48 md:h-64 bg-gradient-to-br from-secondary to-accent flex items-center justify-center relative overflow-hidden">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="font-serif text-2xl md:text-3xl text-primary">
                    {leader.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl mb-1">{leader.name}</h3>
                <p className="text-primary text-xs md:text-sm tracking-wide mb-3 md:mb-4">{leader.role}</p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 md:mb-6">
                  {leader.bio}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${leader.email}`}
                    className="p-2 border border-border rounded-sm hover:border-primary hover:text-primary transition-colors duration-300"
                    aria-label={`Email ${leader.name}`}
                  >
                    <Mail size={16} className="md:w-[18px] md:h-[18px]" />
                  </a>
                  <a
                    href={leader.linkedin}
                    className="p-2 border border-border rounded-sm hover:border-primary hover:text-primary transition-colors duration-300"
                    aria-label={`${leader.name}'s LinkedIn`}
                  >
                    <Linkedin size={16} className="md:w-[18px] md:h-[18px]" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
