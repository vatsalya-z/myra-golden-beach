"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiBars3, HiXMark, HiArrowLeft } from "react-icons/hi2";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { triggerHaptic } from "@/lib/haptics";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

function getMobileScreenTitle(pathname: string): string | null {
  if (pathname === "/") return null;
  if (pathname.startsWith("/rooms")) return "Rooms & Packages";
  if (pathname.startsWith("/facilities")) return "Resort Facilities";
  if (pathname.startsWith("/gallery")) return "Photo Gallery";
  if (pathname.startsWith("/about")) return "About Resort";
  if (pathname.startsWith("/blog")) return "Travel Journal";
  if (pathname.startsWith("/contact")) return "Book & Contact";
  return "MYRA Resort";
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isScrolled } = useScrollPosition();
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const screenTitle = getMobileScreenTitle(pathname);

  const handleBack = () => {
    triggerHaptic(8);
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={cn(
          "bg-[#063B49]/92 lg:bg-[#063B49]/95 backdrop-blur-xl lg:backdrop-blur-md border-b border-[#F6C46A]/20 pt-[env(safe-area-inset-top)] lg:pt-0 transition-all duration-300",
          isScrolled && "bg-[#063B49] shadow-[0_10px_30px_rgba(8,43,56,0.35)]"
        )}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile App Header (< lg) */}
          <div className="flex lg:hidden items-center justify-between h-16 app-chrome">
            {screenTitle === null ? (
              <Link
                href="/"
                onClick={() => triggerHaptic(6)}
                className="flex items-center gap-2.5 shrink-0"
                aria-label="MYRA Golden Beach Resort — Home"
              >
                <div className="relative w-9 h-9">
                  <Image
                    src="/logo/logo.png"
                    alt="MYRA Golden Beach Resort Logo"
                    fill
                    className="object-contain"
                    priority
                    sizes="36px"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-playfair font-bold text-sm leading-none tracking-wide">
                    MYRA GOLDEN
                  </span>
                  <span className="text-[#F6C46A] text-[9px] tracking-[0.2em] uppercase font-medium mt-0.5">
                    Chirala · Beach Resort
                  </span>
                </div>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Go back"
                className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full text-white hover:text-[#F6C46A] active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C46A]"
              >
                <HiArrowLeft size={21} />
              </button>
            )}

            {screenTitle !== null && (
              <span className="font-playfair font-semibold text-base text-white truncate px-2 text-center">
                {screenTitle}
              </span>
            )}

            <div className="flex items-center gap-1 shrink-0">
              <button
                ref={menuBtnRef}
                onClick={() => {
                  triggerHaptic(8);
                  setMenuOpen(!menuOpen);
                }}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-drawer"
                className="flex items-center justify-center w-10 h-10 -mr-1 text-white hover:text-[#F6C46A] active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C46A]"
              >
                {menuOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation (lg+) — Preserved */}
          <div className="hidden lg:flex items-center justify-between h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group" aria-label="MYRA Golden Beach Resort — Home">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo/logo.png"
                  alt="MYRA Golden Beach Resort Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-playfair font-bold text-lg leading-none tracking-wide">
                  MYRA GOLDEN
                </span>
                <span className="text-[#F6C46A] text-[10px] tracking-[0.22em] uppercase font-medium">
                  Beach Resort
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <ul className="flex items-center gap-1" role="list">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 hover:text-[#F6C46A] group",
                        isActive ? "text-[#F6C46A] font-semibold" : "text-white/90"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 w-full h-0.5 bg-[#F6C46A] transition-transform duration-300 origin-left",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Book CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="luxury-btn-sheen inline-flex items-center px-5 py-2.5 bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] text-sm font-bold rounded-md transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg tracking-wide"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}
