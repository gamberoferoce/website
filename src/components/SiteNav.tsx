"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactNavLink } from "@/components/ContactNavLink";
import { LightPullCord } from "@/components/LightPullCord";
import { headerNavLinkActiveClass, headerNavLinkClass } from "@/lib/interactive";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
] as const;

const navTextClass = "text-[15px] leading-5 font-normal";

function isNavItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="text-foreground/90">
      <div className="flex items-start justify-between gap-3 sm:items-center">
        <Link
          className="shrink-0 text-[20px] font-bold leading-none sm:text-[24px]"
          href="/"
        >
          Giulia Fanasca
        </Link>

        <div
          className={`flex flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:gap-x-3.5 ${navTextClass}`}
        >
          {navItems.map((item) => {
            const isActive = isNavItemActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                className={cn(
                  navTextClass,
                  headerNavLinkClass,
                  isActive && headerNavLinkActiveClass,
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
          <ContactNavLink isActive={pathname === "/contact"} />
          <LightPullCord />
        </div>
      </div>

      <p className={`mt-0.5 text-muted-foreground ${navTextClass}`}>Creative Technologist</p>
    </nav>
  );
}
