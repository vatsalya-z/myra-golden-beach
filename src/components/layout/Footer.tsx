import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiMapPin, HiEnvelope } from "react-icons/hi2";
import { siteConfig } from "@/data/site";
import { navLinks } from "@/data/navigation";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  return (
    <footer className="bg-gradient-to-b from-[#072A32] via-[#052128] to-[#041B21] border-t border-[#E0B45C]/30 text-white/80" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-9 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-9 lg:gap-10">
          {/* Brand / About Us */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left flex flex-col items-center sm:items-start">
            <Link href="/" className="inline-flex items-center gap-3 mb-3 sm:mb-5">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src="/logo/logo.png"
                  alt="MYRA Golden Beach Resort"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="text-left">
                <div className="text-[#E0B45C] font-playfair font-bold text-base sm:text-lg leading-none">
                  MYRA GOLDEN
                </div>
                <div className="text-white/50 text-[10px] tracking-[0.2em] uppercase">
                  Beach Resort
                </div>
              </div>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-white/70 mb-3 sm:mb-5 max-w-md sm:max-w-none">
              A welcoming coastal retreat in Andhra Pradesh — offering comfortable rooms,
              refreshing pool, Andhra cuisine and warm hospitality near Chirala.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E0B45C] hover:text-[#E0B45C] transition-colors text-xs font-bold"
                >
                  Ig
                </a>
              )}
              {siteConfig.socialLinks.facebook && (
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E0B45C] hover:text-[#E0B45C] transition-colors text-xs font-bold"
                >
                  Fb
                </a>
              )}
              {siteConfig.socialLinks.youtube && (
                <a
                  href={siteConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E0B45C] hover:text-[#E0B45C] transition-colors text-xs font-bold"
                >
                  Yt
                </a>
              )}
            </div>
          </div>

          {/* Quick Links / Navigation Links */}
          <div className="border-t border-white/10 pt-5 sm:border-t-0 sm:pt-0">
            <h3 className="text-[#E0B45C] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-5 text-center sm:text-left">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-2 sm:gap-y-2.5 max-w-[300px] mx-auto pl-4 sm:pl-0 sm:max-w-none sm:mx-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/75 hover:text-[#E0B45C] transition-colors flex items-center justify-start gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E0B45C]/50 group-hover:bg-[#E0B45C] transition-colors shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities */}
          <div className="border-t border-white/10 pt-5 sm:border-t-0 sm:pt-0">
            <h3 className="text-[#E0B45C] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-5 text-center sm:text-left">
              Facilities
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-2 sm:gap-y-2.5 text-xs sm:text-sm text-white/75 max-w-[310px] mx-auto pl-4 sm:pl-0 sm:max-w-none sm:mx-0">
              {[
                "Swimming Pool",
                "Beach Access",
                "Dining & Cuisine",
                "Free Wi-Fi",
                "Free Parking",
                "Garden & Lawn",
                "Event Space",
                "24-Hour Reception",
              ].map((item) => (
                <li key={item} className="flex items-center justify-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0B45C]/50 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="border-t border-white/10 pt-5 sm:border-t-0 sm:pt-0">
            <h3 className="text-[#E0B45C] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-5 text-center sm:text-left">
              Contact Us
            </h3>
            <div className="space-y-2.5 sm:space-y-4">
              <div className="flex items-start justify-start gap-2 sm:gap-3 text-left max-w-[280px] mx-auto pl-4 sm:pl-0 sm:max-w-none sm:mx-0">
                <HiMapPin size={16} className="text-[#E0B45C] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  RC3F+QW, Kotha Peta Rural,
                  <br className="hidden sm:inline" />{" "}
                  Chirala, Andhra Pradesh 523157
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 pl-4 sm:pl-0 sm:flex-col sm:items-start sm:gap-y-3">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-white/75 hover:text-[#E0B45C] transition-colors"
                >
                  <FaPhoneAlt size={12} className="text-[#E0B45C] shrink-0" />
                  {siteConfig.phoneDisplay}
                </a>

                {siteConfig.email && (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-white/75 hover:text-[#E0B45C] transition-colors"
                  >
                    <HiEnvelope size={14} className="text-[#E0B45C] shrink-0" />
                    {siteConfig.email}
                  </a>
                )}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-white/75 hover:text-[#25D366] transition-colors"
                >
                  <FaWhatsapp size={15} className="text-[#25D366] shrink-0" />
                  WhatsApp Enquiry
                </a>
              </div>

              <a
                href={siteConfig.googleBusinessProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-1 sm:mt-2 px-4 py-2 border border-[#E0B45C]/50 text-[#E0B45C] text-xs font-semibold rounded-sm hover:bg-[#E0B45C] hover:text-[#072A32] transition-all w-full sm:w-auto"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-20 lg:pb-5 flex items-center justify-center sm:justify-end text-xs text-white/40 text-center sm:text-right">
          <p>Kotha Peta Rural, Chirala, Andhra Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
