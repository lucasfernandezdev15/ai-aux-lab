"use client";

import type { AIProvider } from "@/lib/ai-providers";
import { PROVIDERS } from "@/lib/ai-providers";

interface ProviderSelectorProps {
  value: AIProvider;
  available: AIProvider[];
  onChange: (p: AIProvider) => void;
  compact?: boolean;
}

export function ProviderSelector({
  value,
  available,
  onChange,
  compact,
}: ProviderSelectorProps) {
  return (
    <div className={compact ? "" : "space-y-1"}>
      {!compact && (
        <label className="text-[10px] font-semibold uppercase tracking-wider text-content-subtle">
          Provider
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as AIProvider)}
        className="w-full rounded-lg border border-surface-border bg-surface-overlay px-2 py-1.5 text-xs text-content focus:border-accent focus:outline-none"
      >
        {PROVIDERS.map((p) => (
          <option key={p.id} value={p.id} disabled={!available.includes(p.id)}>
            {p.label}
            {!available.includes(p.id) ? " (no API key)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
