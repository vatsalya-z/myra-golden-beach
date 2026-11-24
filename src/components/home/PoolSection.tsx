"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const poolHighlights = [
  {
    title: "Outdoor Pool",
    desc: "Open-air pool with scenic surroundings",
  },
  {
    title: "Poolside Relaxation",
    desc: "Comfortable seating and open areas",
  },
  {
    title: "Guest Access",
    desc: "Complimentary for all staying guests",
  },
] as const;

function PoolPalmSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g fill="#D9EEF2" stroke="#D9EEF2">
        <path
          d="M-10 260 C42 195, 115 122, 240 48"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M16 226 C12 178, 25 132, 50 94 C34 140, 27 182, 25 218 Z" strokeWidth="0.6" />
        <path d="M38 204 C42 152, 62 106, 95 68 C73 116, 58 160, 48 196 Z" strokeWidth="0.6" />
        <path d="M62 180 C72 130, 98 86, 136 52 C108 98, 86 140, 72 172 Z" strokeWidth="0.6" />
        <path d="M88 156 C103 110, 132 72, 174 42 C140 84, 115 122, 98 148 Z" strokeWidth="0.6" />
        <path d="M116 132 C136 92, 168 60, 208 38 C174 74, 146 106, 126 126 Z" strokeWidth="0.6" />
        <path d="M148 108 C170 76, 200 52, 236 36 C204 64, 176 88, 158 104 Z" strokeWidth="0.6" />
        <path d="M32 214 C70 206, 110 212, 148 230 C106 220, 70 218, 40 222 Z" strokeWidth="0.6" />
        <path d="M58 190 C98 178, 140 182, 180 200 C136 190, 96 190, 65 198 Z" strokeWidth="0.6" />
        <path d="M84 166 C124 152, 168 154, 206 170 C162 162, 122 164, 92 174 Z" strokeWidth="0.6" />
        <path d="M112 142 C152 126, 194 126, 232 140 C188 134, 148 138, 120 148 Z" strokeWidth="0.6" />
      </g>
      <g fill="#5B8990" stroke="#5B8990" opacity="0.85">
        <path
          d="M-14 288 C28 252, 84 218, 166 194"
          strokeWidth="1.7"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M12 266 C20 226, 40 194, 68 170 C48 202, 32 232, 20 260 Z" strokeWidth="0.5" />
        <path d="M38 248 C52 210, 76 180, 108 160 C82 190, 62 218, 46 242 Z" strokeWidth="0.5" />
        <path d="M66 230 C86 196, 112 172, 144 156 C116 182, 92 206, 74 226 Z" strokeWidth="0.5" />
        <path d="M44 250 C78 252, 110 260, 140 278 C106 268, 76 262, 50 256 Z" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function PoolWaveLinesSvg({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradA = `pool-wave-a-${uid}`;
  const gradB = `pool-wave-b-${uid}`;

  return (
    <svg
      viewBox="0 0 420 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradA} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8F6F7" stopOpacity="0" />
          <stop offset="45%" stopColor="#E8F6F7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5B8990" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={gradB} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B7285" stopOpacity="0" />
          <stop offset="50%" stopColor="#5B8990" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#E8F6F7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M12 42 C98 14, 188 86, 286 54 C346 34, 386 20, 430 36"
        stroke={`url(#${gradA})`}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M4 96 C98 62, 192 138, 294 102 C352 82, 392 64, 434 80"
        stroke={`url(#${gradB})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 152 C110 118, 202 192, 304 154 C358 134, 396 116, 432 132"
        stroke={`url(#${gradA})`}
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M28 208 C122 178, 210 244, 312 208 C364 190, 400 174, 430 188"
        stroke={`url(#${gradB})`}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PoolSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topPalmRef = useRef<HTMLDivElement>(null);
  const bottomPalmRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (topPalmRef.current) {
        gsap.to(topPalmRef.current, {
          y: -10,
          x: 5,
          rotation: 2.5,
          duration: 5.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
      if (bottomPalmRef.current) {
        gsap.to(bottomPalmRef.current, {
          y: 9,
          x: -5,
          rotation: -2,
          duration: 6.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
      if (waveRef.current) {
        gsap.to(waveRef.current, {
          x: -14,
          y: 6,
          duration: 7.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[430px] sm:min-h-[470px] md:min-h-[520px] lg:min-h-[560px] flex flex-col justify-between py-8 sm:py-10 md:py-12 overflow-hidden"
      aria-label="Swimming pool"
    >
      {/* Responsive Background Image: 16:9 Desktop + 9:16 Mobile */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/myra-hero-2-desktop.jpg"
          alt="Outdoor illuminated swimming pool at MYRA Golden Beach Resort"
          fill
          quality={95}
          className="hidden md:block object-cover object-center"
          sizes="100vw"
        />
        <Image
          src="/images/hero/myra-hero-2-mobile.jpg"
          alt="Outdoor illuminated swimming pool at MYRA Golden Beach Resort"
          fill
          quality={95}
          className="block md:hidden object-cover object-center"
          sizes="100vw"
        />
        {/* Edge-only scrim so center pool & fairy-lit gazebo stay bright and unobstructed */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B38]/75 via-transparent via-48% to-[#082B38]/85" />
      </div>

      {/* Layer 1: Subtle CSS coastal water-shimmer texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 z-[1] coastal-pool-texture opacity-[0.07] mix-blend-soft-light"
      />

      {/* Layer 2 & 3: SVG Palm Leaves + Flowing Wave Lines driven by GSAP */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 z-[2] overflow-hidden"
      >
        <div className="absolute -top-2 -left-3 sm:-left-6 w-40 sm:w-52 lg:w-64 opacity-[0.18]">
          <div className="-scale-y-100">
            <div ref={topPalmRef} className="will-change-transform">
              <PoolPalmSvg className="w-full h-auto" />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-2 -right-3 sm:-right-6 w-36 sm:w-48 lg:w-60 opacity-[0.16]">
          <div className="-scale-x-100">
            <div ref={bottomPalmRef} className="will-change-transform">
              <PoolPalmSvg className="w-full h-auto" />
            </div>
          </div>
        </div>

        <div
          ref={waveRef}
          className="absolute bottom-8 sm:bottom-12 -right-14 sm:-right-8 w-52 sm:w-72 lg:w-96 opacity-[0.18] will-change-transform"
        >
          <PoolWaveLinesSvg className="w-full h-auto" />
        </div>
      </div>

      {/* Top Compact Header (sits neatly over upper twilight sky) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center w-full">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="drop-shadow-[0_2px_12px_rgba(8,43,56,0.9)]"
        >
          <span className="inline-block text-[#F6C46A] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] mb-1.5 sm:mb-2">
            Resort Facilities
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight">
            Dive into Relaxation
          </h2>
          <div className="flex items-center justify-center gap-1.5 my-2.5 sm:my-3">
            <span className="h-[2px] w-9 bg-[#F6C46A] rounded-full" />
            <span className="h-[2px] w-3 bg-[#F6C46A]/60 rounded-full" />
            <span className="h-[2px] w-1.5 bg-[#F6C46A]/40 rounded-full" />
          </div>
          <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-white/88 leading-relaxed">
            Our outdoor swimming pool is the perfect place to cool down, unwind
            and enjoy the coastal sunshine. Available for all resort guests, it
            is a highlight of any stay at MYRA Golden Beach Resort.
          </p>
        </motion.div>
      </div>

      {/* Open Unobstructed Pool Photo Window */}
      <div
        aria-hidden="true"
        className="min-h-[120px] sm:min-h-[145px] md:min-h-[175px]"
      />

      {/* Bottom Compact Luxury Frosted Dock */}
      <div className="relative z-10 max-w-5xl mx-auto px-3.5 sm:px-6 w-full">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto w-full rounded-2xl bg-[#082B38]/60 backdrop-blur-md border border-[#F6C46A]/35 px-3.5 py-3 sm:px-5 sm:py-4 shadow-[0_14px_38px_rgba(8,43,56,0.5)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5 lg:gap-6"
        >
          {/* Compact 3-Column Highlight Strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-white/15 flex-1">
            {poolHighlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: 0.16 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={idx === 0 ? "text-center px-1" : "text-center pl-2 sm:pl-4 pr-1"}
              >
                <h3 className="text-[#F6C46A] font-semibold text-[11px] sm:text-sm leading-snug mb-0.5 sm:mb-1">
                  {item.title}
                </h3>
                <p className="text-white/85 text-[10px] sm:text-xs leading-snug">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Primary Sand Gold CTA */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0"
          >
            <Link
              href="/contact"
              className="luxury-btn-sheen w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] font-bold text-xs sm:text-sm tracking-wide shadow-[0_6px_18px_rgba(246,196,106,0.3)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>Plan Your Poolside Stay</span>
              <HiArrowRight size={15} className="shrink-0" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
