"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { enquirySchema, type EnquiryFormSchema } from "@/lib/validation";
import { buildEnquiryWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/common/Button";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowPath } from "react-icons/hi2";

const ROOM_OPTIONS = [
  "No preference",
  "Deluxe Double Room",
  "Deluxe Triple Room",
  "Family Suite",
];

export function EnquiryForm() {
  const [redirected, setRedirected] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormSchema>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      adults: 2,
      children: 0,
      roomPreference: "No preference",
    },
  });

  const onSubmit = (data: EnquiryFormSchema) => {
    const guests = `${data.adults} Adult${data.adults > 1 ? "s" : ""}${
      data.children > 0 ? `, ${data.children} Child${data.children > 1 ? "ren" : ""}` : ""
    }`;

    const message = buildEnquiryWhatsAppMessage({
      name: data.fullName,
      phone: data.phone,
      email: data.email || undefined,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests,
      roomPreference: data.roomPreference,
      message: data.message || undefined,
    });

    const url = buildWhatsAppUrl(message);
    setLastWhatsAppUrl(url);
    setRedirected(true);

    // Open WhatsApp in a new tab / application
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleReopen = () => {
    if (lastWhatsAppUrl) {
      window.open(lastWhatsAppUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleReset = () => {
    setRedirected(false);
    setLastWhatsAppUrl(null);
    reset();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[#EFE7D8] bg-white text-[#1F1F1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] transition-all placeholder:text-[#74766F]/60";
  const labelClass = "block text-sm font-medium text-[#123B2A] mb-1.5";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="fullName-error" className={errorClass}>
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            className={inputClass}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass}>
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com (optional)"
          className={inputClass}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      {/* Check-in / Check-out */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="checkIn" className={labelClass}>
            Check-in Date <span className="text-red-500">*</span>
          </label>
          <input
            id="checkIn"
            type="date"
            className={inputClass}
            aria-invalid={!!errors.checkIn}
            aria-describedby={errors.checkIn ? "checkIn-error" : undefined}
            {...register("checkIn")}
          />
          {errors.checkIn && (
            <p id="checkIn-error" className={errorClass}>
              {errors.checkIn.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="checkOut" className={labelClass}>
            Check-out Date <span className="text-red-500">*</span>
          </label>
          <input
            id="checkOut"
            type="date"
            className={inputClass}
            aria-invalid={!!errors.checkOut}
            aria-describedby={errors.checkOut ? "checkOut-error" : undefined}
            {...register("checkOut")}
          />
          {errors.checkOut && (
            <p id="checkOut-error" className={errorClass}>
              {errors.checkOut.message}
            </p>
          )}
        </div>
      </div>

      {/* Adults / Children / Room */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="adults" className={labelClass}>
            Adults <span className="text-red-500">*</span>
          </label>
          <input
            id="adults"
            type="number"
            min={1}
            max={20}
            className={inputClass}
            aria-invalid={!!errors.adults}
            {...register("adults", { valueAsNumber: true })}
          />
          {errors.adults && <p className={errorClass}>{errors.adults.message}</p>}
        </div>

        <div>
          <label htmlFor="children" className={labelClass}>
            Children
          </label>
          <input
            id="children"
            type="number"
            min={0}
            max={20}
            className={inputClass}
            {...register("children", { valueAsNumber: true })}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label htmlFor="roomPreference" className={labelClass}>
            Room Preference <span className="text-red-500">*</span>
          </label>
          <select
            id="roomPreference"
            className={inputClass}
            aria-invalid={!!errors.roomPreference}
            {...register("roomPreference")}
          >
            {ROOM_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.roomPreference && (
            <p className={errorClass}>{errors.roomPreference.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Additional Message
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Any special requests or questions? (optional)"
          className={`${inputClass} resize-none`}
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {/* WhatsApp Redirect Status Notification */}
      {redirected && lastWhatsAppUrl && (
        <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl p-5 text-center space-y-3">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#25D366]/20 text-[#25D366]">
            <FaWhatsapp size={24} />
          </div>
          <h3 className="font-semibold text-[#123B2A] text-base">
            WhatsApp Opened with Your Enquiry
          </h3>
          <p className="text-[#74766F] text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Your enquiry details have been formatted and pre-filled in WhatsApp.
            Please tap <strong>Send</strong> in your chat to reach our reservations team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleReopen}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-semibold rounded hover:bg-[#20ba59] transition-colors"
            >
              <FaWhatsapp size={14} />
              Reopen WhatsApp
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-[#123B2A] text-xs font-semibold rounded hover:bg-gray-200 transition-colors"
            >
              <HiArrowPath size={14} />
              Reset Form
            </button>
          </div>
        </div>
      )}

      {/* Submit actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full justify-center"
        >
          <FaWhatsapp size={18} />
          Submit Enquiry via WhatsApp
        </Button>
      </div>

      <p className="text-xs text-[#74766F] text-center italic">
        Submitting this form redirects to WhatsApp with your details pre-filled.
        You can review and send the message directly to our reservations desk.
      </p>
    </form>
  );
}
