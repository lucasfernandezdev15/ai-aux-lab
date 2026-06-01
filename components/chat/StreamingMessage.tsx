import { MarkdownContent } from "./MarkdownContent";

interface StreamingMessageProps {
  content: string;
}

export function StreamingMessage({ content }: StreamingMessageProps) {
  if (!content) {
    return (
      <div className="flex gap-4 bg-surface-raised/50 px-4 py-6">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-semibold text-white">
          AI
        </div>
        <div className="flex items-center gap-1 pt-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 bg-surface-raised/50 px-4 py-6">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-semibold text-white">
        AI
      </div>
      <div className="min-w-0 flex-1">
        <MarkdownContent content={content} />
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-accent" />
      </div>
    </div>
  );
}
