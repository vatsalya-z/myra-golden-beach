export interface Attraction {
  id: string;
  name: string;
  description: string;
  distance?: string;
  locationUrl?: string;
  image: string;
  category: "beach" | "temple" | "nature" | "city" | "heritage";
}

export const attractions: Attraction[] = [
  {
    id: "vodarevu-beach",
    name: "Vodarevu Beach",
    description:
      "One of the most scenic and serene beaches along the Andhra Pradesh coastline. Vodarevu Beach is known for its expansive shoreline, gentle waves and peaceful atmosphere, making it ideal for morning walks and sunset viewing.",
    distance: "Nearby",
    locationUrl: "https://maps.app.goo.gl/example",
    image: "/images/attractions/vodarevu-beach.jpg",
    category: "beach",
  },
  {
    id: "chirala-beach",
    name: "Chirala Beach",
    description:
      "A popular coastal destination on the Bay of Bengal, Chirala Beach offers a beautiful stretch of golden sand and refreshing sea breezes. Perfect for a leisurely stroll or a peaceful evening by the sea.",
    distance: "Nearby",
    locationUrl: "https://maps.app.goo.gl/example",
    image: "/images/attractions/chirala-beach.jpg",
    category: "beach",
  },
  {
    id: "suryalanka-beach",
    name: "Suryalanka Beach",
    description:
      "A tranquil and scenic beach destination near Bapatla. Suryalanka Beach is appreciated for its clean shores and picturesque coastal landscapes. A favourite for families and nature lovers.",
    image: "/images/attractions/suryalanka-beach.jpg",
    category: "beach",
  },
  {
    id: "bapatla",
    name: "Bapatla Town",
    description:
      "The nearest major town to the resort, Bapatla offers local markets, fresh produce, authentic Andhra cuisine and a glimpse into the coastal culture and lifestyle of the region.",
    image: "/images/attractions/bapatla.jpg",
    category: "city",
  },
  {
    id: "kondaveedu-fort",
    name: "Kondaveedu Fort",
    description:
      "A historic hill fort in Guntur district, Kondaveedu Fort is a significant heritage landmark with panoramic views and rich historical significance dating back to medieval Andhra Pradesh.",
    image: "/images/attractions/kondaveedu-fort.jpg",
    category: "heritage",
  },
  {
    id: "narasaraopet",
    name: "Narasaraopet",
    description:
      "A town known for its local commerce, temples and traditional Andhra culture. Visitors can explore the vibrant local markets and experience authentic regional hospitality.",
    image: "/images/attractions/narasaraopet.jpg",
    category: "city",
  },
];
