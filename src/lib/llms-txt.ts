import type { PostBlock } from "@/lib/posts";
import { getPostExcerpt, publishedPosts } from "@/lib/posts";
import { publishedProjects } from "@/lib/projects";
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_SOCIAL,
  SITE_TAGLINE,
  absoluteUrl,
  getSiteUrl,
} from "@/lib/seo";

function postBlocksToMarkdown(blocks: readonly PostBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "heading") {
        return `## ${block.text}`;
      }

      if (block.type === "lines") {
        return block.lines.join("\n");
      }

      return block.text;
    })
    .join("\n\n");
}

function linkLine(title: string, path: string, description: string): string {
  return `- [${title}](${absoluteUrl(path)}): ${description}`;
}

export function buildLlmsTxt(): string {
  const posts = [...publishedPosts].toReversed();

  const postLines = posts.map((post) =>
    linkLine(post.title, `/blog/${post.slug}`, getPostExcerpt(post)),
  );

  const projectLines = publishedProjects.map((project) =>
    linkLine(project.title, `/projects/${project.slug}`, project.description),
  );

  return `# ${SITE_NAME}

> ${SITE_TAGLINE}. ${SITE_DESCRIPTION}

## About this site

Personal portfolio and writing by ${SITE_NAME}. Topics include XR, real-time 3D, HCI, design metaphors, skeuomorphism, and interactive prototypes.

- Website: ${getSiteUrl()}
- Email: ${SITE_EMAIL}
- LinkedIn: ${SITE_SOCIAL.linkedin}
- Instagram: ${SITE_SOCIAL.instagram}

## Main pages

${linkLine("Home", "/", "Intro and latest blog posts.")}
${linkLine("Blog", "/blog", "Essays on emerging technology, HCI, and design.")}
${linkLine("Projects", "/projects", "Selected interactive and XR experiments.")}
${linkLine("About", "/about", "Background and bio.")}
${linkLine("Contact", "/contact", "Collaboration and project inquiries.")}

## Blog posts

${postLines.length > 0 ? postLines.join("\n") : "- No published posts yet."}

## Projects

${projectLines.length > 0 ? projectLines.join("\n") : "- Published project pages coming soon."}

## Machine-readable feeds

- [Sitemap](${absoluteUrl("/sitemap.xml")}): XML sitemap for crawlers
- [RSS feed](${absoluteUrl("/feed.xml")}): Latest blog posts
- [Full content index](${absoluteUrl("/llms-full.txt")}): Complete text of published articles for AI agents
`;
}

export function buildLlmsFullTxt(): string {
  const posts = [...publishedPosts].toReversed();

  const sections = posts.map((post) => {
    const body = postBlocksToMarkdown(post.content);

    return `# ${post.title}

URL: ${absoluteUrl(`/blog/${post.slug}`)}
Date: ${post.date}
Author: ${SITE_NAME}

${body}`;
  });

  const header = `# ${SITE_NAME} — Full content index

> Complete text of published pages for AI agents and LLM tools.
> Site: ${getSiteUrl()}
> Index: ${absoluteUrl("/llms.txt")}

`;

  if (sections.length === 0) {
    return `${header}\nNo published blog posts yet.\n`;
  }

  return `${header}\n---\n\n${sections.join("\n\n---\n\n")}\n`;
}

export const llmsTextHeaders = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "s-maxage=3600, stale-while-revalidate",
} as const;
