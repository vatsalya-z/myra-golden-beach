"use client";

import { useState } from "react";
import Image from "next/image";
import { HiXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/animations/FadeIn";

export function GalleryPreview() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const preview = galleryImages.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-[#072A32]" aria-label="Gallery preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            eyebrow="Photo Gallery"
            title="A Glimpse of MYRA Golden"
            subtitle="Explore our rooms, facilities, pool and the natural beauty of our coastal surroundings."
            light
          />
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 mt-10 md:mt-14">
          {preview.map((img, idx) => (
            <FadeIn key={img.id} delay={idx * 0.07}>
              <motion.button
                whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
                onClick={() => setLightbox(img.src)}
                className="relative w-full overflow-hidden rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C] shadow-md border border-white/10"
                style={{ paddingBottom: "75%" }}
                aria-label={`View ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#072A32]/0 group-hover:bg-[#072A32]/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#072A32]/80 text-[#E0B45C] text-xs font-semibold px-3 py-1 rounded-full border border-[#E0B45C]/40 shadow">
                    View Photo
                  </span>
                </div>
              </motion.button>
            </FadeIn>
          ))}
        </div>

        <div className="flex justify-center items-center mt-12 w-full">
          <Button href="/gallery" variant="ghost" size="lg" className="min-w-[200px]">
            View Full Gallery
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 text-white hover:text-[#E0B45C] transition-colors"
              aria-label="Close image"
              onClick={() => setLightbox(null)}
            >
              <HiXMark size={28} />
            </button>
            <div
              className="relative max-w-4xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Gallery preview"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
