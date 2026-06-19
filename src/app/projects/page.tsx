import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { textLinkClass } from "@/lib/interactive";
import {
  getProjectHref,
  getProjectListItemClassName,
  getProjectsForDisplay,
} from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getProjectsForDisplay();

  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-3 pt-16 md:pt-20">
        <PageTitle>Projects</PageTitle>

        <ul className="space-y-2 text-[14px] text-foreground/90">
          {projects.map((project) => (
            <li key={project.title} className={getProjectListItemClassName(project)}>
              {project.slug ? (
                <Link className={textLinkClass} href={getProjectHref(project)}>
                  {project.title}
                </Link>
              ) : (
                <span className="underline underline-offset-4">{project.title}</span>
              )}
              <p className="text-muted-foreground">{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </SitePage>
  );
}
