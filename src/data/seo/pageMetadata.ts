import { SITE_NAME, SITE_URL } from "@/lib/constants";

export interface PageMetadataEntry {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  canonical: string;
  ogImage: string;
  schemaTypes: string[];
}

export const pageMetadataMap: Record<string, PageMetadataEntry> = {
  "/": {
    path: "/",
    title: `${SITE_NAME} | Beach Resort in Chirala, Andhra Pradesh`,
    description:
      "Discover MYRA Golden Beach Resort in Andhra Pradesh. Enjoy comfortable rooms, swimming pool, multi-cuisine dining and a relaxing coastal stay near Chirala.",
    keywords: [
      "MYRA Golden Beach Resort",
      "beach resort Chirala",
      "resort in Andhra Pradesh",
      "coastal resort near Chirala",
      "hotel near Vodarevu beach",
      "beach resort Andhra Pradesh",
      "Kotha Peta Rural resort",
    ],
    primaryKeyword: "MYRA Golden Beach Resort",
    secondaryKeywords: [
      "Beach Resort in Chirala",
      "Resort in Chirala Andhra Pradesh",
      "Beach Stay Near Chirala",
      "Resort Near Vodarevu Beach",
    ],
    canonical: `${SITE_URL}/`,
    ogImage: `${SITE_URL}/images/rooms/myra-deluxe-room-ac.jpg`,
    schemaTypes: ["Resort", "Hotel", "Organization", "WebSite", "WebPage", "FAQPage"],
  },
  "/about": {
    path: "/about",
    title: `About ${SITE_NAME} | Resort & Hospitality in Andhra Pradesh`,
    description:
      "Discover MYRA Golden Beach Resort, its warm hospitality, comfortable accommodation, resort facilities and coastal stay experience near Chirala, Andhra Pradesh.",
    keywords: [
      "about MYRA Golden Beach Resort",
      "coastal resort Andhra Pradesh",
      "beach resort near Chirala",
      "resort hospitality Chirala",
      "eco friendly beach cottages",
    ],
    primaryKeyword: "About MYRA Golden Beach Resort",
    secondaryKeywords: [
      "Coastal Resort Hospitality Andhra Pradesh",
      "Beach Resort Story Chirala",
      "Resort Near Chirala Beach",
    ],
    canonical: `${SITE_URL}/about`,
    ogImage: `${SITE_URL}/images/gmaps/myra-beach-cottages.jpg`,
    schemaTypes: ["WebPage", "BreadcrumbList", "Organization"],
  },
  "/rooms": {
    path: "/rooms",
    title: `Rooms at ${SITE_NAME} | Accommodation Enquiries`,
    description:
      "Explore air-conditioned rooms at MYRA Golden Beach Resort near Chirala, Andhra Pradesh. Deluxe Double, Triple Rooms and Family Suites with comfortable bedding and modern amenities.",
    keywords: [
      "rooms at MYRA Golden Beach Resort",
      "deluxe double room chirala",
      "family suite beach resort andhra pradesh",
      "deluxe triple room chirala",
      "beach resort accommodation near vodarevu",
    ],
    primaryKeyword: "Rooms at MYRA Golden Beach Resort",
    secondaryKeywords: [
      "Beach Resort Rooms Chirala",
      "Deluxe Double Room Chirala",
      "Family Suite Beach Resort Andhra Pradesh",
    ],
    canonical: `${SITE_URL}/rooms`,
    ogImage: `${SITE_URL}/images/rooms/myra-deluxe-room-ac.jpg`,
    schemaTypes: ["WebPage", "BreadcrumbList", "ItemAvailability"],
  },
  "/gallery": {
    path: "/gallery",
    title: `${SITE_NAME} Gallery | Rooms, Pool & Resort Photos`,
    description:
      "Explore authentic high-resolution photographs of MYRA Golden Beach Resort, including beachfront cottages, swimming pool, dining spaces, lawn and room interiors near Chirala.",
    keywords: [
      "MYRA Golden Beach Resort gallery",
      "chirala beach resort photos",
      "swimming pool photos myra resort",
      "beach cottage photos andhra pradesh",
      "resort room images chirala",
    ],
    primaryKeyword: "MYRA Golden Beach Resort Gallery",
    secondaryKeywords: [
      "MYRA Golden Beach Resort Photos",
      "Chirala Beach Resort Images",
      "Resort Swimming Pool Photos Chirala",
    ],
    canonical: `${SITE_URL}/gallery`,
    ogImage: `${SITE_URL}/images/beach/myra-beach-arch-selfie-point.jpg`,
    schemaTypes: ["WebPage", "BreadcrumbList", "ImageGallery"],
  },
  "/blog": {
    path: "/blog",
    title: `Travel Blog | ${SITE_NAME}`,
    description:
      "Explore travel guides, beach holiday ideas, local attractions and useful information for planning a coastal getaway in Chirala and Andhra Pradesh.",
    keywords: [
      "Chirala beach travel guide",
      "andhra pradesh beach holidays blog",
      "places to visit near chirala",
      "vodarevu beach travel tips",
      "coastal vacation andhra pradesh",
    ],
    primaryKeyword: "Chirala Beach Travel Guide",
    secondaryKeywords: [
      "Andhra Pradesh Beach Holidays Blog",
      "Places to Visit Near Chirala",
      "Vodarevu Beach Travel Tips",
    ],
    canonical: `${SITE_URL}/blog`,
    ogImage: `${SITE_URL}/images/blog/coastal-beauty-chirala.jpg`,
    schemaTypes: ["WebPage", "BreadcrumbList", "CollectionPage"],
  },
  "/contact": {
    path: "/contact",
    title: `Contact ${SITE_NAME} | Location & Booking Enquiry`,
    description:
      "Contact MYRA Golden Beach Resort for room availability, stay enquiries, directions and facility details near Chirala, Andhra Pradesh. Call or message via WhatsApp.",
    keywords: [
      "contact MYRA Golden Beach Resort",
      "MYRA resort phone number",
      "MYRA golden beach resort address",
      "book myra golden beach resort whatsapp",
      "chirala resort contact",
    ],
    primaryKeyword: "Contact MYRA Golden Beach Resort",
    secondaryKeywords: [
      "MYRA Golden Beach Resort Phone Number",
      "MYRA Resort Chirala Address",
      "Book MYRA Golden Beach Resort WhatsApp",
    ],
    canonical: `${SITE_URL}/contact`,
    ogImage: `${SITE_URL}/images/resort/resort-1.jpg`,
    schemaTypes: ["WebPage", "BreadcrumbList", "ContactPage"],
  },
};
