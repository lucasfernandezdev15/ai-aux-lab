import { ChatPreview } from "./screenshots/ChatPreview";
import { ToolsPreview } from "./screenshots/ToolsPreview";
import { LandingPreview } from "./screenshots/LandingPreview";

const shots = [
  {
    title: "Chat interface",
    caption: "Layout tipo ChatGPT con sesiones y streaming",
    Preview: ChatPreview,
  },
  {
    title: "Agents panel",
    caption: "Tool timeline + memory + prompt templates",
    Preview: ToolsPreview,
  },
  {
    title: "Landing",
    caption: "Hero, features y CTA listos para recruiters",
    Preview: LandingPreview,
  },
];

export function Screenshots() {
  return (
    <section id="screenshots" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-content">Screenshots</h2>
          <p className="mt-2 text-content-muted">
            Previews integradas del producto. Podés reemplazarlas por capturas PNG en{" "}
            <code className="rounded bg-surface-overlay px-1.5 py-0.5 text-xs">
              public/screenshots/
            </code>{" "}
            cuando tengas el deploy en Vercel.
          </p>
        </div>

        <ul className="mt-10 grid gap-8 lg:grid-cols-3">
          {shots.map(({ title, caption, Preview }) => (
            <li key={title} className="group">
              <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface-raised p-2 shadow-xl transition group-hover:border-accent/30">
                <Preview />
              </div>
              <h3 className="mt-3 font-medium text-content">{title}</h3>
              <p className="text-sm text-content-muted">{caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
