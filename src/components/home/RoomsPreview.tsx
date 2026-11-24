"use client";

import { motion } from "framer-motion";
import { rooms } from "@/data/rooms";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { RoomCard } from "@/components/home/RoomCard";
import { CoastalDecorations } from "@/components/common/CoastalDecorations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function RoomsPreview() {
  const featured = rooms.filter((r) => r.featured).slice(0, 3);
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24 bg-[#063B49]"
      aria-labelledby="rooms-preview-heading"
    >
      <CoastalDecorations
        palmSide="right"
        waveSide="left"
        palmCorner="top"
        tone="dark"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn>
          <SectionHeading
            id="rooms-preview-heading"
            eyebrow="Accommodation"
            title="Comfortable Rooms for Every Stay"
            subtitle="Explore our authentic resort rooms with air conditioning, comfortable bedding, LED TV, and serene coastal views."
            align="center"
            light
          />
        </FadeIn>

        {/* Mobile 2-Column Bento Grid (< md) + Desktop 3-Column Row (lg+) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-7 mt-10 md:mt-14"
        >
          {featured.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 24, scale: 0.95 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 26,
                delay: reducedMotion ? 0 : idx * 0.09,
              }}
              className={
                idx === 2
                  ? "col-span-2 lg:col-span-1 h-full"
                  : "col-span-1 h-full"
              }
            >
              <RoomCard room={room} isWideMobile={idx === 2} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center items-center mt-10 sm:mt-12 w-full">
          <Button
            href="/rooms"
            variant="accent"
            size="lg"
            className="min-w-[200px]"
          >
            View All Rooms &amp; Packages
          </Button>
        </div>
      </div>
    </section>
  );
}
