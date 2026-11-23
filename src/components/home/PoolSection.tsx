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
      className="relative py-14 sm:py-20 md:py-28 overflow-hidden"
      aria-label="Swimming pool"
    >
      {/* Responsive Background Image: 16:9 Desktop + 9:16 Mobile */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-2-desktop.jpg"
          alt="Outdoor illuminated swimming pool at MYRA Golden Beach Resort"
          fill
          className="hidden md:block object-cover object-center"
          sizes="100vw"
        />
        <Image
          src="/images/hero/hero-2-mobile.jpg"
          alt="Outdoor illuminated swimming pool at MYRA Golden Beach Resort"
          fill
          className="block md:hidden object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle edge vignette for text legibility without hiding the pool photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B38]/65 via-[#082B38]/25 to-[#082B38]/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          {/* Centered Section Heading */}
          <div className="drop-shadow-[0_2px_12px_rgba(8,43,56,0.9)]">
            <SectionHeading
              eyebrow="Resort Facilities"
              title="Dive into Relaxation"
              subtitle="Our outdoor swimming pool is the perfect place to cool down, unwind and enjoy the coastal sunshine. Available for all resort guests, it is a highlight of any stay at MYRA Golden Beach Resort."
              align="center"
              light
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6 max-w-4xl mx-auto my-8 sm:my-10 text-center">
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
                className="bg-[#082B38]/65 backdrop-blur-md hover:bg-[#063B49]/80 border border-white/25 hover:border-[#F6C46A]/70 rounded-xl p-4 sm:p-5 md:p-6 text-center transition-all shadow-[0_8px_24px_rgba(8,43,56,0.45)]"
              >
                <h3 className="text-[#F6C46A] font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Centered CTA */}
          <SectionCTA className="mt-6 sm:mt-8">
            <Button
              href="/contact"
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-w-[220px] bg-[#082B38]/60 backdrop-blur-md border-[#F6C46A]/60 hover:bg-[#F6C46A] hover:text-[#082B38]"
            >
              Plan Your Poolside Stay
            </Button>
          </SectionCTA>
        </FadeIn>
      </div>
    </section>
  );
}
