export interface SiteConfig {
  name: string;
  shortName: string;
  domain: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  googleBusinessProfile: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}
