export function ChatPreview() {
  return (
    <div className="flex h-[220px] overflow-hidden rounded-lg bg-[#0d0d0d] text-left sm:h-[240px]">
      <aside className="hidden w-[28%] shrink-0 border-r border-[#2f2f2f] bg-[#171717] p-2 sm:block">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#10a37f] text-[8px] font-bold text-white">
            AI
          </span>
          <span className="text-[9px] font-semibold text-zinc-200">AI UX Lab</span>
        </div>
        <div className="space-y-1">
          <div className="rounded-md bg-[#212121] px-2 py-1.5 text-[8px] text-zinc-300">
            Code review…
          </div>
          <div className="rounded-md border border-[#10a37f]/40 bg-[#10a37f]/10 px-2 py-1.5 text-[8px] text-white">
            Streaming demo
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-[#2f2f2f] px-3 py-2 text-[9px] text-zinc-500">
          SSE · Markdown · Gemini
        </div>
        <div className="flex-1 space-y-3 p-3">
          <div className="flex gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#10a37f] text-[7px] font-bold text-white">
              AI
            </span>
            <div className="space-y-1.5">
              <div className="h-2 w-32 rounded bg-zinc-800" />
              <div className="h-2 w-40 rounded bg-zinc-800/80" />
              <div className="rounded bg-zinc-900 p-2 font-mono text-[7px] text-emerald-400">
                streamChat(messages)
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="h-2 w-24 rounded bg-zinc-700" />
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-zinc-700 text-[7px] text-zinc-400">
              You
            </span>
          </div>
        </div>
        <div className="mx-3 mb-3 rounded-full border border-[#2f2f2f] bg-[#171717] px-3 py-2 text-[8px] text-zinc-600">
          Message…
        </div>
      </div>
    </div>
  );
}
