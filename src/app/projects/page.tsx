import { PageTitle } from "@/components/PageTitle";
import { ProjectCard } from "@/components/ProjectCard";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { getProjectsForDisplay } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getProjectsForDisplay();

  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-5 pt-16 md:pt-20">
        <PageTitle>Projects</PageTitle>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ul>
      </div>
    </SitePage>
  );
}
