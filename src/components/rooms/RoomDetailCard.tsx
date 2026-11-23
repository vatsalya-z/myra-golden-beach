"use client";

import { useState } from "react";
import Image from "next/image";
import type { Room } from "@/types/room";
import { Button } from "@/components/common/Button";

interface RoomDetailCardProps {
  room: Room;
  index: number;
}

export function RoomDetailCard({ room, index }: RoomDetailCardProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = room.images[activeIdx] || room.images[0];
  const isOdd = index % 2 === 1;

  return (
    <article
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E5D9C3] ${
        isOdd ? "lg:grid-flow-dense" : ""
      }`}
    >
      {/* Image Gallery Column */}
      <div className={isOdd ? "lg:col-start-2" : ""}>
        <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-md bg-[#F3ECE0]">
          <Image
            src={activeImage}
            alt={`${room.name} photo ${activeIdx + 1} at MYRA Golden Beach Resort`}
            fill
            className="object-cover transition-all duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {room.badge && (
            <span className="absolute top-3.5 left-3.5 bg-[#E0B45C] text-[#072A32] text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-sm tracking-wide shadow-md z-10">
              {room.badge}
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {room.images.length > 1 && (
          <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {room.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeIdx === i
                    ? "border-[#E0B45C] ring-2 ring-[#E0B45C]/20 scale-105"
                    : "border-[#E5D9C3] opacity-70 hover:opacity-100"
                }`}
                aria-label={`View photo ${i + 1} of ${room.name}`}
              >
                <Image
                  src={img}
                  alt={`${room.name} angle ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Column */}
      <div className={isOdd ? "lg:col-start-1 lg:row-start-1" : ""}>
        <span className="text-[#E0B45C] text-xs font-semibold tracking-[0.25em] uppercase">
          {room.tagline}
        </span>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#072A32] mt-1.5 mb-3.5">
          {room.name}
        </h2>
        <p className="text-[#566970] text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
          {room.description}
        </p>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#566970] mb-4 sm:mb-5 pb-3 border-b border-[#E5D9C3]">
          <span className="font-semibold uppercase tracking-wider text-[10px] bg-[#E0B45C]/15 text-[#946B1E] px-2.5 py-1 rounded-sm">
            Max Occupancy
          </span>
          <span className="font-medium text-[#102026]">
            {room.capacity.adults} Adults
            {room.capacity.children ? ` + ${room.capacity.children} Child` : ""}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
          {room.amenities.map((a) => (
            <div
              key={a.label}
              className="flex items-center gap-2 text-xs sm:text-sm text-[#566970] bg-[#FCFAF6] p-2 sm:p-2.5 rounded border border-[#E5D9C3]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0B45C] shrink-0" />
              <span className="truncate">{a.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-[#E5D9C3]">
          <div className="text-sm text-[#566970] italic">
            {room.priceNote}
          </div>
          <Button href="/contact" variant="primary" size="md">
            Enquire Now
          </Button>
        </div>
      </div>
    </article>
  );
}
