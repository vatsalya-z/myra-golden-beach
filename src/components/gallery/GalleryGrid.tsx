"use client";

import { useState } from "react";
import Image from "next/image";
import { HiXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import type { GalleryCategory } from "@/types/gallery";

const categories: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "exterior", label: "Resort Exterior" },
  { value: "rooms", label: "Rooms" },
  { value: "pool", label: "Swimming Pool" },
  { value: "restaurant", label: "Restaurant" },
  { value: "garden", label: "Garden" },
  { value: "facilities", label: "Facilities" },
];

export function GalleryGrid() {
  const [active, setActive] = useState<GalleryCategory>("all");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const filtered =
    active === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === active);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10" role="group" aria-label="Gallery filter">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            aria-pressed={active === cat.value}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C] ${
              active === cat.value
                ? "bg-[#E0B45C] text-[#072A32] shadow-md font-bold"
                : "bg-white text-[#566970] border border-[#E5D9C3] hover:border-[#E0B45C] hover:text-[#072A32]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid: 2 cols on mobile, 3 cols on tablet, 4 cols on desktop */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                className="relative w-full overflow-hidden rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C]"
                style={{ paddingBottom: "75%" }}
                aria-label={`View ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#072A32]/0 group-hover:bg-[#072A32]/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E0B45C] text-xs font-semibold bg-[#072A32]/80 border border-[#E0B45C]/40 px-3 py-1 rounded-full">
                    View
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-[#566970] text-sm py-12">
          No images in this category yet. Check back soon.
        </p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-[#E0B45C] transition-colors p-2"
              aria-label="Close image viewer"
              onClick={() => setLightbox(null)}
            >
              <HiXMark size={30} />
            </button>
            <div
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <p className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-xs">
                {lightbox.alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
