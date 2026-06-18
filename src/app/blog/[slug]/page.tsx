import { notFound } from "next/navigation";
import { PageTitle } from "@/components/PageTitle";
import { PostEngagementTracker } from "@/components/PostEngagementTracker";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { getPostBySlug, publishedPosts } from "@/lib/posts";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SitePage>
      <PostEngagementTracker slug={slug} />
      <SiteNav />

      <div className="space-y-3 pt-16 md:pt-20">
        <PageTitle>{post.title}</PageTitle>
        <p className="text-[14px] tabular-nums text-muted-foreground">{post.date}</p>

        <article className="space-y-4 text-[14px] leading-6 text-foreground/80">
          {post.content.map((block, index) =>
            block.type === "heading" ? (
              <h2 key={index} className="text-[15px] font-semibold leading-5 text-foreground/90">
                {block.text}
              </h2>
            ) : block.type === "lines" ? (
              <p key={index}>
                {block.lines.map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex === block.lines.length - 1 ? null : <br />}
                  </span>
                ))}
              </p>
            ) : (
              <p key={index}>{block.text}</p>
            ),
          )}
        </article>
      </div>
    </SitePage>
  );
}
