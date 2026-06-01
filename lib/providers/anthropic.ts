import type { Message } from "@/lib/types";

function sse(data: object): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export function streamAnthropic(
  messages: Message[],
  systemPrompt: string
): ReadableStream {
  const apiKey = process.env.ANTHROPIC_API_KEY!;
  const model = process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-20241022";

  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model,
            max_tokens: 2048,
            stream: true,
            system: systemPrompt,
            messages: messages
              .filter((m) => m.role !== "system")
              .map((m) => ({
                role: m.role === "assistant" ? "assistant" : "user",
                content: m.content,
              })),
          }),
        });

        if (!res.ok) {
          const err = await res.text();
          controller.enqueue(
            encoder.encode(sse({ type: "error", message: `Anthropic ${res.status}: ${err.slice(0, 200)}` }))
          );
          controller.close();
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") continue;
            try {
              const event = JSON.parse(payload) as {
                type?: string;
                delta?: { type?: string; text?: string };
              };
              if (
                event.type === "content_block_delta" &&
                event.delta?.type === "text_delta" &&
                event.delta.text
              ) {
                controller.enqueue(
                  encoder.encode(sse({ type: "token", text: event.delta.text }))
                );
              }
            } catch {
              /* skip */
            }
          }
        }

        controller.enqueue(encoder.encode(sse({ type: "done" })));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Anthropic error";
        controller.enqueue(encoder.encode(sse({ type: "error", message })));
      } finally {
        controller.close();
      }
    },
  });
}
