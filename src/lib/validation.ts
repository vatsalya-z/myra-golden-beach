import { z } from "zod";

const indianMobileRegex = /^[6-9]\d{9}$/;

export const enquirySchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    phone: z
      .string()
      .regex(
        indianMobileRegex,
        "Please enter a valid 10-digit Indian mobile number"
      ),
    email: z
      .string()
      .email("Please enter a valid email address")
      .optional()
      .or(z.literal("")),
    checkIn: z.string().min(1, "Check-in date is required"),
    checkOut: z.string().min(1, "Check-out date is required"),
    adults: z
      .number()
      .min(1, "At least 1 adult is required")
      .max(20, "Maximum 20 adults"),
    children: z.number().min(0).max(20, "Maximum 20 children"),
    roomPreference: z
      .string()
      .min(1, "Please select a room preference"),
    message: z.string().max(500, "Message must be less than 500 characters").optional(),
  })
  .refine(
    (data) => {
      if (data.checkIn && data.checkOut) {
        return new Date(data.checkOut) > new Date(data.checkIn);
      }
      return true;
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOut"],
    }
  )
  .refine(
    (data) => {
      if (data.checkIn) {
        return new Date(data.checkIn) >= new Date(new Date().toDateString());
      }
      return true;
    },
    {
      message: "Check-in date cannot be in the past",
      path: ["checkIn"],
    }
  );

export type EnquiryFormSchema = z.infer<typeof enquirySchema>;
