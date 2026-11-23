"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP } from "@/lib/constants";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

interface BeachExperienceSectionProps {
  className?: string;
  showExploreButton?: boolean;
}

export function BeachExperienceSection({
  className = "",
  showExploreButton = true,
}: BeachExperienceSectionProps) {
  const whatsappUrl = `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hello MYRA GOLDEN BEACH RESORT, I would like to enquire about staying in your beachfront cottages with direct beach access."
  )}`;

  return (
    <section
      className={`py-16 md:py-24 bg-[#F0E9DC] relative overflow-hidden ${className}`}
      aria-labelledby="beach-experience-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Centered Heading */}
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionHeading
            id="beach-experience-heading"
            eyebrow="Direct Beachfront Living"
            title="Step Directly onto Pristine Golden Sands"
            subtitle="At MYRA Golden Beach Resort, the Bay of Bengal is your front yard. Step straight from your cottage onto untouched coastal sands, relax on private beach loungers, and capture memories at our iconic beach selfie point."
            align="center"
          />
        </FadeIn>

        {/* Visual Beachfront Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Main Feature: Iconic "I ❤️ MYRA GOLDEN BEACH" Arch on the Sand */}
          <FadeIn direction="left" className="lg:col-span-7 h-full">
            <div className="relative h-80 sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl group border border-[#EFE7D8]">
              <Image
                src="/images/beach/myra-beach-arch-selfie-point.jpg"
                alt="I Love MYRA Golden Beach iconic rustic photo arch with wooden bench and ocean waves"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123B2A]/85 via-[#123B2A]/20 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#C8A45D] text-[#123B2A] text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-lg tracking-wide">
                Iconic Beach Photo Point
              </div>

              {/* Caption */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-[#C8A45D] text-xs font-semibold uppercase tracking-wider mb-1">
                  Private Beachfront
                </p>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold leading-snug">
                  The Signature &ldquo;I ❤️ MYRA Golden Beach&rdquo; Experience
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mt-1.5 hidden sm:block">
                  Enjoy the morning breeze, soft coastal sands, and panoramic views of the Bay of Bengal.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Secondary Features: Palm Walkway & Beach Loungers */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Top Card: Palm Walkway */}
            <FadeIn direction="right" delay={0.1}>
              <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden shadow-lg group border border-[#EFE7D8]">
                <Image
                  src="/images/beach/myra-beach-promenade-palms.jpg"
                  alt="Scenic paved coastal walkway lined with lush coconut palm trees alongside beachfront cottages"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#123B2A]/80 via-transparent to-black/20" />
                <div className="absolute top-3 left-3 bg-[#123B2A]/90 border border-[#C8A45D]/50 text-[#C8A45D] text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Palm-Fringed Coastal Walkway
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h4 className="font-playfair text-base sm:text-lg font-bold">
                    Direct Beach Access Path
                  </h4>
                  <p className="text-white/75 text-xs">
                    Paved pathways seamlessly connecting resort grounds to the sea.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Bottom Card: Beach Loungers */}
            <FadeIn direction="right" delay={0.2}>
              <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden shadow-lg group border border-[#EFE7D8]">
                <Image
                  src="/images/beach/myra-beach-loungers-ocean.jpg"
                  alt="Private wooden beach loungers on the pristine sandy beach in front of MYRA Golden Beach Resort"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#123B2A]/80 via-transparent to-black/20" />
                <div className="absolute top-3 left-3 bg-[#123B2A]/90 border border-[#C8A45D]/50 text-[#C8A45D] text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Beachside Sun Loungers
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h4 className="font-playfair text-base sm:text-lg font-bold">
                    Pure Beachfront Serenity
                  </h4>
                  <p className="text-white/75 text-xs">
                    Relax on comfortable wooden recliners overlooking the rolling waves.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <FadeIn delay={0.25} className="mt-10 sm:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {[
              {
                title: "Zero-Distance Beach Access",
                desc: "Walk straight from room onto the sand",
              },
              {
                title: "Signature Photo Point",
                desc: "Iconic 'I ❤️ MYRA' rustic arch",
              },
              {
                title: "Beachside Cottages",
                desc: "Authentic bamboo oceanfront suites",
              },
              {
                title: "Scenic Sunrise Views",
                desc: "Watch the morning glow over the sea",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#EFE7D8] shadow-sm hover:shadow-md text-center transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-[#C8A45D] mx-auto mb-2" />
                <h5 className="font-semibold text-xs sm:text-sm text-[#123B2A] leading-tight mb-1">
                  {item.title}
                </h5>
                <p className="text-[#74766F] text-[11px] sm:text-xs leading-normal">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Centered CTA Buttons */}
        <FadeIn delay={0.4} className="mt-10 sm:mt-12 flex justify-center items-center flex-wrap gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-sm transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm min-w-[210px]"
          >
            <FaWhatsapp size={18} />
            <span>Enquire Beach Stay</span>
          </a>
          {showExploreButton && (
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 bg-[#123B2A] hover:bg-[#C8A45D] text-white hover:text-[#123B2A] font-semibold rounded-sm transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm min-w-[200px]"
            >
              View Beach Cottages
            </Link>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
