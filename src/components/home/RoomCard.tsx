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
      className="h-full flex flex-col justify-between group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-[#D9EEF2]"
    >
      <div>
        <div className="relative h-56 sm:h-64 overflow-hidden bg-[#E8F6F7]">
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
            <span className="absolute top-3.5 left-3.5 bg-[#F6C46A] text-[#063B49] text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-sm tracking-wide shadow-md z-10">
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
                    activeIdx === i ? "bg-[#F6C46A] w-5" : "bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`View ${room.name} image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {room.images.length > 1 && (
          <div className="px-4 pt-2.5 pb-1 flex gap-2 overflow-x-auto scrollbar-none bg-[#F9FBFC] border-b border-[#D9EEF2]">
            {room.images.slice(0, 4).map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`relative w-12 h-9 rounded overflow-hidden shrink-0 transition-all border ${
                  activeIdx === i ? "border-[#F6C46A] ring-1 ring-[#F6C46A]" : "border-[#D9EEF2] opacity-70 hover:opacity-100"
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
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#063B49] mb-1 group-hover:text-[#F6C46A] transition-colors">
            {room.name}
          </h3>
          <p className="text-[#F6C46A] text-xs font-medium tracking-wide mb-2.5">
            {room.tagline}
          </p>
          <p className="text-[#607780] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
            {room.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-[#607780] mb-4 pb-3.5 border-b border-[#D9EEF2]">
            <span className="font-semibold uppercase tracking-wider text-[10px] bg-[#F6C46A]/15 text-[#0B7285] px-2 py-0.5 rounded-sm">
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
                className="text-[11px] sm:text-xs bg-[#F9FBFC] text-[#607780] px-2 py-1 rounded-sm border border-[#D9EEF2] truncate text-center"
              >
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 flex items-center justify-between border-t border-[#D9EEF2] mt-auto">
        <span className="text-xs text-[#607780] italic">
          {room.priceNote}
        </span>
        <Button href="/contact" size="sm" variant="primary">
          Enquire Now
        </Button>
      </div>
    </motion.article>
  );
}
