import type { ChatSession, MemoryItem } from "./types";

const SESSIONS_KEY = "ai-ux-lab-sessions";
const MEMORY_KEY = "ai-ux-lab-memory";
const ACTIVE_KEY = "ai-ux-lab-active-session";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(SESSIONS_KEY), []);
}

export function saveSessions(sessions: ChatSession[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function loadActiveSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_KEY);
}

export function saveActiveSessionId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_KEY, id);
}

export function loadMemory(): MemoryItem[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(MEMORY_KEY), []);
}

export function saveMemory(items: MemoryItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MEMORY_KEY, JSON.stringify(items));
}

export const DEFAULT_MEMORY: MemoryItem[] = [
  {
    id: "m1",
    key: "user.name",
    value: "Carlos",
    updatedAt: Date.now(),
  },
  {
    id: "m2",
    key: "prefs.language",
    value: "es-AR",
    updatedAt: Date.now(),
  },
  {
    id: "m3",
    key: "project.focus",
    value: "AI UX patterns for portfolio",
    updatedAt: Date.now(),
  },
];
