"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function GalleryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg || reducedMotion) return;

    const ctx = gsap.context(() => {
      // Smooth scroll-linked parallax on hero backdrop
      gsap.fromTo(
        bg,
        { yPercent: -4, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Editorial word-by-word title entrance
      const words = section.querySelectorAll<HTMLElement>("[data-hero-word]");
      if (words.length) {
        gsap.fromTo(
          words,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.08,
            delay: 0.12,
            ease: "power4.out",
            clearProps: "transform",
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[270px] sm:h-[320px] md:h-[500px] lg:h-[540px] overflow-hidden flex items-center justify-center bg-[#082B38]"
      aria-label="Gallery page hero"
    >
      {/* Responsive HD Parallax Backdrop */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero/myra-hero-1-desktop-v2.jpg"
          alt="MYRA Golden Beach Resort beachfront cottages at twilight"
          fill
          priority
          quality={95}
          className="hidden md:block object-cover object-center w-full h-full"
          sizes="100vw"
        />
        <Image
          src="/images/hero/myra-hero-1-mobile-v2.jpg"
          alt="MYRA Golden Beach Resort beachfront cottages at twilight"
          fill
          priority
          quality={95}
          className="block md:hidden object-cover object-center w-full h-full"
          sizes="100vw"
        />
      </div>

      {/* Layered Atmospheric Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#082B38]/80 via-[#063B49]/50 to-[#082B38]/90 pointer-events-none" />

      {/* Subtle Cinematic Motion Graphics: Architectural Gold Framing & Ambient Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ambient drifting gold orb */}
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -20, 15, 0],
                  opacity: [0.16, 0.28, 0.16],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#F6C46A]/20 blur-3xl"
        />
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, -25, 20, 0],
                  y: [0, 20, -15, 0],
                  opacity: [0.12, 0.22, 0.12],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 right-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#0B7285]/50 blur-3xl"
        />

        {/* Delicate architectural corner brackets */}
        <div className="hidden sm:block absolute top-6 left-6 w-10 h-10 border-t border-l border-[#F6C46A]/40" />
        <div className="hidden sm:block absolute top-6 right-6 w-10 h-10 border-t border-r border-[#F6C46A]/40" />
        <div className="hidden sm:block absolute bottom-6 left-6 w-10 h-10 border-b border-l border-[#F6C46A]/40" />
        <div className="hidden sm:block absolute bottom-6 right-6 w-10 h-10 border-b border-r border-[#F6C46A]/40" />
      </div>

      {/* Centered Editorial Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-6 text-center flex flex-col items-center justify-center">
        {/* Luxury Eyebrow + Coordinates */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 mb-2.5 sm:mb-4"
        >
          <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#F6C46A]" />
          <span className="text-[#F6C46A] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.32em]">
            Visual Lookbook · Chirala Coast
          </span>
          <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#F6C46A]" />
        </motion.div>

        {/* Word-by-word Editorial Serif Title */}
        <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.08] tracking-tight drop-shadow-[0_6px_24px_rgba(8,43,56,0.65)]">
          <span className="inline-block overflow-hidden align-bottom pb-1">
            <span data-hero-word className="inline-block">
              Photo
            </span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom pb-1">
            <span
              data-hero-word
              className="inline-block italic font-normal text-[#F6C46A]"
            >
              Gallery
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/85 text-xs sm:text-base md:text-lg mt-2.5 sm:mt-4 max-w-xl leading-relaxed"
        >
          A curated visual journey through our beachfront cottages, illuminated
          poolside, coastal dining and serene Bay of Bengal shoreline.
        </motion.p>

        {/* Minimal Frosted Collection Metadata Pill */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3.5 sm:mt-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-[#F6C46A]/30 text-[11px] sm:text-xs text-white/85 tracking-wider"
        >
          <span className="text-[#F6C46A] font-mono font-semibold">
            {galleryImages.length}
          </span>
          <span className="text-white/30">|</span>
          <span>Authentic Resort Photographs</span>
        </motion.div>
      </div>
    </section>
  );
}
