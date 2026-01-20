import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const brands = [
  { name: "Tiffany & Co.", logo: "/assets/brands/tiffany-co-logo-.png" },
  { name: "Christian Louboutin", logo: "/assets/brands/christian-louboutin-logo-png_seeklogo-320816-removebg-preview.png", logoClassName: "scale-[2.1]" },
  { name: "Galeries Lafayette", logo: "/assets/brands/Galeries-Lafayette-logo-removebg-preview.png", logoClassName: "scale-[2.4]" },
  { name: "Sabyasachi", logo: "/assets/brands/sabyasachi.com_logo27-removebg-preview.png", logoClassName: "scale-[2]" },
  { name: "Rolex", logo: "/assets/brands/rolex.com logo11.png", logoClassName: "scale-110" },
  { name: "Manish Malhotra", logo: "/assets/brands/Manish Malhotra1440x800-removebg-preview.png", logoClassName: "scale-125" },
  { name: "Balenciaga", logo: "/assets/brands/Balenciaga-Logo.wine-removebg-preview.png", logoClassName: "scale-125" },
  { name: "Le Mill", logo: "/assets/brands/lemill-removebg-preview.png", logoClassName: "scale-125" },
  { name: "Abu Jani Sandeep Khosla", logo: "/assets/brands/AbuJaani Sandeep Khosla-NEW-LOGO-removebg-preview.png", logoClassName: "scale-110" },
  { name: "Valentino", logo: "/assets/brands/Valentino-Logo-removebg-preview.png" },
  { name: "Golden Goose", logo: "/assets/brands/goldengoose.png", logoClassName: "scale-[2.4]" },
  { name: "Zegna", logo: "/assets/brands/Zegna-Logo.png", logoClassName: "scale-[1.8]" },
  { name: "Good Earth", logo: "/assets/brands/goodearth-removebg-preview.png" },
  { name: "Versace", logo: "/assets/brands/versace_rgb_black-removebg-preview.png", logoClassName: "scale-[1.8]" },
  { name: "Jade by Monica & Karishma", logo: "/assets/brands/Jade by monica and karishma -removebg-preview.png", logoClassName: "scale-[1.7]" },
  { name: "Giorgio Armani", logo: "/assets/brands/Giorgio-Armani-logo-768x432-removebg-preview.png", logoClassName: "scale-[1.7]" },
  { name: "Bombaim", logo: "/assets/brands/Bombaim-removebg-preview.png", logoClassName: "scale-[2]" },
  { name: "The Collective", logo: "/assets/brands/the_collective_640x360_4bb672e857-removebg-preview.png", logoClassName: "scale-[2.5]" },
];

export const BrandsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);
  const [manualControl, setManualControl] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const brandElementRef = useRef<HTMLDivElement | null>(null);
  const [brandWidth, setBrandWidth] = useState(0);
  const [manualOffset, setManualOffset] = useState(0);
  const [animationPosition, setAnimationPosition] = useState(0);
  const animationPositionRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  useEffect(() => {
    animationPositionRef.current = animationPosition;
  }, [animationPosition]);

  const handleNext = useCallback(() => {
    setManualControl(true);
    setIsPaused(true);
    let newPosition = currentPosition - 1;

    // Infinite loop: if we're at the first brand, loop to the last brand
    if (newPosition < -(brands.length - 1)) {
      newPosition = 0;
    }

    const newOffset = newPosition * brandWidth;
    
    // Batch state updates to prevent re-renders
    setCurrentPosition(newPosition);
    setManualOffset(newOffset);
    setAnimationPosition(newOffset);
    
    setTimeout(() => {
      setManualControl(false);
      setIsPaused(false);
    }, 1000);
  }, [currentPosition, brandWidth]);

  const handlePrev = useCallback(() => {
    setManualControl(true);
    setIsPaused(true);
    let newPosition = currentPosition + 1;

    // Infinite loop: if we're at the last brand, loop to the first brand
    if (newPosition > 0) {
      newPosition = -(brands.length - 1);
    }

    const newOffset = newPosition * brandWidth;
    
    // Batch state updates to prevent re-renders
    setCurrentPosition(newPosition);
    setManualOffset(newOffset);
    setAnimationPosition(newOffset);
    
    setTimeout(() => {
      setManualControl(false);
      setIsPaused(false);
    }, 1000);
  }, [currentPosition, brandWidth]);

  // Calculate brand width on mount with debouncing
  useEffect(() => {
    const calculateBrandWidth = () => {
      if (brandElementRef.current) {
        setBrandWidth(brandElementRef.current.clientWidth);
      }
    };

    const debouncedCalculate = () => {
      requestAnimationFrame(calculateBrandWidth);
    };

    // Initial calculation
    calculateBrandWidth();
    
    window.addEventListener('resize', debouncedCalculate, { passive: true });
    return () => window.removeEventListener('resize', debouncedCalculate);
  }, []);

  // Optimized animation loop using requestAnimationFrame
  useEffect(() => {
    if (!manualControl && !isPaused && brandWidth > 0 && isInView) {
      let currentPosition = manualOffset;
      
      const animate = (timestamp: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        
        const deltaTime = timestamp - lastTimeRef.current;
        
        if (deltaTime >= 16) { // Cap at ~60fps
          const baseWidth = 280; // Fixed base width for consistent speed
          const totalWidth = baseWidth * brands.length * 2;
          const speed = (totalWidth / 100000) * deltaTime; // Consistent speed across devices
          currentPosition -= speed;

          // Create infinite loop by wrapping around
          if (currentPosition <= manualOffset - (baseWidth * brands.length)) {
            currentPosition = manualOffset;
          }

          setAnimationPosition(currentPosition);
          lastTimeRef.current = timestamp;
        }
        
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        lastTimeRef.current = 0;
      };
    }
  }, [manualControl, isPaused, brandWidth, isInView, manualOffset]);

  // Ensure animation restarts properly after manual control
  useEffect(() => {
    if (!manualControl && !isPaused && brandWidth > 0) {
      setAnimationPosition(manualOffset);
    }
  }, [manualControl, isPaused, manualOffset, brandWidth]);

  const handleMouseEnter = useCallback(() => {
    if (manualControl) return;
    const pos = animationPositionRef.current;
    setManualOffset(pos);
    setAnimationPosition(pos);
    setIsPaused(true);
  }, [manualControl]);

  const handleMouseLeave = useCallback(() => {
    if (manualControl) return;
    const pos = animationPositionRef.current;
    setManualOffset(pos);
    setAnimationPosition(pos);
    setIsPaused(false);
  }, [manualControl]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = animationPositionRef.current;

    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = pos;

    setManualControl(true);
    setManualOffset(pos);
    setAnimationPosition(pos);
    setIsPaused(true);
    setIsDragging(true);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - dragStartXRef.current;
    const pos = dragStartOffsetRef.current + deltaX;
    setManualOffset(pos);
    setAnimationPosition(pos);
  }, [isDragging]);

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // no-op
    }

    const pos = animationPositionRef.current;
    setManualOffset(pos);
    setAnimationPosition(pos);
    setIsDragging(false);
    setManualControl(false);
    setIsPaused(false);
  };

  return (
    <section className="py-10 md:py-15 bg-secondary relative overflow-hidden">
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
      <div
        className={`relative select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-secondary to-transparent z-10" />
        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-secondary to-transparent z-10" />

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-foreground rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 opacity-80 hover:opacity-100"
          aria-label="Previous brands"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-foreground rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 opacity-80 hover:opacity-100"
          aria-label="Next brands"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <motion.div
          ref={marqueeRef}
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: 1,
            x: manualControl ? manualOffset : animationPosition
          } : {}}
          transition={{
            duration: 0.8,
            delay: 0.3,
            x: isDragging
              ? { type: "tween", duration: 0 }
              : manualControl
                ? { type: "spring", stiffness: 300, damping: 30 }
                : { type: "tween", ease: "linear", duration: 0.016 }
          }}
          className="flex"
        >
          {/* First set of brands */}
          <div className="flex shrink-0">
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                ref={index === 0 ? brandElementRef : undefined}
                className="brand-item flex w-[240px] shrink-0 items-center justify-center px-10 md:w-[260px] md:px-12 lg:w-[280px]"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={`h-12 w-auto max-w-[180px] object-contain md:h-14 lg:h-16 ${brand.logoClassName ?? ""}`}
                />
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex shrink-0">
            {brands.map((brand, index) => (
              <div
                key={`second-${index}`}
                className="brand-item flex w-[240px] shrink-0 items-center justify-center px-10 md:w-[260px] md:px-12 lg:w-[280px]"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={`h-12 w-auto max-w-[180px] object-contain md:h-14 lg:h-16 ${brand.logoClassName ?? ""}`}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
