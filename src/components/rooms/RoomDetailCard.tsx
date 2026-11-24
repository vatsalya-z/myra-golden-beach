"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCalendarDays,
  HiSparkles,
  HiUserGroup,
  HiArrowsPointingOut,
  HiEye,
} from "react-icons/hi2";
import type { Room } from "@/types/room";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { triggerHaptic } from "@/lib/haptics";
import { useMobileApp } from "@/components/mobile/MobileAppProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RoomDetailCardProps {
  room: Room;
  index: number;
  compactGrid?: boolean;
}

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir * 32,
    opacity: 0.4,
    scale: 1.03,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir * -32,
    opacity: 0.4,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

export function RoomDetailCard({
  room,
  index,
  compactGrid = true,
}: RoomDetailCardProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const { openBookingSheet } = useMobileApp();
  const reducedMotion = useReducedMotion();

  const totalImages = room.images.length;
  const activeImage = room.images[activeIdx] || room.images[0];
  const isOdd = index % 2 === 1;

  const nextImage = () => {
    triggerHaptic(8);
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    triggerHaptic(8);
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + totalImages) % totalImages);
  };

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
    if (Math.abs(delta) > 40) {
      if (delta < 0) nextImage();
      else prevImage();
    }
  };

  const roomWhatsappUrl = buildWhatsAppUrl(
    [
      "Hello MYRA GOLDEN BEACH RESORT,",
      "",
      `I would like to enquire about booking the *${room.name}*${room.view ? ` (${room.view})` : ""}.`,
      "Please share availability, tariff, and direct booking details. Thank you!",
    ].join("\n")
  );

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -4 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={cn(
        "h-full flex flex-col justify-between md:grid md:grid-cols-1 lg:grid-cols-2 lg:gap-11 lg:items-center bg-white rounded-2xl shadow-[0_10px_34px_rgba(6,59,73,0.08)] hover:shadow-[0_16px_44px_rgba(6,59,73,0.13)] border border-[#D9EEF2] hover:border-[#F6C46A]/65 transition-colors duration-300 overflow-hidden",
        compactGrid
          ? "p-2.5 sm:p-3.5 md:p-6 lg:p-8 gap-2.5 sm:gap-4"
          : "p-4 sm:p-6 md:p-8 gap-5 sm:gap-8",
        isOdd ? "lg:grid-flow-dense" : ""
      )}
    >
      {/* Interactive Swipeable Gallery Column */}
      <div className={cn("w-full", isOdd ? "lg:col-start-2" : "")}>
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            "relative rounded-xl overflow-hidden shadow-md bg-[#082B38] group",
            compactGrid
              ? "h-32 sm:h-44 md:h-80 lg:h-96"
              : "h-60 sm:h-80 md:h-96"
          )}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeImage}
              custom={direction}
              variants={reducedMotion ? undefined : slideVariants}
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
                sizes={
                  compactGrid
                    ? "(max-width: 768px) 48vw, 48vw"
                    : "(max-width: 1024px) 100vw, 48vw"
                }
              />
            </motion.div>
          </AnimatePresence>

          {/* Top-left Signature Badge */}
          {room.badge && (
            <span
              className={cn(
                "absolute top-2 left-2 md:top-3 md:left-3 bg-[#F6C46A] text-[#082B38] font-bold rounded-full tracking-wide shadow-md z-10 flex items-center gap-1 max-w-[72%] truncate",
                compactGrid
                  ? "text-[9px] px-2 py-0.5 md:text-xs md:px-3 md:py-1"
                  : "text-[10px] sm:text-xs px-2.5 sm:px-3 py-1"
              )}
            >
              <HiSparkles size={10} className="shrink-0 md:hidden" />
              <HiSparkles size={12} className="shrink-0 hidden md:inline" />
              <span className="truncate">{room.badge}</span>
            </span>
          )}

          {/* Top-right Photo Counter Pill */}
          {totalImages > 1 && (
            <span
              className={cn(
                "absolute top-2 right-2 md:top-3 md:right-3 bg-[#082B38]/75 backdrop-blur-md border border-white/20 text-white font-mono rounded-full z-10",
                compactGrid
                  ? "text-[9px] px-1.5 py-0.5 md:text-xs md:px-2.5 md:py-1"
                  : "text-[10px] sm:text-xs px-2.5 py-1"
              )}
            >
              {activeIdx + 1}/{totalImages}
            </span>
          )}

          {/* Prev / Next Arrows */}
          {totalImages > 1 && (
            <div className={compactGrid ? "hidden md:block" : "block"}>
              <button
                type="button"
                onClick={prevImage}
                aria-label={`Previous photo of ${room.name}`}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#082B38]/70 backdrop-blur-sm border border-white/20 text-white hover:bg-[#F6C46A] hover:text-[#082B38] transition-all flex items-center justify-center active:scale-90"
              >
                <HiChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label={`Next photo of ${room.name}`}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#082B38]/70 backdrop-blur-sm border border-white/20 text-white hover:bg-[#F6C46A] hover:text-[#082B38] transition-all flex items-center justify-center active:scale-90"
              >
                <HiChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Mobile Pagination Dots Overlay */}
          {totalImages > 1 && (
            <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-[#082B38]/65 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15">
              {room.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => jumpImage(i)}
                  aria-label={`View photo ${i + 1} of ${room.name}`}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIdx === i ? "w-3.5 bg-[#F6C46A]" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop & Tablet Thumbnails */}
        {totalImages > 1 && (
          <div className="hidden md:flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {room.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => jumpImage(i)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${activeIdx === i
                  ? "border-[#F6C46A] ring-2 ring-[#F6C46A]/25 scale-[1.03]"
                  : "border-[#D9EEF2] opacity-70 hover:opacity-100"
                  }`}
                aria-label={`View photo ${i + 1} of ${room.name}`}
              >
                <Image
                  src={img}
                  alt={`${room.name} angle ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Column */}
      <div
        className={cn(
          "flex flex-col justify-between flex-1 w-full",
          isOdd ? "lg:col-start-1 lg:row-start-1" : ""
        )}
      >
        <div>
          {/* Category + Tagline */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
            <span
              className={cn(
                "text-[#0B7285] font-bold tracking-[0.16em] md:tracking-[0.22em] uppercase truncate",
                compactGrid ? "text-[9px] sm:text-[11px] md:text-xs" : "text-[11px] sm:text-xs"
              )}
            >
              {compactGrid ? room.category || room.tagline : room.tagline}
            </span>
            {room.category && (
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider bg-[#E8F6F7] text-[#063B49] border border-[#D9EEF2] px-2.5 py-0.5 rounded-full",
                  compactGrid ? "hidden md:inline-flex" : "inline-flex"
                )}
              >
                {room.category}
              </span>
            )}
          </div>

          <h2
            className={cn(
              "font-playfair font-bold text-[#063B49] leading-snug",
              compactGrid
                ? "text-[13px] sm:text-base md:text-3xl mb-1 md:mb-2.5 line-clamp-1 md:line-clamp-none"
                : "text-2xl sm:text-3xl mb-2.5"
            )}
          >
            {room.name}
          </h2>

          {/* Full Description (List mode or Tablet/Desktop) */}
          <p
            className={cn(
              "text-[#607780] text-xs sm:text-sm md:text-base leading-relaxed mb-4",
              compactGrid ? "hidden md:block" : "block"
            )}
          >
            {room.description}
          </p>

          {/* Compact 1-Line Spec Summary for Mobile 2-Col Grid */}
          {compactGrid && (
            <p className="md:hidden text-[10px] sm:text-xs text-[#607780] truncate mb-2">
              {room.capacity.adults} Adults
              {room.capacity.children ? `+${room.capacity.children} Child` : ""}
              {room.size ? ` · ${room.size}` : ""}
            </p>
          )}

          {/* Architectural Room Spec Chips (Desktop / List Mode) */}
          <div
            className={cn(
              "flex-wrap gap-2 mb-4 pb-4 border-b border-[#D9EEF2]",
              compactGrid ? "hidden md:flex" : "flex"
            )}
          >
            {room.size && (
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#063B49] bg-[#E8F6F7] border border-[#D9EEF2] px-2.5 py-1 rounded-lg">
                <HiArrowsPointingOut size={13} className="text-[#0B7285] shrink-0" />
                {room.size}
              </span>
            )}
            {room.view && (
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#063B49] bg-[#E8F6F7] border border-[#D9EEF2] px-2.5 py-1 rounded-lg">
                <HiEye size={13} className="text-[#0B7285] shrink-0" />
                {room.view}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#063B49] bg-[#E8F6F7] border border-[#D9EEF2] px-2.5 py-1 rounded-lg">
              <HiUserGroup size={13} className="text-[#0B7285] shrink-0" />
              {room.capacity.adults} Adults
              {room.capacity.children ? ` + ${room.capacity.children} Child` : ""}
            </span>
            {room.bedType && (
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#063B49] bg-[#F6C46A]/18 border border-[#F6C46A]/40 px-2.5 py-1 rounded-lg">
                {room.bedType}
              </span>
            )}
          </div>

          {/* Mobile 2-Col Grid Compact Amenity Preview (2 pills) */}
          {compactGrid && (
            <div className="md:hidden grid grid-cols-2 gap-1 mb-2.5">
              {room.amenities.slice(0, 2).map((a) => (
                <span
                  key={a.label}
                  className="text-[9px] sm:text-[10px] bg-[#F9FBFC] text-[#17313B] px-1.5 py-1 rounded border border-[#D9EEF2] truncate text-center font-medium"
                >
                  {a.label}
                </span>
              ))}
            </div>
          )}

          {/* Full Amenity Pills (Desktop / List Mode) */}
          <div
            className={cn(
              "grid-cols-2 sm:grid-cols-3 gap-2 mb-5",
              compactGrid ? "hidden md:grid" : "grid"
            )}
          >
            {room.amenities.map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-2 text-[11px] sm:text-xs text-[#17313B] bg-[#F9FBFC] px-2.5 py-2 rounded-lg border border-[#D9EEF2]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCA94F] shrink-0" />
                <span className="truncate font-medium">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Native Dual CTA Footer */}
        <div
          className={cn(
            "border-t border-[#D9EEF2] flex items-center justify-between gap-2 mt-auto",
            compactGrid ? "pt-2.5 md:pt-4 flex-row" : "pt-4 flex-col sm:flex-row"
          )}
        >
          <div
            className={cn(
              "text-xs sm:text-sm text-[#607780] font-medium",
              compactGrid ? "hidden md:block" : "block"
            )}
          >
            {room.priceNote || "Best direct resort rates"}
          </div>

          <div
            className={cn(
              "flex items-center gap-1.5 sm:gap-2.5",
              compactGrid ? "w-full md:w-auto" : "w-full sm:w-auto"
            )}
          >
            {/* Mobile (< lg): Opens draggable Quick Booking Bottom Sheet */}
            <motion.button
              type="button"
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              onClick={() => openBookingSheet(room.name)}
              className={cn(
                "lg:hidden flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#F6C46A] to-[#DCA94F] text-[#082B38] font-bold tracking-wide shadow-[0_4px_12px_rgba(246,196,106,0.3)]",
                compactGrid
                  ? "px-2.5 py-2 text-[11px] sm:text-xs"
                  : "px-4 py-2.5 text-xs"
              )}
            >
              <HiCalendarDays size={13} className="shrink-0" />
              <span>Book{compactGrid ? "" : " Now"}</span>
            </motion.button>

            {/* Desktop (lg+): Scrolls smoothly to on-page enquiry form */}
            <a
              href="#room-enquiry"
              className="luxury-btn-sheen hidden lg:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <HiCalendarDays size={16} className="shrink-0" />
              <span>Book Now</span>
            </a>

            {/* Secondary WhatsApp Instant Enquire */}
            <a
              href={roomWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerHaptic(10)}
              aria-label={`Quick WhatsApp enquiry for ${room.name}`}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 bg-[#063B49] hover:bg-[#082B38] text-white font-semibold border border-[#063B49] active:scale-95 transition-all shrink-0",
                compactGrid
                  ? "w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2.5 rounded-xl md:rounded-lg text-xs sm:text-sm"
                  : "px-3.5 sm:px-4 py-2.5 rounded-xl lg:rounded-lg text-xs sm:text-sm"
              )}
            >
              <FaWhatsapp size={15} className="text-[#25D366] shrink-0" />
              <span className={compactGrid ? "hidden md:inline" : "inline"}>
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
