"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiCheckCircle, HiClock, HiSparkles, HiUserGroup } from "react-icons/hi2";
import { stayPackages } from "@/data/packages";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CoastalDecorations } from "@/components/common/CoastalDecorations";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { triggerHaptic } from "@/lib/haptics";

export function StayPackagesSection() {
  return (
    <section
      id="stay-packages"
      className="relative overflow-hidden py-14 sm:py-18 md:py-24 bg-[#063B49] scroll-mt-20"
      aria-labelledby="packages-heading"
    >
      <CoastalDecorations
        palmSide="right"
        waveSide="left"
        palmCorner="both"
        tone="dark"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          id="packages-heading"
          eyebrow="Curated Holiday Packages"
          title="Special Resort Packages"
          subtitle="Handcrafted coastal stay & day-outing packages designed for weekend getaways, romantic honeymoons, and joyful family holidays."
          light
        />

        {/* Mobile Horizontal Snap Carousel (< md) + 2x2 Grid (md+) */}
        <div className="mt-10 md:mt-14 flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-3 scrollbar-none md:grid md:grid-cols-2 md:gap-7 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          {stayPackages.map((pkg, idx) => {
            const whatsappUrl = buildWhatsAppUrl(
              [
                "Hello MYRA GOLDEN BEACH RESORT,",
                "",
                `I am interested in the *${pkg.name}* (${pkg.duration}).`,
                "Please share availability and best package pricing. Thank you!",
              ].join("\n")
            );

            return (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="w-[84vw] max-w-[340px] md:w-auto md:max-w-none shrink-0 snap-center flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-white/15 shadow-[0_14px_38px_rgba(4,24,32,0.35)] group"
              >
                <div>
                  {/* 16:9 Package Visual */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#082B38]">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 84vw, 48vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082B38]/80 via-transparent to-transparent" />

                    {/* Top-left Sand Gold Badge */}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-[#F6C46A] text-[#082B38] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shadow">
                      <HiSparkles size={12} />
                      <span>{pkg.badge}</span>
                    </span>

                    {/* Top-right Duration Pill */}
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-[#082B38]/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">
                      <HiClock size={12} className="text-[#F6C46A]" />
                      <span>{pkg.duration}</span>
                    </span>

                    {/* Ideal For Bottom Label */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-1.5 text-white text-xs font-medium">
                      <HiUserGroup size={14} className="text-[#F6C46A] shrink-0" />
                      <span>Ideal for {pkg.idealFor}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-6">
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#063B49] mb-1.5">
                      {pkg.name}
                    </h3>
                    <p className="text-[#607780] text-xs sm:text-sm leading-relaxed mb-4">
                      {pkg.tagline}
                    </p>

                    <ul className="space-y-2 mb-2">
                      {pkg.inclusions.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#17313B]"
                        >
                          <HiCheckCircle
                            size={16}
                            className="text-[#DCA94F] shrink-0 mt-0.5"
                          />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-3.5 border-t border-[#D9EEF2] flex items-center justify-between gap-3 bg-[#F9FBFC]">
                  <span className="text-[11px] sm:text-xs text-[#607780] font-medium">
                    {pkg.rateNote}
                  </span>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => triggerHaptic(10)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-all shrink-0"
                  >
                    <FaWhatsapp size={15} className="text-[#082B38]" />
                    <span>Book Package</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="md:hidden text-center text-[11px] font-medium tracking-wider uppercase text-[#F6C46A]/85 mt-2">
          Swipe packages &rarr;
        </p>
      </div>
    </section>
  );
}
