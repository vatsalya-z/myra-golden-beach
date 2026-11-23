import type { Metadata } from "next";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { GalleryHero } from "@/components/gallery/GalleryHero";
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
      {/* Cinematic Visual Lookbook Hero */}
      <GalleryHero />

      {/* Curated Gallery Lookbook */}
      <section className="py-14 sm:py-18 md:py-24 bg-gradient-to-b from-[#FCFAF6] via-[#F7F2E8] to-[#FCFAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Curated Visual Archive"
              title="Explore MYRA Golden"
              subtitle="Browse authentic moments across our oceanfront cottages, illuminated pool, multi-cuisine dining, lush gardens and coastal shoreline."
            />
          </FadeIn>
          <div className="mt-8 sm:mt-12">
            <GalleryGrid />
          </div>
        </div>
      </section>

      {/* Related Pages Silo */}
      <RelatedPages currentPath="/gallery" />
    </>
  );
}
