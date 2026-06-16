import { ComingSoonMarquee } from "@/components/ComingSoonMarquee";
import { PageTitle } from "@/components/PageTitle";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";

const projects = [
  {
    name: "laravel-tfa-confirmation",
    description: "Protect sensitive routes or actions with a two-factor challenge",
  },
  {
    name: "laravel-backup-restore",
    description: "A package to restore database backups made with spatie/laravel-backup.",
  },
  {
    name: "git-auto-commit-action",
    description: "GitHub Action to automatically commit changed files back to the repository.",
  },
  {
    name: "sidecar-browsershot",
    description: "A Sidecar function to run Laravel Browsershot / Puppeteer on AWS Lambda.",
  },
  {
    name: "changelog-updater-action",
    description: 'A GitHub Action to automatically update a "Keep a Changelog" CHANGELOG with the latest release notes.',
  },
  {
    name: "commonmark-markdown-renderer",
    description: "PHP package to render a league/commonmark AST back to Markdown.",
  },
  {
    name: "laravel-sends",
    description: "Laravel package to keep track of outgoing emails and associate sent emails with Eloquent models.",
  },
  {
    name: "3.screeenly.com",
    description: "Software to create screenshots or PDFs from websites or your own HTML code. It's the successor of screeenly.com.",
  },
  {
    name: "laravel-stats",
    description: "Artisan command to get insights about a Laravel Project.",
  },
] as const;

export default function ProjectsPage() {
  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-3 pt-16 md:pt-20">
        <PageTitle>Projects</PageTitle>

        <div className="relative min-h-[520px] md:min-h-[640px]">
          <ul className="space-y-2 text-[14px] text-foreground/90 blur-[3px] opacity-60">
            {projects.map((project) => (
              <li key={project.name} className="space-y-0.5">
                <span className="underline underline-offset-4">{project.name}</span>
                <p className="text-muted-foreground">{project.description}</p>
              </li>
            ))}
          </ul>

          <ComingSoonMarquee />
        </div>
      </div>
    </SitePage>
  );
}
