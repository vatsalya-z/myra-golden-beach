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
      "bg-[#C8A45D] hover:bg-[#B38E46] text-[#123B2A] font-bold focus-visible:ring-[#C8A45D] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-[#123B2A] hover:bg-[#C8A45D] text-white hover:text-[#123B2A] border border-[#C8A45D]/30 focus-visible:ring-[#123B2A] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "border-2 border-[#123B2A] text-[#123B2A] hover:border-[#C8A45D] hover:text-[#C8A45D] hover:bg-transparent focus-visible:ring-[#C8A45D] hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "border border-white/30 text-white hover:bg-white/10 hover:border-[#C8A45D] hover:text-[#C8A45D] focus-visible:ring-white/50",
    accent:
      "bg-[#C8A45D] hover:bg-[#B38E46] text-[#123B2A] font-bold focus-visible:ring-[#C8A45D] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
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
