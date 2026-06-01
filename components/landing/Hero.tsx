import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-[0.35]"
        aria-hidden
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="animate-fade-in text-sm font-medium text-accent">
          Portfolio · AI-native UX
        </p>
        <h1 className="animate-slide-up mt-4 text-4xl font-bold tracking-tight text-content sm:text-6xl [animation-delay:80ms]">
          Interfaces de chat que{" "}
          <span className="bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">
            se sienten pro
          </span>
        </h1>
        <p className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg text-content-muted [animation-delay:160ms]">
          {siteConfig.description} Diseñado para mostrar en entrevistas y procesos
          técnicos cómo construís UX con LLMs — no solo wrappers de API.
        </p>

        <div className="animate-slide-up mt-10 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
          <Link
            href="/chat"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 hover:bg-accent-muted"
          >
            Probar demo en vivo →
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-surface-border bg-surface-raised px-6 py-3 text-sm font-medium text-content hover:bg-surface-overlay"
          >
            Ver en GitHub
          </a>
        </div>

        <dl className="animate-slide-up mt-14 grid grid-cols-3 gap-4 border-y border-surface-border py-8 sm:gap-8 [animation-delay:320ms]">
          {[
            { label: "Patrones UX", value: "7+" },
            { label: "Providers", value: "3" },
            { label: "Deploy", value: "Vercel" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs text-content-subtle">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-semibold text-content">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
