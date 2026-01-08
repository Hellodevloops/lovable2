import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  isInView: boolean;
}

const AnimatedCounter = ({ end, suffix = "", duration = 2, isInView }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
};

const stats = [
  { value: 200, suffix: "+", label: "Successful Placements" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Luxury Brands Served" },
  { value: 95, suffix: "%", label: "Client Retention Rate" },
];

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 relative bg-[#1a2332] overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-2">
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  isInView={isInView} 
                />
              </p>
              <p className="text-xs md:text-sm text-white/60 uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
