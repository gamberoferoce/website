import Link from "next/link";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { accentTextLinkClass, textLinkClass } from "@/lib/interactive";
import { getPostHref, posts } from "@/lib/posts";
export default function Home() {
  const latestPosts = posts.slice(0, 4);

  return (
    <SitePage>

      <a href="#content" className="sr-only focus:not-sr-only focus:underline">

        Skip to content ↓

      </a>



      <div id="content" className="space-y-12">

        <SiteNav />



        <header className="space-y-2 pt-16 md:pt-20">

          <div className="h-8 w-8 rounded-[6px] bg-gradient-to-br from-sky-400 to-blue-700 shadow-sm" />

          <div className="space-y-0.5">

            <h1 className="text-[22px] font-bold leading-tight">Giulia Fanasca</h1>

            <h2 className="text-[15px] leading-5 text-muted-foreground">Creative Technologist</h2>

          </div>

        </header>



        <section className="space-y-5 text-[14px] leading-6 text-foreground/80">

          <p>

            I&apos;m working at{" "}

            <a className={accentTextLinkClass} href="#">

              Trenda

            </a>{" "}

            as a senior fullstack developer, bringing over 15 years of experience building applications with{" "}

            <a className={accentTextLinkClass} href="#">

              PHP

            </a>

            ,{" "}

            <a className={accentTextLinkClass} href="#">

              Laravel

            </a>

            ,{" "}

            <a className={accentTextLinkClass} href="#">

              Livewire

            </a>

            ,{" "}

            <a className={accentTextLinkClass} href="#">

              Tailwind CSS

            </a>{" "}

            and{" "}

            <a className={accentTextLinkClass} href="#">

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

            <a className={accentTextLinkClass} href="#">

              solve problems

            </a>{" "}

            in my personal or professional projects, how I{" "}

            <a className={accentTextLinkClass} href="#">

              set up my favourite apps

            </a>{" "}

            or on how to apply minimalism to the digital world.

          </p>

        </section>



        <section className="space-y-3 pt-8">

          <h3 className="text-[13px] font-semibold text-foreground/90">Latest post</h3>

          <ul className="space-y-2 text-[14px] text-foreground/90">
            {latestPosts.map((post, index) => (
              <li
                key={`${post.date}-${post.title}`}
                className={`flex gap-3${index === 0 ? "" : " blur-[3px] opacity-60"}`}
              >
                <span className="w-[88px] shrink-0 tabular-nums text-muted-foreground">{post.date}</span>
                <Link className={textLinkClass} href={getPostHref(post)}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>

        </section>

      </div>

    </SitePage>

  );

}

