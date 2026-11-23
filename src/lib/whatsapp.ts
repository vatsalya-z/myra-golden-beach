import { WHATSAPP } from "./constants";

/**
 * Returns the cleaned international WhatsApp phone number (digits only).
 * Default fallback is the resort's verified contact: 917075141079.
 */
export function getWhatsAppNumber(): string {
  const digits = WHATSAPP.replace(/\D/g, "");
  return digits || "917075141079";
}

/**
 * Builds the official https://wa.me/ URL with URI-encoded message text.
 */
export function buildWhatsAppUrl(message: string): string {
  const phoneNumber = getWhatsAppNumber();
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}

export interface EnquiryWhatsAppPayload {
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomPreference?: string;
  message?: string;
}

/**
 * Formats enquiry form data into a readable, pre-filled WhatsApp message.
 */
export function buildEnquiryWhatsAppMessage(formData: EnquiryWhatsAppPayload): string {
  const lines: (string | null)[] = [
    "Hello MYRA GOLDEN BEACH RESORT,",
    "",
    "I would like to make an enquiry.",
    "",
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    formData.email ? `Email: ${formData.email}` : null,
    `Check-in: ${formData.checkIn}`,
    `Check-out: ${formData.checkOut}`,
    `Guests: ${formData.guests}`,
    formData.roomPreference && formData.roomPreference !== "No preference"
      ? `Room Preference: ${formData.roomPreference}`
      : null,
    formData.message ? `Message: ${formData.message}` : null,
  ];

  return lines.filter((l) => l !== null).join("\n");
}

/**
 * Default message for general WhatsApp enquiries and quick links.
 */
export function buildGeneralWhatsAppMessage(): string {
  return "Hello MYRA GOLDEN BEACH RESORT, I would like to make an enquiry regarding a stay. Please share details and room availability. Thank you.";
}
