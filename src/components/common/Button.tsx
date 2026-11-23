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
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed rounded-md";

  const variants = {
    primary:
      "luxury-btn-sheen bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] font-bold focus-visible:ring-[#F6C46A] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-[#063B49] hover:bg-[#0B7285] text-white border border-[#F6C46A]/35 hover:border-[#F6C46A] focus-visible:ring-[#063B49] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "bg-transparent border-2 border-[#063B49] text-[#063B49] hover:border-[#0B7285] hover:bg-[#E8F6F7] hover:text-[#082B38] focus-visible:ring-[#0B7285] hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent border border-white/40 text-white hover:bg-white/10 hover:border-[#F6C46A] hover:text-[#F6C46A] focus-visible:ring-white/50",
    accent:
      "luxury-btn-sheen bg-[#F6C46A] hover:bg-[#DCA94F] text-[#082B38] font-bold focus-visible:ring-[#F6C46A] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
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
