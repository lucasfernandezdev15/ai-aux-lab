import type { PromptTemplate } from "./types";

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "code-review",
    title: "Code review",
    description: "Review a snippet and suggest improvements",
    category: "Dev",
    prompt:
      "Review this code as a senior engineer. Flag bugs, smells, and one concrete improvement:\n\n```ts\nconst fetchUser = async (id) => {\n  const res = await fetch(`/api/users/${id}`)\n  return res.json()\n}\n```",
  },
  {
    id: "ux-copy",
    title: "UX microcopy",
    description: "Improve UI copy for clarity",
    category: "Design",
    prompt:
      "Rewrite these microcopies for a B2B SaaS onboarding. Tone: clear, human, no jargon:\n- \"Invalid credentials\"\n- \"Your trial has ended\"",
  },
  {
    id: "sql-explain",
    title: "Explain SQL",
    description: "Explain a query step by step",
    category: "Data",
    prompt:
      "Explain this SQL query in plain language and mention possible optimizations:\n\n```sql\nSELECT u.name, COUNT(o.id)\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE u.created_at > '2024-01-01'\nGROUP BY u.id\nHAVING COUNT(o.id) > 5;\n```",
  },
  {
    id: "tool-demo",
    title: "Tool calling demo",
    description: "Trigger simulated tools",
    category: "Agents",
    prompt:
      "Look up the weather in Buenos Aires and summarize the ai-ux-lab repo stack in 3 bullets.",
  },
];
