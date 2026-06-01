"use client";

import Link from "next/link";
import type { ChatSession } from "@/lib/types";

interface SessionSidebarProps {
  sessions: ChatSession[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  embedded?: boolean;
}

export function SessionSidebar({
  sessions,
  activeId,
  onSelect,
  onNew,
  onDelete,
  embedded,
}: SessionSidebarProps) {
  const sorted = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <aside
      className={`flex h-full flex-col bg-surface-raised ${
        embedded ? "w-full" : "w-64 shrink-0 border-r border-surface-border"
      }`}
    >
      <div className="flex items-center justify-between border-b border-surface-border p-3">
        <Link href="/" className="text-sm font-semibold text-content hover:opacity-80">
          AI UX Lab
        </Link>
        <button
          type="button"
          onClick={onNew}
          className="rounded-md border border-surface-border px-2 py-1 text-xs text-content-muted transition hover:bg-surface-overlay hover:text-content"
        >
          + Nuevo
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-content-subtle">
          Conversaciones
        </p>
        <ul className="space-y-0.5">
          {sorted.map((session) => {
            const active = session.id === activeId;
            return (
              <li key={session.id} className="group flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onSelect(session.id)}
                  className={`min-w-0 flex-1 truncate rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-surface-overlay font-medium text-content"
                      : "text-content-muted hover:bg-surface-overlay/60 hover:text-content"
                  }`}
                >
                  {session.title}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(session.id)}
                  className="rounded px-1.5 py-1 text-xs text-content-subtle opacity-0 hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
                  aria-label="Eliminar"
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-surface-border p-3 text-[10px] text-content-subtle">
        Persistencia · localStorage
      </div>
    </aside>
  );
}
