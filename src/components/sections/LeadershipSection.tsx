import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail } from "lucide-react";

import pranshuTiwariImage from "/assets/Pranshu-Tiwari.jpeg";
import romilTrivediImage from "/assets/RomilTrivedi.jpeg";

 const leaders = [
  {
    name: "Pranshu Tiwari",
    role: "Founder",
    bio: "Pranshu Tiwari brings a strategic, brand-first approach to luxury talent advisory, working across fashion, jewellery, watches, beauty, and lifestyle maisons. With experience in global market hiring and brand partnerships, he focuses on aligning top-tier talent with long-term brand vision. Pranshu is known for building strong leadership pipelines and fostering meaningful collaborations within the luxury ecosystem.",
    email: "pranshu@luxehire.co",
    linkedin: "https://www.linkedin.com/in/pranshu-tiwari-560610267/",
    image: pranshuTiwariImage,
  },
  {
    name: "Romil Trivedi",
    role: "Founder & CEO",
    bio: "Romil Trivedi is a luxury recruitment specialist with expertise in leadership and frontline hiring across global premium and luxury retail markets. With a strong understanding of brand DNA, customer experience, and retail operations, he partners with international luxury maisons and high-growth brands worldwide to deliver exceptional talent with speed, precision, and quality. Romil is recognised for his global network, market insight, and commitment to excellence.",
    email: "romil@luxehire.co",
    linkedin: "https://www.linkedin.com/in/romil-trivedi-4b5504231/",
    image: romilTrivediImage,
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
              <div className="h-64 md:h-80 bg-gradient-to-br from-secondary to-accent flex items-center justify-center relative overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10" />
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
                    target="_blank"
                    rel="noopener noreferrer"
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
