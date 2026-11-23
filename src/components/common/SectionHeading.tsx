import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  const descText = description || subtitle;

  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col gap-3.5", alignClass[align], className)}>
      {eyebrow && (
        <span
          className={cn(
            "text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[#E0B45C]"
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        id={id}
        className={cn(
          "font-playfair text-[clamp(1.75rem,3.8vw,2.85rem)] font-bold leading-tight tracking-tight max-w-4xl",
          light ? "text-white" : "text-[#072A32]"
        )}
      >
        {title}
      </h2>

      {/* Antique Gold divider */}
      <div
        className={cn(
          "flex gap-1.5 my-0.5",
          align === "center" && "justify-center",
          align === "right" && "justify-end"
        )}
        aria-hidden="true"
      >
        <div className="h-0.5 w-14 bg-gradient-to-r from-[#C89435] via-[#F2D28B] to-[#C89435] rounded-full" />
        <div className="h-0.5 w-4 bg-[#E0B45C]/60 rounded-full" />
        <div className="h-0.5 w-2 bg-[#E0B45C]/30 rounded-full" />
      </div>

      {descText && (
        <p
          className={cn(
            "text-[clamp(0.925rem,1.2vw,1.1rem)] leading-relaxed max-w-2xl",
            light ? "text-white/80" : "text-[#566970]",
            align === "center" && "mx-auto"
          )}
        >
          {descText}
        </p>
      )}
    </div>
  );
}
