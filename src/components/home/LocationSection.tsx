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
    <section className="py-16 md:py-24 bg-[#FAF7F0]" aria-label="Location and contact">
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
            <GoogleMap className="h-80 md:h-96 shadow-md rounded-2xl overflow-hidden border border-[#EFE7D8]" />
          </FadeIn>

          {/* Contact details */}
          <FadeIn direction="right" delay={0.1}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#EFE7D8] space-y-6">
              <motion.div whileHover={{ x: 4, transition: { duration: 0.2 } }} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C8A45D]/15 flex items-center justify-center shrink-0">
                  <HiMapPin size={20} className="text-[#C8A45D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#123B2A] mb-1">Address</h3>
                  <p className="text-[#74766F] text-sm leading-relaxed">
                    RC3F+QW, Kotha Peta Rural,
                    <br />
                    Chirala, Andhra Pradesh 523157, India
                  </p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 4, transition: { duration: 0.2 } }} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C8A45D]/15 flex items-center justify-center shrink-0">
                  <FaPhoneAlt size={15} className="text-[#C8A45D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#123B2A] mb-1">Phone</h3>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-[#74766F] text-sm hover:text-[#C8A45D] transition-colors"
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
                  <h3 className="font-semibold text-[#123B2A] mb-1">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#74766F] text-sm hover:text-[#25D366] transition-colors"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </motion.div>

              <div className="pt-4 flex flex-wrap justify-center sm:justify-start items-center gap-4 w-full border-t border-[#EFE7D8]">
                <Button href="/contact" variant="primary" size="md" className="min-w-[160px]">
                  Enquire Now
                </Button>
                <Button
                  href={siteConfig.googleBusinessProfile}
                  variant="outline"
                  size="md"
                  external
                  className="min-w-[160px]"
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
