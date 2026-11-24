"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaBed } from "react-icons/fa";
import {
  HiHome,
  HiCalendarDays,
  HiPhoto,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import { useMobileApp } from "@/components/mobile/MobileAppProvider";
import { triggerHaptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

const leftTabs = [
  { href: "/", label: "Home", icon: HiHome },
  { href: "/rooms", label: "Rooms", icon: FaBed },
] as const;

const rightTabs = [
  { href: "/gallery", label: "Gallery", icon: HiPhoto },
  { href: "/contact", label: "Contact", icon: HiChatBubbleLeftRight },
] as const;

export function MobileBottomBar() {
  const pathname = usePathname();
  const { openBookingSheet } = useMobileApp();

  const isTabActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#063B49]/95 backdrop-blur-xl border-t border-[#F6C46A]/25 shadow-[0_-8px_30px_rgba(8,43,56,0.55)] pb-[env(safe-area-inset-bottom)] app-chrome"
      aria-label="Mobile app navigation"
    >
      <div className="grid grid-cols-5 items-center h-[62px] max-w-lg mx-auto px-1">
        {leftTabs.map((tab) => {
          const active = isTabActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => triggerHaptic(8)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl transition-colors duration-200 active:scale-90",
                active ? "text-[#F6C46A] font-semibold" : "text-white/75"
              )}
            >
              {active && (
                <motion.span
                  layoutId="mobile-tab-active-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-x-1.5 inset-y-1 rounded-xl bg-[#F6C46A]/18 -z-10"
                  aria-hidden="true"
                />
              )}
              <Icon size={20} className="shrink-0" />
              <span className="text-[10px] tracking-wide leading-none">
                {tab.label}
              </span>
            </Link>
          );
        })}

        {/* Elevated Center Book Button */}
        <button
          type="button"
          onClick={() => openBookingSheet()}
          aria-label="Open Quick Booking"
          className="relative flex flex-col items-center justify-center -mt-4 active:scale-90 transition-transform focus-visible:outline-none"
        >
          <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F6C46A] to-[#DCA94F] text-[#082B38] flex items-center justify-center ring-4 ring-[#063B49] shadow-[0_6px_20px_rgba(246,196,106,0.45)]">
            <HiCalendarDays size={22} />
          </span>
          <span className="text-[10px] font-bold text-[#F6C46A] tracking-wide leading-none mt-1">
            Book
          </span>
        </button>

        {rightTabs.map((tab) => {
          const active = isTabActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => triggerHaptic(8)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl transition-colors duration-200 active:scale-90",
                active ? "text-[#F6C46A] font-semibold" : "text-white/75"
              )}
            >
              {active && (
                <motion.span
                  layoutId="mobile-tab-active-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-x-1.5 inset-y-1 rounded-xl bg-[#F6C46A]/18 -z-10"
                  aria-hidden="true"
                />
              )}
              <Icon size={20} className="shrink-0" />
              <span className="text-[10px] tracking-wide leading-none">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
