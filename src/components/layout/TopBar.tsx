import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiMapPin, HiEnvelope } from "react-icons/hi2";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";

export function TopBar() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  return (
    <div className="bg-[#123B2A] border-b border-white/10 text-white/80 text-xs py-2.5 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: location + email */}
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <HiMapPin size={13} className="text-[#C8A45D] shrink-0" />
            <span>Kotha Peta Rural, Chirala, Andhra Pradesh 523157</span>
          </span>
          {siteConfig.email && (
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1.5 hover:text-[#C8A45D] transition-colors"
            >
              <HiEnvelope size={13} className="text-[#C8A45D] shrink-0" />
              <span>{siteConfig.email}</span>
            </a>
          )}
        </div>

        {/* Right: phone + whatsapp + CTA */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 hover:text-[#C8A45D] transition-colors"
            aria-label="Call us"
          >
            <FaPhoneAlt size={11} className="text-[#C8A45D] shrink-0" />
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
            className="bg-[#C8A45D] hover:bg-[#B38E46] text-[#123B2A] px-3.5 py-1 rounded-sm font-bold text-xs transition-colors tracking-wide shadow-sm"
          >
            Book Your Stay
          </a>
        </div>
      </div>
    </div>
  );
}
