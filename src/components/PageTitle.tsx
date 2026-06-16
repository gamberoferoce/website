import type { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
};

export function PageTitle({ children }: PageTitleProps) {
  return <h1 className="text-[22px] font-bold leading-tight text-foreground/90">{children}</h1>;
}
