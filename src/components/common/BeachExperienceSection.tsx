"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { WHATSAPP } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface BeachExperienceSectionProps {
  className?: string;
  showExploreButton?: boolean;
}

const experiences = [
  {
    id: "arch",
    num: "01",
    tag: "Signature Landmark",
    title: "The Iconic MYRA Beach Arch",
    shortTitle: "Beach Arch",
    desc: "Step directly onto soft golden sands and capture timeless coastal memories beside our handcrafted beachfront arch facing the Bay of Bengal.",
    src: "/images/beach/myra-beach-arch-selfie-point.jpg",
    alt: "I Love MYRA Golden Beach iconic rustic photo arch with wooden bench and ocean waves",
    objectPos: "object-center",
  },
  {
    id: "loungers",
    num: "02",
    tag: "Oceanfront Serenity",
    title: "Private Beachside Sun Loungers",
    shortTitle: "Sun Loungers",
    desc: "Unwind on handcrafted wooden recliners set right along the shoreline — uninterrupted horizon views, sea breeze, and peaceful golden mornings.",
    src: "/images/beach/myra-beach-loungers-ocean.jpg",
    alt: "Private wooden beach loungers on the pristine sandy beach in front of MYRA Golden Beach Resort",
    objectPos: "object-[65%_50%]",
  },
  {
    id: "walkway",
    num: "03",
    tag: "Zero-Distance Access",
    title: "Palm-Lined Coastal Promenade",
    shortTitle: "Palm Walkway",
    desc: "Stroll along shaded stone walkways fringed with swaying coconut palms that lead effortlessly from your bamboo cottage straight to the waves.",
    src: "/images/beach/myra-beach-promenade-palms.jpg",
    alt: "Scenic paved coastal walkway lined with lush coconut palm trees alongside beachfront cottages",
    objectPos: "object-left",
  },
];

const pillars = [
  { label: "0 m", sub: "Direct Beach Access" },
  { label: "Sunrise", sub: "Bay of Bengal Views" },
  { label: "Bamboo", sub: "Oceanfront Cottages" },
  { label: "Private", sub: "Loungers & Photo Arch" },
];

export function BeachExperienceSection({
  className = "",
  showExploreButton = true,
}: BeachExperienceSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const whatsappUrl = `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hello MYRA GOLDEN BEACH RESORT, I would like to enquire about staying in your beachfront cottages with direct beach access."
  )}`;

  // Refined GSAP ScrollTrigger entrance (subtle, GPU-only, zero layout shift)
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      const revealEls = root.querySelectorAll<HTMLElement>("[data-ux-reveal]");
      gsap.fromTo(
        revealEls,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 sm:py-24 md:py-32 bg-gradient-to-b from-[#E8F6F7] via-[#F9FBFC] to-[#E8F6F7] overflow-hidden ${className}`}
      aria-labelledby="beach-experience-heading"
    >
      {/* Subtle architectural top & bottom hairlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#063B49]/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#063B49]/15 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Masthead */}
        <div
          data-ux-reveal
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-[#063B49]/12"
        >
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block w-8 h-px bg-[#DCA94F]" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0B7285]">
                Direct Beachfront Living
              </span>
              <span className="hidden sm:inline-block text-[#063B49]/25">•</span>
              <span className="hidden sm:inline-block font-mono text-[11px] tracking-[0.16em] text-[#607780]">
                15.80° N, 80.42° E · CHIRALA
              </span>
            </div>

            <h2
              id="beach-experience-heading"
              className="font-playfair text-3xl sm:text-4xl md:text-[3.1rem] font-bold text-[#063B49] leading-[1.1] tracking-tight"
            >
              Step Directly onto{" "}
              <span className="italic font-normal text-[#0B7285]">
                Pristine Golden Sands
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:text-right">
            <p className="text-[#607780] text-sm sm:text-[15px] leading-relaxed">
              The Bay of Bengal is your front yard. Hover or tap each coastal moment below to explore our private shoreline.
            </p>
          </div>
        </div>

        {/* DESKTOP: Interactive Expanding Luxury Filmstrip (All 3 Photos Visible, Smooth Flex Expansion) */}
        <div
          data-ux-reveal
          className="hidden lg:flex gap-4 h-[520px] xl:h-[560px] mt-10"
        >
          {experiences.map((exp, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={exp.id}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIdx(idx);
                  }
                }}
                aria-expanded={isActive}
                aria-label={`${exp.title} — ${exp.tag}`}
                style={{
                  flex: isActive ? "2.6 1 0%" : "0.95 1 0%",
                  transition: "flex 750ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className={`relative h-full rounded-2xl overflow-hidden cursor-pointer select-none group outline-none focus-visible:ring-2 focus-visible:ring-[#F6C46A] ${
                  isActive
                    ? "shadow-[0_24px_60px_rgba(6,59,73,0.22)]"
                    : "shadow-[0_10px_28px_rgba(6,59,73,0.10)]"
                }`}
              >
                {/* Photo with warm editorial grade & subtle scale transition */}
                <Image
                  src={exp.src}
                  alt={exp.alt}
                  fill
                  priority={idx === 0}
                  className={`object-cover ${exp.objectPos} transition-all duration-1000 ease-out contrast-[1.05] saturate-[1.1] ${
                    isActive
                      ? "scale-100 brightness-100"
                      : "scale-110 brightness-[0.72] group-hover:brightness-[0.85]"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                {/* Smooth Atmospheric Scrim */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive
                      ? "bg-gradient-to-t from-[#082B38]/85 via-[#082B38]/15 to-transparent opacity-100"
                      : "bg-gradient-to-t from-[#082B38]/85 via-[#063B49]/35 to-[#082B38]/25 opacity-100"
                  }`}
                />

                {/* Top Corner Index Number */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span
                    className={`font-mono text-xs tracking-[0.25em] px-3 py-1 rounded-full backdrop-blur-md border transition-all duration-500 ${
                      isActive
                        ? "bg-[#082B38]/55 border-[#F6C46A]/60 text-[#F6C46A]"
                        : "bg-[#082B38]/45 border-white/20 text-white/80"
                    }`}
                  >
                    {exp.num}
                  </span>

                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-500 ${
                      isActive
                        ? "bg-[#F6C46A] border-[#F6C46A] text-[#082B38] opacity-100 scale-100"
                        : "bg-white/10 border-white/25 text-white opacity-70 scale-90"
                    }`}
                  >
                    <HiArrowUpRight size={16} />
                  </span>
                </div>

                {/* COLLAPSED STATE: Clean Vertical Editorial Title */}
                <div
                  className={`absolute inset-x-0 bottom-8 flex flex-col items-center justify-end px-4 text-center transition-all duration-500 ${
                    isActive
                      ? "opacity-0 translate-y-4 pointer-events-none"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <span className="text-[#F6C46A] text-[10px] uppercase tracking-[0.25em] font-semibold mb-1.5">
                    {exp.tag}
                  </span>
                  <h3 className="font-playfair text-xl font-semibold text-white leading-snug">
                    {exp.shortTitle}
                  </h3>
                </div>

                {/* EXPANDED STATE: Crisp Magazine Caption Overlay */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-7 xl:p-8 transition-all duration-600 ${
                    isActive
                      ? "opacity-100 translate-y-0 delay-150"
                      : "opacity-0 translate-y-6 pointer-events-none"
                  }`}
                >
                  <div className="max-w-lg">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-6 h-px bg-[#F6C46A]" aria-hidden="true" />
                      <span className="text-[#F6C46A] text-[11px] font-semibold uppercase tracking-[0.26em]">
                        {exp.tag}
                      </span>
                    </div>
                    <h3 className="font-playfair text-2xl xl:text-3xl font-bold text-white leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-white/85 text-sm leading-relaxed mt-2.5">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE & TABLET: Clean Interactive Tab Pills + Tall Full-Bleed Editorial Card */}
        <div data-ux-reveal className="lg:hidden mt-8">
          {/* Segmented Luxury Switcher */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#063B49]/[0.07] rounded-xl mb-5">
            {experiences.map((exp, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`relative py-2.5 px-2 rounded-lg text-xs font-semibold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-[#063B49]/70"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="beach-mobile-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-[#063B49] shadow-sm"
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    <span className={isActive ? "text-[#F6C46A]" : "text-[#0B7285]"}>
                      {exp.num}
                    </span>
                    <span className="truncate">{exp.shortTitle}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Editorial Photo Card */}
          <div className="relative h-[400px] sm:h-[460px] w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(6,59,73,0.2)] bg-[#082B38]">
            <AnimatePresence mode="wait">
              <motion.div
                key={experiences[activeIdx].id}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={experiences[activeIdx].src}
                  alt={experiences[activeIdx].alt}
                  fill
                  className={`object-cover ${experiences[activeIdx].objectPos} contrast-[1.05] saturate-[1.1]`}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082B38]/90 via-[#082B38]/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="font-mono text-[11px] tracking-[0.22em] px-3 py-1 rounded-full bg-[#082B38]/60 backdrop-blur-md border border-[#F6C46A]/50 text-[#F6C46A]">
                {experiences[activeIdx].num} / 03
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`m-cap-${experiences[activeIdx].id}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="text-[#F6C46A] text-[10px] font-semibold uppercase tracking-[0.26em] block mb-1.5">
                    {experiences[activeIdx].tag}
                  </span>
                  <h3 className="font-playfair text-2xl font-bold text-white leading-tight">
                    {experiences[activeIdx].title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed mt-2">
                    {experiences[activeIdx].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Bar: Clean Key Metrics + Action Duo */}
        <div
          data-ux-reveal
          className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-[#063B49]/12 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
        >
          {/* Minimalist Typographic Pillars (zero boxy card clutter) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 flex-1">
            {pillars.map((p) => (
              <div
                key={p.sub}
                className="border-l-2 border-[#F6C46A]/60 pl-3.5"
              >
                <div className="font-playfair text-xl sm:text-2xl font-bold text-[#063B49] leading-none">
                  {p.label}
                </div>
                <div className="text-[#607780] text-xs font-medium mt-1.5">
                  {p.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Crisp Luxury CTA Pair */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {showExploreButton && (
              <Link
                href="/rooms"
                className="luxury-btn-sheen group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#063B49] hover:bg-[#082B38] text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_22px_rgba(6,59,73,0.2)] text-sm tracking-wide"
              >
                <span>View Beach Cottages</span>
                <HiArrowUpRight
                  size={16}
                  className="text-[#F6C46A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            )}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#25D366] text-[#063B49] hover:text-white border border-[#063B49]/15 hover:border-[#25D366] font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-sm text-sm tracking-wide group"
            >
              <FaWhatsapp
                size={17}
                className="text-[#25D366] group-hover:text-white transition-colors"
              />
              <span>Enquire Stay</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
