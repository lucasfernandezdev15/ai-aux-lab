import OpenAI from "openai";
import type { Message } from "@/lib/types";

function sse(data: object): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function streamOpenAI(
  messages: Message[],
  systemPrompt: string
): Promise<ReadableStream> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const stream = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
    ],
    stream: true,
  });

  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(sse({ type: "token", text })));
        }
        controller.enqueue(encoder.encode(sse({ type: "done" })));
      } catch (err) {
        const message = err instanceof Error ? err.message : "OpenAI error";
        controller.enqueue(encoder.encode(sse({ type: "error", message })));
      } finally {
        controller.close();
      }
    },
  });
}
