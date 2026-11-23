export interface HeroSlide {
  id: number;
  eyebrow: string;
  heading: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "WELCOME TO MYRA GOLDEN BEACH RESORT",
    heading: "Experience the Beauty of a Relaxing Coastal Stay",
    subtitle: "Beachfront bamboo cottages, pristine sands and warm Andhra hospitality near Chirala.",
    ctaLabel: "Explore Our Resort",
    ctaHref: "/about",
    image: "/images/gmaps/myra-beach-cottages.jpg",
    imageAlt:
      "Beachfront bamboo cottages with MYRA resort signage and coastal palm trees at MYRA Golden Beach Resort",
  },
  {
    id: 2,
    eyebrow: "RESORT AMENITIES & SWIMMING POOL",
    heading: "Unwind by Our Illuminated Poolside",
    subtitle: "Sparkling waters, evening ambient lighting and private cottages for the ultimate getaway.",
    ctaLabel: "View Gallery",
    ctaHref: "/gallery",
    image: "/images/gmaps/myra-swimming-pool-night.jpg",
    imageAlt:
      "Illuminated swimming pool at night with decorated gazebo and cottages at MYRA Golden Beach Resort",
  },
  {
    id: 3,
    eyebrow: "OCEANFRONT LIVING & HOSPITALITY",
    heading: "Breathtaking Coastal Ocean Views",
    subtitle: "Wake up to sweeping sea breezes and golden horizons from your private cottage veranda.",
    ctaLabel: "Explore Rooms",
    ctaHref: "/rooms",
    image: "/images/gmaps/myra-cottage-sea-view.jpg",
    imageAlt:
      "Ocean view of the golden beach and sea waves from the cottage veranda at MYRA Golden Beach Resort",
  },
];
