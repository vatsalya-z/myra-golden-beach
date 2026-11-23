"use client";

import Link from "next/link";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";
import { siteConfig } from "@/data/site";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

export function FloatingContact() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  return (
    <div
      className="fixed bottom-6 right-5 z-50 hidden lg:flex flex-col gap-3"
      aria-label="Contact shortcuts"
    >
    {/* Call Button */}
      <a
        href={`tel:${siteConfig.phone}`}
        aria-label="Call MYRA Golden Beach Resort"
        className="flex items-center justify-center rounded-full bg-[#063B49] text-white shadow-lg hover:bg-[#082B38] hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C46A] focus-visible:ring-offset-2 border border-[#F6C46A]/30"
        style={{ width: "52px", height: "52px" }}
      >
        <FaPhoneAlt size={18} className="text-[#F6C46A]" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp MYRA Golden Beach Resort"
        className="flex items-center justify-center rounded-full text-white shadow-lg hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          width: "52px",
          height: "52px",
          backgroundColor: "#25D366",
        }}
      >
        <FaWhatsapp size={26} />
      </a>
    </div>
  );
}
