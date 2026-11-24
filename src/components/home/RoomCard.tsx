"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { Room } from "@/types/room";
import { Button } from "@/components/common/Button";
import { triggerHaptic } from "@/lib/haptics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  isWideMobile?: boolean;
}

const cardSlideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir * 24,
    opacity: 0.45,
    scale: 1.03,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir * -24,
    opacity: 0.45,
    transition: { duration: 0.2 },
  }),
};

export function RoomCard({ room, isWideMobile = false }: RoomCardProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const totalImages = room.images.length;
  const activeImage = room.images[activeIdx] || room.images[0];

  const jumpImage = (nextIdx: number) => {
    triggerHaptic(6);
    setDirection(nextIdx >= activeIdx ? 1 : -1);
    setActiveIdx(nextIdx);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || totalImages <= 1) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 35) {
      triggerHaptic(8);
      if (delta < 0) {
        setDirection(1);
        setActiveIdx((prev) => (prev + 1) % totalImages);
      } else {
        setDirection(-1);
        setActiveIdx((prev) => (prev - 1 + totalImages) % totalImages);
      }
    }
  };

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -6 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      className="h-full flex flex-col justify-between group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-[#E5D9C3]"
    >
      <div>
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            "relative overflow-hidden bg-[#E8F6F7]",
            isWideMobile ? "h-48 sm:h-64" : "h-32 sm:h-64"
          )}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeImage}
              custom={direction}
              variants={reducedMotion ? undefined : cardSlideVariants}
              initial={reducedMotion ? false : "enter"}
              animate="center"
              exit={reducedMotion ? undefined : "exit"}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt={`${room.name} photo ${activeIdx + 1} at MYRA Golden Beach Resort`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>

          {room.badge && (
            <span className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 bg-[#F6C46A] text-[#063B49] text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm tracking-wide shadow-md z-10">
              {room.badge}
            </span>
          )}

          {totalImages > 1 && (
            <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 bg-black/45 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full z-10">
              {room.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => jumpImage(i)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    activeIdx === i
                      ? "bg-[#F6C46A] w-3.5 sm:w-5"
                      : "bg-white/70 hover:bg-white w-1.5 sm:w-2"
                  }`}
                  aria-label={`View ${room.name} image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {totalImages > 1 && (
          <div className="hidden sm:flex px-4 pt-2.5 pb-1 gap-2 overflow-x-auto scrollbar-none bg-[#F9FBFC] border-b border-[#D9EEF2]">
            {room.images.slice(0, 4).map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => jumpImage(i)}
                className={`relative w-12 h-9 rounded overflow-hidden shrink-0 transition-all border ${
                  activeIdx === i
                    ? "border-[#F6C46A] ring-1 ring-[#F6C46A]"
                    : "border-[#D9EEF2] opacity-70 hover:opacity-100"
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
        <div className="p-2.5 sm:p-5 md:p-6">
          <h3 className="font-playfair text-sm sm:text-xl md:text-2xl font-bold text-[#063B49] mb-0.5 sm:mb-1 group-hover:text-[#0B7285] transition-colors line-clamp-1 sm:line-clamp-none">
            {room.name}
          </h3>
          <p className="text-[#0B7285] sm:text-[#F6C46A] text-[10px] sm:text-xs font-medium tracking-wide mb-1.5 sm:mb-2.5 truncate">
            {room.tagline}
          </p>
          <p className="hidden sm:line-clamp-2 text-[#607780] text-xs sm:text-sm leading-relaxed mb-4">
            {room.description}
          </p>

          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#607780] mb-2 sm:mb-4 pb-2 sm:pb-3.5 border-b border-[#D9EEF2]">
            <span className="font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] bg-[#F6C46A]/15 text-[#0B7285] px-1.5 py-0.5 sm:px-2 rounded-sm shrink-0">
              Guests
            </span>
            <span className="truncate">
              {room.capacity.adults} Adults
              {room.capacity.children ? ` + ${room.capacity.children} Child` : ""}
            </span>
          </div>

          {/* Amenity tags grid */}
          <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-1 sm:mb-2">
            {room.amenities.slice(0, isWideMobile ? 4 : 2).map((a) => (
              <span
                key={a.label}
                className="text-[9px] sm:text-xs bg-[#F9FBFC] text-[#607780] px-1.5 py-1 sm:px-2 rounded-sm border border-[#D9EEF2] truncate text-center"
              >
                {a.label}
              </span>
            ))}
            {!isWideMobile &&
              room.amenities.slice(2, 4).map((a) => (
                <span
                  key={a.label}
                  className="hidden sm:inline-block text-xs bg-[#F9FBFC] text-[#607780] px-2 py-1 rounded-sm border border-[#D9EEF2] truncate text-center"
                >
                  {a.label}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-2.5 pb-2.5 sm:px-6 sm:pb-6 pt-2 sm:pt-3 flex items-center justify-between gap-2 border-t border-[#D9EEF2] mt-auto">
        <span className="hidden sm:inline text-xs text-[#607780] italic">
          {room.priceNote}
        </span>
        <Button
          href="/contact"
          size="sm"
          variant="primary"
          className="w-full sm:w-auto text-[11px] sm:text-xs py-1.5 sm:py-2 px-2.5 sm:px-4 text-center"
        >
          <span className="sm:hidden">Enquire</span>
          <span className="hidden sm:inline">Enquire Now</span>
        </Button>
      </div>
    </motion.article>
  );
}
