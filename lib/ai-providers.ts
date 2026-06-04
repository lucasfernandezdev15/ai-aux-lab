export type AIProvider = "demo" | "openai" | "anthropic" | "gemini";

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
    description: "Simulated stream without an API key",
  },
  {
    id: "gemini",
    label: "Gemini",
    description: "Google Gemini (tries 2.5-flash, then 1.5-flash)",
    envKey: "GEMINI_API_KEY",
  },
  {
    id: "openai",
    label: "OpenAI",
    description: "GPT-4o mini via Chat Completions",
    envKey: "OPENAI_API_KEY",
  },
  {
    id: "anthropic",
    label: "Anthropic",
    description: "Claude Haiku via Messages API",
    envKey: "ANTHROPIC_API_KEY",
  },
];

const PREFERENCE: AIProvider[] = ["openai", "anthropic", "gemini"];

export function resolveProvider(
  requested: AIProvider | undefined,
  available: AIProvider[]
): AIProvider {
  if (requested && available.includes(requested)) return requested;
  const preferred = PREFERENCE.find((p) => available.includes(p));
  return preferred ?? "demo";
}

/** Portfolio default: Demo first so deploys work without burning Gemini quota */
export function defaultProvider(available: AIProvider[]): AIProvider {
  return "demo";
}
