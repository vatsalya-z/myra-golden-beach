"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiXMark, HiPlusCircle } from "react-icons/hi2";
import { triggerHaptic } from "@/lib/haptics";
import { useMobileApp } from "./MobileAppProvider";

const DISMISS_KEY = "myra_install_dismissed_at";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function MobileInstallBanner() {
  const {
    canInstall,
    isIos,
    isStandalone,
    promptInstall,
    iosGuideOpen,
    closeIosGuide,
  } = useMobileApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone || (!canInstall && !isIos)) {
      setVisible(false);
      return;
    }

    try {
      const dismissedAt = localStorage.getItem(DISMISS_KEY);
      if (dismissedAt && Date.now() - Number(dismissedAt) < SEVEN_DAYS_MS) {
        return;
      }
    } catch {
      // Ignore storage access failures
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [canInstall, isIos, isStandalone]);

  const handleDismiss = () => {
    triggerHaptic(8);
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // Ignore storage errors
    }
  };

  const handleInstallClick = async () => {
    setVisible(false);
    await promptInstall();
  };

  return (
    <>
      <AnimatePresence>
        {visible && !isStandalone && (
          <motion.div
            key="install-banner"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-3 right-3 z-[35] lg:hidden max-w-md mx-auto app-chrome"
          >
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#082B38]/95 backdrop-blur-xl border border-[#F6C46A]/40 shadow-[0_12px_36px_rgba(4,24,32,0.65)]">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 ring-1 ring-[#F6C46A]/40 bg-[#063B49]">
                <Image
                  src="/icons/icon-192.png"
                  alt="MYRA Resort App Icon"
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-xs sm:text-sm truncate">
                  MYRA Resort App
                </p>
                <p className="text-white/70 text-[11px] leading-tight truncate">
                  Install for full-screen native experience
                </p>
              </div>

              <button
                type="button"
                onClick={handleInstallClick}
                className="shrink-0 px-3.5 py-2 rounded-lg bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] text-xs font-bold tracking-wide active:scale-95 transition-transform shadow"
              >
                Install
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss install banner"
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white active:scale-90 transition-transform"
              >
                <HiXMark size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Safari 2-Step "Add to Home Screen" Guide */}
      <AnimatePresence>
        {iosGuideOpen && (
          <div
            className="fixed inset-0 z-[70] lg:hidden flex items-end justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Install MYRA Resort App on iPhone"
          >
            <motion.div
              key="ios-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeIosGuide}
              className="absolute inset-0 bg-[#041820]/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              key="ios-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 340 }}
              className="relative w-full max-w-md rounded-t-3xl bg-[#082B38] border-t border-[#F6C46A]/40 p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-[#F6C46A]/40 bg-[#063B49]">
                    <Image
                      src="/icons/icon-192.png"
                      alt="MYRA Resort App"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-base text-white">
                      Install MYRA Resort
                    </h3>
                    <p className="text-[11px] text-white/65">
                      Add to iPhone / iPad Home Screen
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeIosGuide}
                  aria-label="Close install instructions"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80"
                >
                  <HiXMark size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-[#063B49] border border-[#F6C46A]/35 flex items-center justify-center shrink-0 text-[#F6C46A]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed">
                    <span className="font-semibold text-[#F6C46A]">Step 1:</span>{" "}
                    Tap the <span className="font-semibold">Share</span> icon in
                    your Safari toolbar.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-[#063B49] border border-[#F6C46A]/35 flex items-center justify-center shrink-0 text-[#F6C46A]">
                    <HiPlusCircle size={20} />
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed">
                    <span className="font-semibold text-[#F6C46A]">Step 2:</span>{" "}
                    Scroll down and tap{" "}
                    <span className="font-semibold">
                      &ldquo;Add to Home Screen&rdquo;
                    </span>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
