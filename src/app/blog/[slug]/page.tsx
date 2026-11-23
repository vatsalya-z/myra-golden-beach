import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { blogPosts } from "@/data/blogPosts";
import { formatDate } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";
import { RelatedPages } from "@/components/common/RelatedPages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return genMeta({
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const schema = generateBlogPostSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);

  const related = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Full-width Hero Section */}
      <section className="relative w-full h-80 sm:h-96 md:h-[440px] lg:h-[480px] overflow-hidden flex items-center justify-center" aria-label={post.title}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover w-full h-full"
          sizes="100vw"
        />
        {/* Flat solid overlay — no gradient */}
        <div className="absolute inset-0 bg-[#123B2A]/65" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
            light
          />
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight max-w-3xl text-center">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-white/80 text-xs sm:text-sm">
            <span className="text-[#C8A45D] font-semibold">{post.category}</span>
            <span>·</span>
            <span>{post.readingTime} min read</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-14 md:py-20 bg-[#FAF7F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <article className="bg-white rounded-2xl shadow-sm border border-[#EFE7D8] p-6 md:p-12">
              <p className="text-[#74766F] text-lg leading-relaxed mb-6 font-medium border-l-4 border-[#C8A45D] pl-5 italic">
                {post.excerpt}
              </p>

              {/* Render markdown-like content */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-playfair prose-headings:text-[#123B2A]
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-p:text-[#74766F] prose-p:leading-relaxed
                  prose-strong:text-[#123B2A]
                  prose-a:text-[#C8A45D] prose-a:no-underline hover:prose-a:underline"
              >
                {post.content.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) {
                    return (
                      <h2 key={i} className="font-playfair text-2xl font-bold text-[#123B2A] mt-10 mb-4">
                        {line.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={i} className="font-semibold text-[#123B2A] mb-2">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    );
                  }
                  if (line.trim() === "") return null;
                  return (
                    <p key={i} className="text-[#74766F] leading-relaxed mb-4">
                      {line}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-[#EFE7D8]">
                <span className="text-xs font-semibold text-[#123B2A] uppercase tracking-wider">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#FAF7F0] text-[#74766F] px-3 py-1 rounded-full border border-[#EFE7D8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Back link */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[#C8A45D] text-sm font-semibold hover:underline"
              >
                &larr; Back to Travel Journal
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-14 md:py-20 bg-[#F0E9DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#123B2A] mb-8 text-center">
              More Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="h-full flex flex-col justify-between group bg-white hover:bg-[#FAF7F0] border border-[#EFE7D8] hover:border-[#C8A45D]/40 rounded-xl p-5 transition-all shadow-sm hover:shadow-md"
                >
                  <div>
                    <span className="text-[#C8A45D] text-xs font-semibold tracking-wider uppercase">
                      {p.category}
                    </span>
                    <h3 className="font-playfair text-lg font-bold text-[#123B2A] mt-2 mb-2 group-hover:text-[#C8A45D] transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-[#74766F] text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Pages Silo */}
      <RelatedPages currentPath="/blog" />

      {/* CTA */}
      <section className="py-14 md:py-20 bg-[#FAF7F0] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Plan Your Visit"
            title="Planning a Coastal Stay?"
            subtitle="Contact MYRA Golden Beach Resort to check availability and start planning your visit to the Andhra Pradesh coast."
            align="center"
          />
          <div className="flex justify-center items-center mt-8 w-full">
            <Button href="/contact" variant="primary" size="lg" className="min-w-[200px]">
              Enquire Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
