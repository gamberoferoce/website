import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";

type SitePageProps = {
  children: ReactNode;
};

export function SitePage({ children }: SitePageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[640px] flex-col px-6 pb-8 pt-6 md:pb-10 md:pt-8">
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </main>
  );
}
