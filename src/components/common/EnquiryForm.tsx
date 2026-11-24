"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowPath, HiChevronDown, HiMinus, HiPlus } from "react-icons/hi2";
import { enquirySchema, type EnquiryFormSchema } from "@/lib/validation";
import { buildEnquiryWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { triggerHaptic } from "@/lib/haptics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { rooms } from "@/data/rooms";
import { stayPackages } from "@/data/packages";

export function EnquiryForm() {
  const [redirected, setRedirected] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);
  const reducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  const adults = watch("adults") ?? 2;
  const children = watch("children") ?? 0;
  const checkInVal = watch("checkIn");
  const today = new Date().toISOString().split("T")[0];

  const adjustGuests = (
    field: "adults" | "children",
    delta: number,
    min: number,
    max: number
  ) => {
    triggerHaptic(8);
    const current = field === "adults" ? adults : children;
    const next = Math.min(max, Math.max(min, (Number.isFinite(current) ? current : min) + delta));
    setValue(field, next, { shouldValidate: true });
  };

  const onSubmit = (data: EnquiryFormSchema) => {
    triggerHaptic([12, 30, 12]);
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

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleReopen = () => {
    triggerHaptic(10);
    if (lastWhatsAppUrl) {
      window.open(lastWhatsAppUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleReset = () => {
    triggerHaptic(8);
    setRedirected(false);
    setLastWhatsAppUrl(null);
    reset();
  };

  const inputClass =
    "w-full px-3 sm:px-3.5 py-2.5 rounded-xl border border-[#D9EEF2] bg-[#F4F9FA] focus:bg-white text-[#17313B] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F6C46A] focus:border-[#F6C46A] transition-all placeholder:text-[#607780]/65";
  const labelClass =
    "block text-[11px] sm:text-xs font-semibold text-[#063B49] mb-1 tracking-wide";
  const errorClass = "text-[11px] text-red-500 mt-1 leading-tight";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3 sm:space-y-4">
      {/* Row 1: Compact Name + Phone (2-col on mobile) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your name"
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
            Mobile No. <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="10-digit number"
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

      {/* Row 2: Check-in + Check-out Dates (2-col on mobile) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
        <div>
          <label htmlFor="checkIn" className={labelClass}>
            Check-in <span className="text-red-500">*</span>
          </label>
          <input
            id="checkIn"
            type="date"
            min={today}
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
            Check-out <span className="text-red-500">*</span>
          </label>
          <input
            id="checkOut"
            type="date"
            min={checkInVal || today}
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

      {/* Row 3: Tactile Native Android Guest Steppers */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 app-chrome">
        <div>
          <span className={labelClass}>
            Adults <span className="text-red-500">*</span>
          </span>
          <input type="hidden" {...register("adults", { valueAsNumber: true })} />
          <div className="flex items-center justify-between px-2 py-1.5 rounded-xl border border-[#D9EEF2] bg-[#F4F9FA]">
            <motion.button
              type="button"
              whileTap={reducedMotion ? undefined : { scale: 0.88 }}
              onClick={() => adjustGuests("adults", -1, 1, 20)}
              aria-label="Decrease adults"
              disabled={adults <= 1}
              className="w-8 h-8 rounded-lg bg-white border border-[#D9EEF2] text-[#063B49] flex items-center justify-center disabled:opacity-40 shadow-2xs"
            >
              <HiMinus size={14} />
            </motion.button>
            <span className="text-xs sm:text-sm font-bold text-[#063B49] tabular-nums">
              {adults}
            </span>
            <motion.button
              type="button"
              whileTap={reducedMotion ? undefined : { scale: 0.88 }}
              onClick={() => adjustGuests("adults", 1, 1, 20)}
              aria-label="Increase adults"
              disabled={adults >= 20}
              className="w-8 h-8 rounded-lg bg-[#063B49] text-[#F6C46A] flex items-center justify-center disabled:opacity-40 shadow-2xs"
            >
              <HiPlus size={14} />
            </motion.button>
          </div>
          {errors.adults && <p className={errorClass}>{errors.adults.message}</p>}
        </div>

        <div>
          <span className={labelClass}>Children</span>
          <input type="hidden" {...register("children", { valueAsNumber: true })} />
          <div className="flex items-center justify-between px-2 py-1.5 rounded-xl border border-[#D9EEF2] bg-[#F4F9FA]">
            <motion.button
              type="button"
              whileTap={reducedMotion ? undefined : { scale: 0.88 }}
              onClick={() => adjustGuests("children", -1, 0, 20)}
              aria-label="Decrease children"
              disabled={children <= 0}
              className="w-8 h-8 rounded-lg bg-white border border-[#D9EEF2] text-[#063B49] flex items-center justify-center disabled:opacity-40 shadow-2xs"
            >
              <HiMinus size={14} />
            </motion.button>
            <span className="text-xs sm:text-sm font-bold text-[#063B49] tabular-nums">
              {children}
            </span>
            <motion.button
              type="button"
              whileTap={reducedMotion ? undefined : { scale: 0.88 }}
              onClick={() => adjustGuests("children", 1, 0, 20)}
              aria-label="Increase children"
              disabled={children >= 20}
              className="w-8 h-8 rounded-lg bg-[#063B49] text-[#F6C46A] flex items-center justify-center disabled:opacity-40 shadow-2xs"
            >
              <HiPlus size={14} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Row 4: Full-Width Room or Package Selector */}
      <div>
        <label htmlFor="roomPreference" className={labelClass}>
          Room or Package Preference <span className="text-red-500">*</span>
        </label>
        <select
          id="roomPreference"
          className={inputClass}
          aria-invalid={!!errors.roomPreference}
          {...register("roomPreference")}
        >
          <option value="No preference">No preference (Suggest best option)</option>
          <optgroup label="Rooms, Cottages & Villas">
            {rooms.map((room) => (
              <option key={room.id} value={room.name}>
                {room.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Holiday Packages">
            {stayPackages.map((pkg) => (
              <option key={pkg.id} value={`${pkg.name} (${pkg.duration})`}>
                {pkg.name} · {pkg.duration}
              </option>
            ))}
          </optgroup>
        </select>
        {errors.roomPreference && (
          <p className={errorClass}>{errors.roomPreference.message}</p>
        )}
      </div>

      {/* Row 5: Collapsible Optional Email & Special Request */}
      <div>
        <button
          type="button"
          onClick={() => {
            triggerHaptic(6);
            setShowOptional((prev) => !prev);
          }}
          aria-expanded={showOptional}
          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#0B7285] hover:text-[#063B49] bg-[#E8F6F7] border border-[#D9EEF2] px-3 py-1.5 rounded-full transition-colors active:scale-95"
        >
          <span>
            {showOptional
              ? "Hide optional details"
              : "+ Add Email or Special Request (Optional)"}
          </span>
          <HiChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              showOptional ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {showOptional && (
            <motion.div
              key="optional-fields"
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-3">
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
                  {errors.email && (
                    <p className={errorClass}>{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Special Request / Notes
                  </label>
                  <textarea
                    id="message"
                    rows={2}
                    placeholder="Early check-in, cake setup, coastal dining..."
                    className={`${inputClass} resize-none`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className={errorClass}>{errors.message.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* WhatsApp Redirect Confirmation Banner */}
      <AnimatePresence>
        {redirected && lastWhatsAppUrl && (
          <motion.div
            key="whatsapp-confirm"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#25D366]/10 border border-[#25D366]/35 rounded-2xl p-4 text-center space-y-2.5"
          >
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366]/20 text-[#25D366]">
              <FaWhatsapp size={20} />
            </div>
            <h3 className="font-semibold text-[#063B49] text-sm">
              WhatsApp Opened with Your Enquiry
            </h3>
            <p className="text-[#607780] text-xs leading-relaxed max-w-md mx-auto">
              Tap <strong>Send</strong> in WhatsApp to reach our reservations desk.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-0.5">
              <button
                type="button"
                onClick={handleReopen}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#25D366] text-white text-xs font-semibold rounded-lg hover:bg-[#20ba59] transition-colors active:scale-95"
              >
                <FaWhatsapp size={13} />
                Reopen WhatsApp
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8F6F7] text-[#063B49] text-xs font-semibold rounded-lg hover:bg-[#D9EEF2] transition-colors active:scale-95"
              >
                <HiArrowPath size={13} />
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Tactile Submit CTA */}
      <motion.button
        type="submit"
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        className="luxury-btn-sheen w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-5 bg-gradient-to-r from-[#F6C46A] to-[#DCA94F] hover:from-[#DCA94F] hover:to-[#F6C46A] text-[#082B38] font-bold text-xs sm:text-sm rounded-xl shadow-[0_6px_18px_rgba(246,196,106,0.35)] tracking-wide transition-all"
      >
        <FaWhatsapp size={17} className="shrink-0" />
        <span>Send Enquiry via WhatsApp</span>
      </motion.button>

      <p className="text-[11px] text-[#607780] text-center">
        Instant WhatsApp redirect &middot; Best direct rates &middot; Zero booking fee
      </p>
    </form>
  );
}
