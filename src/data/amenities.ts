export interface Amenity {
  id: string;
  icon: string;
  title: string;
  description: string;
  image?: string;
}

export const amenities: Amenity[] = [
  {
    id: "pool",
    icon: "Waves",
    title: "Swimming Pool & Waterfall",
    description:
      "Refresh yourself in our sparkling outdoor swimming pool with illuminated waterfall wall, pergolas and poolside relaxation.",
    image: "/images/amenities/resort-pool-illuminated.jpg",
  },
  {
    id: "beach",
    icon: "Umbrella",
    title: "Direct Beach Access",
    description:
      "Steps away from pristine golden sands — enjoy sunrise walks, sea breezes, beach loungers and ocean views.",
    image: "/images/gmaps/myra-beach-loungers.jpg",
  },
  {
    id: "dining",
    icon: "UtensilsCrossed",
    title: "Multi-Cuisine Restaurant",
    description:
      "Savour authentic Andhra flavours and North Indian cuisine in our ambient indoor dining hall and restaurant.",
    image: "/images/gmaps/myra-restaurant-dining.jpg",
  },
  {
    id: "garden",
    icon: "Trees",
    title: "Garden, Lawn & Sun Deck",
    description:
      "Lush landscaped greenery, coconut palms, flowering frangipani trees and stone-paved walkways overlooking the pool.",
    image: "/images/amenities/resort-garden-lawn-deck.jpg",
  },
  {
    id: "kids-pool",
    icon: "Sparkles",
    title: "Kids & Family Pool",
    description:
      "Safe, crystal-clear shallow splash pool designed for children and family playtime with stone waterfall backdrop.",
    image: "/images/amenities/resort-kids-pool.jpg",
  },
  {
    id: "parking",
    icon: "Car",
    title: "Free On-Site Parking",
    description:
      "Complimentary secure and spacious parking available for all resort guests throughout their stay.",
    image: "/images/facilities/parking.jpg",
  },
  {
    id: "wifi",
    icon: "Wifi",
    title: "Free High-Speed Wi-Fi",
    description:
      "Stay connected effortlessly with complimentary high-speed internet access across rooms and resort premises.",
    image: "/images/facilities/wifi.jpg",
  },
  {
    id: "24hr",
    icon: "Clock",
    title: "24-Hour Reception & Security",
    description:
      "Welcoming front desk and round-the-clock service to ensure a seamless, relaxed stay from check-in to check-out.",
    image: "/images/gmaps/myra-resort-signboard.jpg",
  },
];
