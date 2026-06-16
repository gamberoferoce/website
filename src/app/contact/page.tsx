import { ContactForm } from "@/components/ContactForm";
import { PageTitle } from "@/components/PageTitle";
import { SitePage } from "@/components/SitePage";
import { SiteNav } from "@/components/SiteNav";

export default function ContactPage() {
  return (
    <SitePage>
      <SiteNav />

      <div className="space-y-3 pt-16 md:pt-20">
        <div className="space-y-0.5">
          <PageTitle>Contact</PageTitle>
          <p className="text-[15px] leading-5 text-muted-foreground">
            I would love to collaborate. Let&apos;s talk.
          </p>
        </div>
        <ContactForm />
      </div>
    </SitePage>
  );
}
