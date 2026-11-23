"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  const t = testimonials[current];

  return (
    <section className="py-16 md:py-24 bg-[#F3ECE0]" aria-label="Guest testimonials">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            eyebrow="Guest Experiences"
            title="What Our Guests Say"
            subtitle="Hear from guests who have enjoyed a stay at MYRA Golden Beach Resort."
          />
        </FadeIn>

        <div className="mt-12 relative">
          <div className="bg-white rounded-2xl shadow-md border border-[#E5D9C3] p-8 md:p-12 text-center relative overflow-hidden">
            {/* Elegant typographic quote watermark */}
            <span
              className="text-[#E0B45C]/15 font-playfair text-8xl absolute top-0 left-6 select-none pointer-events-none"
              aria-hidden="true"
            >
              “
            </span>

            {/* Stars */}
            <div className="flex justify-center gap-1.5 mb-5 relative z-10">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  className="text-[#E0B45C]"
                  aria-hidden="true"
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <blockquote className="text-[#102026] text-base md:text-lg leading-relaxed mb-6 font-medium italic">
                  &ldquo;{t.review}&rdquo;
                </blockquote>

                <div>
                  <div className="font-semibold text-[#072A32]">{t.name}</div>
                  <div className="text-[#566970] text-sm mt-0.5">
                    {t.location} · {t.date} · via {t.source}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#E0B45C]/40 text-[#E0B45C] hover:bg-[#E0B45C] hover:text-[#072A32] transition-all duration-300 flex items-center justify-center"
            >
              <HiChevronLeft size={20} />
            </button>
            <span className="text-xs text-[#566970]">
              {current + 1} of {total}
            </span>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[#E0B45C]/40 text-[#E0B45C] hover:bg-[#E0B45C] hover:text-[#072A32] transition-all duration-300 flex items-center justify-center"
            >
              <HiChevronRight size={20} />
            </button>
          </div>

          <p className="text-center text-xs text-[#566970] mt-4 italic">
            Note: Reviews shown are illustrative examples. Verified reviews are
            available on our{" "}
            <a
              href={siteConfig.googleBusinessProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E0B45C] hover:underline"
            >
              Google Business Profile
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
