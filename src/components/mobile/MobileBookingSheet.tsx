"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiXMark, HiMapPin, HiShare, HiCheck } from "react-icons/hi2";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";
import { triggerHaptic } from "@/lib/haptics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMobileApp } from "./MobileAppProvider";

export function MobileBookingSheet() {
  const { bookingSheetOpen, defaultRoom, closeBookingSheet } = useMobileApp();
  const reducedMotion = useReducedMotion();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [roomType, setRoomType] = useState(defaultRoom);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setRoomType(defaultRoom);
  }, [defaultRoom]);

  useEffect(() => {
    if (!bookingSheetOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBookingSheet();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [bookingSheetOpen, closeBookingSheet]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 90 || info.velocity.y > 400) {
      triggerHaptic(8);
      closeBookingSheet();
    }
  };

  const handleShare = async () => {
    triggerHaptic(10);
    const shareUrl =
      typeof window !== "undefined" ? window.location.href : siteConfig.domain;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "MYRA Golden Beach Resort — Chirala",
          text: "Check out MYRA Golden Beach Resort in Chirala, Andhra Pradesh!",
          url: shareUrl,
        });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Ignore dismissed share sheet
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic([12, 30, 12]);

    const message = [
      "Hello MYRA GOLDEN BEACH RESORT,",
      "",
      "I would like to check room availability and rates for my stay.",
      "",
      checkIn ? `Check-in: ${checkIn}` : "Check-in: Flexible / To be decided",
      checkOut
        ? `Check-out: ${checkOut}`
        : "Check-out: Flexible / To be decided",
      `Guests: ${guests}`,
      `Room Preference: ${roomType}`,
      "",
      "Please let me know room availability and best price. Thank you!",
    ].join("\n");

    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
    closeBookingSheet();
  };

  const today = new Date().toISOString().split("T")[0];
  const quickWhatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  return (
    <AnimatePresence>
      {bookingSheetOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Quick Booking and Concierge"
        >
          {/* Dimmed backdrop */}
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeBookingSheet}
            className="absolute inset-0 bg-[#041820]/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Draggable Bottom Sheet */}
          <motion.div
            key="sheet-panel"
            initial={reducedMotion ? { opacity: 0 } : { y: "100%" }}
            animate={reducedMotion ? { opacity: 1 } : { y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { y: "100%" }}
            transition={
              reducedMotion
                ? { duration: 0.15 }
                : { type: "spring", damping: 30, stiffness: 340 }
            }
            drag={reducedMotion ? false : "y"}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.4 }}
            onDragEnd={handleDragEnd}
            className="relative w-full max-w-lg rounded-t-3xl bg-gradient-to-b from-[#082B38] to-[#063B49] border-t border-[#F6C46A]/35 shadow-[0_-20px_60px_rgba(0,0,0,0.6)] text-white overflow-hidden touch-pan-x"
          >
            {/* Drag Handle Pill */}
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-11 h-1.5 rounded-full bg-white/30" />
            </div>

            {/* Header */}
            <div className="px-5 pt-2 pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F6C46A]">
                  Direct Resort Concierge
                </p>
                <h2 className="font-playfair text-lg font-bold text-white leading-snug">
                  Quick Booking &amp; Concierge
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(8);
                  closeBookingSheet();
                }}
                aria-label="Close quick booking sheet"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:text-[#F6C46A] active:scale-90 transition-transform"
              >
                <HiXMark size={20} />
              </button>
            </div>

            <div className="px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-5 max-h-[80dvh] overflow-y-auto scrollbar-none">
              {/* 4-column Native Quick Actions Row */}
              <div className="grid grid-cols-4 gap-2.5 app-chrome">
                <a
                  href={quickWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerHaptic(10)}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-white active:scale-95 transition-transform"
                >
                  <FaWhatsapp size={20} className="text-[#25D366]" />
                  <span className="text-[11px] font-medium text-white/90">
                    WhatsApp
                  </span>
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  onClick={() => triggerHaptic(10)}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl bg-white/[0.07] border border-white/15 text-white active:scale-95 transition-transform"
                >
                  <FaPhoneAlt size={17} className="text-[#F6C46A]" />
                  <span className="text-[11px] font-medium text-white/90">
                    Call
                  </span>
                </a>

                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerHaptic(10)}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl bg-white/[0.07] border border-white/15 text-white active:scale-95 transition-transform"
                >
                  <HiMapPin size={20} className="text-[#F6C46A]" />
                  <span className="text-[11px] font-medium text-white/90">
                    Directions
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl bg-white/[0.07] border border-white/15 text-white active:scale-95 transition-transform"
                >
                  {copied ? (
                    <HiCheck size={20} className="text-[#25D366]" />
                  ) : (
                    <HiShare size={19} className="text-[#F6C46A]" />
                  )}
                  <span className="text-[11px] font-medium text-white/90">
                    {copied ? "Copied!" : "Share"}
                  </span>
                </button>
              </div>

              {/* Compact Instant Availability Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="sheet-checkin"
                      className="block text-[11px] font-medium text-white/75 mb-1"
                    >
                      Check-in
                    </label>
                    <input
                      id="sheet-checkin"
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#F6C46A] [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sheet-checkout"
                      className="block text-[11px] font-medium text-white/75 mb-1"
                    >
                      Check-out
                    </label>
                    <input
                      id="sheet-checkout"
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#F6C46A] [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="sheet-guests"
                      className="block text-[11px] font-medium text-white/75 mb-1"
                    >
                      Guests
                    </label>
                    <select
                      id="sheet-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#082B38] border border-white/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#F6C46A]"
                    >
                      <option value="1 Adult">1 Adult</option>
                      <option value="2 Adults">2 Adults</option>
                      <option value="2 Adults + 1 Child">
                        2 Adults + 1 Child
                      </option>
                      <option value="3 Adults">3 Adults</option>
                      <option value="4+ Adults (Family)">
                        4+ Adults (Family)
                      </option>
                      <option value="Group / Corporate (6+)">
                        Group (6+)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="sheet-room"
                      className="block text-[11px] font-medium text-white/75 mb-1"
                    >
                      Room Preference
                    </label>
                    <select
                      id="sheet-room"
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#082B38] border border-white/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#F6C46A]"
                    >
                      <option value="Beachfront Bamboo Cottage">
                        Beachfront Bamboo Cottage
                      </option>
                      <option value="Garden Courtyard Private Villa">
                        Garden Courtyard Private Villa
                      </option>
                      <option value="Ocean View Honeymoon Suite">
                        Ocean View Honeymoon Suite
                      </option>
                      <option value="Royal Chandelier King Suite">
                        Royal Chandelier King Suite
                      </option>
                      <option value="Poolside Luxury Room">
                        Poolside Luxury Room
                      </option>
                      <option value="Premier King Room">
                        Premier King Room
                      </option>
                      <option value="Deluxe Double Room">
                        Deluxe Double Room
                      </option>
                      <option value="Deluxe Triple Room">
                        Deluxe Triple Room
                      </option>
                      <option value="Family Suite">Family Suite</option>
                      <option value="Group & Corporate AC Suite">
                        Group &amp; Corporate AC Suite
                      </option>
                      <option value="Any Available Room">
                        Any Available Room
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="luxury-btn-sheen w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] font-bold text-sm rounded-xl shadow-[0_8px_24px_rgba(246,196,106,0.3)] active:scale-[0.98] transition-transform"
                >
                  <FaWhatsapp size={17} />
                  <span>Check Availability on WhatsApp</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
