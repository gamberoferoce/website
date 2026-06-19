import { getPostExcerpt, getPostIsoDate, publishedPosts } from "@/lib/posts";
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  absoluteUrl,
  getSiteUrl,
} from "@/lib/seo";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const posts = [...publishedPosts].toReversed();
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`);
      const description = escapeXml(getPostExcerpt(post));

      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${new Date(getPostIsoDate(post.date)).toUTCString()}</pubDate>
  <description>${description}</description>
</item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${getSiteUrl()}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <managingEditor>${SITE_EMAIL} (${escapeXml(SITE_NAME)})</managingEditor>
    <webMaster>${SITE_EMAIL} (${escapeXml(SITE_NAME)})</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
