import type { Metadata } from "next";

export const SITE_NAME = "Giulia Fanasca";
export const SITE_TAGLINE = "Creative Technologist";
export const SITE_DESCRIPTION =
  "Building interactive experiences through XR, real-time 3D, and seamless interfaces between physical and digital worlds. Notes on emerging technology, HCI, and unfinished prototypes.";
export const SITE_LOCALE = "en";
export const SITE_EMAIL = "giuliafanasca@gmail.com";

export const SITE_SOCIAL = {
  instagram: "https://www.instagram.com/giuliafanasca/",
  linkedin: "https://www.linkedin.com/in/giulia-fanasca/",
} as const;

const DEFAULT_SITE_URL = "https://giuliafanasca.vercel.app";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  type = "website",
  publishedTime,
}: PageMetadataOptions): Metadata {
  const pageTitle = title ?? SITE_TAGLINE;
  const canonical = path.startsWith("/") ? path : `/${path}`;

  return {
    title: title ? pageTitle : { absolute: `${SITE_NAME} • ${SITE_TAGLINE}` },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: title ? `${pageTitle} • ${SITE_NAME}` : `${SITE_NAME} • ${SITE_TAGLINE}`,
      description,
      url: absoluteUrl(canonical),
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type,
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            authors: [SITE_NAME],
          }
        : {}),
    },
    twitter: {
      card: "summary",
      title: title ? `${pageTitle} • ${SITE_NAME}` : `${SITE_NAME} • ${SITE_TAGLINE}`,
      description,
    },
  };
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    ...createPageMetadata({ path: "/" }),
    title: {
      default: `${SITE_NAME} • ${SITE_TAGLINE}`,
      template: `%s • ${SITE_NAME}`,
    },
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: getSiteUrl() }],
    creator: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
  };
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: getSiteUrl(),
    inLanguage: SITE_LOCALE,
  };
}

export function createPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: SITE_TAGLINE,
    url: getSiteUrl(),
    email: SITE_EMAIL,
    sameAs: [SITE_SOCIAL.linkedin, SITE_SOCIAL.instagram],
  };
}

export function createBlogPostingSchema(post: {
  title: string;
  slug: string;
  datePublished: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    url: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: SITE_LOCALE,
  };
}

export function createBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description: "Essays on emerging technology, HCI, design metaphors, and interactive prototypes.",
    url: absoluteUrl("/blog"),
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    inLanguage: SITE_LOCALE,
  };
}
