"use client";

import { useState, useEffect } from "react";
import { HiChevronUp } from "react-icons/hi2";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-24 right-5 z-50 flex items-center justify-center rounded-full bg-[#E0B45C] text-[#072A32] shadow-lg hover:bg-[#C6953B] hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B45C] focus-visible:ring-offset-2"
      style={{ width: "44px", height: "44px" }}
    >
      <HiChevronUp size={22} />
    </button>
  );
}
