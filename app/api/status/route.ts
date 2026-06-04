import { defaultProvider, PROVIDERS, type AIProvider } from "@/lib/ai-providers";
import { DEFAULT_GEMINI_MODEL } from "@/lib/gemini-models";

export const runtime = "edge";

export async function GET() {
  const available: AIProvider[] = ["demo"];
  if (process.env.GEMINI_API_KEY) available.push("gemini");
  if (process.env.OPENAI_API_KEY) available.push("openai");
  if (process.env.ANTHROPIC_API_KEY) available.push("anthropic");

  const providers = PROVIDERS.map((p) => ({
    ...p,
    available: available.includes(p.id),
  }));

  return Response.json({
    available,
    default: defaultProvider(available),
    providers,
    models: {
      gemini: process.env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL,
      openai: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      anthropic: process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-20241022",
    },
  });
}
