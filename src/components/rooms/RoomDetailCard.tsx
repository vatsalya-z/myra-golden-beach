"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

interface RoomDetailCardProps {
  room: Room;
  index: number;
}

export function RoomDetailCard({ room, index }: RoomDetailCardProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const { openBookingSheet } = useMobileApp();

  const totalImages = room.images.length;
  const activeImage = room.images[activeIdx] || room.images[0];
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

  const roomWhatsappUrl = buildWhatsAppUrl(
    [
      "Hello MYRA GOLDEN BEACH RESORT,",
      "",
      `I would like to enquire about booking the *${room.name}*${room.view ? ` (${room.view})` : ""}.`,
      "Please share availability, tariff, and direct booking details. Thank you!",
    ].join("\n")
  );

  return (
    <article
      className={`grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-11 items-center bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-[0_10px_34px_rgba(6,59,73,0.08)] hover:shadow-[0_16px_44px_rgba(6,59,73,0.13)] border border-[#D9EEF2] hover:border-[#F6C46A]/65 transition-all duration-300 ${
        isOdd ? "lg:grid-flow-dense" : ""
      }`}
    >
      {/* Interactive Swipeable Gallery Column */}
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
                alt={`${room.name} photo ${activeIdx + 1} at MYRA Golden Beach Resort`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Top-left Signature Badge */}
          {room.badge && (
            <span className="absolute top-3 left-3 bg-[#F6C46A] text-[#082B38] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full tracking-wide shadow-md z-10 flex items-center gap-1">
              <HiSparkles size={12} className="shrink-0" />
              <span>{room.badge}</span>
            </span>
          )}

          {/* Top-right Photo Counter Pill */}
          {totalImages > 1 && (
            <span className="absolute top-3 right-3 bg-[#082B38]/75 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-full z-10">
              {activeIdx + 1} / {totalImages}
            </span>
          )}

          {/* Prev / Next Arrows */}
          {totalImages > 1 && (
            <>
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
            </>
          )}

          {/* Mobile Pagination Dots Overlay */}
          {totalImages > 1 && (
            <div className="md:hidden absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-[#082B38]/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
              {room.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => {
                    triggerHaptic(6);
                    setActiveIdx(i);
                  }}
                  aria-label={`View photo ${i + 1} of ${room.name}`}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIdx === i ? "w-5 bg-[#F6C46A]" : "w-1.5 bg-white/60"
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
                onClick={() => setActiveIdx(i)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeIdx === i
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
      <div className={isOdd ? "lg:col-start-1 lg:row-start-1" : ""}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="text-[#0B7285] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase">
            {room.tagline}
          </span>
          {room.category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#E8F6F7] text-[#063B49] border border-[#D9EEF2] px-2.5 py-0.5 rounded-full">
              {room.category}
            </span>
          )}
        </div>

        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#063B49] mb-2.5 leading-snug">
          {room.name}
        </h2>

        <p className="text-[#607780] text-xs sm:text-sm md:text-base leading-relaxed mb-4">
          {room.description}
        </p>

        {/* Architectural Room Spec Chips */}
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-[#D9EEF2]">
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

        {/* Amenity Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
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

        {/* Native Dual CTA Footer */}
        <div className="pt-4 border-t border-[#D9EEF2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-[#607780] font-medium">
            {room.priceNote || "Best direct resort rates"}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Mobile (< lg): Opens draggable Quick Booking Bottom Sheet */}
            <button
              type="button"
              onClick={() => openBookingSheet(room.name)}
              className="lg:hidden flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6C46A] to-[#DCA94F] text-[#082B38] font-bold text-xs tracking-wide shadow-[0_6px_16px_rgba(246,196,106,0.3)] active:scale-95 transition-transform"
            >
              <HiCalendarDays size={15} className="shrink-0" />
              <span>Book Now</span>
            </button>

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
