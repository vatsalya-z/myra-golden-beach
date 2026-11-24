"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  HiWifi,
  HiSparkles,
  HiShieldCheck,
  HiArrowDown,
} from "react-icons/hi2";
import { FaSwimmingPool } from "react-icons/fa";
import type { Room, RoomCategory } from "@/types/room";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CoastalDecorations } from "@/components/common/CoastalDecorations";
import { RoomDetailCard } from "@/components/rooms/RoomDetailCard";
import { triggerHaptic } from "@/lib/haptics";

interface RoomsExplorerProps {
  rooms: Room[];
}

type FilterOption = "All" | RoomCategory;

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
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

          <a
            href="#stay-packages"
            onClick={() => triggerHaptic(8)}
            className="shrink-0 inline-flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] text-[11px] sm:text-xs font-bold tracking-wide shadow-sm active:scale-95 transition-all"
          >
            <span>Packages</span>
            <HiArrowDown size={13} />
          </a>
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

        {/* Rooms Stack */}
        <div className="space-y-6 sm:space-y-10 mt-8 sm:mt-12">
          {filteredRooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: idx * 0.05 }}
            >
              <RoomDetailCard room={room} index={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
