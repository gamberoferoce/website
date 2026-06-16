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
            Building interactive experiences through{" "}
            <a className={accentTextLinkClass} href="#">
              XR
            </a>
            ,{" "}
            <a className={accentTextLinkClass} href="#">
              real-time 3D
            </a>
            , and seamless{" "}
            <a className={accentTextLinkClass} href="#">
              interfaces
            </a>{" "}
            between{" "}
            <a className={accentTextLinkClass} href="#">
              physical
            </a>{" "}
            and{" "}
            <a className={accentTextLinkClass} href="#">
              digital world
            </a>
            .
          </p>
          <p>
            Here I share unfiltered thoughts on{" "}
            <a className={accentTextLinkClass} href="#">
              emerging technology
            </a>{" "}
            and{" "}
            <a className={accentTextLinkClass} href="#">
              HCI
            </a>
            ,{" "}
            <a className={accentTextLinkClass} href="#">
              projects
            </a>
            , and{" "}
            <a className={accentTextLinkClass} href="#">
              prototypes
            </a>
            .
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

