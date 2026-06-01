import Image from "next/image";

const shots = [
  {
    src: "/screenshots/chat.svg",
    alt: "Vista principal del chat con streaming y sidebar",
    title: "Chat interface",
    caption: "Layout tipo ChatGPT con sesiones y streaming",
  },
  {
    src: "/screenshots/tools.svg",
    alt: "Panel de tool calling y memory",
    title: "Agents panel",
    caption: "Tool timeline + memory + prompt templates",
  },
  {
    src: "/screenshots/landing.svg",
    alt: "Landing page profesional",
    title: "Landing",
    caption: "Hero, features y CTA listos para recruiters",
  },
];

export function Screenshots() {
  return (
    <section id="screenshots" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-content">Screenshots</h2>
            <p className="mt-2 max-w-xl text-content-muted">
              Reemplazá estos SVG por capturas reales tras deploy. Rutas en{" "}
              <code className="rounded bg-surface-overlay px-1.5 py-0.5 text-xs">
                public/screenshots/
              </code>
            </p>
          </div>
          <p className="text-xs text-content-subtle">
            Tip: <code className="text-accent">npm run dev</code> → captura → PNG en README
          </p>
        </div>

        <ul className="mt-10 grid gap-8 lg:grid-cols-3">
          {shots.map((shot) => (
            <li key={shot.title} className="group">
              <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface-raised shadow-xl transition group-hover:border-accent/30">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={640}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
              <h3 className="mt-3 font-medium text-content">{shot.title}</h3>
              <p className="text-sm text-content-muted">{shot.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
