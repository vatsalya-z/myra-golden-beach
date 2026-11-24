export interface RoomAmenity {
  icon: string;
  label: string;
}

export type RoomCategory =
  | "Cottages"
  | "Villas"
  | "Suites"
  | "Poolside"
  | "Deluxe Rooms"
  | "Group Stays";

export interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category?: RoomCategory;
  view?: string;
  bedType?: string;
  highlights?: string[];
  capacity: {
    adults: number;
    children?: number;
  };
  size?: string;
  images: string[];
  amenities: RoomAmenity[];
  priceFrom?: number;
  priceNote?: string;
  badge?: string;
  featured?: boolean;
}
