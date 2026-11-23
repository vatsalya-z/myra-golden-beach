export interface PageKeywordMapping {
  path: string;
  pageName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  supportingKeywords: string[];
  searchIntent: "Navigational" | "Informational" | "Commercial Investigation" | "Transactional" | "Local Search Intent";
  relatedQuestions: string[];
  semanticEntities: string[];
  internalLinkTargets: string[];
}

export const keywordMap: Record<string, PageKeywordMapping> = {
  "/": {
    path: "/",
    pageName: "Home Page",
    primaryKeyword: "MYRA Golden Beach Resort",
    secondaryKeywords: [
      "Beach Resort in Chirala",
      "Resort in Chirala Andhra Pradesh",
      "Beach Resort Near Chirala",
      "Beach Stay Near Chirala",
      "Resort Near Vodarevu Beach",
      "Beach Accommodation in Andhra Pradesh",
    ],
    supportingKeywords: [
      "Family Resort Near Chirala",
      "Resort With Swimming Pool Near Chirala",
      "Hotels and Resorts Near Chirala",
      "Beach Holiday in Andhra Pradesh",
      "Weekend Getaway Near Chirala",
      "Coastal Resort in Andhra Pradesh",
    ],
    searchIntent: "Local Search Intent",
    relatedQuestions: [
      "Where is MYRA Golden Beach Resort located?",
      "Does MYRA Golden Beach Resort have a swimming pool?",
      "Is beach access available at MYRA Golden Beach Resort?",
      "How do I book a stay at MYRA Golden Beach Resort in Chirala?",
    ],
    semanticEntities: [
      "MYRA Golden Beach Resort",
      "Chirala",
      "Bapatla",
      "Vodarevu Beach",
      "Bay of Bengal",
      "Andhra Pradesh Tourism",
      "Resort Hotel",
    ],
    internalLinkTargets: ["/about", "/rooms", "/gallery", "/blog", "/contact"],
  },
  "/about": {
    path: "/about",
    pageName: "About Us",
    primaryKeyword: "About MYRA Golden Beach Resort",
    secondaryKeywords: [
      "Coastal Resort Hospitality Andhra Pradesh",
      "Beach Resort Story Chirala",
      "Resort Near Chirala Beach",
      "Family Beach Resort Andhra Pradesh",
    ],
    supportingKeywords: [
      "Andhra Hospitality Resort",
      "Bay of Bengal Beach Stay",
      "Peaceful Resort Near Vodarevu",
      "Eco Friendly Bamboo Cottages Chirala",
    ],
    searchIntent: "Commercial Investigation",
    relatedQuestions: [
      "Who owns MYRA Golden Beach Resort?",
      "What is the story behind MYRA Golden Beach Resort?",
      "What type of accommodation does the resort offer?",
    ],
    semanticEntities: [
      "Hospitality Industry",
      "Chirala Tourism",
      "Coastal Andhra Pradesh",
      "Beach Cottages",
      "Eco Tourism",
    ],
    internalLinkTargets: ["/", "/rooms", "/gallery", "/contact"],
  },
  "/rooms": {
    path: "/rooms",
    pageName: "Rooms & Packages",
    primaryKeyword: "Rooms at MYRA Golden Beach Resort",
    secondaryKeywords: [
      "Beach Resort Rooms Chirala",
      "Deluxe Double Room Chirala",
      "Family Suite Beach Resort Andhra Pradesh",
      "Deluxe Triple Room Chirala",
      "Resort Accommodation Near Chirala",
    ],
    supportingKeywords: [
      "AC Room Near Vodarevu Beach",
      "Family Room Beach Resort",
      "Affordable Beach Stay Chirala",
      "Comfortable Room Chirala Resort",
    ],
    searchIntent: "Transactional",
    relatedQuestions: [
      "What room types are available at MYRA Golden Beach Resort?",
      "Are the rooms air-conditioned at MYRA Golden Beach Resort?",
      "How many guests can stay in a Family Suite?",
      "How to enquire about room rates at MYRA Golden Beach Resort?",
    ],
    semanticEntities: [
      "Hotel Room",
      "Deluxe Double Room",
      "Family Suite",
      "Triple Room",
      "Hotel Amenities",
      "Air Conditioning",
    ],
    internalLinkTargets: ["/", "/gallery", "/contact", "/blog"],
  },
  "/gallery": {
    path: "/gallery",
    pageName: "Photo Gallery",
    primaryKeyword: "MYRA Golden Beach Resort Gallery",
    secondaryKeywords: [
      "MYRA Golden Beach Resort Photos",
      "Chirala Beach Resort Images",
      "Resort Swimming Pool Photos Chirala",
      "Beach Cottage Photos Andhra Pradesh",
    ],
    supportingKeywords: [
      "Real Photos MYRA Resort Chirala",
      "Deluxe Room Interior Photos",
      "Beach View Cottage Photos",
    ],
    searchIntent: "Informational",
    relatedQuestions: [
      "Are there real photos of MYRA Golden Beach Resort?",
      "What does the swimming pool look like at MYRA Resort?",
      "What do the rooms look like at MYRA Golden Beach Resort?",
    ],
    semanticEntities: [
      "Architectural Photography",
      "Hotel Photography",
      "Resort Grounds",
      "Swimming Pool",
      "Beach Promenade",
    ],
    internalLinkTargets: ["/", "/rooms", "/about", "/contact"],
  },
  "/blog": {
    path: "/blog",
    pageName: "Travel Blog",
    primaryKeyword: "Chirala Beach Travel Guide",
    secondaryKeywords: [
      "Andhra Pradesh Beach Holidays Blog",
      "Places to Visit Near Chirala",
      "Vodarevu Beach Travel Tips",
      "Weekend Trip from Hyderabad to Chirala",
    ],
    supportingKeywords: [
      "Best Beaches Near Chirala",
      "Suryalanka Beach Travel Guide",
      "Family Vacation Chirala Andhra Pradesh",
    ],
    searchIntent: "Informational",
    relatedQuestions: [
      "What is the best time to visit Chirala beach?",
      "Which beaches are located near Chirala?",
      "How far is Vodarevu beach from Chirala town?",
      "What are the top things to do in Chirala?",
    ],
    semanticEntities: [
      "Travel Blog",
      "Tourism in Andhra Pradesh",
      "Chirala Handlooms and Tourism",
      "Vodarevu Beach",
      "Suryalanka Beach",
      "Bapatla",
    ],
    internalLinkTargets: ["/", "/rooms", "/about", "/contact"],
  },
  "/contact": {
    path: "/contact",
    pageName: "Contact Us",
    primaryKeyword: "Contact MYRA Golden Beach Resort",
    secondaryKeywords: [
      "MYRA Golden Beach Resort Phone Number",
      "MYRA Resort Chirala Address",
      "Book MYRA Golden Beach Resort WhatsApp",
      "How to reach MYRA Golden Beach Resort",
    ],
    supportingKeywords: [
      "Resort Contact Details Chirala",
      "Room Enquiry MYRA Golden Beach Resort",
      "Google Maps Location MYRA Golden Beach Resort",
    ],
    searchIntent: "Transactional",
    relatedQuestions: [
      "What is the official phone number of MYRA Golden Beach Resort?",
      "How to reach MYRA Golden Beach Resort from Chirala Railway Station?",
      "Can I make a room enquiry through WhatsApp?",
    ],
    semanticEntities: [
      "Customer Support",
      "Hotel Reservations",
      "Google Maps Navigation",
      "WhatsApp Business",
      "Postal Address",
    ],
    internalLinkTargets: ["/", "/rooms", "/about", "/gallery"],
  },
};
