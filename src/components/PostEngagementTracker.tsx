"use client";

import { useEffect, useRef } from "react";
import { trackUmamiEvent } from "@/lib/umami";

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

type PostEngagementTrackerProps = {
  slug: string;
};

export function PostEngagementTracker({ slug }: PostEngagementTrackerProps) {
  const milestonesHit = useRef(new Set<number>());

  useEffect(() => {
    milestonesHit.current = new Set();

    function trackScrollDepth() {
      const { scrollTop } = document.documentElement;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const percent = Math.min(100, Math.round((scrollTop / scrollableHeight) * 100));

      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !milestonesHit.current.has(milestone)) {
          milestonesHit.current.add(milestone);
          trackUmamiEvent(`post-scroll-${milestone}`, { slug });
        }
      }
    }

    window.addEventListener("scroll", trackScrollDepth, { passive: true });
    trackScrollDepth();

    return () => window.removeEventListener("scroll", trackScrollDepth);
  }, [slug]);

  return null;
}
