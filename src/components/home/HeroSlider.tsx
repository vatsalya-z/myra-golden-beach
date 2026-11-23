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
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority={slide.id === 1}
            loading={slide.id === 1 ? "eager" : "lazy"}
            className="object-cover w-full h-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#123B2A]/60" />

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
                      className="text-[#C8A45D] text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4 text-center"
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
                      className="font-playfair text-[clamp(1.95rem,5.5vw,4rem)] font-bold text-white leading-tight mb-5 text-center"
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
                        className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C8A45D] hover:bg-[#B38E46] text-[#123B2A] font-bold rounded-sm transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl tracking-wide text-sm min-w-[210px]"
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
        className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#123B2A]/70 border border-white/20 text-white hover:bg-[#C8A45D] hover:text-[#123B2A] hover:border-[#C8A45D] transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D]"
      >
        <HiChevronLeft size={20} className="sm:hidden" />
        <HiChevronLeft size={24} className="hidden sm:block" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#123B2A]/70 border border-white/20 text-white hover:bg-[#C8A45D] hover:text-[#123B2A] hover:border-[#C8A45D] transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D]"
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
            className={`rounded-full transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D] ${
              idx === current
                ? "w-8 h-2.5 bg-[#C8A45D]"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 cursor-pointer group focus-visible:outline-none"
        onClick={() => {
          const el = document.getElementById("intro-section");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll down to explore resort"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/70 group-hover:text-[#C8A45D] transition-colors font-medium">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-white/50 group-hover:border-[#C8A45D] flex items-start justify-center p-1 transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-[#C8A45D]"
          />
        </div>
      </motion.button>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 z-10 text-white/50 text-xs font-mono tracking-widest">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </section>
  );
}
