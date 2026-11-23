"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Room } from "@/types/room";
import { Button } from "@/components/common/Button";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeImage = room.images[activeIdx] || room.images[0];

  return (
    <motion.article
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="h-full flex flex-col justify-between group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-[#EFE7D8]"
    >
      <div>
        <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.8, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.8 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt={`${room.name} photo ${activeIdx + 1} at MYRA Golden Beach Resort`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>

          {room.badge && (
            <span className="absolute top-3.5 left-3.5 bg-[#C8A45D] text-[#123B2A] text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-sm tracking-wide shadow-md z-10">
              {room.badge}
            </span>
          )}

          {room.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full z-10">
              {room.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIdx === i ? "bg-[#C8A45D] w-5" : "bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`View ${room.name} image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {room.images.length > 1 && (
          <div className="px-4 pt-2.5 pb-1 flex gap-2 overflow-x-auto scrollbar-none bg-[#FAF7F0] border-b border-[#EFE7D8]">
            {room.images.slice(0, 4).map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`relative w-12 h-9 rounded overflow-hidden shrink-0 transition-all border ${
                  activeIdx === i ? "border-[#C8A45D] ring-1 ring-[#C8A45D]" : "border-[#EFE7D8] opacity-70 hover:opacity-100"
                }`}
                aria-label={`Thumbnail ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`${room.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Card Content */}
        <div className="p-5 sm:p-6">
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#123B2A] mb-1 group-hover:text-[#C8A45D] transition-colors">
            {room.name}
          </h3>
          <p className="text-[#C8A45D] text-xs font-medium tracking-wide mb-2.5">
            {room.tagline}
          </p>
          <p className="text-[#74766F] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
            {room.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-[#74766F] mb-4 pb-3.5 border-b border-[#EFE7D8]">
            <span className="font-semibold uppercase tracking-wider text-[10px] bg-[#C8A45D]/15 text-[#8A6A32] px-2 py-0.5 rounded-sm">
              Guests
            </span>
            <span>
              {room.capacity.adults} Adults
              {room.capacity.children ? ` + ${room.capacity.children} Child` : ""}
            </span>
          </div>

          {/* Amenity tags grid */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2">
            {room.amenities.slice(0, 4).map((a) => (
              <span
                key={a.label}
                className="text-[11px] sm:text-xs bg-[#FAF7F0] text-[#74766F] px-2 py-1 rounded-sm border border-[#EFE7D8] truncate text-center"
              >
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 flex items-center justify-between border-t border-[#EFE7D8] mt-auto">
        <span className="text-xs text-[#74766F] italic">
          {room.priceNote}
        </span>
        <Button href="/contact" size="sm" variant="primary">
          Enquire Now
        </Button>
      </div>
    </motion.article>
  );
}
