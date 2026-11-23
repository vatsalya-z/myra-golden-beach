import { cn } from "@/lib/utils";

interface SectionCTAProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionCTA({ children, className }: SectionCTAProps) {
  return (
    <div
      className={cn(
        "section-cta flex justify-center items-center flex-wrap gap-4 mt-8 w-full text-center",
        className
      )}
    >
      {children}
    </div>
  );
}
