import { PageTitle } from "@/components/PageTitle";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "About Giulia Fanasca — creative technologist building interactive experiences through XR, real-time 3D, and HCI.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-5 pt-16 md:pt-20">
        <PageTitle>About</PageTitle>
        <p className="text-[14px] leading-6 text-foreground/80">
          I&apos;m working at Trenda as a senior fullstack developer, bringing over 15 years of experience building
          applications with PHP, Laravel, Livewire, Tailwind CSS and Vue.js to help drive their product forward.
        </p>
        <p className="text-[14px] leading-6 text-foreground/80">
          I regularly contribute to the open source community by writing guides on how to automate tasks or by releasing
          PHP packages to solve a particular problem.
        </p>
      </div>
    </SitePage>
  );
}
