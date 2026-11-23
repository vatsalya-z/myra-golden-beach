"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { amenities } from "@/data/amenities";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function AmenitiesSection() {
  return (
    <section
      className="py-16 md:py-24 bg-[#FAF7F0] relative overflow-hidden"
      aria-labelledby="amenities-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionHeading
          id="amenities-heading"
          eyebrow="Resort Amenities"
          title="Everything You Need for a Perfect Stay"
          subtitle="MYRA Golden Beach Resort is equipped with thoughtfully chosen facilities to make your coastal holiday comfortable and memorable."
          align="center"
        />

        {/* Responsive 2-column mobile, 4-column desktop grid with authentic photos */}
        <ScrollReveal className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-10 md:mt-14">
          {amenities.map((amenity, index) => {
            const indexStr = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={amenity.id}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="h-full flex flex-col justify-between group bg-white border border-[#EFE7D8] hover:border-[#C8A45D]/60 rounded-xl overflow-hidden transition-colors shadow-sm hover:shadow-lg"
              >
                <div>
                  {/* Photo with hover effect */}
                  {amenity.image && (
                    <div className="relative h-28 sm:h-36 md:h-40 w-full overflow-hidden bg-[#123B2A]">
                      <Image
                        src={amenity.image}
                        alt={amenity.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-[#123B2A]/30" />
                      {/* Monogram Badge */}
                      <span className="absolute top-2.5 left-2.5 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#123B2A] border border-[#C8A45D]/70 font-playfair font-bold text-[10px] sm:text-xs text-[#C8A45D] shadow">
                        {indexStr}
                      </span>
                    </div>
                  )}

                  {/* Text Details */}
                  <div className="p-3.5 sm:p-5">
                    <h3 className="text-[#123B2A] group-hover:text-[#C8A45D] transition-colors font-semibold text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2 leading-snug">
                      {amenity.title}
                    </h3>
                    <p className="text-[#74766F] text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </ScrollReveal>

        <div className="flex justify-center items-center mt-10 md:mt-12">
          <Button href="/rooms" variant="primary" size="md">
            Explore Rooms & Amenities
          </Button>
        </div>
      </div>
    </section>
  );
}
