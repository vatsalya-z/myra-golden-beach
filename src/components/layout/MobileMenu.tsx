"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" aria-modal="true" role="dialog" aria-label="Mobile navigation">
          {/* Backdrop (semi-transparent dark overlay covering the left side) */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Half-screen Drawer (covers ~50-55% of the viewport width) */}
          <motion.div
            id="mobile-drawer"
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 bottom-0 h-full w-[55vw] min-w-[275px] max-w-[360px] bg-[#123B2A] border-l border-[#C8A45D]/20 shadow-[-10px_0_35px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4.5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 shrink-0">
                  <Image
                    src="/logo/logo.png"
                    alt="MYRA"
                    fill
                    className="object-contain"
                    sizes="28px"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[#C8A45D] font-playfair font-bold text-sm tracking-wide">
                    MYRA GOLDEN
                  </span>
                  <span className="text-white/60 text-[9px] uppercase tracking-widest mt-0.5">
                    Beach Resort
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D]"
              >
                <HiXMark size={22} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav
              className="flex-1 overflow-y-auto py-3 px-3 scrollbar-none"
              aria-label="Mobile menu links"
            >
              <ul className="space-y-1" role="list">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? currentPath === "/"
                      : currentPath.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between px-3.5 py-2.5 rounded-md text-[13px] font-medium transition-all duration-200",
                          isActive
                            ? "bg-[#C8A45D]/15 text-[#C8A45D] font-semibold border-l-2 border-[#C8A45D]"
                            : "text-white/85 hover:bg-white/5 hover:text-[#C8A45D]"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Drawer Footer — EXACTLY TWO BUTTONS: WhatsApp & Call Now */}
            <div className="p-4 border-t border-white/10 bg-[#0E281D] space-y-2.5 shrink-0">
              {/* Button 1: WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-sm text-xs font-semibold tracking-wide transition-colors shadow-sm"
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp size={16} />
                <span>WhatsApp</span>
              </a>

              {/* Button 2: Call Now */}
              <a
                href={`tel:${siteConfig.phone}`}
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-[#C8A45D] hover:bg-[#B38E46] text-[#123B2A] font-bold rounded-sm text-xs tracking-wide transition-colors shadow-sm"
                aria-label={`Call ${siteConfig.phoneDisplay}`}
              >
                <FaPhoneAlt size={13} />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
