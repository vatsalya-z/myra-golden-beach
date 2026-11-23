import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  external = false,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed rounded-sm";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#C89435] via-[#EBC878] to-[#C89435] hover:from-[#B88428] hover:via-[#E0B45C] hover:to-[#B88428] text-[#041B21] font-bold focus-visible:ring-[#E0B45C] shadow-[0_6px_20px_rgba(224,180,92,0.3)] hover:shadow-[0_10px_28px_rgba(224,180,92,0.45)] hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-gradient-to-r from-[#041B21] via-[#072A32] to-[#0E3E49] hover:from-[#C89435] hover:via-[#EBC878] hover:to-[#C89435] text-white hover:text-[#041B21] border border-[#E0B45C]/35 focus-visible:ring-[#072A32] shadow-md hover:shadow-[0_8px_24px_rgba(224,180,92,0.35)] hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "border-2 border-[#072A32] text-[#072A32] hover:border-[#E0B45C] hover:text-[#946B1E] hover:bg-[#E0B45C]/10 focus-visible:ring-[#E0B45C] hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "border border-white/35 text-white backdrop-blur-sm bg-white/5 hover:bg-white/15 hover:border-[#E0B45C] hover:text-[#F2D28B] focus-visible:ring-white/50",
    accent:
      "bg-gradient-to-r from-[#C89435] via-[#EBC878] to-[#C89435] hover:from-[#B88428] hover:via-[#E0B45C] hover:to-[#B88428] text-[#041B21] font-bold focus-visible:ring-[#E0B45C] shadow-[0_6px_20px_rgba(224,180,92,0.3)] hover:shadow-[0_10px_28px_rgba(224,180,92,0.45)] hover:-translate-y-0.5 active:translate-y-0",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm tracking-wide",
    lg: "px-8 py-4 text-base tracking-wide",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
