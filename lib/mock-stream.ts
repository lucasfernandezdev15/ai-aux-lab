const DEMO_RESPONSE = `## AI UX Lab — Portfolio v2

Production-ready for **recruiters** and Vercel deploy:

### What you are seeing

1. **SSE streaming** with real-time tokens
2. **Markdown** with GFM tables and syntax highlighting
3. **Multi-provider** — Gemini, OpenAI, Anthropic, or this demo
4. **Memory** injected into the system prompt

\`\`\`typescript
// Stream consumption pattern
for await (const chunk of readSSE(res.body)) {
  if (chunk.type === "token") append(chunk.text);
  if (chunk.type === "tool") updateTimeline(chunk.tool);
}
\`\`\`

| Layer | Technology |
|-------|------------|
| UI | Next.js 15 + Tailwind |
| API | Edge Route Handlers |
| LLM | Gemini · OpenAI · Anthropic · Demo |

> **Hiring tip:** explain why SSE, session state, and provider logic live in separate layers.

Want a comparison with the Vercel AI SDK wrapper approach?`;

const CHUNK_SIZE = 10;

export function* chunkText(text: string): Generator<string> {
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    yield text.slice(i, i + CHUNK_SIZE);
  }
}

export function getDemoResponse(): string {
  return DEMO_RESPONSE;
}
