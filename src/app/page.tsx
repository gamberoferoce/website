import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  const selectedWriting = [
    { date: "08/2024", title: "Deployer: Build and Cache Frontend Assets once using GitHub Actions" },
    { date: "03/2024", title: "Meal Planning in Things 3" },
    { date: "09/2023", title: "An Opinionated Personal Folder Structure" },
    { date: "12/2022", title: "My updated Things 3 Setup" },
    { date: "05/2021", title: "Deployer on GitHub Actions" },
    { date: "04/2021", title: "Auto Merge Dependabot Pull Requests with GitHub Actions" },
    { date: "02/2021", title: "My Alfred Setup" },
    { date: "12/2020", title: "Getting Started with Bash Testing with Bats" },
    { date: "08/2020", title: "Synology NAS Setup (2020)" },
    { date: "12/2019", title: "Things 3 Setup" },
    { date: "06/2019", title: "GitHub Actions for PHP Developers (HCL)" },
    { date: "12/2018", title: "Create Mocks for API Clients in Laravel" },
    { date: "10/2018", title: "How to Encrypt File Uploads with Laravel" },
    { date: "02/2018", title: "How to use Tailwind CSS in Vue together with CSS Modules" },
    { date: "12/2016", title: "How I write Integration Tests for Laravel Socialite powered Apps" },
  ];

  const selectedProjects = [
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
  ];

  return (
    <main className="mx-auto w-full max-w-[640px] px-6 pb-16 pt-6 md:pb-24 md:pt-8">
      <a href="#content" className="sr-only focus:not-sr-only focus:underline">
        Skip to content ↓
      </a>

      <div id="content" className="space-y-12">
        <SiteNav />

        <header className="space-y-2 pt-16 md:pt-20">
          <div className="h-8 w-8 rounded-[6px] bg-gradient-to-br from-sky-400 to-blue-700 shadow-sm" />
          <div className="space-y-0.5">
            <h1 className="text-[15px] font-bold leading-5">Giulia Fanasca</h1>
            <h2 className="text-[13px] leading-5 text-muted-foreground">Creative Technologist</h2>
          </div>
        </header>

        <section className="space-y-5 text-[12px] leading-6 text-foreground/80">
          <p>
            I&apos;m working at{" "}
            <a className="text-blue-600 underline underline-offset-4" href="#">
              Trenda
            </a>{" "}
            as a senior fullstack developer, bringing over 15 years of experience building applications with{" "}
            <a className="text-blue-600 underline underline-offset-4" href="#">
              PHP
            </a>
            ,{" "}
            <a className="text-blue-600 underline underline-offset-4" href="#">
              Laravel
            </a>
            ,{" "}
            <a className="text-blue-600 underline underline-offset-4" href="#">
              Livewire
            </a>
            ,{" "}
            <a className="text-blue-600 underline underline-offset-4" href="#">
              Tailwind CSS
            </a>{" "}
            and{" "}
            <a className="text-blue-600 underline underline-offset-4" href="#">
              Vue.js
            </a>{" "}
            to help drive their product forward.
          </p>
          <p>
            I regularly contribute to the open source community by writing guides on how to automate tasks or by
            releasing PHP packages to solve a particular problem.
          </p>
          <p>
            On this personal website I write about how I{" "}
            <a className="text-blue-600 underline underline-offset-4" href="#">
              solve problems
            </a>{" "}
            in my personal or professional projects, how I{" "}
            <a className="text-blue-600 underline underline-offset-4" href="#">
              set up my favourite apps
            </a>{" "}
            or on how to apply minimalism to the digital world.
          </p>
        </section>

        <section className="space-y-3 pt-8">
          <h3 className="text-[11px] font-semibold text-foreground/90">Selected Writing</h3>
          <ul className="space-y-2 text-[12px] text-foreground/90">
            {selectedWriting.map((item) => (
              <li key={`${item.date}-${item.title}`} className="flex gap-3">
                <span className="w-[72px] shrink-0 tabular-nums text-muted-foreground">{item.date}</span>
                <a className="underline underline-offset-4" href="#">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 pt-10">
          <h3 className="text-[11px] font-semibold text-foreground/90">Selected Projects</h3>
          <div className="space-y-6">
            {selectedProjects.map((p) => (
              <div key={p.name} className="space-y-1">
                <h4 className="text-[12px] font-semibold text-foreground/90">{p.name}</h4>
                <p className="text-[12px] leading-6 text-foreground/80">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-6 text-[13px] text-muted-foreground">
          © 2012 - 2026 Giulia Fanasca
        </footer>
      </div>
    </main>
  );
}
