export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "facilities" | "location" | "general";
}

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "Where is MYRA Golden Beach Resort located?",
    answer:
      "MYRA Golden Beach Resort is located in Kotha Peta Rural, near Chirala, in Andhra Pradesh (PIN: 523157). The resort is situated close to the Bay of Bengal coastline, offering easy access to nearby beaches including Vodarevu Beach.",
    category: "location",
  },
  {
    id: "faq-2",
    question: "How far is the resort from Chirala?",
    answer:
      "The resort is located in the Chirala region of Andhra Pradesh. Please contact us directly on +91 70751 41079 for precise directions and travel guidance from your location.",
    category: "location",
  },
  {
    id: "faq-3",
    question: "What types of rooms are available at MYRA Golden Beach Resort?",
    answer:
      "We offer Deluxe Double Rooms, Deluxe Triple Rooms and Family Suites. All rooms include air conditioning, free Wi-Fi, LED TV, hot water and daily housekeeping. Contact us to check availability and current rates.",
    category: "facilities",
  },
  {
    id: "faq-4",
    question: "Does the resort have a swimming pool?",
    answer:
      "Yes, MYRA Golden Beach Resort features an outdoor swimming pool available for all resort guests during your stay.",
    category: "facilities",
  },
  {
    id: "faq-5",
    question: "Is there a restaurant at the resort?",
    answer:
      "Yes, our in-house multi-cuisine restaurant serves a variety of dishes including authentic Andhra cuisine, North Indian meals and other popular options. Meals are prepared fresh daily.",
    category: "facilities",
  },
  {
    id: "faq-6",
    question: "How can I make a room booking or enquiry?",
    answer:
      "You can submit an enquiry through our website contact form, call us directly on +91 70751 41079, or send us a WhatsApp message on the same number. Our team will respond promptly to confirm availability and details.",
    category: "booking",
  },
  {
    id: "faq-7",
    question: "Is free parking available at the resort?",
    answer:
      "Yes, complimentary parking is available on-site for all resort guests.",
    category: "facilities",
  },
  {
    id: "faq-8",
    question: "Is the resort suitable for family trips?",
    answer:
      "Absolutely. MYRA Golden Beach Resort is a family-friendly destination with spacious rooms, a swimming pool, garden areas and easy access to nearby beaches. We welcome families, couples and groups.",
    category: "general",
  },
  {
    id: "faq-9",
    question: "What is the nearest beach to the resort?",
    answer:
      "The resort is located in the coastal Chirala region with access to nearby beaches along the Bay of Bengal, including Vodarevu Beach. Please contact us for the most current information on beach access from the resort.",
    category: "location",
  },
  {
    id: "faq-10",
    question: "Does the resort host events and gatherings?",
    answer:
      "Yes, we have event spaces suitable for small family celebrations, corporate retreats and group gatherings. Contact us to discuss your requirements and we will be happy to assist.",
    category: "general",
  },
];
