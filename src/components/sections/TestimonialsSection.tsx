import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I've had the pleasure of working with Romil, and I must say his recruitment expertise truly stands out. He has an excellent understanding of requirements and always ensures that the profiles shared are well-aligned with the role. Romil manages the entire process seamlessly — from understanding the need to connecting with candidates end-to-end. His professional approach, responsiveness, and commitment to delivering quality work make him a reliable recruitment consultant to collaborate with",
    author: "Tavishi Suneja",
    company: "HR at Reliance Brands Ltd.",
  },
  {
    quote:
      "I've had the pleasure of partnering with Romil Trivedi for over two years, and he is a top tier professional in luxury retail and corporate recruitment. His deep understanding of the industry and ability to consistently deliver outstanding talent has been a tremendous asset. I highly recommend Romil to any brand looking for a strategic and reliable partner to build a high performing team.",
    author: "Kajal Tanwar",
    company: "Reliance Brands Limited | Bestseller Retail India | Oberoi Group of Hotels and Resorts",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <p className="text-primary text-xs md:text-sm font-medium tracking-luxury uppercase mb-3 md:mb-4">
            Client Stories
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="luxury-card p-6 md:p-8 rounded-sm relative"
            >
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-primary/30 mb-4 md:mb-6" />
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-6 md:mb-8 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4 md:pt-6">
                <p className="font-medium text-xs md:text-sm">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
