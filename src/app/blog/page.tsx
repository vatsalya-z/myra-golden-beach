import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { blogPosts } from "@/data/blogPosts";
import { formatDate } from "@/lib/utils";
import { RelatedPages } from "@/components/common/RelatedPages";

export const metadata: Metadata = generateMetadata({
  title: "Travel Blog | MYRA Golden Beach Resort",
  description:
    "Explore travel guides, beach holiday ideas, local attractions and useful information for planning a coastal getaway in Chirala and Andhra Pradesh.",
  path: "/blog",
  keywords: [
    "Chirala beach travel guide",
    "andhra pradesh beach holidays blog",
    "places to visit near chirala",
    "vodarevu beach travel tips",
    "coastal vacation andhra pradesh",
    "weekend trip to chirala",
  ],
});

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured || p.id !== featured?.id);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ]);
  const webPageSchema = generateWebPageSchema({
    title: "Travel Blog | MYRA Golden Beach Resort",
    description:
      "Explore travel guides, beach holiday ideas, local attractions and useful information for planning a coastal getaway in Chirala and Andhra Pradesh.",
    path: "/blog",
    image: "/images/blog/coastal-beauty-chirala.jpg",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* Full-width Hero Section */}
      <section className="relative w-full h-80 sm:h-96 md:h-[440px] lg:h-[480px] overflow-hidden flex items-center justify-center" aria-label="Blog page hero">
        <Image
          src="/images/blog/coastal-beauty-chirala.jpg"
          alt="Blog — MYRA Golden Beach Resort"
          fill
          priority
          className="object-cover w-full h-full"
          sizes="100vw"
        />
        {/* Flat solid overlay — no gradient */}
        <div className="absolute inset-0 bg-[#123B2A]/65" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} light />
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 text-center leading-tight">
            Travel Journal
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mt-3.5 max-w-2xl text-center leading-relaxed">
            Stories, guides and coastal inspiration from MYRA Golden
          </p>
        </div>
      </section>

      {/* Blog content */}
      <section className="py-16 md:py-24 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Latest Articles"
              title="Coastal Stories & Travel Guides"
            />
          </FadeIn>

          {/* Featured post */}
          {featured && (
            <FadeIn delay={0.1}>
              <article className="mt-12 group">
                <Link href={`/blog/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="relative h-72 lg:h-auto min-h-72">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="bg-[#123B2A] p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-[#C8A45D] text-xs font-semibold tracking-widest uppercase mb-3">
                      Featured · {featured.category}
                    </span>
                    <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-white/50 text-xs mb-6">
                      <span>{featured.readingTime} min read</span>
                      <span>·</span>
                      <span>{formatDate(featured.publishedAt)}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[#C8A45D] text-sm font-semibold group/arrow">
                      Read Article &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            </FadeIn>
          )}

          {/* Other posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
            {rest.map((post, idx) => (
              <FadeIn key={post.id} delay={idx * 0.1} className="h-full">
                <article className="h-full flex flex-col justify-between group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 border border-[#EFE7D8]">
                  <Link href={`/blog/${post.slug}`} className="h-full flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 sm:h-52 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-xs text-[#74766F] mb-2.5">
                          <span className="text-[#C8A45D] font-semibold">{post.category}</span>
                          <span>·</span>
                          <span>{post.readingTime} min read</span>
                        </div>
                        <h2 className="font-playfair text-xl font-bold text-[#123B2A] mb-2.5 leading-snug group-hover:text-[#C8A45D] transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-[#74766F] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex items-center gap-1.5 text-[#C8A45D] text-xs font-semibold">
                      Read More &rarr;
                    </div>
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>

          {/* Centered CTA */}
          <div className="flex justify-center items-center mt-14 w-full">
            <Button href="/contact" variant="primary" size="lg" className="min-w-[200px]">
              Plan Your Beach Stay
            </Button>
          </div>
        </div>
      </section>

      {/* Related Pages Silo */}
      <RelatedPages currentPath="/blog" />
    </>
  );
}
