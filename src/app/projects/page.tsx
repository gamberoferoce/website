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
    <main className="mx-auto w-full max-w-[640px] px-6 pb-16 pt-6 md:pb-24 md:pt-8">
      <SiteNav />

      <div className="space-y-4 pt-16 md:pt-20">
        <h1 className="text-[13px] font-semibold leading-5 text-foreground/90">Projects</h1>
        <div className="space-y-6">
          {projects.map((p) => (
            <div key={p.name} className="space-y-1">
              <h2 className="text-[12px] font-semibold text-foreground/90">{p.name}</h2>
              <p className="text-[12px] leading-6 text-foreground/80">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

