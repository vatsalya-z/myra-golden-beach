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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / About Us */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left flex flex-col items-center sm:items-start">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo/logo.png"
                  alt="MYRA Golden Beach Resort"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="text-left">
                <div className="text-[#E0B45C] font-playfair font-bold text-lg leading-none">
                  MYRA GOLDEN
                </div>
                <div className="text-white/50 text-[10px] tracking-[0.2em] uppercase">
                  Beach Resort
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/70 mb-5 max-w-md sm:max-w-none text-center sm:text-left">
              A welcoming coastal retreat in Andhra Pradesh — offering comfortable rooms,
              refreshing pool, Andhra cuisine and warm hospitality near Chirala.
            </p>

            {/* Social links */}
            <div className="flex items-center justify-center sm:justify-start gap-3">
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E0B45C] hover:text-[#E0B45C] transition-colors text-xs font-bold"
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
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E0B45C] hover:text-[#E0B45C] transition-colors text-xs font-bold"
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
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E0B45C] hover:text-[#E0B45C] transition-colors text-xs font-bold"
                >
                  Yt
                </a>
              )}
            </div>
          </div>

          {/* Quick Links / Navigation Links */}
          <div>
            <h3 className="text-[#E0B45C] font-semibold text-sm uppercase tracking-widest mb-4 sm:mb-5 text-center sm:text-left">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[#E0B45C] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E0B45C]/50 group-hover:bg-[#E0B45C] transition-colors shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="text-[#E0B45C] font-semibold text-sm uppercase tracking-widest mb-4 sm:mb-5 text-center sm:text-left">
              Facilities
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2.5 text-sm text-white/70">
              {[
                "Swimming Pool",
                "Beach Access",
                "Multi-Cuisine Restaurant",
                "Free Wi-Fi",
                "Free Parking",
                "Garden & Lawn",
                "Event Space",
                "24-Hour Reception",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0B45C]/50 shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#E0B45C] font-semibold text-sm uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <HiMapPin size={17} className="text-[#E0B45C] shrink-0 mt-0.5" />
                <p className="text-sm text-white/70 leading-relaxed">
                  RC3F+QW, Kotha Peta Rural,
                  <br />
                  Chirala, Andhra Pradesh 523157
                </p>
              </div>

              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-sm text-white/70 hover:text-[#E0B45C] transition-colors"
              >
                <FaPhoneAlt size={13} className="text-[#E0B45C] shrink-0" />
                {siteConfig.phoneDisplay}
              </a>

              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-[#E0B45C] transition-colors"
                >
                  <HiEnvelope size={15} className="text-[#E0B45C] shrink-0" />
                  {siteConfig.email}
                </a>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-[#25D366] transition-colors"
              >
                <FaWhatsapp size={16} className="text-[#25D366] shrink-0" />
                WhatsApp Enquiry
              </a>

              <a
                href={siteConfig.googleBusinessProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 border border-[#E0B45C]/50 text-[#E0B45C] text-xs font-semibold rounded-sm hover:bg-[#E0B45C] hover:text-[#072A32] transition-all"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 pb-20 lg:pb-5 flex items-center justify-center sm:justify-end text-xs text-white/40 text-center sm:text-right">
          <p>Kotha Peta Rural, Chirala, Andhra Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
