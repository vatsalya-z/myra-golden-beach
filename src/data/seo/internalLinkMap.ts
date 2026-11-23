export interface InternalLinkTarget {
  sourcePath: string;
  targetPath: string;
  anchorText: string;
  context: string;
}

export const internalLinkMap: InternalLinkTarget[] = [
  // Homepage outgoing links
  {
    sourcePath: "/",
    targetPath: "/rooms",
    anchorText: "View All Rooms & Packages",
    context: "RoomsPreview section showcasing Deluxe Double, Triple, and Family Suites",
  },
  {
    sourcePath: "/",
    targetPath: "/about",
    anchorText: "Explore Our Resort",
    context: "Hero slide 1 & Introduction section exploring Andhra hospitality",
  },
  {
    sourcePath: "/",
    targetPath: "/gallery",
    anchorText: "View Full Gallery",
    context: "GalleryPreview section featuring pool, beach arch, and cottages",
  },
  {
    sourcePath: "/",
    targetPath: "/contact",
    anchorText: "Plan Your Stay / Enquire Now",
    context: "BookingCTA, QuickBookingBar, and room enquiry CTAs",
  },

  // About outgoing links
  {
    sourcePath: "/about",
    targetPath: "/rooms",
    anchorText: "View Rooms",
    context: "Call to action after discovering the resort story and facilities",
  },
  {
    sourcePath: "/about",
    targetPath: "/contact",
    anchorText: "Contact Us",
    context: "Primary visit inquiry CTA on the about page",
  },

  // Rooms outgoing links
  {
    sourcePath: "/rooms",
    targetPath: "/contact",
    anchorText: "Enquire Now",
    context: "Direct enquiry buttons for each room category",
  },
  {
    sourcePath: "/rooms",
    targetPath: "/gallery",
    anchorText: "See Room Photos",
    context: "Related pages linking room searchers to visual validation",
  },

  // Gallery outgoing links
  {
    sourcePath: "/gallery",
    targetPath: "/rooms",
    anchorText: "Book a Room",
    context: "Converting visual engagement to accommodation enquiries",
  },
  {
    sourcePath: "/gallery",
    targetPath: "/contact",
    anchorText: "Contact Us",
    context: "Direct booking assistance for guests inspired by photographs",
  },

  // Blog outgoing links
  {
    sourcePath: "/blog",
    targetPath: "/contact",
    anchorText: "Plan Your Beach Stay",
    context: "Bottom call to action on the travel journal archive",
  },
  {
    sourcePath: "/blog/coastal-beauty-around-chirala",
    targetPath: "/rooms",
    anchorText: "MYRA Golden Beach Resort rooms",
    context: "Recommending comfortable lodging while exploring Chirala coast",
  },
  {
    sourcePath: "/blog/exploring-vodarevu-beach",
    targetPath: "/contact",
    anchorText: "Contact the resort",
    context: "Advising tourists on reaching the beach and booking stays",
  },
  {
    sourcePath: "/blog/family-getaway-near-chirala",
    targetPath: "/rooms",
    anchorText: "Family Suite",
    context: "Directing multi-generational family vacationers to spacious suites",
  },
];
