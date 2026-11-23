import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { blogPosts } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly" as const, priority: 1.0, lastModified: now },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/rooms`, changeFrequency: "monthly" as const, priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/gallery`, changeFrequency: "monthly" as const, priority: 0.7, lastModified: now },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly" as const, priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.9, lastModified: now },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: new Date(post.updatedAt || post.publishedAt),
  }));

  return [...staticPages, ...blogPages];
}
