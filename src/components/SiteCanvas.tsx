import type { ReactNode } from "react";

type SiteCanvasProps = {
  children: ReactNode;
};

export function SiteCanvas({ children }: SiteCanvasProps) {
  return (
    <div className="relative mx-auto w-full max-w-[640px]" data-site-canvas-inner>
      {children}
    </div>
  );
}
