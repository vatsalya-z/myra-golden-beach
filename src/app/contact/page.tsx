import type { Metadata } from "next";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiMapPin, HiEnvelope } from "react-icons/hi2";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GoogleMap } from "@/components/common/GoogleMap";
import { EnquiryForm } from "@/components/common/EnquiryForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";
import { RelatedPages } from "@/components/common/RelatedPages";

export const metadata: Metadata = generateMetadata({
  title: "Contact MYRA Golden Beach Resort | Location & Booking Enquiry",
  description:
    "Contact MYRA Golden Beach Resort for room availability, stay enquiries, directions and facility details near Chirala, Andhra Pradesh. Call or message via WhatsApp.",
  path: "/contact",
  keywords: [
    "contact MYRA Golden Beach Resort",
    "MYRA resort phone number",
    "MYRA golden beach resort address",
    "book myra golden beach resort whatsapp",
    "chirala resort contact",
    "how to reach myra resort chirala",
  ],
});

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact Us", href: "/contact" },
  ]);
  const webPageSchema = generateWebPageSchema({
    title: "Contact MYRA Golden Beach Resort | Location & Booking Enquiry",
    description:
      "Contact MYRA Golden Beach Resort for room availability, stay enquiries, directions and facility details near Chirala, Andhra Pradesh. Call or message via WhatsApp.",
    path: "/contact",
    image: "/images/resort/resort-1.jpg",
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
      <section className="relative w-full h-80 sm:h-96 md:h-[440px] lg:h-[480px] overflow-hidden flex items-center justify-center" aria-label="Contact page hero">
        <Image
          src="/images/resort/resort-1.jpg"
          alt="Contact MYRA Golden Beach Resort"
          fill
          priority
          className="object-cover w-full h-full"
          sizes="100vw"
        />
        {/* Flat solid overlay — no gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#041B21]/80 via-[#072A32]/45 to-[#041B21]/85" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <Breadcrumbs items={[{ label: "Contact Us", href: "/contact" }]} light />
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 text-center leading-tight">
            Contact Us
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mt-3.5 max-w-2xl text-center leading-relaxed">
            We&apos;d love to hear from you and help plan your stay
          </p>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="py-16 md:py-24 bg-[#FCFAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Centered Main Section Heading */}
          <FadeIn className="text-center mb-12 lg:mb-16">
            <SectionHeading
              eyebrow="Get in Touch"
              title="Reach Out to Us"
              subtitle="Have questions about reservations, amenities or directions? Our front desk team is ready to assist you."
              align="center"
            />
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact details */}
            <FadeIn direction="left">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E5D9C3]">
                <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#072A32] mb-6 pb-3 border-b border-[#E5D9C3] text-center sm:text-left">
                  Resort Information
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E0B45C]/15 flex items-center justify-center shrink-0">
                      <HiMapPin size={22} className="text-[#E0B45C]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#072A32] mb-1">Address</h3>
                      <p className="text-[#566970] text-sm leading-relaxed">
                        RC3F+QW, Kotha Peta Rural,
                        <br />
                        Chirala, Andhra Pradesh 523157, India
                      </p>
                      <a
                        href={siteConfig.googleBusinessProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#E0B45C] font-semibold mt-2 hover:underline"
                      >
                        Open in Google Maps &rarr;
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E0B45C]/15 flex items-center justify-center shrink-0">
                      <FaPhoneAlt size={18} className="text-[#E0B45C]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#072A32] mb-1">Phone</h3>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="text-[#566970] text-sm hover:text-[#E0B45C] transition-colors"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {siteConfig.email && (
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#E0B45C]/15 flex items-center justify-center shrink-0">
                        <HiEnvelope size={20} className="text-[#E0B45C]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#072A32] mb-1">Email</h3>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="text-[#566970] text-sm hover:text-[#E0B45C] transition-colors"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0">
                      <FaWhatsapp size={22} className="text-[#25D366]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#072A32] mb-1">WhatsApp</h3>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#566970] text-sm hover:text-[#25D366] transition-colors"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-8">
                  <GoogleMap className="h-64 shadow-sm rounded-xl border border-[#E5D9C3]" />
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn direction="right" delay={0.1}>
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#E5D9C3]">
                <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#072A32] mb-2 text-center sm:text-left">
                  Send a Room Enquiry
                </h2>
                <p className="text-[#566970] text-sm mb-7 leading-relaxed text-center sm:text-left">
                  Fill in the form below and our team will respond to confirm
                  availability and share rates. This is an enquiry, not a booking.
                </p>
                <EnquiryForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Related Pages Silo */}
      <RelatedPages currentPath="/contact" />
    </>
  );
}
