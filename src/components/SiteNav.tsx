"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactNavLink } from "@/components/ContactNavLink";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
] as const;

const navTextClass = "text-[15px] leading-5 font-normal";

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
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={[
                  navTextClass,
                  "underline underline-offset-4",
                  isActive ? "decoration-current" : "decoration-transparent hover:decoration-current",
                ].join(" ")}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
          <ContactNavLink isActive={pathname === "/contact"} />
        </div>
      </div>

      <p className={`mt-0.5 text-muted-foreground ${navTextClass}`}>Creative Technologist</p>
    </nav>
  );
}
