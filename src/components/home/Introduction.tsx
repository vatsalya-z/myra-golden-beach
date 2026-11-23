"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SectionCTA } from "@/components/common/SectionCTA";
import { FadeIn } from "@/components/animations/FadeIn";

export function Introduction() {
  return (
    <section id="intro-section" className="py-16 md:py-24 bg-[#FAF7F0] scroll-mt-12" aria-labelledby="intro-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading — Center Aligned */}
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionHeading
            id="intro-heading"
            eyebrow="Welcome to MYRA Golden Beach Resort"
            title="Your Comfortable Escape on the Andhra Coast"
            subtitle="Nestled along the beautiful Bay of Bengal coastline near Chirala in Andhra Pradesh, MYRA Golden Beach Resort offers a welcoming and comfortable retreat for travellers seeking a genuine coastal escape."
            align="center"
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images */}
          <FadeIn direction="left" className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="relative h-52 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg border border-[#EFE7D8]"
              >
                <Image
                  src="/images/gmaps/myra-resort-signboard.jpg"
                  alt="Official MYRA Golden Beach Resort entrance and grounds"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="relative h-52 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg mt-6 sm:mt-8 border border-[#EFE7D8]"
              >
                <Image
                  src="/images/gmaps/myra-beach-cottages.jpg"
                  alt="Beachfront cottages and scenic coastline at MYRA Golden Beach Resort"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            </div>
            {/* Gold accent badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#123B2A] border-2 border-[#C8A45D] text-white text-center px-6 py-2.5 rounded-lg shadow-xl whitespace-nowrap"
            >
              <span className="font-playfair font-bold text-lg text-[#C8A45D] block">Coastal</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">Retreat</span>
            </motion.div>
          </FadeIn>

          {/* Text & Features */}
          <FadeIn direction="right" delay={0.1}>
            <div className="space-y-4 text-[#74766F] leading-relaxed">
              <p>
                Whether you are visiting for a relaxing family holiday, a couple&apos;s
                getaway or a group retreat, our resort provides warm Andhra hospitality,
                comfortable accommodation, a refreshing swimming pool and multi-cuisine
                dining — all within easy reach of the region&apos;s scenic beaches.
              </p>
              <p>
                Experience the natural beauty of the Andhra Pradesh coastline, the warmth
                of local culture and the comfort of a resort that feels like home.
              </p>
            </div>

            {/* Stats with spring reveal */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#EFE7D8]">
              {[
                { label: "Guest Rooms", value: "10+" },
                { label: "Facilities", value: "8+" },
                { label: "Hospitality", value: "24/7" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -3 }}
                  className="text-center p-2 rounded-lg transition-colors hover:bg-white/60"
                >
                  <div className="font-playfair text-3xl font-bold text-[#C8A45D]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#74766F] mt-1 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons — Centered */}
            <SectionCTA className="mt-8">
              <Button href="/about" variant="primary">
                Discover Our Story
              </Button>
              <Button href="/contact" variant="outline">
                Plan Your Visit
              </Button>
            </SectionCTA>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
