"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function MobileBottomBar() {
  const pathname = usePathname();
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());
  const isHome = pathname === "/";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#123B2A] border-t border-[#C8A45D]/25 shadow-[0_-5px_25px_rgba(23,27,25,0.6)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile quick navigation"
    >
      <div className="grid grid-cols-3 h-15 max-w-lg mx-auto">
        {/* Button 1: Home */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95",
            isHome
              ? "text-[#C8A45D] font-semibold"
              : "text-white/85 hover:text-[#C8A45D]"
          )}
          aria-label="Go to Home"
          aria-current={isHome ? "page" : undefined}
        >
          <HiHome
            size={22}
            className={cn(
              "transition-transform",
              isHome && "scale-110 text-[#C8A45D]"
            )}
          />
          <span className="text-[11px] tracking-wide leading-none">Home</span>
        </Link>

        {/* Button 2: WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-white/85 hover:text-[#25D366] transition-all duration-200 active:scale-95 group"
          aria-label="Enquire via WhatsApp"
        >
          <FaWhatsapp
            size={21}
            className="group-hover:text-[#25D366] group-hover:scale-110 transition-transform text-[#25D366]"
          />
          <span className="text-[11px] tracking-wide leading-none">WhatsApp</span>
        </a>

        {/* Button 3: Call */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex flex-col items-center justify-center gap-1 text-white/85 hover:text-[#C8A45D] transition-all duration-200 active:scale-95 group"
          aria-label={`Call ${siteConfig.phoneDisplay}`}
        >
          <FaPhoneAlt
            size={18}
            className="group-hover:text-[#C8A45D] group-hover:scale-110 transition-transform text-[#C8A45D]"
          />
          <span className="text-[11px] tracking-wide leading-none">Call</span>
        </a>
      </div>
    </nav>
  );
}
