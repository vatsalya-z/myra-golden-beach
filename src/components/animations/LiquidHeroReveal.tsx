"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LiquidHeroRevealProps {
  children: React.ReactNode;
}

export function LiquidHeroReveal({ children }: LiquidHeroRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { scale: 1.016 },
        {
          scale: 1,
          duration: 1.85,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div className="overflow-hidden">
      <div ref={containerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
