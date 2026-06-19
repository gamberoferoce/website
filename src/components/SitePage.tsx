import type { ReactNode } from "react";
import { SiteCanvas } from "@/components/SiteCanvas";
import { SiteFooter } from "@/components/SiteFooter";

type SitePageProps = {
  children: ReactNode;
};

export function SitePage({ children }: SitePageProps) {
  return (
    <SiteCanvas>
      <main className="flex min-h-screen w-full flex-col px-4 pb-8 pt-6 sm:px-6 md:pb-10 md:pt-8">
        <div className="flex-1 pb-14 md:pb-16">{children}</div>
        <SiteFooter />
      </main>
    </SiteCanvas>
  );
}
