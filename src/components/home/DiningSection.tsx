"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SectionCTA } from "@/components/common/SectionCTA";
import { FadeIn } from "@/components/animations/FadeIn";
import { CoastalDecorations } from "@/components/common/CoastalDecorations";

export function DiningSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-[#063B49]" aria-label="Restaurant and dining">
      <CoastalDecorations
        palmSide="right"
        waveSide="left"
        palmCorner="bottom"
        tone="dark"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Centered Section Heading */}
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionHeading
            eyebrow="Multi-Cuisine Restaurant"
            title="Authentic Flavours, Warm Hospitality"
            subtitle="Our in-house restaurant serves a variety of freshly prepared dishes that celebrate the authentic flavours of Andhra Pradesh alongside popular North Indian and multi-cuisine options."
            align="center"
            light
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <FadeIn direction="left">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="relative h-44 sm:h-64 lg:h-72 rounded-xl overflow-hidden shadow-xl border border-white/15"
              >
                <Image
                  src="/images/gmaps/myra-restaurant-dining.jpg"
                  alt="In-house restaurant dining hall at MYRA Golden Beach Resort"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="relative h-44 sm:h-64 lg:h-72 rounded-xl overflow-hidden shadow-xl mt-4 sm:mt-6 border border-white/15"
              >
                <Image
                  src="/images/restaurant/dining-2.jpg"
                  alt="Authentic Andhra cuisine served at MYRA Golden Beach Resort restaurant"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            </div>
          </FadeIn>

          {/* Details & Menu Highlights */}
          <FadeIn direction="right" delay={0.1}>
            <div className="space-y-4 text-white/85 leading-relaxed">
              <p>
                Whether you are starting the day with a wholesome breakfast, enjoying
                a relaxed lunch or sharing a flavourful dinner, our kitchen team
                prepares every meal with care using fresh, quality ingredients.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 my-8">
              {[
                { label: "Andhra Cuisine", desc: "Authentic regional specialities" },
                { label: "North Indian", desc: "Classic dishes and favourites" },
                { label: "Fresh Breakfast", desc: "Daily morning spreads" },
                { label: "Veg & Non-Veg", desc: "Diverse menu options" },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 hover:border-[#F6C46A]/50 transition-all text-white"
                >
                  <div className="w-2 h-2 rounded-full bg-[#F6C46A] mt-1.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-xs text-white/75">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Centered CTA */}
            <SectionCTA className="mt-8 justify-center">
              <Button href="/contact" variant="primary" size="md" className="min-w-[200px]">
                Enquire About Dining
              </Button>
            </SectionCTA>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
