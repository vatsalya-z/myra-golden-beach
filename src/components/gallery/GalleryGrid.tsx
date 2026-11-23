"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiXMark,
  HiChevronLeft,
  HiChevronRight,
  HiArrowUpRight,
  HiSquares2X2,
  HiViewColumns,
} from "react-icons/hi2";
import { galleryImages } from "@/data/gallery";
import type { GalleryCategory } from "@/types/gallery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const categories: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "exterior", label: "Exterior" },
  { value: "rooms", label: "Rooms" },
  { value: "pool", label: "Pool" },
  { value: "restaurant", label: "Dining" },
  { value: "garden", label: "Garden" },
  { value: "facilities", label: "Facilities" },
];

const categoryDisplayLabel: Record<string, string> = {
  exterior: "Resort Exterior",
  rooms: "Suites & Rooms",
  pool: "Swimming Pool",
  restaurant: "Dining & Cuisine",
  garden: "Coastal Garden",
  facilities: "Resort Facilities",
};

/**
 * Editorial Magazine Bento Pattern (8-card repeating cadence):
 * Breaks the monotonous 4x4 camera roll into a curated luxury hotel lookbook!
 * - Desktop (12-col): Hero feature (6x2), stacked pair (3x1), tall portrait (3x2), wide feature (6x1), crisp trio (4x1).
 * - Mobile (2-col): Every 5th photo spans full width (col-span-2) for rhythmic breathing room.
 */
function getEditorialSpanClass(index: number, total: number): string {
  if (total <= 3) {
    return "col-span-2 md:col-span-6 lg:col-span-4 aspect-[4/3] lg:aspect-auto lg:h-[340px]";
  }
  const slot = index % 8;
  switch (slot) {
    case 0:
      // Grand Editorial Feature
      return "col-span-2 md:col-span-4 lg:col-span-6 lg:row-span-2 h-64 sm:h-80 lg:h-auto lg:min-h-[456px]";
    case 1:
      return "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-1 h-44 sm:h-56 lg:h-auto lg:min-h-[220px]";
    case 2:
      return "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2 h-44 sm:h-56 lg:h-auto lg:min-h-[456px]";
    case 3:
      return "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-1 h-44 sm:h-56 lg:h-auto lg:min-h-[220px]";
    case 4:
      // Full-width panoramic breather on mobile & wide feature on desktop
      return "col-span-2 md:col-span-4 lg:col-span-6 lg:row-span-1 h-56 sm:h-72 lg:h-auto lg:min-h-[250px]";
    case 5:
      return "col-span-1 md:col-span-2 lg:col-span-6 lg:row-span-1 h-44 sm:h-56 lg:h-auto lg:min-h-[250px]";
    case 6:
      return "col-span-1 md:col-span-3 lg:col-span-4 lg:row-span-1 h-44 sm:h-56 lg:h-auto lg:min-h-[240px]";
    case 7:
    default:
      return "col-span-2 md:col-span-3 lg:col-span-8 lg:row-span-1 h-56 sm:h-64 lg:h-auto lg:min-h-[240px]";
  }
}

const INITIAL_BATCH = 12;

export function GalleryGrid() {
  const [active, setActive] = useState<GalleryCategory>("all");
  const [viewMode, setViewMode] = useState<"editorial" | "grid">("editorial");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: galleryImages.length };
    for (const img of galleryImages) {
      map[img.category] = (map[img.category] || 0) + 1;
    }
    return map;
  }, []);

  const filtered = useMemo(
    () =>
      active === "all"
        ? galleryImages
        : galleryImages.filter((img) => img.category === active),
    [active]
  );

  const displayed = useMemo(
    () => (active === "all" ? filtered.slice(0, visibleCount) : filtered),
    [active, filtered, visibleCount]
  );

  const hasMore = active === "all" && visibleCount < filtered.length;

  const close = useCallback(() => setLightboxIdx(null), []);
  const next = useCallback(
    () =>
      setLightboxIdx((i) =>
        i === null ? null : (i + 1) % filtered.length
      ),
    [filtered.length]
  );
  const prev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i === null ? null : (i - 1 + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIdx, close, next, prev]);

  // GSAP ScrollTrigger staggered curtain reveal on visible cards
  useEffect(() => {
    const container = gridRef.current;
    if (!container || reducedMotion) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll<HTMLElement>("[data-gallery-card]");
      items.forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(10% 0% 0% 0% round 0.875rem)", opacity: 0, y: 20 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0.875rem)",
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: (i % 4) * 0.06,
            ease: "power3.out",
            clearProps: "clipPath,transform",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [active, viewMode, visibleCount, reducedMotion]);

  const activeImg = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <>
      {/* Sticky Frosted Glass Filter Toolbar (Desktop + Horizontal Scroll Mobile) */}
      <div className="sticky top-[68px] md:top-[76px] z-30 mb-8 sm:mb-12">
        <div className="bg-[#FCFAF6]/90 backdrop-blur-md border border-[#E5D9C3] rounded-2xl p-2 sm:p-2.5 shadow-[0_10px_30px_rgba(7,42,50,0.07)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {/* Category Pills — Horizontal scrollable on mobile, clean wrap on desktop */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 md:pb-0"
            role="group"
            aria-label="Gallery category filter"
          >
            {categories.map((cat) => {
              const isActive = active === cat.value;
              const count = counts[cat.value] || 0;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    setActive(cat.value);
                    setLightboxIdx(null);
                  }}
                  aria-pressed={isActive}
                  className={`relative shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C] ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#566970] hover:text-[#072A32] hover:bg-[#F3ECE0]/70"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#041B21] via-[#072A32] to-[#0E3E49] shadow-md border border-[#E0B45C]/40"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#E0B45C]/20 text-[#F2D28B]"
                          : "bg-[#072A32]/[0.06] text-[#566970]"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Editorial / Grid View Toggle (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-1 pl-3 border-l border-[#E5D9C3] shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("editorial")}
              aria-label="Editorial lookbook layout"
              title="Editorial Lookbook"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "editorial"
                  ? "bg-[#E0B45C]/20 text-[#072A32] font-semibold"
                  : "text-[#566970] hover:text-[#072A32]"
              }`}
            >
              <HiViewColumns size={15} />
              <span>Lookbook</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Uniform grid layout"
              title="Uniform Grid"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-[#E0B45C]/20 text-[#072A32] font-semibold"
                  : "text-[#566970] hover:text-[#072A32]"
              }`}
            >
              <HiSquares2X2 size={15} />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Curated Editorial Bento Lookbook OR Clean Uniform Grid */}
      <div
        ref={gridRef}
        className={
          viewMode === "editorial"
            ? "grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 grid-flow-dense"
            : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
        }
      >
        {displayed.map((img, idx) => {
          const spanClass =
            viewMode === "editorial"
              ? getEditorialSpanClass(idx, displayed.length)
              : "aspect-[4/3]";
          const photoNum = String(idx + 1).padStart(2, "0");
          const catName = categoryDisplayLabel[img.category] || img.category;

          return (
            <div
              key={`${active}-${viewMode}-${img.id}`}
              data-gallery-card
              className={`relative ${spanClass}`}
            >
              <button
                type="button"
                onClick={() => setLightboxIdx(idx)}
                className="relative w-full h-full block overflow-hidden rounded-2xl group bg-[#041B21] border border-[#E5D9C3]/80 hover:border-[#E0B45C]/70 shadow-[0_10px_28px_rgba(7,42,50,0.08)] hover:shadow-[0_22px_50px_rgba(7,42,50,0.22)] transition-all duration-500 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C]"
                aria-label={`View ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out contrast-[1.03] saturate-[1.06]"
                  sizes={
                    viewMode === "editorial" && idx % 8 === 0
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 33vw"
                  }
                />

                {/* Smooth Atmospheric Hover Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041B21]/85 via-[#041B21]/15 to-transparent opacity-45 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Subtle Inner Gold Hairline Frame on Hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2.5 rounded-xl border border-white/0 group-hover:border-[#E0B45C]/45 transition-colors duration-500"
                />

                {/* Top Corner Index & Expand Icon */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-400 z-10">
                  <span className="font-mono text-[10px] tracking-[0.22em] px-2.5 py-1 rounded-full bg-[#041B21]/70 backdrop-blur-md border border-[#E0B45C]/40 text-[#F2D28B]">
                    {photoNum}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#E0B45C] text-[#041B21] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:rotate-12">
                    <HiArrowUpRight size={14} />
                  </span>
                </div>

                {/* Bottom Glass Editorial Caption */}
                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 translate-y-2 opacity-90 sm:opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 z-10">
                  <span className="inline-block text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E0B45C] mb-1">
                    {catName}
                  </span>
                  <p className="text-white text-xs sm:text-sm font-medium leading-snug line-clamp-2">
                    {img.alt}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Progressive Curated Load More CTA */}
      {hasMore && (
        <div className="mt-10 sm:mt-14 flex flex-col items-center gap-3">
          <p className="text-xs text-[#566970] tracking-wide">
            Showing <span className="font-semibold text-[#072A32]">{displayed.length}</span> of{" "}
            <span className="font-semibold text-[#072A32]">{filtered.length}</span> resort photographs
          </p>
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="luxury-btn-sheen group inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#041B21] via-[#072A32] to-[#0E3E49] hover:from-[#C89435] hover:via-[#EBC878] hover:to-[#C89435] text-white hover:text-[#041B21] border border-[#E0B45C]/40 font-semibold rounded-full text-xs sm:text-sm tracking-wide shadow-[0_10px_28px_rgba(7,42,50,0.18)] hover:shadow-[0_12px_32px_rgba(224,180,92,0.35)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>
              Explore More Photographs (+{Math.min(12, filtered.length - displayed.length)})
            </span>
            <HiArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-[#566970] text-sm py-12">
          No images in this category yet. Check back soon.
        </p>
      )}

      {/* 5-Star Cinema Lightbox with Swipe Support & Bottom Filmstrip */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            key="cinema-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#041B21]/95 backdrop-blur-xl p-4 sm:p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Cinema photo viewer"
          >
            {/* Top Cinema Bar */}
            <div
              className="flex items-center justify-between gap-4 z-20 max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-[0.22em] text-[#E0B45C] bg-white/[0.06] border border-[#E0B45C]/30 px-3 py-1 rounded-full">
                  {String((lightboxIdx ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(filtered.length).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline-block text-xs uppercase tracking-[0.22em] text-white/60">
                  {categoryDisplayLabel[activeImg.category] || activeImg.category}
                </span>
              </div>

              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/20 text-white hover:border-[#E0B45C] hover:text-[#E0B45C] transition-all flex items-center justify-center"
                aria-label="Close image viewer"
                onClick={close}
              >
                <HiXMark size={22} />
              </button>
            </div>

            {/* Center Stage Image with Swipe Support */}
            <div className="relative flex-1 flex items-center justify-center my-4 min-h-0">
              <button
                type="button"
                className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#041B21]/70 border border-white/20 text-white hover:bg-[#E0B45C] hover:text-[#041B21] hover:border-[#E0B45C] transition-all flex items-center justify-center backdrop-blur-md"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <HiChevronLeft size={22} />
              </button>

              <button
                type="button"
                className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#041B21]/70 border border-white/20 text-white hover:bg-[#E0B45C] hover:text-[#041B21] hover:border-[#E0B45C] transition-all flex items-center justify-center backdrop-blur-md"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <HiChevronRight size={22} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg.id}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) next();
                    if (info.offset.x > 60) prev();
                  }}
                  className="relative max-w-5xl w-full h-full max-h-[68vh] cursor-grab active:cursor-grabbing"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={activeImg.src}
                    alt={activeImg.alt}
                    fill
                    className="object-contain select-none pointer-events-none"
                    sizes="92vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Caption + Interactive Filmstrip Thumbnails */}
            <div
              className="z-20 max-w-4xl w-full mx-auto text-center space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white/85 text-xs sm:text-sm font-medium max-w-2xl mx-auto">
                {activeImg.alt}
              </p>

              <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none py-1 px-2">
                {filtered.map((thumb, tIdx) => {
                  const isCurrent = tIdx === lightboxIdx;
                  return (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => setLightboxIdx(tIdx)}
                      aria-label={`Jump to photo ${tIdx + 1}`}
                      className={`relative w-12 h-9 sm:w-14 sm:h-10 rounded-md overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                        isCurrent
                          ? "border-[#E0B45C] scale-110 opacity-100 shadow-[0_0_12px_rgba(224,180,92,0.5)]"
                          : "border-white/15 opacity-45 hover:opacity-85"
                      }`}
                    >
                      <Image
                        src={thumb.src}
                        alt={thumb.alt}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
