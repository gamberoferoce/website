"use client";

import { InstagramIcon, LinkedInIcon } from "@/components/SocialIcons";
import { iconLinkClass, textLinkClass } from "@/lib/interactive";
import { trackUmamiEvent } from "@/lib/umami";

const socialLinks = {
  instagram: "https://www.instagram.com/giuliafanasca/",
  linkedin: "https://www.linkedin.com/in/giulia-fanasca/",
} as const;

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-2 pt-6 text-[15px] font-normal leading-5 text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
      <p>© 2026 Giulia Fanasca</p>

      <div className="space-y-1 sm:text-right">
        <p>
          <a
            className={textLinkClass}
            href="mailto:giuliafanasca@gmail.com"
            onClick={() => trackUmamiEvent("click-email")}
          >
            giuliafanasca@gmail.com
          </a>
        </p>
        <p>
          <a className={textLinkClass} href="tel:+393913845692">
            +39 391 384 5692
          </a>
        </p>
        <div className="flex gap-3.5 pt-1 sm:justify-end">
          <a
            aria-label="Instagram"
            className={iconLinkClass}
            href={socialLinks.instagram}
            onClick={() => trackUmamiEvent("click-instagram")}
            rel="noopener noreferrer"
            target="_blank"
          >
            <InstagramIcon className="h-[15px] w-[15px]" />
          </a>
          <a
            aria-label="LinkedIn"
            className={iconLinkClass}
            href={socialLinks.linkedin}
            onClick={() => trackUmamiEvent("click-linkedin")}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedInIcon className="h-[15px] w-[15px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
