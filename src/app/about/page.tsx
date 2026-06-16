import { SiteNav } from "@/components/SiteNav";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[640px] px-6 pb-16 pt-6 md:pb-24 md:pt-8">
      <SiteNav />

      <div className="space-y-5 pt-16 md:pt-20">
        <h1 className="text-[13px] font-semibold leading-5 text-foreground/90">About</h1>
        <p className="text-[12px] leading-6 text-foreground/80">
          I&apos;m working at Trenda as a senior fullstack developer, bringing over 15 years of experience building
          applications with PHP, Laravel, Livewire, Tailwind CSS and Vue.js to help drive their product forward.
        </p>
        <p className="text-[12px] leading-6 text-foreground/80">
          I regularly contribute to the open source community by writing guides on how to automate tasks or by releasing
          PHP packages to solve a particular problem.
        </p>
      </div>
    </main>
  );
}

