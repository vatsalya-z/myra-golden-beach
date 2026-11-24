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
      className="relative py-14 sm:py-20 md:py-28 overflow-hidden"
      aria-label="Booking call to action"
    >
      {/* Responsive Background Image: 16:9 Desktop + 9:16 Mobile */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/myra-hero-1-desktop-v2.jpg"
          alt="MYRA Golden Beach Resort — book your coastal stay"
          fill
          className="hidden md:block object-cover object-center"
          sizes="100vw"
        />
        <Image
          src="/images/hero/myra-hero-1-mobile-v2.jpg"
          alt="MYRA Golden Beach Resort — book your coastal stay"
          fill
          className="block md:hidden object-cover object-center"
          sizes="100vw"
        />
        {/* Balanced gradient scrim for crisp text readability while keeping photo visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B38]/65 via-[#082B38]/40 to-[#082B38]/75" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          {/* Centered Section Heading */}
          <div className="drop-shadow-[0_2px_12px_rgba(8,43,56,0.9)]">
            <SectionHeading
              eyebrow="Plan Your Stay"
              title="Ready for a Coastal Escape?"
              subtitle="Contact us to check availability, get the latest rates and start planning your perfect stay at MYRA Golden Beach Resort."
              align="center"
              light
            />
          </div>

          {/* Centered CTA Buttons */}
          <SectionCTA className="mt-8 sm:mt-10">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="min-w-[210px] w-full sm:w-auto font-bold"
            >
              Send an Enquiry
            </Button>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#082B38]/65 backdrop-blur-md border-2 border-white/40 text-white font-semibold rounded-sm hover:bg-white/15 hover:border-[#F6C46A] transition-all text-sm min-w-[210px] w-full sm:w-auto shadow-md"
              aria-label={`Call ${siteConfig.phoneDisplay}`}
            >
              <FaPhoneAlt size={14} className="text-[#F6C46A]" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#082B38]/65 backdrop-blur-md border-2 border-[#25D366]/65 text-[#25D366] font-semibold rounded-sm hover:bg-[#25D366] hover:text-[#082B38] transition-all text-sm min-w-[210px] w-full sm:w-auto shadow-md"
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
