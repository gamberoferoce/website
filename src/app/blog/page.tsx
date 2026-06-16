import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";

const posts = [
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
] as const;

export default function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-[640px] px-6 pb-16 pt-6 md:pb-24 md:pt-8">
      <SiteNav />

      <div className="space-y-3 pt-16 md:pt-20">
        <h1 className="text-[15px] font-semibold leading-5 text-foreground/90">Blog</h1>
        <ul className="space-y-2 text-[14px] text-foreground/90">
          {posts.map((post) => (
            <li key={`${post.date}-${post.title}`} className="flex gap-3">
              <span className="w-[72px] shrink-0 tabular-nums text-muted-foreground">{post.date}</span>
              <Link className="underline underline-offset-4" href="#">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
