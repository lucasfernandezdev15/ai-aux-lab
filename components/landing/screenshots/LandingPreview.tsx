export function LandingPreview() {
  return (
    <div className="relative h-[220px] overflow-hidden rounded-lg bg-[#0d0d0d] text-center sm:h-[240px]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#2f2f2f 1px, transparent 1px), linear-gradient(90deg, #2f2f2f 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute left-1/2 top-6 h-20 w-40 -translate-x-1/2 rounded-full bg-[#10a37f]/20 blur-2xl" />
      <div className="relative px-4 pt-8">
        <p className="text-[8px] font-medium text-[#10a37f]">Portfolio · AI-native UX</p>
        <p className="mt-2 text-sm font-bold text-white">Chat interfaces</p>
        <p className="text-sm font-bold text-[#10a37f]">that feel pro</p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="rounded-lg bg-[#10a37f] px-3 py-1.5 text-[8px] font-semibold text-white">
            Try demo
          </span>
          <span className="rounded-lg border border-[#2f2f2f] px-3 py-1.5 text-[8px] text-zinc-400">
            GitHub
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 px-2">
          {["Streaming", "Gemini", "Tools"].map((label) => (
            <div
              key={label}
              className="rounded-lg border border-[#2f2f2f] bg-[#171717] py-2 text-[7px] text-zinc-400"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
