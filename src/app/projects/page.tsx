import { ComingSoonMarquee } from "@/components/ComingSoonMarquee";
import { PageTitle } from "@/components/PageTitle";
import { ProjectCard } from "@/components/ProjectCard";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { getProjectsForDisplay } from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Selected projects and experiments in XR, real-time 3D, and interactive interfaces by Giulia Fanasca.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjectsForDisplay();

  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-5 pt-16 md:pt-20">
        <PageTitle>Projects</PageTitle>

        <div className="relative">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </ul>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[min(520px,75vh)] md:h-[640px]">
            <ComingSoonMarquee />
          </div>
        </div>
      </div>
    </SitePage>
  );
}
