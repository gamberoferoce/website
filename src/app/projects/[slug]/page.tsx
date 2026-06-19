import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/PageTitle";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { getProjectBySlug, publishedProjects } from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return createPageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-3 pt-16 md:pt-20">
        <PageTitle>{project.title}</PageTitle>
        <p className="text-[14px] text-muted-foreground">{project.description}</p>

        <article className="space-y-4 text-[14px] leading-6 text-foreground/80">
          {project.content.map((block, index) =>
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
