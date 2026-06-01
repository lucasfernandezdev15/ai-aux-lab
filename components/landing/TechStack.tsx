const stack = [
  "Next.js 15",
  "TypeScript",
  "Tailwind CSS",
  "Edge SSE",
  "OpenAI API",
  "Anthropic API",
  "react-markdown",
  "localStorage",
  "Vercel",
];

const highlights = [
  "App Router + Route Handlers en Edge",
  "Streaming sin bloquear el hilo principal",
  "Theming con CSS variables (light/dark)",
  "Arquitectura por features (chat / panels / landing)",
];

export function TechStack() {
  return (
    <section id="stack" className="border-t border-surface-border bg-surface-raised/50 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-content">Stack técnico</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-surface-border bg-surface px-4 py-2 text-sm text-content-muted"
              >
                {item}
              </span>
            ))}
          </div>
          <ul className="space-y-3 text-sm text-content-muted">
            {highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-accent">✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
