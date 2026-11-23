"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const menuBtnRef = useRef<HTMLButtonElement>(null);

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
          "bg-[#123B2A] border-b border-[#0E281D]/40 transition-shadow duration-300",
          isScrolled && "shadow-xl"
        )}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group" aria-label="MYRA Golden Beach Resort — Home">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/logo/logo.png"
                alt="MYRA Golden Beach Resort Logo"
                fill
                className="object-contain"
                priority
                sizes="48px"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[#C8A45D] font-playfair font-bold text-base md:text-lg leading-none tracking-wide">
                MYRA GOLDEN
              </span>
              <span className="text-white/80 text-[10px] tracking-[0.2em] uppercase font-medium">
                Beach Resort
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
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
                      "relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-[#C8A45D] group",
                      isActive ? "text-[#C8A45D]" : "text-white/85"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 w-full h-0.5 bg-[#C8A45D] transition-transform duration-300 origin-left",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Book CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-5 py-2 bg-[#C8A45D] hover:bg-[#B38E46] text-[#123B2A] text-sm font-bold rounded-sm transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg tracking-wide"
            >
              Book Your Stay
            </Link>

            <button
              ref={menuBtnRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:text-[#C8A45D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D]"
            >
              {menuOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
            </button>
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
