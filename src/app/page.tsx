import Link from "next/link";
import { LatestPostLink } from "@/components/LatestPostLink";
import { PageTitle } from "@/components/PageTitle";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { accentTextLinkClass, textLinkClass } from "@/lib/interactive";
import { getLatestPosts, getPostHref, getPostListItemClassName } from "@/lib/posts";
export default function Home() {
  const latestPosts = getLatestPosts(4);

  return (
    <SitePage>

      <a href="#content" className="sr-only focus:not-sr-only focus:underline">

        Skip to content ↓

      </a>



      <div id="content">
        <SiteNav />

        <div className="space-y-12">
          <header className="pt-16 md:pt-20">
            <div className="relative">
              <div className="avatar-placeholder absolute bottom-full left-0 mb-2 h-8 w-8 rounded-[6px] shadow-sm" />

              <div className="space-y-0.5">
                <PageTitle>Giulia Fanasca</PageTitle>
                <p className="text-[15px] leading-5 text-muted-foreground">Creative Technologist</p>
              </div>
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
            This space is a notebook for my unfiltered thoughts on{" "}
            <a className={accentTextLinkClass} href="#">
              emerging technology
            </a>
            ,{" "}
            <a className={accentTextLinkClass} href="#">
              HCI
            </a>
            ,{" "}
            <a className={accentTextLinkClass} href="#">
              projects
            </a>
            , and a graveyard of{" "}
            <a className={accentTextLinkClass} href="#">
              unfinished prototypes
            </a>{" "}
            ;)
          </p>
        </section>



        <section className="space-y-3">

          <h3 className="text-[15px] font-semibold leading-5 text-foreground/90">Latest post</h3>

          <ul className="space-y-2 text-[14px] text-foreground/90">
            {latestPosts.map((post, index) => (
              <li key={`${post.date}-${post.title}`} className={getPostListItemClassName(post)}>
                <span className="w-[88px] shrink-0 tabular-nums text-muted-foreground">{post.date}</span>
                {index === 0 && "slug" in post && post.slug ? (
                  <LatestPostLink href={getPostHref(post)} slug={post.slug}>
                    {post.title}
                  </LatestPostLink>
                ) : (
                  <Link className={textLinkClass} href={getPostHref(post)}>
                    {post.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

        </section>
        </div>
      </div>

    </SitePage>

  );

}

