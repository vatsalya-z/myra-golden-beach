"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { triggerHaptic } from "@/lib/haptics";
import { MobileBookingSheet } from "./MobileBookingSheet";
import { MobileInstallBanner } from "./MobileInstallBanner";
import { MobileSplashScreen } from "./MobileSplashScreen";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface MobileAppContextValue {
  bookingSheetOpen: boolean;
  defaultRoom: string;
  openBookingSheet: (roomName?: string) => void;
  closeBookingSheet: () => void;
  canInstall: boolean;
  isIos: boolean;
  isStandalone: boolean;
  promptInstall: () => Promise<void>;
  iosGuideOpen: boolean;
  openIosGuide: () => void;
  closeIosGuide: () => void;
}

const MobileAppContext = createContext<MobileAppContextValue | null>(null);

export function useMobileApp(): MobileAppContextValue {
  const ctx = useContext(MobileAppContext);
  if (!ctx) {
    throw new Error("useMobileApp must be used inside MobileAppProvider");
  }
  return ctx;
}

export function MobileAppProvider({ children }: { children: React.ReactNode }) {
  const [bookingSheetOpen, setBookingSheetOpen] = useState(false);
  const [defaultRoom, setDefaultRoom] = useState("Deluxe Double Room");
  const [canInstall, setCanInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [iosGuideOpen, setIosGuideOpen] = useState(false);
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true;
    setIsStandalone(standalone);

    const ios =
      /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !standalone;
    setIsIos(ios);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPromptRef.current = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      deferredPromptRef.current = null;
      setCanInstall(false);
      setIsStandalone(true);
      setIosGuideOpen(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const openBookingSheet = useCallback((roomName?: string) => {
    triggerHaptic(14);
    if (roomName) {
      setDefaultRoom(roomName);
    }
    setBookingSheetOpen(true);
  }, []);

  const closeBookingSheet = useCallback(() => {
    setBookingSheetOpen(false);
  }, []);

  const openIosGuide = useCallback(() => {
    triggerHaptic(10);
    setIosGuideOpen(true);
  }, []);

  const closeIosGuide = useCallback(() => {
    setIosGuideOpen(false);
  }, []);

  const promptInstall = useCallback(async () => {
    triggerHaptic(12);
    const promptEvent = deferredPromptRef.current;
    if (promptEvent) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === "accepted") {
          setIsStandalone(true);
        }
      } catch {
        // Ignore cancelled prompt errors
      } finally {
        deferredPromptRef.current = null;
        setCanInstall(false);
      }
      return;
    }
    if (isIos) {
      setIosGuideOpen(true);
    }
  }, [isIos]);

  const value = useMemo<MobileAppContextValue>(
    () => ({
      bookingSheetOpen,
      defaultRoom,
      openBookingSheet,
      closeBookingSheet,
      canInstall,
      isIos,
      isStandalone,
      promptInstall,
      iosGuideOpen,
      openIosGuide,
      closeIosGuide,
    }),
    [
      bookingSheetOpen,
      defaultRoom,
      openBookingSheet,
      closeBookingSheet,
      canInstall,
      isIos,
      isStandalone,
      promptInstall,
      iosGuideOpen,
      openIosGuide,
      closeIosGuide,
    ]
  );

  return (
    <MobileAppContext.Provider value={value}>
      <MobileSplashScreen />
      {children}
      <MobileInstallBanner />
      <MobileBookingSheet />
    </MobileAppContext.Provider>
  );
}
