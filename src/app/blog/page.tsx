import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { textLinkClass } from "@/lib/interactive";
import { getPostHref, getPostsForDisplay, getPostListItemClassName } from "@/lib/posts";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Essays and notes on emerging technology, HCI, design metaphors, skeuomorphism, and interactive prototypes.",
  path: "/blog",
});
export default function BlogPage() {
  const posts = getPostsForDisplay();
  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-3 pt-16 md:pt-20">
        <PageTitle>Blog</PageTitle>
        <ul className="space-y-2 overflow-visible text-[14px] text-foreground/90">
          {posts.map((post, index) => (
            <li
              key={`${post.date}-${post.title}`}
              className={getPostListItemClassName(post, index === 0 ? " relative" : "")}
            >
              {index === 0 ? (
                <span className="shrink-0 font-bold uppercase sm:absolute sm:top-0 sm:right-full sm:mr-3">NEW</span>
              ) : null}
              <span className="w-[88px] shrink-0 tabular-nums text-muted-foreground">{post.date}</span>
              <Link className={`${textLinkClass} min-w-0 break-words`} href={getPostHref(post)}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SitePage>
  );
}
