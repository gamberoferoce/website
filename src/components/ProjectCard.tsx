import Image from "next/image";
import Link from "next/link";
import {
  getProjectCardClassName,
  getProjectHref,
  type ProjectListItem,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectListItem;
};

function ProjectCardBody({ project, linked = false }: ProjectCardProps & { linked?: boolean }) {
  return (
    <div className="space-y-2.5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 304px"
          />
        ) : (
          <div
            className="absolute inset-0 bg-[linear-gradient(145deg,color-mix(in_oklch,var(--muted)_88%,var(--foreground)_12%),color-mix(in_oklch,var(--background)_92%,var(--foreground)_8%))]"
            aria-hidden
          />
        )}
      </div>

      <div className="space-y-1">
        <h2
          className={cn(
            "text-[14px] leading-5 text-foreground/90",
            linked
              ? "underline underline-offset-4 transition-colors group-hover:no-underline group-hover:text-foreground"
              : "underline underline-offset-4",
          )}
        >
          {project.title}
        </h2>
        <p className="text-[13px] leading-5 text-muted-foreground">{project.description}</p>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const className = getProjectCardClassName(project);

  if (project.slug) {
    return (
      <li>
        <Link className={cn(className, "block")} href={getProjectHref(project)}>
          <ProjectCardBody linked project={project} />
        </Link>
      </li>
    );
  }

  return (
    <li className={className}>
      <ProjectCardBody project={project} />
    </li>
  );
}
