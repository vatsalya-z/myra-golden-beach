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
      className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-4 lg:bottom-24 lg:right-5 z-30 flex items-center justify-center rounded-full bg-[#F6C46A] text-[#063B49] shadow-lg hover:bg-[#DCA94F] hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C46A] focus-visible:ring-offset-2"
      style={{ width: "44px", height: "44px" }}
    >
      <HiChevronUp size={22} />
    </button>
  );
}
