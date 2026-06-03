"use client";

import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  DEFAULT_MEMORY,
  loadActiveSessionId,
  loadMemory,
  loadSessions,
  saveActiveSessionId,
  saveMemory,
  saveSessions,
} from "@/lib/storage";
import type { AIProvider } from "@/lib/ai-providers";
import type { ChatSession, MemoryItem, Message, ToolCall } from "@/lib/types";

function createSession(title = "New chat"): ChatSession {
  const now = Date.now();
  return {
    id: uuid(),
    title,
    messages: [],
    toolCalls: [],
    createdAt: now,
    updatedAt: now,
  };
}

function titleFromMessage(content: string): string {
  const t = content.trim().slice(0, 42);
  return t.length < content.trim().length ? `${t}…` : t || "New chat";
}

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [memory, setMemory] = useState<MemoryItem[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState("");
  const [liveTools, setLiveTools] = useState<ToolCall[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadSessions();
    const active = loadActiveSessionId();
    const mem = loadMemory();
    if (stored.length === 0) {
      const initial = createSession();
      setSessions([initial]);
      setActiveId(initial.id);
      saveSessions([initial]);
      saveActiveSessionId(initial.id);
    } else {
      setSessions(stored);
      setActiveId(active && stored.some((s) => s.id === active) ? active : stored[0].id);
    }
    setMemory(mem.length ? mem : DEFAULT_MEMORY);
    setHydrated(true);
  }, []);

  const activeSession = sessions.find((s) => s.id === activeId) ?? null;

  const persist = useCallback((next: ChatSession[]) => {
    setSessions(next);
    saveSessions(next);
  }, []);

  const selectSession = useCallback((id: string) => {
    setActiveId(id);
    saveActiveSessionId(id);
    setStreamContent("");
    setLiveTools([]);
  }, []);

  const newSession = useCallback(() => {
    const session = createSession();
    const next = [session, ...sessions];
    persist(next);
    selectSession(session.id);
  }, [sessions, persist, selectSession]);

  const deleteSession = useCallback(
    (id: string) => {
      const next = sessions.filter((s) => s.id !== id);
      if (next.length === 0) {
        const fresh = createSession();
        persist([fresh]);
        selectSession(fresh.id);
        return;
      }
      persist(next);
      if (activeId === id) selectSession(next[0].id);
    },
    [sessions, activeId, persist, selectSession]
  );

  const updateMemory = useCallback((items: MemoryItem[]) => {
    setMemory(items);
    saveMemory(items);
  }, []);

  const sendMessage = useCallback(
    async (
      content: string,
      options?: { simulateTools?: boolean; provider?: AIProvider }
    ) => {
      if (!activeId || !content.trim() || isStreaming) return;

      const userMsg: Message = {
        id: uuid(),
        role: "user",
        content: content.trim(),
        createdAt: Date.now(),
      };

      let sessionSnapshot: ChatSession | undefined;
      setSessions((prev) => {
        const next = prev.map((s) => {
          if (s.id !== activeId) return s;
          const isFirst = s.messages.length === 0;
          sessionSnapshot = {
            ...s,
            title: isFirst ? titleFromMessage(content) : s.title,
            messages: [...s.messages, userMsg],
            updatedAt: Date.now(),
          };
          return sessionSnapshot;
        });
        saveSessions(next);
        return next;
      });

      if (!sessionSnapshot) return;

      setIsStreaming(true);
      setStreamContent("");
      setLiveTools([]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: sessionSnapshot.messages,
            memory,
            simulateTools: options?.simulateTools,
            provider: options?.provider,
          }),
        });

        if (!res.ok || !res.body) throw new Error("Stream failed");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";
        const toolsAcc: ToolCall[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const event = JSON.parse(line.slice(6)) as {
                type: string;
                text?: string;
                message?: string;
                tool?: ToolCall;
              };

              if (event.type === "token" && event.text) {
                fullText += event.text;
                setStreamContent(fullText);
              }
              if (event.type === "tool" && event.tool) {
                const idx = toolsAcc.findIndex((t) => t.id === event.tool!.id);
                if (idx >= 0) toolsAcc[idx] = event.tool;
                else toolsAcc.push(event.tool);
                setLiveTools([...toolsAcc]);
              }
              if (event.type === "error") {
                fullText = event.message ?? "Unknown error";
                setStreamContent(fullText);
              }
            } catch {
              /* ignore malformed SSE */
            }
          }
        }

        const assistantMsg: Message = {
          id: uuid(),
          role: "assistant",
          content: fullText || "(no response)",
          createdAt: Date.now(),
        };

        setSessions((prev) => {
          const next = prev.map((s) =>
            s.id === activeId
              ? {
                  ...s,
                  messages: [...s.messages, assistantMsg],
                  toolCalls: [...s.toolCalls, ...toolsAcc],
                  updatedAt: Date.now(),
                }
              : s
          );
          saveSessions(next);
          return next;
        });
      } catch {
        const errMsg: Message = {
          id: uuid(),
          role: "assistant",
          content: "Could not complete the stream. Check the console or API.",
          createdAt: Date.now(),
        };
        setSessions((prev) => {
          const next = prev.map((s) =>
            s.id === activeId
              ? { ...s, messages: [...s.messages, errMsg], updatedAt: Date.now() }
              : s
          );
          saveSessions(next);
          return next;
        });
      } finally {
        setIsStreaming(false);
        setStreamContent("");
        setLiveTools([]);
      }
    },
    [activeId, isStreaming, memory]
  );

  return {
    hydrated,
    sessions,
    activeSession,
    activeId,
    memory,
    isStreaming,
    streamContent,
    liveTools,
    selectSession,
    newSession,
    deleteSession,
    sendMessage,
    updateMemory,
  };
}
