import { MarkdownContent } from "./MarkdownContent";
import type { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 px-4 py-6 ${isUser ? "" : "bg-surface-raised/60"}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
          isUser
            ? "bg-surface-overlay text-content-muted"
            : "bg-accent text-white"
        }`}
        aria-hidden
      >
        {isUser ? "You" : "AI"}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-content-subtle">
          {isUser ? "User" : "Assistant"}
        </p>
        {isUser ? (
          <p className="whitespace-pre-wrap text-[0.95rem] leading-relaxed text-content">
            {message.content}
          </p>
        ) : (
          <MarkdownContent content={message.content} />
        )}
      </div>
    </div>
  );
}
