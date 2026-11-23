"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GoogleMap } from "@/components/common/GoogleMap";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/animations/FadeIn";

export function LocationSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FCFAF6]" aria-label="Location and contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            eyebrow="Find Us"
            title="Getting Here Is Easy"
            subtitle="MYRA Golden Beach Resort is located in the coastal Chirala region of Andhra Pradesh, with easy road access from major cities."
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14 items-center">
          {/* Map */}
          <FadeIn direction="left">
            <GoogleMap className="h-80 md:h-96 shadow-md rounded-2xl overflow-hidden border border-[#E5D9C3]" />
          </FadeIn>

          {/* Contact details */}
          <FadeIn direction="right" delay={0.1}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E5D9C3] space-y-6">
              <motion.div whileHover={{ x: 4, transition: { duration: 0.2 } }} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E0B45C]/15 flex items-center justify-center shrink-0">
                  <HiMapPin size={20} className="text-[#E0B45C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#072A32] mb-1">Address</h3>
                  <p className="text-[#566970] text-sm leading-relaxed">
                    RC3F+QW, Kotha Peta Rural,
                    <br />
                    Chirala, Andhra Pradesh 523157, India
                  </p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 4, transition: { duration: 0.2 } }} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E0B45C]/15 flex items-center justify-center shrink-0">
                  <FaPhoneAlt size={15} className="text-[#E0B45C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#072A32] mb-1">Phone</h3>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-[#566970] text-sm hover:text-[#E0B45C] transition-colors"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 4, transition: { duration: 0.2 } }} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0">
                  <FaWhatsapp size={19} className="text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#072A32] mb-1">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#566970] text-sm hover:text-[#25D366] transition-colors"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </motion.div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full border-t border-[#E5D9C3]">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full border-2 border-transparent"
                >
                  Enquire Now
                </Button>
                <Button
                  href={siteConfig.googleBusinessProfile}
                  variant="outline"
                  size="md"
                  external
                  className="w-full"
                >
                  View on Google Maps
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
