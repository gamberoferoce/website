"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { SITE_CANVAS_WIDTH } from "@/lib/site-canvas";

type SiteCanvasProps = {
  children: ReactNode;
};

function subscribeViewport(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getViewportScale() {
  return Math.min(1, window.innerWidth / SITE_CANVAS_WIDTH);
}

export function SiteCanvas({ children }: SiteCanvasProps) {
  const scale = useSyncExternalStore(subscribeViewport, getViewportScale, () => 1);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    const node = innerRef.current;

    if (!node || scale >= 1) {
      setScaledHeight(undefined);
      return;
    }

    const updateHeight = () => {
      setScaledHeight(node.offsetHeight * scale);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => observer.disconnect();
  }, [scale]);

  if (scale >= 1) {
    return (
      <div className="relative mx-auto w-full max-w-[640px]" data-site-canvas-inner>
        {children}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden" style={{ height: scaledHeight }}>
      <div className="mx-auto overflow-hidden" style={{ width: SITE_CANVAS_WIDTH * scale }}>
        <div
          ref={innerRef}
          className="relative origin-top-left"
          data-site-canvas-inner
          style={{
            width: SITE_CANVAS_WIDTH,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
