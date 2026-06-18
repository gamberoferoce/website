"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackUmamiEvent } from "@/lib/umami";

const HEARTBEAT_MS = 30_000;
const READ_THRESHOLDS_SEC = [30, 60, 120] as const;

export function UmamiEngagement() {
  const pathname = usePathname();
  const readThresholdsHit = useRef(new Set<number>());

  useEffect(() => {
    readThresholdsHit.current = new Set();
    const startedAt = Date.now();

    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") {
        return;
      }

      const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
      trackUmamiEvent("engagement-heartbeat", {
        path: pathname,
        seconds: elapsedSeconds,
      });

      for (const threshold of READ_THRESHOLDS_SEC) {
        if (elapsedSeconds >= threshold && !readThresholdsHit.current.has(threshold)) {
          readThresholdsHit.current.add(threshold);
          trackUmamiEvent(`read-${threshold}s`, { path: pathname });
        }
      }
    }, HEARTBEAT_MS);

    return () => window.clearInterval(interval);
  }, [pathname]);

  return null;
}
