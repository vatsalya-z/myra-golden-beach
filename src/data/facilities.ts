export type FacilityCategory =
  | "Pool & Beach"
  | "Dining"
  | "Leisure & Events"
  | "Comfort & Services";

export interface FacilityItem {
  id: string;
  title: string;
  tagline: string;
  category: FacilityCategory;
  timing: string;
  badge: string;
  description: string;
  highlights: string[];
  images: string[];
}

export const facilities: FacilityItem[] = [
  {
    id: "swimming-pool",
    title: "Illuminated Swimming Pool & Waterfall",
    tagline: "Aquatic Relaxation",
    category: "Pool & Beach",
    timing: "7:00 AM – 9:30 PM",
    badge: "Guest Favorite",
    description:
      "Unwind beside our crystal-clear turquoise mosaic swimming pool complete with an illuminated stone waterfall backdrop, fairy-lit conical gazebo, kids shallow zone, and comfortable teakwood sun loungers.",
    highlights: [
      "Stone waterfall feature wall",
      "Evening ambient fairy-lit gazebo",
      "Dedicated shallow splash zone",
      "Clean teakwood sun loungers",
    ],
    images: [
      "/images/hero/myra-hero-2-desktop.jpg",
      "/images/facilities/pool.jpg",
      "/images/facilities/pool-bg.jpg",
      "/images/amenities/resort-pool-illuminated.jpg",
    ],
  },
  {
    id: "beach-access",
    title: "Private Direct Beach Access",
    tagline: "Bay of Bengal Shoreline",
    category: "Pool & Beach",
    timing: "Open 24 Hours",
    badge: "Steps to Sea",
    description:
      "Step directly from your cottage veranda onto the golden shoreline of Chirala. Enjoy refreshing morning walks, calm sea breezes, wooden beach swings, and panoramic evening twilight horizons.",
    highlights: [
      "Direct coastal sandy access",
      "Beachfront loungers & wooden swings",
      "Sunrise & twilight ocean horizons",
      "Palm-fringed walking paths",
    ],
    images: [
      "/images/hero/myra-hero-1-desktop-v2.jpg",
      "/images/beach/myra-beach-loungers-ocean.jpg",
      "/images/beach/myra-beach-promenade-palms.jpg",
      "/images/blog/coastal-beauty-chirala.jpg",
    ],
  },
  {
    id: "coastal-dining",
    title: "Coastal Multi-Cuisine & Candlelight Dining",
    tagline: "Authentic Andhra & Coastal Flavours",
    category: "Dining",
    timing: "7:30 AM – 10:30 PM",
    badge: "Chef's Specialty",
    description:
      "Savour freshly prepared regional Andhra specialities, coastal seafood, comforting North Indian curries, and serene open-air evening candlelight dinners near the ocean breeze.",
    highlights: [
      "Authentic Andhra coastal thalis",
      "Fresh breakfast & room dining service",
      "Evening open-air lantern dining",
      "Family & couple celebration setups",
    ],
    images: [
      "/images/restaurant/dining-2.jpg",
      "/images/restaurant/dining-1.jpg",
      "/images/blog/family-getaway-chirala.jpg",
    ],
  },
  {
    id: "garden-promenade",
    title: "Lush Garden Lawns & Palm Promenade",
    tagline: "Tropical Serenity",
    category: "Leisure & Events",
    timing: "Open Daily",
    badge: "Scenic Grounds",
    description:
      "Stroll through meticulously landscaped green lawns, terracotta garden walkways, and swaying coconut palm avenues that stay cool in coastal air and softly illuminated at night.",
    highlights: [
      "Manicured tropical garden lawns",
      "Illuminated evening garden walkways",
      "Child-friendly outdoor open space",
      "Shaded coastal seating nooks",
    ],
    images: [
      "/images/amenities/resort-garden-lawn-deck.jpg",
      "/images/resort/resort-1.jpg",
      "/images/gallery/myra-night-garden-walkway.jpg",
      "/images/facilities/garden.jpg",
    ],
  },
  {
    id: "bamboo-events-lounge",
    title: "Bamboo Lounge & Private Event Space",
    tagline: "Celebrations & Gatherings",
    category: "Leisure & Events",
    timing: "On Reservation",
    badge: "Celebrations",
    description:
      "Host intimate family get-togethers, birthday evenings, team retreats, and sunset conversations inside our handcrafted bamboo pavilion veranda overlooking the resort and ocean breeze.",
    highlights: [
      "Handcrafted bamboo pavilion lounge",
      "Group & corporate day-outing hosting",
      "Custom celebration décor support",
      "Seamless poolside & lawn flow",
    ],
    images: [
      "/images/facilities/events.jpg",
      "/images/gallery/gallery-4.jpg",
      "/images/hero/myra-hero-3-desktop.jpg",
    ],
  },
  {
    id: "reception-concierge",
    title: "24/7 Resort Reception & Concierge",
    tagline: "Warm Andhra Hospitality",
    category: "Comfort & Services",
    timing: "24 Hours",
    badge: "Always Ready",
    description:
      "Our welcoming reception desk and hospitality team remain available around the clock to assist with smooth check-ins, local Chirala & Vodarevu travel guidance, room service, and custom stay requests.",
    highlights: [
      "24-hour front desk assistance",
      "Express direct WhatsApp support",
      "Local beach & temple travel tips",
      "Attentive housekeeping & security",
    ],
    images: [
      "/images/facilities/reception.jpg",
      "/images/hero/contact-reception-desktop.jpg",
      "/images/gmaps/myra-resort-signboard.jpg",
    ],
  },
  {
    id: "wifi-workation",
    title: "High-Speed Wi-Fi & Workation Lounge",
    tagline: "Seamless Connectivity",
    category: "Comfort & Services",
    timing: "24 Hours",
    badge: "Workation Ready",
    description:
      "Stay productive or stream effortlessly with complimentary high-speed wireless internet spanning guest cottages, suites, indoor lounge spaces, and poolside seating.",
    highlights: [
      "Complimentary high-speed Wi-Fi",
      "Bright sunlit lounge work tables",
      "Uninterrupted power backup",
      "Peaceful remote-work ambience",
    ],
    images: [
      "/images/facilities/wifi.jpg",
      "/images/gallery/gallery-2.jpg",
    ],
  },
  {
    id: "onsite-parking",
    title: "Secure Free On-Site Parking",
    tagline: "Hassle-Free Arrival",
    category: "Comfort & Services",
    timing: "24 Hours",
    badge: "Complimentary",
    description:
      "Arrive stress-free with our spacious, paved private parking zone inside the resort compound — accommodating family cars, SUVs, and group coaches safely right beside guest villas.",
    highlights: [
      "Complimentary private guest parking",
      "24/7 gated security monitoring",
      "Spacious paved courtyard access",
      "Easy luggage drop-off at reception",
    ],
    images: [
      "/images/facilities/parking.jpg",
      "/images/resort/resort-1.jpg",
    ],
  },
];
