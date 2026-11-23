export type GalleryCategory =
  | "all"
  | "exterior"
  | "rooms"
  | "pool"
  | "restaurant"
  | "garden"
  | "facilities";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "all">;
  width?: number;
  height?: number;
}
