import Link from "next/link";

export function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-10 text-center sm:p-14">
        <h2 className="text-2xl font-bold text-content sm:text-3xl">
          Ready to show this in an interview?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-content-muted">
          One-click deploy, README screenshots, and a demo that runs without an API key.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/chat"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-muted"
          >
            Launch demo
          </Link>
          <a
            href="#screenshots"
            className="rounded-xl border border-surface-border px-6 py-3 text-sm text-content hover:bg-surface-overlay"
          >
            View previews
          </a>
        </div>
      </div>
    </section>
  );
}
