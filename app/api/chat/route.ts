import { buildSystemPrompt } from "@/lib/build-system-prompt";
import { resolveProvider, type AIProvider } from "@/lib/ai-providers";
import { chunkText, getDemoResponse } from "@/lib/mock-stream";
import { streamAnthropic } from "@/lib/providers/anthropic";
import { streamGemini } from "@/lib/providers/gemini";
import { streamOpenAI } from "@/lib/providers/openai";
import type { MemoryItem, Message } from "@/lib/types";

export const runtime = "edge";

function sse(data: object): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function getAvailableProviders(): AIProvider[] {
  const list: AIProvider[] = ["demo"];
  if (process.env.OPENAI_API_KEY) list.push("openai");
  if (process.env.ANTHROPIC_API_KEY) list.push("anthropic");
  if (process.env.GEMINI_API_KEY) list.push("gemini");
  return list;
}

function streamDemo(useTools: boolean): ReadableStream {
  const encoder = new TextEncoder();
  const text = getDemoResponse();

  return new ReadableStream({
    async start(controller) {
      if (useTools) {
        const tools = [
          { id: "t1", name: "get_weather", args: { city: "Buenos Aires" } },
          { id: "t2", name: "search_repo", args: { query: "stack" } },
        ];
        for (const [i, tool] of tools.entries()) {
          controller.enqueue(
            encoder.encode(
              sse({
                type: "tool",
                tool: { ...tool, status: "running" },
              })
            )
          );
          await delay(350 + i * 50);
          controller.enqueue(
            encoder.encode(
              sse({
                type: "tool",
                tool: {
                  ...tool,
                  status: "done",
                  result:
                    tool.name === "get_weather"
                      ? "22C, partly cloudy"
                      : "Next.js 15, TypeScript, Tailwind, Anthropic",
                },
              })
            )
          );
        }
      }

      for (const chunk of chunkText(text)) {
        controller.enqueue(encoder.encode(sse({ type: "token", text: chunk })));
        await delay(26);
      }
      controller.enqueue(encoder.encode(sse({ type: "done", provider: "demo" })));
      controller.close();
    },
  });
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    messages: Message[];
    memory?: MemoryItem[];
    simulateTools?: boolean;
    provider?: AIProvider;
  };

  const messages = body.messages ?? [];
  const memory = body.memory ?? [];
  const simulateTools = body.simulateTools ?? false;
  const available = getAvailableProviders();
  const provider = resolveProvider(body.provider, available);
  const systemPrompt = buildSystemPrompt(memory);

  let stream: ReadableStream;

  if (provider === "openai") {
    stream = await streamOpenAI(messages, systemPrompt);
  } else if (provider === "anthropic") {
    stream = streamAnthropic(messages, systemPrompt);
  } else if (provider === "gemini") {
    stream = streamGemini(messages, systemPrompt);
  } else {
    stream = streamDemo(simulateTools);
  }

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-AI-Provider": provider,
    },
  });
}
