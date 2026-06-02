import type { ToolCall } from "@/lib/types";

interface ToolCallTimelineProps {
  tools: ToolCall[];
  live?: boolean;
}

const statusStyles: Record<ToolCall["status"], string> = {
  pending: "bg-zinc-600",
  running: "bg-amber-500 animate-pulse",
  done: "bg-emerald-500",
  error: "bg-red-500",
};

export function ToolCallTimeline({ tools, live }: ToolCallTimelineProps) {
  if (tools.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-surface-border p-4 text-center text-xs text-content-muted">
        No tool calls yet. Try the &quot;Tool calling demo&quot; template.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-content-subtle">
          Tool calling
        </h3>
        {live && (
          <span className="rounded bg-amber-950 px-1.5 py-0.5 text-[10px] text-amber-400">
            live
          </span>
        )}
      </div>
      <ol className="relative space-y-3 border-l border-surface-border pl-4">
        {tools.map((tool) => (
          <li key={tool.id} className="relative">
            <span
              className={`absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full ${statusStyles[tool.status]}`}
            />
            <div className="rounded-lg border border-surface-border bg-surface p-3">
              <div className="flex items-center justify-between gap-2">
                <code className="text-sm font-medium text-violet-300">{tool.name}</code>
                <span className="text-[10px] uppercase text-content-subtle">{tool.status}</span>
              </div>
              <pre className="mt-2 overflow-x-auto rounded bg-surface-overlay p-2 text-[10px] text-content-muted">
                {JSON.stringify(tool.args, null, 2)}
              </pre>
              {tool.result && (
                <p className="mt-2 border-t border-surface-border pt-2 text-xs text-emerald-400/90">
                  → {tool.result}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
