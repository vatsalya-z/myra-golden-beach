export interface StayPackage {
  id: string;
  name: string;
  duration: string;
  badge: string;
  idealFor: string;
  tagline: string;
  image: string;
  inclusions: string[];
  rateNote: string;
}

export const stayPackages: StayPackage[] = [
  {
    id: "weekend-coastal-escape",
    name: "Weekend Coastal Escape",
    duration: "2 Days / 1 Night",
    badge: "Most Popular",
    idealFor: "Couples & Friends",
    tagline: "Unwind with beach walks, poolside evenings & authentic Andhra hospitality.",
    image: "/images/blog/myra-resort-stay.jpg",
    inclusions: [
      "Stay in Beachfront Cottage or Deluxe Room",
      "Complimentary fresh South Indian breakfast",
      "Evening swimming pool & waterfall access",
      "Welcome coastal drink & sunrise beach walk",
    ],
    rateNote: "Custom weekend direct rates",
  },
  {
    id: "romantic-honeymoon-retreat",
    name: "Romantic Honeymoon Retreat",
    duration: "3 Days / 2 Nights",
    badge: "Couples Special",
    idealFor: "Honeymooners & Anniversaries",
    tagline: "Intimate ocean-view moments curated with coastal charm and privacy.",
    image: "/images/rooms/myra-honeymoon-suite-hd.jpg",
    inclusions: [
      "Ocean View Honeymoon Suite with floral décor",
      "Private candlelight poolside dinner setup",
      "Bed & veranda morning breakfast service",
      "Flexible late check-out subject to availability",
    ],
    rateNote: "Inclusive celebration package",
  },
  {
    id: "coastal-dining-stay",
    name: "Coastal Dining & Beach Stay",
    duration: "2 Days / 1 Night",
    badge: "Culinary Delight",
    idealFor: "Foodies & Weekend Travellers",
    tagline: "Savor signature Andhra seafood & coastal flavors beside gentle Bay of Bengal breezes.",
    image: "/images/blog/family-getaway-chirala.jpg",
    inclusions: [
      "1-Night AC Resort Stay or Private Villa",
      "Beachfront dinner & chef's Andhra thali",
      "Evening tea/coffee & sunset beach lounge",
      "Morning breakfast & swimming pool access",
    ],
    rateNote: "Stay + full coastal dining",
  },
  {
    id: "family-beach-holiday",
    name: "Family Beach Holiday Package",
    duration: "3 Days / 2 Nights",
    badge: "Best Value",
    idealFor: "Families (Up to 6 Guests)",
    tagline: "Spacious stay, kid-friendly pool zones & relaxed dining for the whole family.",
    image: "/images/facilities/pool.jpg",
    inclusions: [
      "Spacious Family Suite with separate lounge",
      "Kids pool & manicured lawn play area access",
      "Authentic Andhra & multi-cuisine family meals",
      "Complimentary high-speed Wi-Fi & parking",
    ],
    rateNote: "Special multi-night family pricing",
  },
  {
    id: "beachside-workation",
    name: "Beachside Workation Retreat",
    duration: "4 Days / 3 Nights",
    badge: "Remote Work",
    idealFor: "Digital Nomads & Remote Teams",
    tagline: "Pair reliable high-speed Wi-Fi and peaceful sunlit rooms with evening waves.",
    image: "/images/facilities/wifi.jpg",
    inclusions: [
      "Quiet Premier King Room or Garden Villa",
      "Dedicated high-speed Wi-Fi & lounge seating",
      "Unlimited artisan morning tea/coffee & breakfast",
      "Unwind with sunset pool & beach access",
    ],
    rateNote: "Extended weekday workation rate",
  },
  {
    id: "day-outing-poolside-pass",
    name: "Group & Day Outing Pool Pass",
    duration: "10 AM – 6 PM",
    badge: "Groups & Corporates",
    idealFor: "Groups, Families & Corporates",
    tagline: "Spend a refreshing coastal day by our turquoise pool and sandy beach.",
    image: "/images/facilities/pool-bg.jpg",
    inclusions: [
      "Full-day swimming pool & waterfall access",
      "Beachfront loungers & garden lawn access",
      "Welcome beverage + multi-cuisine lunch",
      "Dedicated group freshen-up room facility",
    ],
    rateNote: "Group & corporate day packages",
  },
];
