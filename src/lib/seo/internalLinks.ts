export interface InternalLinkItem {
  href: string;
  label: string;
  description: string;
  badge?: string;
}

export const primaryNavigationLinks: InternalLinkItem[] = [
  { href: "/", label: "Home", description: "Return to the official resort homepage" },
  { href: "/about", label: "About Us", description: "Discover our coastal retreat story and hospitality" },
  { href: "/rooms", label: "Rooms & Packages", description: "Comfortable air-conditioned rooms and suites for families and couples" },
  { href: "/gallery", label: "Photo Gallery", description: "High-resolution photographs of our cottages, pool, rooms and beachfront" },
  { href: "/blog", label: "Travel Blog", description: "Explore guides to Chirala, Vodarevu beach, and coastal Andhra Pradesh" },
  { href: "/contact", label: "Contact & Location", description: "Direct WhatsApp enquiry, phone reservations, and Google Maps directions" },
];

export const pageRelatedLinks: Record<string, InternalLinkItem[]> = {
  "/": [
    { href: "/rooms", label: "Explore Rooms", description: "Deluxe double, triple, and family suites with AC and modern amenities", badge: "Accommodation" },
    { href: "/about", label: "Our Story", description: "Learn about our beachfront bamboo cottages and Andhra hospitality", badge: "Hospitality" },
    { href: "/gallery", label: "Resort Gallery", description: "View real photos of our illuminated pool and beach views", badge: "Photos" },
    { href: "/contact", label: "Enquire via WhatsApp", description: "Direct assistance with room availability and current tariffs", badge: "Instant Enquiry" },
  ],
  "/about": [
    { href: "/rooms", label: "View Our Rooms", description: "Discover well-appointed rooms designed for peaceful coastal relaxation", badge: "Stay" },
    { href: "/gallery", label: "Browse Resort Photos", description: "See our grounds, gardens, and beachfront views", badge: "Gallery" },
    { href: "/contact", label: "Plan Your Visit", description: "Get in touch with our team for directions and booking queries", badge: "Contact" },
  ],
  "/rooms": [
    { href: "/gallery", label: "See Room Photos", description: "Inspect authentic photos of bedrooms, interiors and amenities", badge: "Gallery" },
    { href: "/about", label: "About Our Resort", description: "Read about our amenities, swimming pool, and dining facilities", badge: "About" },
    { href: "/contact", label: "Enquire on WhatsApp", description: "Send your check-in dates and guest count directly to our team", badge: "Enquiry" },
  ],
  "/gallery": [
    { href: "/rooms", label: "Book a Room", description: "Choose between Deluxe Double, Triple or Family Suite accommodation", badge: "Rooms" },
    { href: "/about", label: "Explore Facilities", description: "Learn about the swimming pool, garden walkway, and restaurant", badge: "Facilities" },
    { href: "/contact", label: "Location & Directions", description: "Find us on Google Maps near Chirala and Vodarevu beach", badge: "Location" },
  ],
  "/blog": [
    { href: "/rooms", label: "Stay Near Chirala Beach", description: "Book comfortable accommodation right on the Andhra coastline", badge: "Accommodation" },
    { href: "/gallery", label: "Photo Gallery", description: "Discover visuals of the resort pool, cottages and surroundings", badge: "Gallery" },
    { href: "/contact", label: "Contact the Resort", description: "Speak to our team for local travel guidance and room bookings", badge: "Contact" },
  ],
  "/contact": [
    { href: "/rooms", label: "Browse Room Options", description: "View room capacities, bedding options, and included amenities", badge: "Rooms" },
    { href: "/about", label: "About the Property", description: "Understand resort facilities, beach access and dining hours", badge: "About" },
    { href: "/gallery", label: "Resort Visuals", description: "Take a virtual tour of our swimming pool, lawn and rooms", badge: "Gallery" },
  ],
};
