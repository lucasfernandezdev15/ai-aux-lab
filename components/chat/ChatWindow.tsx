"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { MessageBubble } from "./MessageBubble";
import { StreamingMessage } from "./StreamingMessage";
import { ChatInput } from "./ChatInput";
import type { AIProvider } from "@/lib/ai-providers";
import { PROVIDERS } from "@/lib/ai-providers";
import type { ChatSession, ToolCall } from "@/lib/types";

interface ChatWindowProps {
  session: ChatSession | null;
  isStreaming: boolean;
  streamContent: string;
  liveTools: ToolCall[];
  onSend: (text: string) => void;
  provider: AIProvider;
  headerRight?: ReactNode;
}

export function ChatWindow({
  session,
  isStreaming,
  streamContent,
  liveTools,
  onSend,
  provider,
  headerRight,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const providerLabel = PROVIDERS.find((p) => p.id === provider)?.label ?? provider;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session?.messages, streamContent, isStreaming]);

  const messages = session?.messages ?? [];
  const empty = messages.length === 0 && !isStreaming;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-3 border-b border-surface-border px-4 py-3">
        <div className="min-w-0 flex-1">
          <Link
            href="/"
            className="hidden text-[10px] text-content-subtle hover:text-accent lg:inline"
          >
            ← Home
          </Link>
          <h1 className="truncate text-sm font-medium text-content">
            {session?.title ?? "Chat"}
          </h1>
        </div>
        <span className="hidden rounded-full border border-surface-border bg-surface-overlay px-2.5 py-0.5 text-[10px] text-content-muted sm:inline">
          {providerLabel}
        </span>
        {headerRight}
      </header>

      <div className="flex-1 overflow-y-auto">
        {empty ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 px-4 py-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-2xl">
              ✦
            </div>
            <div className="max-w-md text-center">
              <h2 className="text-xl font-semibold text-content">What should we work on?</h2>
              <p className="mt-2 text-sm text-content-muted">
                Pick a prompt template in Panels or type below. Mode:{" "}
                <strong className="text-content">{providerLabel}</strong>.
              </p>
            </div>
            <div className="grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {[
                "Explain SSE streaming in 3 bullets",
                "Build a React chat input with auto-resize",
              ].map((hint) => (
                <button
                  key={hint}
                  type="button"
                  onClick={() => onSend(hint)}
                  className="rounded-xl border border-surface-border bg-surface-raised px-4 py-3 text-left text-xs text-content-muted transition hover:border-accent/40 hover:text-content"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isStreaming && <StreamingMessage content={streamContent} />}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {liveTools.length > 0 && isStreaming && (
        <div className="border-t border-surface-border bg-amber-500/5 px-4 py-2">
          <p className="text-center text-[11px] text-amber-600 dark:text-amber-400">
            Running {liveTools.length} tool{liveTools.length > 1 ? "s" : ""}…
          </p>
        </div>
      )}

      <ChatInput onSend={onSend} disabled={isStreaming} />
    </div>
  );
}
