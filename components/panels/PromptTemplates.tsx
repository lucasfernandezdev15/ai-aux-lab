"use client";

import { PROMPT_TEMPLATES } from "@/lib/prompt-templates";
import type { PromptTemplate } from "@/lib/types";

interface PromptTemplatesProps {
  onSelect: (template: PromptTemplate, simulateTools?: boolean) => void;
  disabled?: boolean;
}

export function PromptTemplates({ onSelect, disabled }: PromptTemplatesProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-content-subtle">
        Prompt templates
      </h3>
      <ul className="space-y-2">
        {PROMPT_TEMPLATES.map((tpl) => (
          <li key={tpl.id}>
            <button
              type="button"
              disabled={disabled}
              onClick={() =>
                onSelect(tpl, tpl.id === "tool-demo")
              }
              className="w-full rounded-lg border border-surface-border bg-surface p-3 text-left transition hover:border-accent/30 hover:bg-surface-overlay disabled:opacity-50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-content">{tpl.title}</span>
                <span className="shrink-0 rounded bg-surface-overlay px-1.5 py-0.5 text-[10px] text-content-subtle">
                  {tpl.category}
                </span>
              </div>
              <p className="mt-1 text-xs text-content-muted">{tpl.description}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
