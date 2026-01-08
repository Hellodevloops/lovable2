import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
  { name: "Tiffany & Co.", category: "Fine Jewellery" },
  { name: "Valentino", category: "Fashion & Couture" },
  { name: "Versace", category: "Luxury Fashion" },
  { name: "Bulgari", category: "Watches & Jewellery" },
  { name: "Cartier", category: "High Jewellery" },
  { name: "Hermès", category: "Luxury Maison" },
  { name: "Gucci", category: "Fashion House" },
  { name: "Prada", category: "Italian Fashion" },
  { name: "Louis Vuitton", category: "Luxury Goods" },
  { name: "Chanel", category: "Haute Couture" },
  { name: "Dior", category: "Fashion & Beauty" },
  { name: "Burberry", category: "British Luxury" },
];

export const BrandsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-muted-foreground text-xs tracking-luxury uppercase mb-10"
        >
          Trusted By Leading Brands
        </motion.p>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-secondary to-transparent z-10" />
        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-secondary to-transparent z-10" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex animate-marquee"
        >
          {/* First set of brands */}
          <div className="flex shrink-0">
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex flex-col items-center justify-center px-8 md:px-12 lg:px-16 py-4"
              >
                <span className="text-base md:text-lg lg:text-xl font-serif text-foreground/80 whitespace-nowrap">
                  {brand.name}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground/60 uppercase tracking-wide mt-1">
                  {brand.category}
                </span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex shrink-0">
            {brands.map((brand, index) => (
              <div
                key={`second-${index}`}
                className="flex flex-col items-center justify-center px-8 md:px-12 lg:px-16 py-4"
              >
                <span className="text-base md:text-lg lg:text-xl font-serif text-foreground/80 whitespace-nowrap">
                  {brand.name}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground/60 uppercase tracking-wide mt-1">
                  {brand.category}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
