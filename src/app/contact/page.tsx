import { ContactForm } from "@/components/ContactForm";
import { SiteNav } from "@/components/SiteNav";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[640px] px-6 pb-16 pt-6 md:pb-24 md:pt-8">
      <SiteNav />

      <div className="pt-16 md:pt-20">
        <ContactForm />
      </div>
    </main>
  );
}
