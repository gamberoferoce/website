export type ProjectListItem = {
  slug?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  /** When set, overrides the default blur rule (no slug = placeholder). */
  blurred?: boolean;
};

export type ProjectBlock =
  | { type: "paragraph"; text: string }
  | { type: "lines"; lines: readonly string[] }
  | { type: "heading"; text: string };

export type PublishedProject = ProjectListItem & {
  slug: string;
  content: readonly ProjectBlock[];
};

export const publishedProjects: readonly PublishedProject[] = [];

const placeholderProjects = [
  {
    title: "laravel-tfa-confirmation",
    description: "Protect sensitive routes or actions with a two-factor challenge",
  },
  {
    title: "laravel-backup-restore",
    description: "A package to restore database backups made with spatie/laravel-backup.",
  },
  {
    title: "git-auto-commit-action",
    description: "GitHub Action to automatically commit changed files back to the repository.",
  },
  {
    title: "sidecar-browsershot",
    description: "A Sidecar function to run Laravel Browsershot / Puppeteer on AWS Lambda.",
  },
  {
    title: "changelog-updater-action",
    description:
      'A GitHub Action to automatically update a "Keep a Changelog" CHANGELOG with the latest release notes.',
  },
  {
    title: "commonmark-markdown-renderer",
    description: "PHP package to render a league/commonmark AST back to Markdown.",
  },
  {
    title: "laravel-sends",
    description:
      "Laravel package to keep track of outgoing emails and associate sent emails with Eloquent models.",
  },
  {
    title: "3.screeenly.com",
    description:
      "Software to create screenshots or PDFs from websites or your own HTML code. It's the successor of screeenly.com.",
  },
  {
    title: "laravel-stats",
    description: "Artisan command to get insights about a Laravel Project.",
  },
] as const satisfies readonly ProjectListItem[];

/** Placeholders first, published projects at the end (newest last). */
export const projects = [...placeholderProjects, ...publishedProjects] as const satisfies readonly ProjectListItem[];

export function getProjectsForDisplay(): ProjectListItem[] {
  return [...projects].toReversed();
}

/** Toggle off while designing the projects layout. */
const PROJECT_BLUR_ENABLED = false;

/** Placeholders without a slug stay blurred unless `blurred` is set explicitly. */
export function isProjectBlurred(project: ProjectListItem): boolean {
  if (!PROJECT_BLUR_ENABLED) {
    return false;
  }
  if (project.blurred !== undefined) {
    return project.blurred;
  }
  return !project.slug;
}

export function getProjectCardClassName(project: ProjectListItem, extra?: string): string {
  const blur = isProjectBlurred(project) ? " blur-[3px] opacity-60" : "";
  return `group${extra ?? ""}${blur}`;
}

export function getProjectBySlug(slug: string): PublishedProject | undefined {
  return publishedProjects.find((project) => project.slug === slug);
}

export function getProjectHref(project: ProjectListItem): string {
  return project.slug ? `/projects/${project.slug}` : "#";
}
