export interface EnquiryFormData {
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomPreference: string;
  message?: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
}
