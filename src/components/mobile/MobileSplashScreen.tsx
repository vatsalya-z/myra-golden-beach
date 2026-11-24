"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SPLASH_STORAGE_KEY = "myra_splash_seen";

export function MobileSplashScreen() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion || window.innerWidth >= 1024) return;

    try {
      if (sessionStorage.getItem(SPLASH_STORAGE_KEY)) {
        return;
      }
      sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    } catch {
      return;
    }

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] lg:hidden bg-gradient-to-b from-[#082B38] via-[#063B49] to-[#082B38] flex flex-col items-center justify-center px-6 app-chrome pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-[#F6C46A]/50 bg-[#082B38] shadow-[0_12px_36px_rgba(246,196,106,0.22)] mb-4">
              <Image
                src="/logo/logo.png"
                alt="MYRA Golden Beach Resort"
                fill
                className="object-contain p-1.5"
                sizes="80px"
                priority
              />
            </div>

            <span className="font-playfair font-bold text-xl text-white tracking-wider">
              MYRA GOLDEN
            </span>
            <span className="text-[#F6C46A] text-[10px] tracking-[0.28em] uppercase font-medium mt-1">
              Beach Resort · Chirala
            </span>

            {/* Thin Sand Gold Shimmer Progress Bar */}
            <div className="w-36 h-[2px] rounded-full bg-white/15 overflow-hidden mt-6">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="h-full w-full bg-gradient-to-r from-[#DCA94F] via-[#F6C46A] to-[#DCA94F]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
