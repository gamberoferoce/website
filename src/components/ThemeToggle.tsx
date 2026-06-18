"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { iconLinkClass } from "@/lib/interactive";
import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getPreferredTheme();
    applyTheme(initial);
    setTheme(initial);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      aria-label={mounted ? (theme === "light" ? "Switch to dark mode" : "Switch to light mode") : "Toggle theme"}
      className={cn(iconLinkClass, "inline-flex items-center justify-center", !mounted && "opacity-0")}
      disabled={!mounted}
      onClick={toggleTheme}
    >
      {theme === "light" ? <Moon className="h-[15px] w-[15px]" aria-hidden /> : <Sun className="h-[15px] w-[15px]" aria-hidden />}
    </button>
  );
}
