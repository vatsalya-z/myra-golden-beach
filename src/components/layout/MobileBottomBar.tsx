"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiCalendarDays } from "react-icons/hi2";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";
import { useMobileApp } from "@/components/mobile/MobileAppProvider";
import { triggerHaptic } from "@/lib/haptics";

export function MobileBottomBar() {
  const { openBookingSheet } = useMobileApp();
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#063B49]/95 backdrop-blur-xl border-t border-[#F6C46A]/25 shadow-[0_-8px_30px_rgba(8,43,56,0.55)] pb-[env(safe-area-inset-bottom)] app-chrome"
      aria-label="Mobile quick actions"
    >
      <div className="grid grid-cols-3 items-center gap-2 h-[62px] max-w-lg mx-auto px-3">
        {/* Button 1: Book */}
        <button
          type="button"
          onClick={() => openBookingSheet()}
          aria-label="Book your stay"
          className="flex items-center justify-center gap-1.5 h-10 rounded-xl bg-gradient-to-r from-[#F6C46A] to-[#DCA94F] text-[#082B38] font-bold text-xs tracking-wide shadow-[0_4px_14px_rgba(246,196,106,0.3)] active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C46A]"
        >
          <HiCalendarDays size={17} className="shrink-0" />
          <span>Book</span>
        </button>

        {/* Button 2: WhatsApp (Elevated Center Action) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => triggerHaptic(10)}
          aria-label="Enquire via WhatsApp"
          className="relative flex flex-col items-center justify-center -mt-4 active:scale-90 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] rounded-xl"
        >
          <span className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center ring-4 ring-[#063B49] shadow-[0_6px_18px_rgba(37,211,102,0.45)]">
            <FaWhatsapp size={24} className="shrink-0" />
          </span>
          <span className="text-[10px] font-semibold text-white/95 tracking-wide leading-none mt-1">
            WhatsApp
          </span>
        </a>

        {/* Button 3: Call */}
        <a
          href={`tel:${siteConfig.phone}`}
          onClick={() => triggerHaptic(10)}
          aria-label={`Call ${siteConfig.phoneDisplay}`}
          className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl text-white/90 hover:text-[#F6C46A] active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C46A]"
        >
          <FaPhoneAlt size={17} className="text-[#F6C46A] shrink-0" />
          <span className="text-[11px] font-medium leading-none">Call</span>
        </a>
      </div>
    </nav>
  );
}
