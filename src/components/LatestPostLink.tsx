"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { textLinkClass } from "@/lib/interactive";
import { trackUmamiEvent } from "@/lib/umami";

type LatestPostLinkProps = {
  href: string;
  slug: string;
  children: ReactNode;
};

export function LatestPostLink({ href, slug, children }: LatestPostLinkProps) {
  return (
    <Link
      className={textLinkClass}
      href={href}
      onClick={() => trackUmamiEvent("click-latest-post", { slug })}
    >
      {children}
    </Link>
  );
}
