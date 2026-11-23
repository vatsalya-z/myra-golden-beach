import Link from "next/link";
import { pageRelatedLinks } from "@/lib/seo/internalLinks";
import { FadeIn } from "@/components/animations/FadeIn";

interface RelatedPagesProps {
  currentPath: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function RelatedPages({
  currentPath,
  title = "Explore More of MYRA Golden Beach Resort",
  subtitle = "Discover our rooms, amenities, photo gallery, and travel advice for your coastal stay in Andhra Pradesh.",
  className = "",
}: RelatedPagesProps) {
  const links = pageRelatedLinks[currentPath] || pageRelatedLinks["/"] || [];

  if (links.length === 0) return null;

  return (
    <section className={`py-12 sm:py-16 bg-[#E8F6F7] border-t border-[#D9EEF2] ${className}`} aria-labelledby="related-pages-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#F6C46A] text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
            Discover
          </span>
          <h2 id="related-pages-heading" className="font-playfair text-2xl sm:text-3xl font-bold text-[#063B49]">
            {title}
          </h2>
          <p className="text-[#607780] text-xs sm:text-sm mt-2">
            {subtitle}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {links.slice(0, 3).map((item, idx) => (
            <FadeIn key={item.href} delay={idx * 0.08}>
              <Link
                href={item.href}
                className="group flex flex-col justify-between h-full bg-white p-5 sm:p-6 rounded-xl border border-[#D9EEF2] shadow-sm hover:shadow-md hover:border-[#F6C46A]/40 transition-all duration-300"
              >
                <div>
                  {item.badge && (
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#0B7285] bg-[#F6C46A]/15 px-2 py-0.5 rounded mb-3">
                      {item.badge}
                    </span>
                  )}
                  <h3 className="font-playfair text-lg font-bold text-[#063B49] group-hover:text-[#F6C46A] transition-colors mb-1.5">
                    {item.label}
                  </h3>
                  <p className="text-[#607780] text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D9EEF2]/60 flex items-center text-xs font-semibold text-[#063B49] group-hover:text-[#F6C46A] transition-colors">
                  <span>Explore</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
