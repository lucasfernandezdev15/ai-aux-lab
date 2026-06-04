import { parseProviderError } from "@/lib/api-errors";
import { GEMINI_MODEL_CANDIDATES } from "@/lib/gemini-models";
import { getQuotaFallbackReply } from "@/lib/quota-fallback-message";
import { chunkText } from "@/lib/mock-stream";
import type { Message } from "@/lib/types";

function sse(data: object): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function toGeminiContents(messages: Message[]) {
  return messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
}

function streamTextResponse(text: string, meta?: object): ReadableStream {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      for (const chunk of chunkText(text)) {
        controller.enqueue(encoder.encode(sse({ type: "token", text: chunk })));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.enqueue(encoder.encode(sse({ type: "done", ...meta })));
      controller.close();
    },
  });
}

async function fetchGeminiStream(
  apiKey: string,
  model: string,
  messages: Message[],
  systemPrompt: string
): Promise<Response> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: toGeminiContents(messages),
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    }),
  });
}

export function streamGemini(
  messages: Message[],
  systemPrompt: string
): ReadableStream {
  const apiKey = process.env.GEMINI_API_KEY!;
  const models = [...new Set(GEMINI_MODEL_CANDIDATES)];
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      let lastError = { status: 500, body: "Unknown error" };

      try {
        for (const model of models) {
          const res = await fetchGeminiStream(apiKey, model, messages, systemPrompt);

          if (res.ok) {
            const reader = res.body?.getReader();
            if (!reader) break;

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
                if (!payload || payload === "[DONE]") continue;
                try {
                  const event = JSON.parse(payload) as {
                    candidates?: Array<{
                      content?: { parts?: Array<{ text?: string }> };
                    }>;
                  };
                  const text = event.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) {
                    controller.enqueue(encoder.encode(sse({ type: "token", text })));
                  }
                } catch {
                  /* skip */
                }
              }
            }

            controller.enqueue(
              encoder.encode(sse({ type: "done", provider: "gemini", model }))
            );
            controller.close();
            return;
          }

          const body = await res.text();
          lastError = { status: res.status, body };

          // Try next model on quota / not found
          if (res.status === 429 || res.status === 404) continue;
          break;
        }

        const parsed = parseProviderError("Gemini", lastError.status, lastError.body);

        if (parsed.fallbackDemo) {
          const fallback = streamTextResponse(
            getQuotaFallbackReply(parsed.retrySeconds),
            { provider: "demo", fallback: true }
          );
          const reader = fallback.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
          return;
        }

        controller.enqueue(
          encoder.encode(sse({ type: "error", message: parsed.message, code: parsed.code }))
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Gemini error";
        controller.enqueue(
          encoder.encode(
            sse({
              type: "error",
              message: `**Gemini request failed**\n\n${message}\n\nUse **Provider → Demo**.`,
            })
          )
        );
      } finally {
        controller.close();
      }
    },
  });
}
