"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactNavLink } from "@/components/ContactNavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
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
      <div className="flex items-center justify-between">
        <Link
          className="text-[24px] font-bold leading-none"
          href="/"
        >
          Giulia Fanasca
        </Link>

        <div className={`flex items-center gap-3.5 ${navTextClass}`}>
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
          <ThemeToggle />
        </div>
      </div>

      <p className={`mt-0.5 text-muted-foreground ${navTextClass}`}>Creative Technologist</p>
    </nav>
  );
}
