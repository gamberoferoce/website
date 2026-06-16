import { ContactForm } from "@/components/ContactForm";
import { PageTitle } from "@/components/PageTitle";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";

export default function ContactPage() {
  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-6 pt-16 md:pt-20">
        <PageTitle>Contact</PageTitle>
        <ContactForm />
      </div>
    </SitePage>
  );
}
