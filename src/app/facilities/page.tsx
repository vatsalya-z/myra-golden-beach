import type { Metadata } from "next";
import Image from "next/image";
import { HiClock, HiSparkles, HiCalendarDays, HiShieldCheck } from "react-icons/hi2";
import { facilities } from "@/data/facilities";
import { FacilitiesExplorer } from "@/components/facilities/FacilitiesExplorer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { CoastalDecorations } from "@/components/common/CoastalDecorations";
import { RelatedPages } from "@/components/common/RelatedPages";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";

export const metadata: Metadata = generateMetadata({
  title: "Resort Facilities & Experiences | MYRA Golden Beach Resort",
  description:
    "Explore swimming pool with waterfall, direct Chirala beach access, candlelight coastal dining, manicured gardens, high-speed Wi-Fi and 24/7 hospitality at MYRA Golden Beach Resort.",
  path: "/facilities",
  keywords: [
    "MYRA Golden Beach Resort facilities",
    "swimming pool resort chirala",
    "beachfront dining chirala",
    "family resort amenities andhra pradesh",
    "day outing resort chirala",
  ],
});

const GUEST_SERVICE_TIMINGS = [
  {
    icon: HiCalendarDays,
    label: "Check-in & Check-out",
    value: "24/7 Reception · Express Assistance",
  },
  {
    icon: HiSparkles,
    label: "Swimming Pool Hours",
    value: "7:00 AM – 9:30 PM Daily",
  },
  {
    icon: HiClock,
    label: "Dining & Room Service",
    value: "7:30 AM – 10:30 PM Daily",
  },
  {
    icon: HiShieldCheck,
    label: "Events & Day Outings",
    value: "Custom Family & Corporate Passes",
  },
] as const;

export default function FacilitiesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Facilities", href: "/facilities" },
  ]);
  const webPageSchema = generateWebPageSchema({
    title: "Resort Facilities & Experiences | MYRA Golden Beach Resort",
    description:
      "Explore swimming pool with waterfall, direct Chirala beach access, candlelight coastal dining, manicured gardens and 24/7 hospitality at MYRA Golden Beach Resort.",
    path: "/facilities",
    image: "/images/facilities/pool-bg.jpg",
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

      {/* Compact Coastal Hero */}
      <section
        className="relative w-full h-[240px] sm:h-[290px] md:h-[440px] lg:h-[480px] overflow-hidden flex items-center justify-center"
        aria-label="Resort facilities hero"
      >
        <Image
          src="/images/facilities/pool-bg.jpg"
          alt="Illuminated coastal swimming pool and palm deck at MYRA Golden Beach Resort"
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
            World-Class Coastal Amenities
          </span>
          <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight drop-shadow-[0_4px_16px_rgba(8,43,56,0.65)]">
            Resort Facilities
          </h1>
          <p className="text-white/90 text-xs sm:text-base md:text-xl mt-2 sm:mt-3.5 max-w-2xl text-center leading-relaxed">
            From poolside relaxation and direct beach access to candlelight coastal dining
          </p>
          <div className="mt-3 sm:mt-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#082B38]/70 backdrop-blur-md border border-[#F6C46A]/35 text-[10px] sm:text-xs text-white/90 tracking-wide">
            <span className="text-[#F6C46A] font-semibold">8 Signature Facilities</span>
            <span className="text-white/30">·</span>
            <span className="text-[#F6C46A] font-semibold">Pool &amp; Beach</span>
            <span className="text-white/30">·</span>
            <span>24/7 Hospitality</span>
          </div>
        </div>
      </section>

      {/* Interactive Facilities Explorer */}
      <FacilitiesExplorer facilities={facilities} />

      {/* Dark Deep Ocean Teal Timings & Guest Services Strip */}
      <section
        className="relative overflow-hidden py-14 sm:py-18 md:py-22 bg-[#063B49]"
        aria-labelledby="timings-heading"
      >
        <CoastalDecorations
          palmSide="right"
          waveSide="left"
          palmCorner="both"
          tone="dark"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            <SectionHeading
              id="timings-heading"
              eyebrow="Guest Services & Timings"
              title="Thoughtful Care Around the Clock"
              subtitle="Whether you are arriving late, planning a sunrise swim or booking a private dinner, our team keeps every facility seamless."
              light
            />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-9 sm:mt-12">
            {GUEST_SERVICE_TIMINGS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-white/[0.06] backdrop-blur-md border border-[#F6C46A]/25 rounded-2xl p-5 text-center hover:border-[#F6C46A]/60 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F6C46A]/15 border border-[#F6C46A]/35 text-[#F6C46A] flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-[#F6C46A] font-semibold text-sm mb-1">
                    {item.label}
                  </h3>
                  <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-10">
            <Button href="/rooms" variant="accent" size="lg" className="w-full sm:w-auto min-w-[210px]">
              Explore Rooms &amp; Packages
            </Button>
            <Button href="/contact" variant="ghost" size="lg" className="w-full sm:w-auto min-w-[190px]">
              Plan Your Stay
            </Button>
          </div>
        </div>
      </section>

      {/* Related Pages Silo */}
      <RelatedPages currentPath="/facilities" />
    </>
  );
}
