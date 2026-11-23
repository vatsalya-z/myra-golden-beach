import { SITE_NAME, SITE_URL, PHONE, ADDRESS, GOOGLE_BUSINESS_PROFILE } from "./constants";

export function generateHotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Resort", "Hotel", "LodgingBusiness"],
    "@id": `${SITE_URL}/#resort`,
    name: SITE_NAME,
    legalName: "MYRA Golden Beach Resort",
    alternateName: ["MYRA Resort Chirala", "MYRA Beach Resort"],
    description:
      "MYRA Golden Beach Resort is a premium beachfront coastal resort near Chirala in Andhra Pradesh, featuring comfortable air-conditioned rooms, an outdoor swimming pool with waterfall, multi-cuisine restaurant, lush palm gardens and direct beach access on the Bay of Bengal coastline.",
    url: SITE_URL,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "RC3F+QW, Kotha Peta Rural",
      addressLocality: "Chirala",
      addressRegion: "Andhra Pradesh",
      postalCode: "523157",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 15.8044375,
      longitude: 80.4248125,
    },
    image: [
      `${SITE_URL}/images/rooms/myra-deluxe-room-ac.jpg`,
      `${SITE_URL}/images/beach/myra-beach-arch-selfie-point.jpg`,
      `${SITE_URL}/images/amenities/resort-pool-illuminated.jpg`,
      `${SITE_URL}/images/gmaps/myra-beach-cottages.jpg`,
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kids Splash Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free High-Speed Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Multi-Cuisine Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Guest Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Direct Beach Access", value: true },
      { "@type": "LocationFeatureSpecification", name: "Tropical Garden & Sun Deck", value: true },
      { "@type": "LocationFeatureSpecification", name: "Individual Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "24-Hour Reception & Support", value: true },
      { "@type": "LocationFeatureSpecification", name: "Continuous Power Backup", value: true },
      { "@type": "LocationFeatureSpecification", name: "Daily Housekeeping", value: true },
    ],
    checkinTime: "12:00",
    checkoutTime: "11:00",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
    servesCuisine: ["Andhra", "South Indian", "North Indian", "Multi-cuisine"],
    hasMap: GOOGLE_BUSINESS_PROFILE,
    sameAs: [
      GOOGLE_BUSINESS_PROFILE,
      "https://myragoldenbeachresort.co.in",
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo.png`,
    image: `${SITE_URL}/images/rooms/myra-deluxe-room-ac.jpg`,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "RC3F+QW, Kotha Peta Rural",
      addressLocality: "Chirala",
      addressRegion: "Andhra Pradesh",
      postalCode: "523157",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "customer service and reservations",
      areaServed: "IN",
      availableLanguage: ["English", "Telugu", "Hindi"],
    },
    sameAs: [
      GOOGLE_BUSINESS_PROFILE,
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };
}

export function generateWebPageSchema({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#resort`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: image || `${SITE_URL}/images/rooms/myra-deluxe-room-ac.jpg`,
    },
    inLanguage: "en-IN",
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/logo.png`,
      },
    },
  };
}
