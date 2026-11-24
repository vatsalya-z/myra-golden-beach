import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { rooms } from "@/data/rooms";
import { EnquiryForm } from "@/components/common/EnquiryForm";
import { RoomDetailCard } from "@/components/rooms/RoomDetailCard";
import { RelatedPages } from "@/components/common/RelatedPages";
import { CoastalDecorations } from "@/components/common/CoastalDecorations";

export const metadata: Metadata = generateMetadata({
  title: "Rooms at MYRA Golden Beach Resort | Accommodation Enquiries",
  description:
    "Explore air-conditioned rooms at MYRA Golden Beach Resort near Chirala, Andhra Pradesh. Deluxe Double, Triple Rooms and Family Suites with comfortable bedding and modern amenities.",
  path: "/rooms",
  keywords: [
    "rooms at MYRA Golden Beach Resort",
    "deluxe double room chirala",
    "family suite beach resort andhra pradesh",
    "deluxe triple room chirala",
    "beach resort accommodation near vodarevu",
    "resort rooms chirala andhra pradesh",
  ],
});

export default function RoomsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Rooms & Packages", href: "/rooms" },
  ]);
  const webPageSchema = generateWebPageSchema({
    title: "Rooms at MYRA Golden Beach Resort | Accommodation Enquiries",
    description:
      "Explore air-conditioned rooms at MYRA Golden Beach Resort near Chirala, Andhra Pradesh. Deluxe Double, Triple Rooms and Family Suites with comfortable bedding and modern amenities.",
    path: "/rooms",
    image: "/images/rooms/myra-deluxe-room-ac.jpg",
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
      {/* Full-width Hero Section */}
      <section className="relative w-full h-[220px] sm:h-[270px] md:h-[440px] lg:h-[480px] overflow-hidden flex items-center justify-center" aria-label="Rooms page hero">
        <Image
          src="/images/rooms/myra-deluxe-room-ac.jpg"
          alt="Comfortable deluxe rooms at MYRA Golden Beach Resort"
          fill
          priority
          className="object-cover w-full h-full"
          sizes="100vw"
        />
        {/* Flat solid overlay — no gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B38]/80 via-[#063B49]/45 to-[#082B38]/85" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight">
            Rooms & Packages
          </h1>
          <p className="text-white/90 text-sm sm:text-lg md:text-xl mt-2 sm:mt-3.5 max-w-2xl text-center leading-relaxed">
            Comfortable accommodation with modern amenities and coastal charm
          </p>
        </div>
      </section>

      {/* Rooms */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-[#F9FBFC]">
        <CoastalDecorations
          palmSide="left"
          waveSide="right"
          palmCorner="both"
          tone="light"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Accommodation"
              title="Choose Your Perfect Room"
              subtitle="All rooms include air conditioning, free Wi-Fi, LED TV, hot water, comfortable bedding and daily housekeeping."
            />
          </FadeIn>

          <div className="space-y-12 mt-12">
            {rooms.map((room, idx) => (
              <FadeIn key={room.id} delay={idx * 0.1}>
                <RoomDetailCard room={room} index={idx} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages Silo */}
      <RelatedPages currentPath="/rooms" />

      {/* Enquiry Form */}
      <section className="py-16 md:py-20 bg-[#E8F6F7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Book Your Room"
              title="Send a Room Enquiry"
              subtitle="Fill in the form below and our team will contact you to confirm availability and pricing."
            />
          </FadeIn>
          <div className="mt-10 bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-[#D9EEF2]">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
