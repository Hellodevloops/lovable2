import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Working with LuxeHire has been a seamless experience. Their deep understanding of hiring requirements and ability to deliver precisely aligned profiles sets them apart. The end-to-end recruitment process is handled with clarity, efficiency, and professionalism. Consistent responsiveness and a strong focus on quality make LuxeHire a trusted partner for luxury recruitment.",
    author: "Tavishi Suneja",
    company: "HR at Reliance Brands Ltd.",
  },
  {
    quote:
      "It has been a pleasure partnering with LuxeHire over the past two years. Their expertise in luxury retail and corporate recruitment is truly top-tier. With a deep understanding of the industry and a consistent ability to deliver high-quality talent, LuxeHire has proven to be a valuable hiring partner. I highly recommend LuxeHire to brands seeking a strategic, reliable recruitment partner to build high-performing teams.",
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
