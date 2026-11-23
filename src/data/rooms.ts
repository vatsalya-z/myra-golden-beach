import type { Room } from "@/types/room";

export const rooms: Room[] = [
  {
    id: "deluxe-double",
    slug: "deluxe-double-room",
    name: "Deluxe Double Room",
    tagline: "Comfort and coastal charm",
    description:
      "Our Deluxe Double Rooms offer a comfortable and well-appointed retreat with modern amenities. Enjoy a restful night's sleep with quality bedding, a private bathroom, and relaxing coastal décor.",
    capacity: { adults: 2, children: 1 },
    images: [
      "/images/rooms/myra-deluxe-room-ac.jpg",
      "/images/rooms/myra-room-tv-wardrobe.jpg",
      "/images/rooms/myra-deluxe-bedroom-main.jpg",
      "/images/rooms/myra-room-dressing.jpg",
    ],
    amenities: [
      { icon: "AirVent", label: "Air Conditioning" },
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Tv", label: "LED TV" },
      { icon: "Droplets", label: "Hot Water" },
      { icon: "Coffee", label: "Tea/Coffee Maker" },
      { icon: "Lock", label: "Safety Locker" },
    ],
    priceNote: "Contact us for rates",
    featured: true,
  },
  {
    id: "deluxe-triple",
    slug: "deluxe-triple-room",
    name: "Deluxe Triple Room",
    tagline: "Spacious comfort for families",
    description:
      "Perfect for small families or groups, our Deluxe Triple Rooms provide extra space with three comfortable beds and all standard resort amenities for a memorable coastal stay.",
    capacity: { adults: 3, children: 1 },
    images: [
      "/images/rooms/myra-deluxe-platform-bed.jpg",
      "/images/rooms/myra-room-tv-wardrobe.jpg",
      "/images/rooms/myra-deluxe-room-ac.jpg",
      "/images/rooms/myra-room-dressing.jpg",
    ],
    amenities: [
      { icon: "AirVent", label: "Air Conditioning" },
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Tv", label: "LED TV" },
      { icon: "Droplets", label: "Hot Water" },
      { icon: "Coffee", label: "Tea/Coffee Maker" },
      { icon: "Lock", label: "Safety Locker" },
    ],
    priceNote: "Contact us for rates",
    featured: true,
  },
  {
    id: "family-suite",
    slug: "family-suite",
    name: "Family Suite",
    tagline: "The ideal family coastal getaway",
    description:
      "Our Family Suites are thoughtfully designed to accommodate the whole family. With generous space, premium furnishings, and resort views, they provide an elevated coastal experience for everyone.",
    capacity: { adults: 4, children: 2 },
    images: [
      "/images/rooms/myra-family-suite-lounge.jpg",
      "/images/rooms/myra-cottage-sea-view.jpg",
      "/images/rooms/myra-beach-cottages.jpg",
      "/images/rooms/myra-deluxe-room-ac.jpg",
    ],
    amenities: [
      { icon: "AirVent", label: "Air Conditioning" },
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Tv", label: "LED TV" },
      { icon: "Droplets", label: "Hot Water" },
      { icon: "Coffee", label: "Tea/Coffee Maker" },
      { icon: "Lock", label: "Safety Locker" },
      { icon: "Sofa", label: "Sitting Area" },
    ],
    priceNote: "Contact us for rates",
    badge: "Best for Families",
    featured: true,
  },
];
