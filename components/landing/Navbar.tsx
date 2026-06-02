"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/80 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-content">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm text-white">
            AI
          </span>
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-content-muted sm:flex">
          <a href="#features" className="hover:text-content">
            Features
          </a>
          <a href="#screenshots" className="hover:text-content">
            Screenshots
          </a>
          <a href="#stack" className="hover:text-content">
            Stack
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/chat"
            className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white hover:bg-accent-muted"
          >
            Open chat
          </Link>
        </div>
      </div>
    </header>
  );
}
