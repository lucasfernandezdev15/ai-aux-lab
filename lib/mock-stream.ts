const DEMO_RESPONSE = `## AI UX Lab — Portfolio v2

Versión lista para **recruiters** y deploy en Vercel:

### Lo que estás viendo

1. **Streaming SSE** con tokens en tiempo real
2. **Markdown** con tablas GFM y syntax highlighting
3. **Multi-provider** — OpenAI, Anthropic o este demo
4. **Memory** inyectada al system prompt

\`\`\`typescript
// Patrón de consumo del stream
for await (const chunk of readSSE(res.body)) {
  if (chunk.type === "token") append(chunk.text);
  if (chunk.type === "tool") updateTimeline(chunk.tool);
}
\`\`\`

| Capa | Tecnología |
|------|------------|
| UI | Next.js 15 + Tailwind |
| API | Edge Route Handlers |
| LLM | OpenAI · Anthropic · Demo |

> **Tip hiring:** explicá por qué separaste SSE, estado de sesión y provider en capas distintas.

¿Querés que compare este approach con un wrapper de Vercel AI SDK?`;

const CHUNK_SIZE = 10;

export function* chunkText(text: string): Generator<string> {
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    yield text.slice(i, i + CHUNK_SIZE);
  }
}

export function getDemoResponse(): string {
  return DEMO_RESPONSE;
}
