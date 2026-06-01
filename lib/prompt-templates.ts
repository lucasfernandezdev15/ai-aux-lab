import type { PromptTemplate } from "./types";

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "code-review",
    title: "Code review",
    description: "Revisa un snippet y sugiere mejoras",
    category: "Dev",
    prompt:
      "Revisa este código como senior engineer. Señala bugs, smells y una mejora concreta:\n\n```ts\nconst fetchUser = async (id) => {\n  const res = await fetch(`/api/users/${id}`)\n  return res.json()\n}\n```",
  },
  {
    id: "ux-copy",
    title: "UX microcopy",
    description: "Mejora textos de UI para claridad",
    category: "Design",
    prompt:
      "Reescribe estos microcopies para un onboarding B2B SaaS. Tono: claro, humano, sin jerga:\n- \"Invalid credentials\"\n- \"Your trial has ended\"",
  },
  {
    id: "sql-explain",
    title: "Explain SQL",
    description: "Explica una query paso a paso",
    category: "Data",
    prompt:
      "Explica esta query SQL en lenguaje simple y menciona posibles optimizaciones:\n\n```sql\nSELECT u.name, COUNT(o.id)\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE u.created_at > '2024-01-01'\nGROUP BY u.id\nHAVING COUNT(o.id) > 5;\n```",
  },
  {
    id: "tool-demo",
    title: "Tool calling demo",
    description: "Dispara herramientas simuladas",
    category: "Agents",
    prompt:
      "Busca el clima en Buenos Aires y resume el stack del repo ai-ux-lab en 3 bullets.",
  },
];
