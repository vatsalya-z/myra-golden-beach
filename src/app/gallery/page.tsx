import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { RelatedPages } from "@/components/common/RelatedPages";

export const metadata: Metadata = generateMetadata({
  title: "MYRA Golden Beach Resort Gallery | Rooms, Pool & Resort Photos",
  description:
    "Explore authentic high-resolution photographs of MYRA Golden Beach Resort, including beachfront cottages, swimming pool, dining spaces, lawn and room interiors near Chirala.",
  path: "/gallery",
  keywords: [
    "MYRA Golden Beach Resort gallery",
    "chirala beach resort photos",
    "swimming pool photos myra resort",
    "beach cottage photos andhra pradesh",
    "resort room images chirala",
    "real photos myra resort",
  ],
});

export default function GalleryPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
  ]);
  const webPageSchema = generateWebPageSchema({
    title: "MYRA Golden Beach Resort Gallery | Rooms, Pool & Resort Photos",
    description:
      "Explore authentic high-resolution photographs of MYRA Golden Beach Resort, including beachfront cottages, swimming pool, dining spaces, lawn and room interiors near Chirala.",
    path: "/gallery",
    image: "/images/beach/myra-beach-arch-selfie-point.jpg",
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
      {/* Hero */}
      {/* Full-width Hero Section */}
      <section className="relative w-full h-80 sm:h-96 md:h-[440px] lg:h-[480px] overflow-hidden flex items-center justify-center" aria-label="Gallery page hero">
        <Image
          src="/images/gmaps/myra-beach-cottages.jpg"
          alt="Photo Gallery — MYRA Golden Beach Resort beachfront cottages"
          fill
          priority
          className="object-cover w-full h-full"
          sizes="100vw"
        />
        {/* Flat solid overlay — no gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#041B21]/80 via-[#072A32]/45 to-[#041B21]/85" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight">
            Photo Gallery
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mt-3.5 max-w-2xl text-center leading-relaxed">
            A visual tour of MYRA Golden Beach Resort
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-[#FCFAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Gallery"
              title="Explore MYRA Golden"
              subtitle="Browse images of our rooms, pool, restaurant, gardens and scenic coastal surroundings."
            />
          </FadeIn>
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>

      {/* Related Pages Silo */}
      <RelatedPages currentPath="/gallery" />
    </>
  );
}
