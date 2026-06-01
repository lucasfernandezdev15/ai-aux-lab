import { PROVIDERS, type AIProvider } from "@/lib/ai-providers";

export const runtime = "edge";

export async function GET() {
  const available: AIProvider[] = ["demo"];
  if (process.env.OPENAI_API_KEY) available.push("openai");
  if (process.env.ANTHROPIC_API_KEY) available.push("anthropic");

  const providers = PROVIDERS.map((p) => ({
    ...p,
    available: available.includes(p.id),
  }));

  return Response.json({
    available,
    default: available.includes("openai")
      ? "openai"
      : available.includes("anthropic")
        ? "anthropic"
        : "demo",
    providers,
    models: {
      openai: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      anthropic: process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-20241022",
    },
  });
}
