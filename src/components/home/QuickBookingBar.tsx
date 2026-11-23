"use client";

import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function QuickBookingBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [roomType, setRoomType] = useState("Deluxe Double Room");

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();

    const message = [
      "Hello MYRA GOLDEN BEACH RESORT,",
      "",
      "I would like to check room availability and rates for my stay.",
      "",
      checkIn ? `Check-in: ${checkIn}` : "Check-in: Flexible / To be decided",
      checkOut ? `Check-out: ${checkOut}` : "Check-out: Flexible / To be decided",
      `Guests: ${guests}`,
      `Room Preference: ${roomType}`,
      "",
      "Please let me know room availability and best price. Thank you!",
    ].join("\n");

    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section
      aria-label="Quick room enquiry and booking"
      className="relative z-30 px-4 sm:px-6 -mt-8 sm:-mt-12 lg:-mt-16 mb-12 sm:mb-16"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gradient-to-br from-[#082B38] via-[#063B49] to-[#0B7285] border border-[#F6C46A]/45 rounded-2xl shadow-[0_20px_50px_rgba(8,43,56,0.45)] p-5 sm:p-7 md:p-8 text-white"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 mb-5 border-b border-white/10 text-center md:text-left">
            <div>
              <span className="text-[#F6C46A] text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
                Direct Resort Reservation
              </span>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-white">
                Check Room Availability & Best Rates
              </h2>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-3 text-xs sm:text-sm text-white/80">
              <span>Prefer to talk?</span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-1.5 text-[#F6C46A] font-semibold hover:underline"
              >
                <FaPhoneAlt size={12} />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Quick Booking Form */}
          <form onSubmit={handleEnquiry} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-end">
            {/* Check In */}
            <div>
              <label htmlFor="quick-checkin" className="block text-xs font-medium text-white/80 mb-1.5">
                Check-in Date
              </label>
              <input
                id="quick-checkin"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F6C46A] focus:border-transparent transition-all [color-scheme:dark]"
              />
            </div>

            {/* Check Out */}
            <div>
              <label htmlFor="quick-checkout" className="block text-xs font-medium text-white/80 mb-1.5">
                Check-out Date
              </label>
              <input
                id="quick-checkout"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F6C46A] focus:border-transparent transition-all [color-scheme:dark]"
              />
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="quick-guests" className="block text-xs font-medium text-white/80 mb-1.5">
                Guests
              </label>
              <select
                id="quick-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#082B38] border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F6C46A] focus:border-transparent transition-all"
              >
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adults">2 Adults</option>
                <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                <option value="3 Adults">3 Adults</option>
                <option value="4+ Adults (Family)">4+ Adults (Family)</option>
                <option value="Group / Corporate (6+)">Group (6+)</option>
              </select>
            </div>

            {/* Room Type */}
            <div>
              <label htmlFor="quick-room" className="block text-xs font-medium text-white/80 mb-1.5">
                Room Type
              </label>
              <select
                id="quick-room"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#082B38] border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F6C46A] focus:border-transparent transition-all"
              >
                <option value="Deluxe Double Room">Deluxe Double Room</option>
                <option value="Deluxe Triple Room">Deluxe Triple Room</option>
                <option value="Family Suite">Family Suite</option>
                <option value="Beachfront Cottage">Beachfront Cottage</option>
                <option value="Any Available Room">Any Available Room</option>
              </select>
            </div>

            {/* CTA Button */}
            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F6C46A] hover:bg-[#DCA94F] text-[#063B49] font-bold text-xs sm:text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 tracking-wide h-[42px]"
              >
                <FaWhatsapp size={16} />
                <span>Check Availability</span>
              </button>
            </div>
          </form>

          <p className="text-[11px] text-white/60 text-center mt-4">
            Instant enquiry via WhatsApp with pre-filled details &bull; Zero booking fees &bull; Best direct rates guaranteed
          </p>
        </motion.div>
      </div>
    </section>
  );
}
