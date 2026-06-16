"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactNavLink } from "@/components/ContactNavLink";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-start justify-between text-[13px] leading-5 text-foreground/90">
      <Link className="font-medium hover:underline hover:underline-offset-4" href="/">
        Giulia Fanasca
      </Link>

      <div className="flex items-center gap-3.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={[
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
    </nav>
  );
}
