"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import {
  HiCheckCircle,
  HiChevronLeft,
  HiChevronRight,
  HiClock,
  HiSparkles,
  HiCalendarDays,
} from "react-icons/hi2";
import type { FacilityCategory, FacilityItem } from "@/data/facilities";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CoastalDecorations } from "@/components/common/CoastalDecorations";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { triggerHaptic } from "@/lib/haptics";
import { useMobileApp } from "@/components/mobile/MobileAppProvider";

interface FacilitiesExplorerProps {
  facilities: FacilityItem[];
}

type FilterOption = "All" | FacilityCategory;

const CATEGORIES: FilterOption[] = [
  "All",
  "Pool & Beach",
  "Dining",
  "Leisure & Events",
  "Comfort & Services",
];

function FacilityShowcaseCard({
  facility,
  index,
}: {
  facility: FacilityItem;
  index: number;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const { openBookingSheet } = useMobileApp();

  const totalImages = facility.images.length;
  const activeImage = facility.images[activeIdx] || facility.images[0];
  const isOdd = index % 2 === 1;

  const nextImage = () => {
    triggerHaptic(8);
    setActiveIdx((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    triggerHaptic(8);
    setActiveIdx((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || totalImages <= 1) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 40) {
      if (delta < 0) nextImage();
      else prevImage();
    }
  };

  const facilityWhatsappUrl = buildWhatsAppUrl(
    [
      "Hello MYRA GOLDEN BEACH RESORT,",
      "",
      `I would like to know more about *${facility.title}* and stay booking availability.`,
      "Please share details. Thank you!",
    ].join("\n")
  );

  return (
    <article
      className={`grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-11 items-center bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-[0_10px_34px_rgba(6,59,73,0.08)] hover:shadow-[0_16px_44px_rgba(6,59,73,0.13)] border border-[#D9EEF2] hover:border-[#F6C46A]/65 transition-all duration-300 ${
        isOdd ? "lg:grid-flow-dense" : ""
      }`}
    >
      {/* Interactive Swipeable Visual Gallery */}
      <div className={isOdd ? "lg:col-start-2" : ""}>
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative h-60 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-md bg-[#082B38] group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.75, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.75 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt={`${facility.title} — photo ${activeIdx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Top-left Sand Gold Badge */}
          <span className="absolute top-3 left-3 bg-[#F6C46A] text-[#082B38] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full tracking-wide shadow-md z-10 flex items-center gap-1">
            <HiSparkles size={12} className="shrink-0" />
            <span>{facility.badge}</span>
          </span>

          {/* Top-right Timing & Counter */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 bg-[#082B38]/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full">
              <HiClock size={12} className="text-[#F6C46A]" />
              <span>{facility.timing}</span>
            </span>
            {totalImages > 1 && (
              <span className="bg-[#082B38]/75 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono px-2 py-1 rounded-full">
                {activeIdx + 1}/{totalImages}
              </span>
            )}
          </div>

          {/* Prev / Next Arrows */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label={`Previous photo of ${facility.title}`}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#082B38]/70 backdrop-blur-sm border border-white/20 text-white hover:bg-[#F6C46A] hover:text-[#082B38] transition-all flex items-center justify-center active:scale-90"
              >
                <HiChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label={`Next photo of ${facility.title}`}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#082B38]/70 backdrop-blur-sm border border-white/20 text-white hover:bg-[#F6C46A] hover:text-[#082B38] transition-all flex items-center justify-center active:scale-90"
              >
                <HiChevronRight size={18} />
              </button>
            </>
          )}

          {/* Mobile Pagination Dots Overlay */}
          {totalImages > 1 && (
            <div className="md:hidden absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-[#082B38]/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
              {facility.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => {
                    triggerHaptic(6);
                    setActiveIdx(i);
                  }}
                  aria-label={`View photo ${i + 1} of ${facility.title}`}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIdx === i ? "w-5 bg-[#F6C46A]" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop Thumbnails */}
        {totalImages > 1 && (
          <div className="hidden md:flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {facility.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeIdx === i
                    ? "border-[#F6C46A] ring-2 ring-[#F6C46A]/25 scale-[1.03]"
                    : "border-[#D9EEF2] opacity-70 hover:opacity-100"
                }`}
                aria-label={`Thumbnail ${i + 1} of ${facility.title}`}
              >
                <Image
                  src={img}
                  alt={`${facility.title} angle ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Editorial Details Column */}
      <div className={isOdd ? "lg:col-start-1 lg:row-start-1" : ""}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="text-[#0B7285] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase">
            {facility.tagline}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#E8F6F7] text-[#063B49] border border-[#D9EEF2] px-2.5 py-0.5 rounded-full">
            {facility.category}
          </span>
        </div>

        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#063B49] mb-2.5 leading-snug">
          {facility.title}
        </h2>

        <p className="text-[#607780] text-xs sm:text-sm md:text-base leading-relaxed mb-4">
          {facility.description}
        </p>

        {/* Gold-Checked Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
          {facility.highlights.map((h) => (
            <div
              key={h}
              className="flex items-start gap-2 text-xs sm:text-sm text-[#17313B] bg-[#F9FBFC] px-3 py-2 rounded-lg border border-[#D9EEF2]"
            >
              <HiCheckCircle
                size={16}
                className="text-[#DCA94F] shrink-0 mt-0.5"
              />
              <span className="font-medium leading-snug">{h}</span>
            </div>
          ))}
        </div>

        {/* Native Dual Action Footer */}
        <div className="pt-4 border-t border-[#D9EEF2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#607780] font-medium">
            <HiClock size={15} className="text-[#0B7285] shrink-0" />
            <span>Timing: {facility.timing}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => openBookingSheet()}
              className="lg:hidden flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6C46A] to-[#DCA94F] text-[#082B38] font-bold text-xs tracking-wide shadow-[0_6px_16px_rgba(246,196,106,0.3)] active:scale-95 transition-transform"
            >
              <HiCalendarDays size={15} className="shrink-0" />
              <span>Book / Enquire</span>
            </button>

            <Link
              href="/contact"
              className="luxury-btn-sheen hidden lg:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <HiCalendarDays size={16} className="shrink-0" />
              <span>Book / Enquire</span>
            </Link>

            <a
              href={facilityWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerHaptic(10)}
              aria-label={`Enquire on WhatsApp about ${facility.title}`}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl lg:rounded-lg bg-[#063B49] hover:bg-[#082B38] text-white font-semibold text-xs sm:text-sm border border-[#063B49] active:scale-95 transition-all"
            >
              <FaWhatsapp size={15} className="text-[#25D366] shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FacilitiesExplorer({ facilities }: FacilitiesExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>("All");

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return facilities;
    return facilities.filter((f) => f.category === selectedCategory);
  }, [facilities, selectedCategory]);

  const counts = useMemo(() => {
    const map: Record<FilterOption, number> = {
      All: facilities.length,
      "Pool & Beach": facilities.filter((f) => f.category === "Pool & Beach")
        .length,
      Dining: facilities.filter((f) => f.category === "Dining").length,
      "Leisure & Events": facilities.filter(
        (f) => f.category === "Leisure & Events"
      ).length,
      "Comfort & Services": facilities.filter(
        (f) => f.category === "Comfort & Services"
      ).length,
    };
    return map;
  }, [facilities]);

  return (
    <section
      className="relative overflow-x-clip py-8 sm:py-12 md:py-16 bg-[#F9FBFC]"
      aria-label="Resort facilities directory"
    >
      <CoastalDecorations
        palmSide="left"
        waveSide="right"
        palmCorner="both"
        tone="light"
      />

      {/* Sticky Android/iOS Native Category Filter Bar */}
      <div className="sticky top-16 lg:top-[72px] z-20 bg-[#F9FBFC]/95 backdrop-blur-xl border-y border-[#D9EEF2] py-2.5 sm:py-3 mb-8 sm:mb-12 app-chrome">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  triggerHaptic(8);
                  setSelectedCategory(category);
                }}
                aria-pressed={active}
                className={`relative shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors active:scale-95 ${
                  active
                    ? "text-[#F6C46A]"
                    : "text-[#063B49] bg-white border border-[#D9EEF2] hover:border-[#0B7285]/40"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="facilities-filter-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#063B49] shadow-[0_4px_12px_rgba(6,59,73,0.28)] -z-10"
                    aria-hidden="true"
                  />
                )}
                <span>
                  {category}{" "}
                  <span
                    className={`text-[10px] sm:text-xs ml-0.5 ${
                      active ? "text-[#F6C46A]/85" : "text-[#607780]"
                    }`}
                  >
                    ({counts[category]})
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow="Experience MYRA"
          title="Everything Crafted for Comfort"
          subtitle="Discover our swimming pool, direct golden beach access, multi-cuisine dining, green lawns and 24-hour hospitality services near Chirala."
        />

        <div className="space-y-6 sm:space-y-10 mt-8 sm:mt-12">
          {filtered.map((facility, idx) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: idx * 0.05 }}
            >
              <FacilityShowcaseCard facility={facility} index={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
