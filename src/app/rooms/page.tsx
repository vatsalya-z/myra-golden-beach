import type { Metadata } from "next";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { rooms } from "@/data/rooms";
import { siteConfig } from "@/data/site";
import { EnquiryForm } from "@/components/common/EnquiryForm";
import { RoomsExplorer } from "@/components/rooms/RoomsExplorer";
import { StayPackagesSection } from "@/components/rooms/StayPackagesSection";
import { RelatedPages } from "@/components/common/RelatedPages";

export const metadata: Metadata = generateMetadata({
  title: "Rooms & Holiday Packages | MYRA Golden Beach Resort",
  description:
    "Explore 10 luxury coastal stays, villas & cottages plus 6 curated holiday packages at MYRA Golden Beach Resort near Chirala, Andhra Pradesh.",
  path: "/rooms",
  keywords: [
    "rooms at MYRA Golden Beach Resort",
    "beachfront cottage chirala",
    "honeymoon suite chirala beach resort",
    "poolside room chirala",
    "family holiday package andhra pradesh",
    "resort rooms chirala andhra pradesh",
  ],
});

export default function RoomsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Rooms & Packages", href: "/rooms" },
  ]);
  const webPageSchema = generateWebPageSchema({
    title: "Rooms & Holiday Packages | MYRA Golden Beach Resort",
    description:
      "Explore luxury coastal rooms, cottages, suites and curated stay packages at MYRA Golden Beach Resort near Chirala, Andhra Pradesh.",
    path: "/rooms",
    image: "/images/rooms/myra-cottage-interior-hd.jpg",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Full-width Coastal Luxury Hero */}
      <section
        className="relative w-full h-[240px] sm:h-[290px] md:h-[440px] lg:h-[480px] overflow-hidden flex items-center justify-center"
        aria-label="Rooms and packages hero"
      >
        <Image
          src="/images/rooms/myra-cottage-interior-hd.jpg"
          alt="Beachfront Bamboo Cottage luxury interior looking onto golden beach at MYRA Golden Beach Resort"
          fill
          priority
          loading="eager"
          quality={95}
          className="object-cover w-full h-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B38]/80 via-[#063B49]/45 to-[#082B38]/85" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <span className="text-[#F6C46A] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] mb-1.5 sm:mb-2.5">
            Accommodation &amp; Curated Stays
          </span>
          <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight drop-shadow-[0_4px_16px_rgba(8,43,56,0.65)]">
            Rooms &amp; Packages
          </h1>
          <p className="text-white/90 text-xs sm:text-base md:text-xl mt-2 sm:mt-3.5 max-w-2xl text-center leading-relaxed">
            Beachfront cottages, poolside rooms, suites &amp; exclusive coastal getaways
          </p>
          <div className="mt-3 sm:mt-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#082B38]/70 backdrop-blur-md border border-[#F6C46A]/35 text-[10px] sm:text-xs text-white/90 tracking-wide">
            <span className="text-[#F6C46A] font-semibold">10 Stays &amp; Villas</span>
            <span className="text-white/30">·</span>
            <span className="text-[#F6C46A] font-semibold">6 Curated Packages</span>
            <span className="text-white/30">·</span>
            <span>Beach &amp; Pool</span>
          </div>
        </div>
      </section>

      {/* Interactive Filter & 6 Coastal Stays */}
      <RoomsExplorer rooms={rooms} />

      {/* Curated Stay Packages */}
      <StayPackagesSection />

      {/* Direct Enquiry Form (Android Native Elevated Card) */}
      <section id="room-enquiry" className="py-10 sm:py-14 md:py-20 bg-[#E8F6F7] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Book Your Stay"
              title="Send a Room or Package Enquiry"
              subtitle="Fill in your stay dates below and our reception team will reply quickly with best direct rates."
            />
          </FadeIn>

          <div className="mt-6 sm:mt-10 bg-white rounded-3xl shadow-[0_14px_40px_rgba(6,59,73,0.12)] border border-[#D9EEF2] overflow-hidden">
            {/* Native Top App Strip */}
            <div className="bg-gradient-to-r from-[#063B49] to-[#082B38] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between text-white">
              <div className="min-w-0">
                <span className="block text-[11px] sm:text-xs font-semibold text-[#F6C46A] tracking-wide uppercase">
                  Instant Reply &middot; Direct Desk
                </span>
                <p className="font-playfair font-bold text-sm sm:text-base text-white truncate">
                  MYRA Reservations
                </p>
              </div>

              <a
                href={`tel:${siteConfig.phone}`}
                aria-label={`Call ${siteConfig.phoneDisplay}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#F6C46A] hover:text-[#082B38] border border-[#F6C46A]/40 text-[#F6C46A] text-xs font-semibold transition-colors shrink-0"
              >
                <FaPhoneAlt size={11} />
                <span>Call Desk</span>
              </a>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages Silo */}
      <RelatedPages currentPath="/rooms" />
    </>
  );
}
