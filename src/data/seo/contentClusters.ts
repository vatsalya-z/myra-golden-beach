export interface TopicCluster {
  id: string;
  name: string;
  pillarPage: string;
  pillarKeyword: string;
  supportingPages: {
    title: string;
    path: string;
    targetKeyword: string;
    intent: string;
  }[];
}

export const contentClusters: TopicCluster[] = [
  {
    id: "beach-resort-hospitality",
    name: "Beach Resort & Accommodation Silo",
    pillarPage: "/rooms",
    pillarKeyword: "Rooms at MYRA Golden Beach Resort",
    supportingPages: [
      {
        title: "Deluxe Double Room Accommodation",
        path: "/rooms#deluxe-double-room",
        targetKeyword: "Deluxe Double Room Chirala",
        intent: "Transactional",
      },
      {
        title: "Family Suite Coastal Getaway",
        path: "/rooms#family-suite",
        targetKeyword: "Family Suite Beach Resort Andhra Pradesh",
        intent: "Transactional",
      },
      {
        title: "Deluxe Triple Room for Small Groups",
        path: "/rooms#deluxe-triple-room",
        targetKeyword: "Deluxe Triple Room Chirala",
        intent: "Transactional",
      },
      {
        title: "About Our Hospitality & Story",
        path: "/about",
        targetKeyword: "About MYRA Golden Beach Resort",
        intent: "Commercial",
      },
    ],
  },
  {
    id: "coastal-travel-guide",
    name: "Coastal Travel & Destination Information Silo",
    pillarPage: "/blog",
    pillarKeyword: "Chirala Beach Travel Guide",
    supportingPages: [
      {
        title: "Coastal Beauty Around Chirala: A Guide to Sun, Sand, and Sea",
        path: "/blog/coastal-beauty-around-chirala",
        targetKeyword: "Coastal Beauty Around Chirala",
        intent: "Informational",
      },
      {
        title: "Exploring Vodarevu Beach: Andhra's Pristine Coastal Gem",
        path: "/blog/exploring-vodarevu-beach",
        targetKeyword: "Exploring Vodarevu Beach",
        intent: "Informational",
      },
      {
        title: "Planning a Family Getaway Near Chirala: Tips and Highlights",
        path: "/blog/family-getaway-near-chirala",
        targetKeyword: "Family Getaway Near Chirala",
        intent: "Informational",
      },
      {
        title: "Beach Holidays in Andhra Pradesh: Discovering the Underrated Coast",
        path: "/blog/beach-holidays-in-andhra-pradesh",
        targetKeyword: "Beach Holidays in Andhra Pradesh",
        intent: "Informational",
      },
      {
        title: "Weekend Getaways From Hyderabad and Vijayawada to the Coast",
        path: "/blog/weekend-getaways-from-hyderabad",
        targetKeyword: "Weekend Getaways From Hyderabad",
        intent: "Informational",
      },
    ],
  },
  {
    id: "visual-experience",
    name: "Visual Experience & Grounds Silo",
    pillarPage: "/gallery",
    pillarKeyword: "MYRA Golden Beach Resort Gallery",
    supportingPages: [
      {
        title: "Resort Grounds & Bamboo Cottages",
        path: "/gallery?category=exterior",
        targetKeyword: "Beachfront Bamboo Cottages Chirala",
        intent: "Informational",
      },
      {
        title: "Swimming Pool & Waterfall Deck",
        path: "/gallery?category=pool",
        targetKeyword: "Resort Swimming Pool Chirala",
        intent: "Informational",
      },
      {
        title: "Authentic Guest Room Interiors",
        path: "/gallery?category=rooms",
        targetKeyword: "Deluxe Room Interior Photos Chirala",
        intent: "Informational",
      },
      {
        title: "Multi-Cuisine Dining & Breakfast Spread",
        path: "/gallery?category=restaurant",
        targetKeyword: "Resort Restaurant Food Photos",
        intent: "Informational",
      },
    ],
  },
];
