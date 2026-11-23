import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";

interface RelatedArticlesProps {
  articles: BlogPost[];
  title?: string;
}

export function RelatedArticles({
  articles,
  title = "Related Travel Articles",
}: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-[#F0E9DC] border-t border-[#EFE7D8]" aria-label="Related articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-10 sm:mb-12">
          <span className="text-[#C8A45D] text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
            Read More
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#123B2A]">
            {title}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((post, idx) => (
            <FadeIn key={post.id} delay={idx * 0.1} className="h-full">
              <article className="h-full flex flex-col justify-between group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#EFE7D8]">
                <Link href={`/blog/${post.slug}`} className="flex-1 flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#74766F] mb-2">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                      <h3 className="font-playfair text-lg font-bold text-[#123B2A] group-hover:text-[#C8A45D] transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[#74766F] text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#EFE7D8]/60 flex items-center text-xs font-semibold text-[#C8A45D]">
                      Read Article &rarr;
                    </div>
                  </div>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
