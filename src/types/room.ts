export interface RoomAmenity {
  icon: string;
  label: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
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
