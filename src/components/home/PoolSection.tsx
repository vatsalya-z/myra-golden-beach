"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SectionCTA } from "@/components/common/SectionCTA";
import { FadeIn } from "@/components/animations/FadeIn";

export function PoolSection() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Swimming pool"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/gmaps/myra-swimming-pool-night.jpg"
          alt="Outdoor illuminated swimming pool at MYRA Golden Beach Resort"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          {/* Centered Section Heading */}
          <SectionHeading
            eyebrow="Resort Facilities"
            title="Dive into Relaxation"
            subtitle="Our outdoor swimming pool is the perfect place to cool down, unwind and enjoy the coastal sunshine. Available for all resort guests, it is a highlight of any stay at MYRA Golden Beach Resort."
            align="center"
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 md:gap-6 max-w-3xl mx-auto my-8 sm:my-10 text-center">
            {[
              { title: "Outdoor Pool", desc: "Open-air pool with scenic surroundings" },
              { title: "Poolside Relaxation", desc: "Comfortable seating and open areas" },
              { title: "Guest Access", desc: "Complimentary for all staying guests" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#E0B45C]/60 rounded-xl p-5 text-center transition-colors shadow-lg"
              >
                <h3 className="text-[#E0B45C] font-semibold text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Centered CTA */}
          <SectionCTA className="mt-8">
            <Button href="/contact" variant="ghost" size="lg" className="min-w-[200px]">
              Plan Your Poolside Stay
            </Button>
          </SectionCTA>
        </FadeIn>
      </div>
    </section>
  );
}
