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
    title: "Moisture-Powered Keyboard",
    description: "Types only when room humidity exceeds 82%. Caps Lock is governed by dew point.",
  },
  {
    title: "Reverse PDF",
    description: "Converts any document back into a tree. Currently supports oak, birch, and mild panic.",
  },
  {
    title: "Git Blame, But Audible",
    description: "Every commit plays a tiny trumpet solo. Merge conflicts sound like two kazoos arguing.",
  },
  {
    title: "Cloud Toaster API",
    description: "REST endpoint that browns bread based on lunar phase. Webhook fires when the crust achieves enlightenment.",
  },
  {
    title: "Semicolon Insurance",
    description: "SaaS product that underwrites your JavaScript style choices. Premium tier covers optional chaining regret.",
  },
  {
    title: "Infinite Loading Spinner",
    description: "A performance art piece disguised as a UI component. Users report feeling productive anyway.",
  },
  {
    title: "Email for Pigeons",
    description: "SMTP over breadcrumbs. Delivery time: 3–14 business pigeons, weather permitting.",
  },
  {
    title: "404: Project Not Found",
    description: "This card is a placeholder wearing a fake mustache. The real project is hiding behind the couch.",
  },
  {
    title: "Quantum Snooze Button",
    description: "Alarm exists in superposition until observed. You are always late in at least one timeline.",
  },
] as const satisfies readonly ProjectListItem[];

/** Placeholders first, published projects at the end (newest last). */
export const projects = [...placeholderProjects, ...publishedProjects] as const satisfies readonly ProjectListItem[];

export function getProjectsForDisplay(): ProjectListItem[] {
  return [...projects].toReversed();
}

export const PROJECT_GALLERY_ROW_COUNT = 3;

/** Distributes projects round-robin into horizontal gallery rows. */
export function getProjectsGalleryRows(rowCount = PROJECT_GALLERY_ROW_COUNT): ProjectListItem[][] {
  const items = getProjectsForDisplay();
  const rows = Array.from({ length: rowCount }, () => [] as ProjectListItem[]);

  items.forEach((project, index) => {
    rows[index % rowCount].push(project);
  });

  return rows;
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

export function getProjectListItemClassName(project: ProjectListItem, extra?: string): string {
  const blur = isProjectBlurred(project) ? " blur-[3px] opacity-60" : "";
  return `space-y-0.5${extra ?? ""}${blur}`;
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
