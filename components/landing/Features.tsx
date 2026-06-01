const features = [
  {
    title: "Streaming SSE",
    description:
      "Tokens en tiempo real con protocolo extensible: mensajes, tools y errores en un solo canal.",
    icon: "⚡",
  },
  {
    title: "Markdown + código",
    description: "GFM, tablas, blockquotes y Prism para snippets — igual que ChatGPT o Claude.",
    icon: "📝",
  },
  {
    title: "Multi-provider",
    description: "OpenAI, Anthropic o modo demo sin keys. Selector persistente en el cliente.",
    icon: "🔌",
  },
  {
    title: "Tool calling UI",
    description: "Timeline visual del ciclo pending → running → done con args y resultados.",
    icon: "🛠",
  },
  {
    title: "Memory panel",
    description: "Contexto tipo agente inyectado al system prompt y editable en vivo.",
    icon: "🧠",
  },
  {
    title: "Multi-session",
    description: "Sidebar de conversaciones con persistencia local — patrón producto real.",
    icon: "💬",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-surface-border bg-surface-raised/50 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-content">Patrones que evalúan en hiring</h2>
          <p className="mt-3 text-content-muted">
            Cada pieza demuestra decisión de producto e ingeniería — no un tutorial copiado.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li
              key={f.title}
              className="group rounded-2xl border border-surface-border bg-surface p-6 transition hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="text-2xl" aria-hidden>
                {f.icon}
              </span>
              <h3 className="mt-4 font-semibold text-content">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-content-muted">{f.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
