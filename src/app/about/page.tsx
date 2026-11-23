import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SectionCTA } from "@/components/common/SectionCTA";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { BeachExperienceSection } from "@/components/common/BeachExperienceSection";
import { RelatedPages } from "@/components/common/RelatedPages";
import { generateMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";

export const metadata: Metadata = generateMetadata({
  title: "About MYRA Golden Beach Resort | Resort & Hospitality in Andhra Pradesh",
  description:
    "Discover MYRA Golden Beach Resort, its warm hospitality, comfortable accommodation, resort facilities and coastal stay experience near Chirala, Andhra Pradesh.",
  path: "/about",
  keywords: [
    "about MYRA Golden Beach Resort",
    "coastal resort Andhra Pradesh",
    "beach resort near Chirala",
    "resort hospitality Chirala",
    "eco friendly beach cottages",
  ],
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
  ]);
  const webPageSchema = generateWebPageSchema({
    title: "About MYRA Golden Beach Resort | Resort & Hospitality in Andhra Pradesh",
    description:
      "Discover MYRA Golden Beach Resort, its warm hospitality, comfortable accommodation, resort facilities and coastal stay experience near Chirala, Andhra Pradesh.",
    path: "/about",
    image: "/images/gmaps/myra-beach-cottages.jpg",
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
      <section className="relative w-full h-80 sm:h-96 md:h-[440px] lg:h-[480px] overflow-hidden flex items-center justify-center" aria-label="About page hero">
        <Image
          src="/images/gmaps/myra-beach-cottages.jpg"
          alt="MYRA Golden Beach Resort beachfront cottages — coastal retreat in Andhra Pradesh"
          fill
          priority
          className="object-cover w-full h-full"
          sizes="100vw"
        />
        {/* Flat solid overlay — no gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B38]/80 via-[#063B49]/45 to-[#082B38]/85" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight">
            About MYRA Golden Beach Resort
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mt-3.5 max-w-2xl text-center leading-relaxed">
            A warm and welcoming coastal retreat in Andhra Pradesh
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-[#F9FBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Centered Heading */}
          <FadeIn className="text-center mb-12 lg:mb-16">
            <SectionHeading
              eyebrow="Our Resort"
              title="Welcome to MYRA Golden Beach Resort"
              subtitle="A tranquil coastal destination on the Bay of Bengal near Chirala, Andhra Pradesh."
              align="center"
            />
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl border border-[#D9EEF2]">
                <Image
                  src="/images/gmaps/myra-resort-signboard.jpg"
                  alt="MYRA Golden Beach Resort official bamboo entrance and grounds"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="space-y-4 text-[#607780] leading-relaxed">
                <p>
                  MYRA Golden Beach Resort is a comfortable and welcoming coastal retreat
                  situated in the scenic coastal region of Andhra Pradesh, near Chirala.
                  Positioned close to the Bay of Bengal coastline, our resort provides
                  guests with easy access to beautiful beaches, a refreshing outdoor
                  swimming pool, and warm Andhra hospitality.
                </p>
                <p>
                  Whether you are visiting for a family holiday, a couple&apos;s getaway,
                  or a relaxing group retreat, our resort provides everything you need for
                  a memorable stay — comfortable rooms, multi-cuisine dining, and a tranquil
                  environment that lets you truly unwind.
                </p>
                <p>
                  Our dedicated staff takes pride in providing genuine Andhra hospitality,
                  ensuring your coastal vacation is comfortable, safe, and truly memorable.
                </p>
              </div>

              <SectionCTA className="justify-center sm:justify-start mt-8">
                <Button href="/rooms" variant="primary">
                  Explore Accommodation
                </Button>
                <Button href="/contact" variant="outline">
                  Contact Front Desk
                </Button>
              </SectionCTA>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 bg-[#E8F6F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Story"
              title="A Resort Built on Warm Hospitality"
              align="center"
            />
            <div className="mt-6 space-y-4 text-[#607780] leading-relaxed text-left md:text-center">
              <p>
                MYRA Golden Beach Resort was established with a clear vision: to create a
                comfortable, welcoming and genuinely hospitable coastal retreat where guests
                feel truly at home. Located in the picturesque Kotha Peta Rural area near
                Chirala, Andhra Pradesh, the resort was designed to celebrate the natural
                beauty of this coastal region while providing the comfort and convenience
                that modern travellers expect.
              </p>
              <p>
                From our thoughtfully appointed rooms to our multi-cuisine restaurant and
                refreshing outdoor pool, every element of MYRA Golden Beach Resort has been
                designed with our guests&apos; comfort and enjoyment in mind. Our team takes
                pride in delivering warm, attentive service that reflects the genuine
                hospitality tradition of Andhra Pradesh.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Beach Experience Section */}
      <BeachExperienceSection className="bg-[#F9FBFC]" />

      {/* Key highlights */}
      <section className="py-16 md:py-24 bg-[#E8F6F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="What We Offer"
              title="Comfort, Nature and Hospitality"
              subtitle="Everything you need for an unforgettable beachside vacation in Andhra Pradesh."
              align="center"
            />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-10 md:mt-14">
            {[
              {
                title: "Swimming Pool",
                desc: "Our outdoor swimming pool is a highlight for guests seeking relaxation and refreshment during their coastal stay.",
              },
              {
                title: "Beach Access",
                desc: "Located close to the Bay of Bengal coastline, the resort offers convenient access to nearby beaches for morning walks and sea breezes.",
              },
              {
                title: "Multi-Cuisine Restaurant",
                desc: "Our in-house kitchen serves authentic Andhra cuisine alongside North Indian and other popular dishes, prepared fresh daily.",
              },
              {
                title: "Garden & Open Spaces",
                desc: "Lush green gardens and open lawns create a peaceful, natural setting perfect for relaxation and family time.",
              },
              {
                title: "Free Wi-Fi",
                desc: "Complimentary high-speed internet access keeps guests connected throughout their stay.",
              },
              {
                title: "Free Parking",
                desc: "Ample on-site parking is provided complimentarily for all resort guests.",
              },
              {
                title: "24-Hour Reception",
                desc: "Our friendly reception team is available around the clock to assist with any needs during your stay.",
              },
              {
                title: "Event Space",
                desc: "Versatile spaces available for small family celebrations, corporate gatherings and group retreats.",
              },
            ].map((item, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              return (
                <FadeIn key={item.title} delay={idx * 0.05} className="h-full">
                  <div className="h-full flex gap-3.5 sm:gap-5 p-4 sm:p-6 bg-white border border-[#D9EEF2] rounded-xl hover:border-[#F6C46A]/60 transition-all duration-300 shadow-sm hover:shadow-md">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#F6C46A]/40 bg-[#063B49] flex items-center justify-center shrink-0">
                      <span className="font-playfair font-bold text-xs sm:text-sm text-[#F6C46A]">
                        {numStr}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[#063B49] font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">{item.title}</h3>
                      <p className="text-[#607780] text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Pages Silo */}
      <RelatedPages currentPath="/about" />

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#F9FBFC] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Plan Your Visit"
              title="We Would Love to Welcome You"
              subtitle="Contact us to check availability, learn more about our rooms and facilities, or simply ask any questions you have about your stay."
              align="center"
            />
            {/* Centered CTA */}
            <SectionCTA className="mt-8">
              <Button href="/contact" variant="primary" size="lg" className="min-w-[190px]">
                Contact Us
              </Button>
              <Button href="/rooms" variant="outline" size="lg" className="min-w-[190px]">
                View Rooms
              </Button>
            </SectionCTA>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
