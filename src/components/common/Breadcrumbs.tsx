import Link from "next/link";
import { HiChevronRight, HiHome } from "react-icons/hi2";
import { generateBreadcrumbSchema } from "@/lib/schema";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  const schema = generateBreadcrumbSchema(
    allItems.map((item) => ({ name: item.label, href: item.href }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center flex-wrap gap-1 text-xs sm:text-sm ${
          light ? "text-white/70" : "text-[#74766F]"
        }`}
      >
        {allItems.map((item, idx) => (
          <span key={item.href} className="flex items-center gap-1">
            {idx === 0 && (
              <HiHome
                size={14}
                className={light ? "text-white/50" : "text-[#74766F]"}
              />
            )}
            {idx < allItems.length - 1 ? (
              <>
                <Link
                  href={item.href}
                  className={`hover:text-[#C8A45D] transition-colors ${
                    light ? "text-white/70" : "text-[#74766F]"
                  }`}
                >
                  {item.label}
                </Link>
                <HiChevronRight size={12} className="opacity-50" />
              </>
            ) : (
              <span
                className={`font-medium ${
                  light ? "text-[#C8A45D]" : "text-[#C8A45D]"
                }`}
              >
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
