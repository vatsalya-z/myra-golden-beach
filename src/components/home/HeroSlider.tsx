"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { heroSlides } from "@/data/heroSlides";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AUTOPLAY_DELAY = 5500;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = heroSlides.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = (idx: number) => setCurrent(idx);

  useEffect(() => {
    if (paused || reducedMotion) return;
    timerRef.current = setTimeout(next, AUTOPLAY_DELAY);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, reducedMotion, next]);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const slide = heroSlides[current];

  return (
    <section
      aria-label="Resort highlights slider"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(560px, 90vh, 100vh)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Desktop / Laptop HD Image (16:9) */}
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority={slide.id === 1}
            loading={slide.id === 1 ? "eager" : "lazy"}
            quality={95}
            className="hidden md:block object-cover object-center w-full h-full"
            sizes="100vw"
          />
          {/* Mobile / Android HD Image (9:16) */}
          <Image
            src={slide.mobileImage}
            alt={slide.imageAlt}
            fill
            priority={slide.id === 1}
            loading={slide.id === 1 ? "eager" : "lazy"}
            quality={95}
            className="block md:hidden object-cover object-center w-full h-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082B38]/75 via-[#063B49]/40 to-[#082B38]/80" />

          {/* Centered Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
              <div className="max-w-3xl mx-auto text-center">
                <AnimatePresence mode="wait">
                  <motion.div key={`text-${slide.id}`} className="text-center">
                    {/* Eyebrow */}
                    <motion.p
                      custom={0}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-[#E0B45C] text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4 text-center"
                    >
                      {slide.eyebrow}
                    </motion.p>

                    {/* Centered Heading */}
                    <motion.h1
                      custom={0.15}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="font-playfair text-[clamp(1.95rem,5.5vw,4rem)] font-bold text-white leading-tight mb-5 text-center drop-shadow-[0_4px_18px_rgba(8,43,56,0.55)]"
                    >
                      {slide.heading}
                    </motion.h1>

                    {/* Centered Subtitle */}
                    <motion.p
                      custom={0.3}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto text-center"
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* Centered CTA */}
                    <motion.div
                      custom={0.45}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex justify-center items-center flex-wrap gap-4"
                    >
                      <Link
                        href={slide.ctaHref}
                        className="luxury-btn-sheen inline-flex items-center justify-center px-8 py-3.5 bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] font-bold rounded-md transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl tracking-wide text-sm min-w-[210px]"
                      >
                        {slide.ctaLabel}
                      </Link>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left / Right arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#072A32]/70 border border-white/20 text-white hover:bg-[#E0B45C] hover:text-[#072A32] hover:border-[#E0B45C] transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C]"
      >
        <HiChevronLeft size={20} className="sm:hidden" />
        <HiChevronLeft size={24} className="hidden sm:block" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#072A32]/70 border border-white/20 text-white hover:bg-[#E0B45C] hover:text-[#072A32] hover:border-[#E0B45C] transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C]"
      >
        <HiChevronRight size={20} className="sm:hidden" />
        <HiChevronRight size={24} className="hidden sm:block" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2.5">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === current ? "true" : undefined}
            className={`rounded-full transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C] ${idx === current
              ? "w-8 h-2.5 bg-[#E0B45C]"
              : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 z-10 text-white/50 text-xs font-mono tracking-widest">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </section>
  );
}
