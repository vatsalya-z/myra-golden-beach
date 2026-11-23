import Image from "next/image";
import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SectionCTA } from "@/components/common/SectionCTA";
import { FadeIn } from "@/components/animations/FadeIn";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";

export function BookingCTA() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Booking call to action"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-1.jpg"
          alt="MYRA Golden Beach Resort — book your coastal stay"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#123B2A]/88" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          {/* Centered Section Heading */}
          <SectionHeading
            eyebrow="Plan Your Stay"
            title="Ready for a Coastal Escape?"
            subtitle="Contact us to check availability, get the latest rates and start planning your perfect stay at MYRA Golden Beach Resort."
            align="center"
            light
          />

          {/* Centered CTA Buttons */}
          <SectionCTA className="mt-10">
            <Button href="/contact" variant="primary" size="lg" className="min-w-[210px] w-full sm:w-auto font-bold">
              Send an Enquiry
            </Button>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-white/30 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors text-sm min-w-[210px] w-full sm:w-auto"
              aria-label={`Call ${siteConfig.phoneDisplay}`}
            >
              <FaPhoneAlt size={14} className="text-[#C8A45D]" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-[#25D366]/50 text-[#25D366] font-semibold rounded-sm hover:bg-[#25D366]/10 transition-colors text-sm min-w-[210px] w-full sm:w-auto"
              aria-label="WhatsApp enquiry"
            >
              <FaWhatsapp size={17} />
              WhatsApp Enquiry
            </a>
          </SectionCTA>
        </FadeIn>
      </div>
    </section>
  );
}
