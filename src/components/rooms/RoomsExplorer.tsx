"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiWifi,
  HiSparkles,
  HiShieldCheck,
  HiArrowDown,
  HiBars3,
} from "react-icons/hi2";
import { FaSwimmingPool } from "react-icons/fa";
import type { Room, RoomCategory } from "@/types/room";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CoastalDecorations } from "@/components/common/CoastalDecorations";
import { RoomDetailCard } from "@/components/rooms/RoomDetailCard";
import { triggerHaptic } from "@/lib/haptics";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RoomsExplorerProps {
  rooms: Room[];
}

type FilterOption = "All" | RoomCategory;
type MobileViewMode = "grid" | "list";

const CATEGORIES: FilterOption[] = [
  "All",
  "Cottages",
  "Villas",
  "Suites",
  "Poolside",
  "Deluxe Rooms",
  "Group Stays",
];

const INCLUDED_PERKS = [
  {
    icon: FaSwimmingPool,
    title: "Pool & Waterfall",
    desc: "Complimentary access",
  },
  {
    icon: HiSparkles,
    title: "Direct Beachfront",
    desc: "Steps from golden sand",
  },
  {
    icon: HiWifi,
    title: "High-Speed Wi-Fi",
    desc: "Seamless connectivity",
  },
  {
    icon: HiShieldCheck,
    title: "24/7 Concierge",
    desc: "Parking & room service",
  },
] as const;

export function RoomsExplorer({ rooms }: RoomsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>("All");
  const [mobileView, setMobileView] = useState<MobileViewMode>("grid");
  const reducedMotion = useReducedMotion();

  const filteredRooms = useMemo(() => {
    if (selectedCategory === "All") return rooms;
    return rooms.filter((room) => room.category === selectedCategory);
  }, [rooms, selectedCategory]);

  const counts = useMemo(() => {
    const map: Record<FilterOption, number> = {
      All: rooms.length,
      Cottages: rooms.filter((r) => r.category === "Cottages").length,
      Villas: rooms.filter((r) => r.category === "Villas").length,
      Suites: rooms.filter((r) => r.category === "Suites").length,
      Poolside: rooms.filter((r) => r.category === "Poolside").length,
      "Deluxe Rooms": rooms.filter((r) => r.category === "Deluxe Rooms").length,
      "Group Stays": rooms.filter((r) => r.category === "Group Stays").length,
    };
    return map;
  }, [rooms]);

  return (
    <section
      className="relative overflow-x-clip py-8 sm:py-12 md:py-16 bg-[#F9FBFC]"
      aria-label="Room categories and options"
    >
      <CoastalDecorations
        palmSide="left"
        waveSide="right"
        palmCorner="both"
        tone="light"
      />

      {/* Sticky Native-App Category Filter Bar */}
      <div className="sticky top-16 lg:top-[72px] z-20 bg-[#F9FBFC]/95 backdrop-blur-xl border-y border-[#D9EEF2] py-2.5 sm:py-3 mb-8 sm:mb-12 app-chrome">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 flex-1">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    triggerHaptic(8);
                    setSelectedCategory(category);
                  }}
                  aria-pressed={active}
                  className={`relative shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors active:scale-95 ${
                    active
                      ? "text-[#F6C46A]"
                      : "text-[#063B49] bg-white border border-[#D9EEF2] hover:border-[#0B7285]/40"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="rooms-category-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#063B49] shadow-[0_4px_12px_rgba(6,59,73,0.28)] -z-10"
                      aria-hidden="true"
                    />
                  )}
                  <span>
                    {category}{" "}
                    <span
                      className={`text-[10px] sm:text-xs ml-0.5 ${
                        active ? "text-[#F6C46A]/85" : "text-[#607780]"
                      }`}
                    >
                      ({counts[category]})
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile-only 2-Column Grid / List Switcher */}
            <div
              className="md:hidden flex items-center bg-white border border-[#D9EEF2] rounded-full p-0.5 shadow-xs"
              role="group"
              aria-label="Switch mobile view layout"
            >
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(8);
                  setMobileView("grid");
                }}
                aria-label="Grid view"
                aria-pressed={mobileView === "grid"}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  mobileView === "grid"
                    ? "bg-[#063B49] text-[#F6C46A]"
                    : "text-[#607780]"
                }`}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="1" y="1" width="6" height="6" rx="1.4" />
                  <rect x="9" y="1" width="6" height="6" rx="1.4" />
                  <rect x="1" y="9" width="6" height="6" rx="1.4" />
                  <rect x="9" y="9" width="6" height="6" rx="1.4" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(8);
                  setMobileView("list");
                }}
                aria-label="List view"
                aria-pressed={mobileView === "list"}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  mobileView === "list"
                    ? "bg-[#063B49] text-[#F6C46A]"
                    : "text-[#607780]"
                }`}
              >
                <HiBars3 size={14} />
              </button>
            </div>

            <a
              href="#stay-packages"
              onClick={() => triggerHaptic(8)}
              className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] text-[11px] sm:text-xs font-bold tracking-wide shadow-sm active:scale-95 transition-all"
            >
              <span>Packages</span>
              <HiArrowDown size={13} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow="Our Accommodation"
          title="Choose Your Perfect Stay"
          subtitle="From handcrafted beachfront bamboo cottages to pool-access rooms and spacious family suites — every stay includes modern AC comforts near Chirala."
        />

        {/* Included With Every Stay — Native Horizontal Snap Perks on Mobile */}
        <div className="mt-7 sm:mt-10 flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-4 px-4 pb-2 scrollbar-none md:grid md:grid-cols-4 md:gap-4 md:mx-0 md:px-0 md:overflow-visible md:pb-0">
          {INCLUDED_PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="w-[62vw] max-w-[230px] md:w-auto md:max-w-none shrink-0 snap-start flex items-center gap-3 bg-white border border-[#D9EEF2] rounded-xl px-3.5 py-3 shadow-xs"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E8F6F7] border border-[#D9EEF2] flex items-center justify-center text-[#0B7285] shrink-0">
                  <Icon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-[#063B49] truncate">
                    {perk.title}
                  </p>
                  <p className="text-[11px] text-[#607780] truncate">
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rooms 2-Column Mobile Grid / Desktop Showcase with Spring Layout Motion */}
        <motion.div
          layout={!reducedMotion}
          className={
            mobileView === "grid"
              ? "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-1 md:gap-8 lg:gap-10 mt-7 sm:mt-12"
              : "grid grid-cols-1 gap-5 md:gap-8 lg:gap-10 mt-7 sm:mt-12"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredRooms.map((room, idx) => (
              <motion.div
                key={room.id}
                layout={!reducedMotion}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 24, scale: 0.94 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.92 }
                }
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 28,
                  delay: reducedMotion ? 0 : Math.min(idx * 0.04, 0.24),
                }}
                className="h-full"
              >
                <RoomDetailCard
                  room={room}
                  index={idx}
                  compactGrid={mobileView === "grid"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
