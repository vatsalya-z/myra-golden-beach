import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiMapPin, HiEnvelope } from "react-icons/hi2";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";

export function TopBar() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  return (
    <div className="bg-[#041B21] border-b border-[#E0B45C]/15 text-white/80 text-xs py-2.5 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: location + email */}
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <HiMapPin size={13} className="text-[#E0B45C] shrink-0" />
            <span>Kotha Peta Rural, Chirala, Andhra Pradesh 523157</span>
          </span>
          {siteConfig.email && (
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1.5 hover:text-[#E0B45C] transition-colors"
            >
              <HiEnvelope size={13} className="text-[#E0B45C] shrink-0" />
              <span>{siteConfig.email}</span>
            </a>
          )}
        </div>

        {/* Right: phone + whatsapp + CTA */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 hover:text-[#E0B45C] transition-colors"
            aria-label="Call us"
          >
            <FaPhoneAlt size={11} className="text-[#E0B45C] shrink-0" />
            <span>{siteConfig.phoneDisplay}</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
            aria-label="WhatsApp us"
          >
            <FaWhatsapp size={13} className="text-[#25D366] shrink-0" />
            <span>WhatsApp</span>
          </a>
          <a
            href="/contact"
            className="bg-gradient-to-r from-[#C89435] via-[#EBC878] to-[#C89435] hover:from-[#B88428] hover:via-[#E0B45C] hover:to-[#B88428] text-[#041B21] px-3.5 py-1 rounded-sm font-bold text-xs transition-all tracking-wide shadow-[0_2px_10px_rgba(224,180,92,0.25)]"
          >
            Book Your Stay
          </a>
        </div>
      </div>
    </div>
  );
}
