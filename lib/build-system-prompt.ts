import type { MemoryItem } from "./types";

export function buildSystemPrompt(memory: MemoryItem[]): string {
  const base =
    "Sos un asistente útil en AI UX Lab, un demo de interfaces AI-native. Respondé en el idioma del usuario, con markdown cuando ayude. Sé conciso y claro.";

  if (!memory.length) return base;

  const memoryBlock = memory
    .map((m) => `- ${m.key}: ${m.value}`)
    .join("\n");

  return `${base}\n\nContexto de memoria del usuario:\n${memoryBlock}`;
}
