"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { triggerHaptic } from "@/lib/haptics";
import { MobileBookingSheet } from "./MobileBookingSheet";
import { MobileSplashScreen } from "./MobileSplashScreen";

interface MobileAppContextValue {
  bookingSheetOpen: boolean;
  defaultRoom: string;
  openBookingSheet: (roomName?: string) => void;
  closeBookingSheet: () => void;
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Suppress automatic browser install prompts on mobile
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
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

  const value = useMemo<MobileAppContextValue>(
    () => ({
      bookingSheetOpen,
      defaultRoom,
      openBookingSheet,
      closeBookingSheet,
    }),
    [bookingSheetOpen, defaultRoom, openBookingSheet, closeBookingSheet]
  );

  return (
    <MobileAppContext.Provider value={value}>
      <MobileSplashScreen />
      {children}
      <MobileBookingSheet />
    </MobileAppContext.Provider>
  );
}
