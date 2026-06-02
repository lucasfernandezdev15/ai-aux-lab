const features = [
  {
    title: "SSE streaming",
    description:
      "Real-time tokens over an extensible protocol: messages, tools, and errors on one channel.",
    icon: "⚡",
  },
  {
    title: "Markdown + code",
    description: "GFM, tables, blockquotes, and Prism snippets — like ChatGPT or Claude.",
    icon: "📝",
  },
  {
    title: "Multi-provider",
    description: "Gemini, OpenAI, Anthropic, or demo mode. Persistent selector on the client.",
    icon: "🔌",
  },
  {
    title: "Tool calling UI",
    description: "Visual timeline for pending → running → done with args and results.",
    icon: "🛠",
  },
  {
    title: "Memory panel",
    description: "Agent-style context injected into the system prompt, editable live.",
    icon: "🧠",
  },
  {
    title: "Multi-session",
    description: "Conversation sidebar with local persistence — a real product pattern.",
    icon: "💬",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-surface-border bg-surface-raised/50 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-content">Patterns hiring teams look for</h2>
          <p className="mt-3 text-content-muted">
            Each piece shows product and engineering decisions — not a copied tutorial.
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
