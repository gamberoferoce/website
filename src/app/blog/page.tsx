import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { textLinkClass } from "@/lib/interactive";
import { getPostHref, posts } from "@/lib/posts";
export default function BlogPage() {
  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-3 pt-16 md:pt-20">
        <PageTitle>Blog</PageTitle>
        <ul className="space-y-2 overflow-visible text-[14px] text-foreground/90">
          {posts.map((post, index) => (
            <li
              key={`${post.date}-${post.title}`}
              className={`flex gap-3${index === 0 ? " relative" : " blur-[3px] opacity-60"}`}
            >
              {index === 0 ? (
                <span className="absolute top-0 right-full mr-3 shrink-0 font-bold uppercase">NEW</span>
              ) : null}
              <span className="w-[88px] shrink-0 tabular-nums text-muted-foreground">{post.date}</span>
              <Link className={textLinkClass} href={getPostHref(post)}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SitePage>
  );
}
