import { ComingSoonMarquee } from "@/components/ComingSoonMarquee";
import { SiteNav } from "@/components/SiteNav";

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[640px] px-6 pb-16 pt-6 md:pb-24 md:pt-8">
      <SiteNav />

      <div className="relative min-h-[520px] pt-16 md:min-h-[640px] md:pt-20">
        <ComingSoonMarquee />
      </div>
    </main>
  );
}
