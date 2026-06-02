import type { MemoryItem } from "./types";

export function buildSystemPrompt(memory: MemoryItem[]): string {
  const base =
    "You are a helpful assistant in AI UX Lab, a demo of AI-native interfaces. Reply in the user's language, use markdown when helpful, and stay concise.";

  if (!memory.length) return base;

  const memoryBlock = memory
    .map((m) => `- ${m.key}: ${m.value}`)
    .join("\n");

  return `${base}\n\nUser memory context:\n${memoryBlock}`;
}
