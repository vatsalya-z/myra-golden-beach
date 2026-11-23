export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  source: string;
}

// Note: These testimonials are placeholder examples only.
// Replace with verified guest reviews from Google Business Profile
// or direct guest submissions before going live.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ravi Kumar",
    location: "Hyderabad, Telangana",
    rating: 5,
    review:
      "A wonderful coastal getaway! The rooms were clean and comfortable, the staff was very helpful and the pool area was a highlight. Great value for a beach resort near Chirala.",
    date: "2024",
    source: "Google",
  },
  {
    id: "t2",
    name: "Priya Sharma",
    location: "Vijayawada, Andhra Pradesh",
    rating: 5,
    review:
      "We visited as a family and had a lovely experience. The resort is in a peaceful location, the food was delicious and the kids enjoyed the pool. We will definitely return.",
    date: "2024",
    source: "Google",
  },
  {
    id: "t3",
    name: "Suresh Reddy",
    location: "Bangalore, Karnataka",
    rating: 4,
    review:
      "A pleasant escape from the city. The beachside setting is beautiful and the hospitality was warm. The restaurant served excellent Andhra cuisine. Highly recommended for a relaxing break.",
    date: "2024",
    source: "Google",
  },
];
