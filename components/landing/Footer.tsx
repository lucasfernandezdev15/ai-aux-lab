import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-surface-border px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-content-subtle">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.role}
        </p>
        <div className="flex gap-4 text-sm text-content-muted">
          <Link href="/chat" className="hover:text-content">
            Chat
          </Link>
          <a href={siteConfig.github} target="_blank" rel="noreferrer" className="hover:text-content">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
