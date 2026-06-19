import type { MetadataRoute } from "next";
import { getPostIsoDate, publishedPosts } from "@/lib/posts";
import { publishedProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const postEntries = publishedPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: getPostIsoDate(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectEntries = publishedProjects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...postEntries, ...projectEntries];
}
