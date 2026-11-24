import { HeroSlider } from "@/components/home/HeroSlider";
import { LiquidHeroReveal } from "@/components/animations/LiquidHeroReveal";
import { Introduction } from "@/components/home/Introduction";
import { BeachExperienceSection } from "@/components/common/BeachExperienceSection";
import { AmenitiesSection } from "@/components/home/AmenitiesSection";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { PoolSection } from "@/components/home/PoolSection";
import { DiningSection } from "@/components/home/DiningSection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { LocationSection } from "@/components/home/LocationSection";
import { BookingCTA } from "@/components/home/BookingCTA";
import { FAQSection } from "@/components/common/FAQ";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { faqs } from "@/data/faqs";
import { generateFAQSchema, generateWebPageSchema } from "@/lib/schema";

export default function HomePage() {
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema({
    title: "MYRA Golden Beach Resort | Beach Resort in Chirala, Andhra Pradesh",
    description:
      "Discover MYRA Golden Beach Resort in Andhra Pradesh. Enjoy comfortable rooms, swimming pool, multi-cuisine dining and a relaxing coastal stay near Chirala.",
    path: "/",
    image: "/images/rooms/myra-deluxe-room-ac.jpg",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <LiquidHeroReveal>
        <HeroSlider />
      </LiquidHeroReveal>
      <Introduction />
      <BeachExperienceSection />
      <AmenitiesSection />
      <RoomsPreview />
      <PoolSection />
      <DiningSection />
      <GalleryPreview />
      <Testimonials />
      <LocationSection />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F9FBFC]" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <SectionHeading
              id="faq-heading"
              eyebrow="Frequently Asked Questions"
              title="Everything You Need to Know"
              subtitle="Answers to the most common questions about MYRA Golden Beach Resort."
            />
          </FadeIn>
          <div className="mt-10">
            <FAQSection faqs={faqs} />
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
