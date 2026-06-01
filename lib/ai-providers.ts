export type AIProvider = "demo" | "openai" | "anthropic";

export interface ProviderInfo {
  id: AIProvider;
  label: string;
  description: string;
  envKey?: string;
}

export const PROVIDERS: ProviderInfo[] = [
  {
    id: "demo",
    label: "Demo",
    description: "Stream simulado sin API key",
  },
  {
    id: "openai",
    label: "OpenAI",
    description: "GPT-4o mini vía Chat Completions",
    envKey: "OPENAI_API_KEY",
  },
  {
    id: "anthropic",
    label: "Anthropic",
    description: "Claude Haiku vía Messages API",
    envKey: "ANTHROPIC_API_KEY",
  },
];

export function resolveProvider(
  requested: AIProvider | undefined,
  available: AIProvider[]
): AIProvider {
  if (requested && available.includes(requested)) return requested;
  if (available.includes("openai")) return "openai";
  if (available.includes("anthropic")) return "anthropic";
  return "demo";
}
