"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { MemoryItem } from "@/lib/types";

interface MemoryPanelProps {
  items: MemoryItem[];
  onChange: (items: MemoryItem[]) => void;
}

export function MemoryPanel({ items, onChange }: MemoryPanelProps) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const add = () => {
    if (!key.trim() || !value.trim()) return;
    onChange([
      ...items,
      { id: uuid(), key: key.trim(), value: value.trim(), updatedAt: Date.now() },
    ]);
    setKey("");
    setValue("");
  };

  const remove = (id: string) => {
    onChange(items.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-content-subtle">
        Memory panel
      </h3>
      <p className="text-xs text-content-muted">
        Contexto persistente simulado (como memoria de agente). Se guarda en localStorage.
      </p>
      <ul className="max-h-40 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-surface-border bg-surface p-2 text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <code className="text-emerald-400">{item.key}</code>
                <p className="mt-1 truncate text-content-muted">{item.value}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="shrink-0 text-zinc-600 hover:text-red-400"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-2">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="clave (ej. user.role)"
          className="w-full rounded border border-surface-border bg-surface-overlay px-2 py-1.5 text-xs text-content placeholder:text-content-subtle focus:border-accent focus:outline-none"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="valor"
          className="w-full rounded border border-surface-border bg-surface-overlay px-2 py-1.5 text-xs text-content placeholder:text-content-subtle focus:border-accent focus:outline-none"
        />
        <button
          type="button"
          onClick={add}
          className="w-full rounded border border-surface-border py-1.5 text-xs text-content-muted hover:bg-surface-overlay"
        >
          + Añadir memoria
        </button>
      </div>
    </div>
  );
}
