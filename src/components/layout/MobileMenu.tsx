"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiXMark, HiArrowUpRight, HiMapPin } from "react-icons/hi2";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Mobile navigation"
        >
          {/* Smoked Coastal Glass Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-[#041B21]/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Luxury Full-Height Hospitality Drawer (100dvh prevents mobile bottom cut-off) */}
          <motion.div
            id="mobile-drawer"
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: reducedMotion ? 0.15 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-0 right-0 bottom-0 h-[100dvh] w-[86vw] max-w-[380px] bg-gradient-to-b from-[#041B21] via-[#072A32] to-[#041B21] border-l border-[#E0B45C]/30 shadow-[-16px_0_50px_rgba(0,0,0,0.65)] flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle ambient gold glow inside drawer */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#E0B45C]/12 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-20 -left-20 w-56 h-56 rounded-full bg-[#0E3E49]/45 blur-3xl"
            />

            {/* Header: Brand Lockup + Gold-Ringed Close Button */}
            <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-[#E0B45C]/18 shrink-0">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3"
                aria-label="MYRA Golden Beach Resort — Home"
              >
                <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-1 ring-[#E0B45C]/40 bg-[#041B21] shrink-0">
                  <Image
                    src="/logo/logo.png"
                    alt="MYRA Golden Beach Resort"
                    fill
                    className="object-contain p-0.5"
                    sizes="40px"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[#EBC878] font-playfair font-bold text-base tracking-wide">
                    MYRA GOLDEN
                  </span>
                  <span className="text-white/55 text-[9px] uppercase tracking-[0.26em] mt-1">
                    Beach Resort · Chirala
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-[#E0B45C] bg-white/[0.04] hover:bg-[#E0B45C]/15 text-white/80 hover:text-[#E0B45C] flex items-center justify-center transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C]"
              >
                <HiXMark size={20} />
              </button>
            </div>

            {/* Middle: Editorial Numbered Serif Navigation */}
            <nav
              className="relative z-10 flex-1 overflow-y-auto px-6 py-5 flex flex-col justify-between scrollbar-none"
              aria-label="Mobile menu links"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E0B45C]/80 mb-3">
                  Explore Resort
                </p>

                <ul className="divide-y divide-white/[0.08]" role="list">
                  {navLinks.map((link, idx) => {
                    const isActive =
                      link.href === "/"
                        ? currentPath === "/"
                        : currentPath.startsWith(link.href);
                    const num = String(idx + 1).padStart(2, "0");

                    return (
                      <motion.li
                        key={link.href}
                        initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.08 + idx * 0.05,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "group flex items-center justify-between py-3.5 transition-all duration-300",
                            isActive
                              ? "text-[#F2D28B]"
                              : "text-white/85 hover:text-[#EBC878]"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <div className="flex items-baseline gap-3.5">
                            <span
                              className={cn(
                                "font-mono text-[11px] tracking-[0.18em] transition-colors",
                                isActive
                                  ? "text-[#E0B45C]"
                                  : "text-white/35 group-hover:text-[#E0B45C]/80"
                              )}
                            >
                              {num}
                            </span>
                            <span
                              className={cn(
                                "font-playfair text-[21px] leading-snug tracking-tight transition-transform duration-300 group-hover:translate-x-1",
                                isActive ? "font-semibold italic" : "font-medium"
                              )}
                            >
                              {link.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {isActive && (
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-[#E0B45C] shadow-[0_0_8px_rgba(224,180,92,0.8)]"
                                aria-hidden="true"
                              />
                            )}
                            <HiArrowUpRight
                              size={16}
                              className={cn(
                                "transition-all duration-300",
                                isActive
                                  ? "text-[#E0B45C] opacity-100"
                                  : "text-white/30 group-hover:text-[#E0B45C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              )}
                            />
                          </div>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* Concierge Hospitality Card (eliminates dead empty space with real guest utility) */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.45 }}
                className="mt-6 rounded-xl bg-white/[0.04] border border-[#E0B45C]/20 p-4 backdrop-blur-sm"
              >
                <div className="mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E0B45C]">
                    24/7 Resort Concierge
                  </span>
                </div>
                <p className="text-white/90 text-sm font-medium tracking-wide">
                  {siteConfig.phoneDisplay}
                </p>
                <div className="flex items-start gap-1.5 mt-1.5 text-white/55 text-[11px] leading-relaxed">
                  <HiMapPin size={13} className="text-[#E0B45C] shrink-0 mt-0.5" />
                  <span>Kotha Peta Rural, Chirala, Andhra Pradesh 523157</span>
                </div>
              </motion.div>
            </nav>

            {/* Footer Action Dock — Compact, Safe-Area Aware, Never Cut Off */}
            <div className="relative z-10 px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-[#E0B45C]/18 bg-[#041B21]/95 space-y-2.5 shrink-0">
              {/* Primary Luxury CTA */}
              <Link
                href="/contact"
                onClick={onClose}
                className="luxury-btn-sheen flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#C89435] via-[#EBC878] to-[#C89435] text-[#041B21] rounded-lg text-xs font-bold uppercase tracking-[0.18em] shadow-[0_8px_22px_rgba(224,180,92,0.3)] active:scale-[0.98] transition-transform"
              >
                <span>Book Your Stay</span>
                <HiArrowUpRight size={15} />
              </Link>

              {/* Direct Quick Contact Duo: WhatsApp + Call Now */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366]/15 hover:bg-[#25D366] border border-[#25D366]/50 text-[#25D366] hover:text-white rounded-lg text-xs font-semibold tracking-wide transition-all active:scale-[0.98]"
                  aria-label="Chat on WhatsApp"
                >
                  <FaWhatsapp size={15} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/[0.06] hover:bg-white/15 border border-white/20 text-white rounded-lg text-xs font-semibold tracking-wide transition-all active:scale-[0.98]"
                  aria-label={`Call ${siteConfig.phoneDisplay}`}
                >
                  <FaPhoneAlt size={12} className="text-[#E0B45C]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
