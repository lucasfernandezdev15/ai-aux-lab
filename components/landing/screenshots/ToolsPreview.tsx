export function ToolsPreview() {
  return (
    <div className="h-[220px] space-y-2 overflow-hidden rounded-lg bg-[#171717] p-3 text-left sm:h-[240px]">
      <p className="text-[8px] font-semibold uppercase tracking-wider text-zinc-500">
        Tool calling
      </p>
      <div className="relative border-l border-zinc-700 pl-3">
        <span className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-emerald-500" />
        <div className="rounded-lg border border-[#2f2f2f] bg-[#0d0d0d] p-2">
          <code className="text-[9px] text-violet-300">get_weather</code>
          <p className="mt-1 font-mono text-[7px] text-zinc-500">
            {`{ "city": "Buenos Aires" }`}
          </p>
          <p className="mt-1 text-[8px] text-emerald-400">→ 22°C, nublado</p>
        </div>
      </div>
      <div className="relative border-l border-zinc-700 pl-3">
        <span className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-emerald-500" />
        <div className="rounded-lg border border-[#2f2f2f] bg-[#0d0d0d] p-2">
          <code className="text-[9px] text-violet-300">search_repo</code>
          <p className="mt-1 text-[8px] text-emerald-400">→ Next.js, Gemini</p>
        </div>
      </div>
      <p className="pt-1 text-[8px] font-semibold uppercase tracking-wider text-zinc-500">
        Memory
      </p>
      <div className="rounded border border-[#2f2f2f] bg-[#0d0d0d] p-2 text-[8px]">
        <span className="text-emerald-400">user.name</span>
        <span className="text-zinc-400"> · Carlos</span>
      </div>
    </div>
  );
}
