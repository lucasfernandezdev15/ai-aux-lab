# AI UX Lab

**Portfolio-grade demo** de interfaces AI-native — el tipo de proyecto que mostrás cuando te preguntan *"¿cómo construís UX con LLMs?"*

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com/)

## Demo en vivo

> Reemplazá con tu URL tras deploy:

`https://ai-ux-lab.vercel.app` · [Chat](/chat) · [GitHub](https://github.com/lucasfernandezdev15/ai-aux-lab)

## Screenshots

| Chat + streaming | Tool calling & memory | Landing |
|:---:|:---:|:---:|
| ![Chat](https://raw.githubusercontent.com/lucasfernandezdev15/ai-aux-lab/main/public/screenshots/chat.svg) | ![Tools](https://raw.githubusercontent.com/lucasfernandezdev15/ai-aux-lab/main/public/screenshots/tools.svg) | ![Landing](https://raw.githubusercontent.com/lucasfernandezdev15/ai-aux-lab/main/public/screenshots/landing.svg) |

**Para recruiters:** después del deploy, reemplazá los SVG por PNG reales (`public/screenshots/chat.png`, etc.) y actualizá las rutas en este README.

## Elevator pitch (30 segundos)

Construí un **laboratorio de UX para apps con LLMs** en Next.js 15: chat con streaming SSE, render markdown, timeline de tool calling, panel de memoria inyectada al system prompt, multi-session y soporte OpenAI + Anthropic — con modo demo que funciona **sin API key** para entrevistas en vivo.

## Qué demuestra este proyecto

| Competencia | Evidencia en el repo |
|-------------|----------------------|
| **Frontend moderno** | App Router, RSC donde aplica, client islands para chat |
| **Streaming / real-time** | Edge route handler, SSE tipado (`token`, `tool`, `error`) |
| **AI integration** | OpenAI SDK + Anthropic Messages API (fetch) |
| **UX de producto** | Layout ChatGPT-like, mobile drawers, light/dark |
| **Arquitectura** | Separación `lib/providers`, hooks, feature folders |
| **Deploy** | `vercel.json`, env documented, build en CI local |

## Features

- **Chat streaming** — SSE desde `/api/chat`
- **Markdown + syntax highlight** — GFM + Prism
- **Multi-provider** — Demo · OpenAI · Anthropic (selector en UI)
- **Memory panel** — Contexto persistido → `buildSystemPrompt()`
- **Tool calling UI** — Timeline con estados pending → done
- **Multi-session** — Sidebar + `localStorage`
- **Prompt templates** — 4 atajos para demos en entrevista
- **Landing profesional** — Hero, features, stack, CTA
- **Dark / light mode** — CSS variables + `ThemeProvider`

## Quick start

```bash
git clone https://github.com/lucasfernandezdev15/ai-aux-lab.git
cd ai-ux-lab
npm install
npm run dev
```

| Ruta | Descripción |
|------|-------------|
| `/` | Landing portfolio |
| `/chat` | App principal |
| `/api/status` | Providers disponibles (JSON) |

### Variables de entorno

```bash
cp .env.example .env.local
```

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `OPENAI_API_KEY` | No | Activa provider OpenAI |
| `ANTHROPIC_API_KEY` | No | Activa provider Anthropic |
| `NEXT_PUBLIC_SITE_URL` | No | URL para OG / README |
| `NEXT_PUBLIC_GITHUB_URL` | No | Link del repo |

Sin keys → **modo demo** con stream simulado y tools de ejemplo.

## Deploy en Vercel (2 minutos)

1. Push a GitHub
2. [vercel.com/new](https://vercel.com/new) → Import repo
3. Añadir env vars opcionales (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`)
4. Deploy

```bash
# O con CLI
npx vercel --prod
```

## Estructura del proyecto

```
app/
  api/chat/route.ts      # SSE streaming (Edge)
  api/status/route.ts    # Providers disponibles
  chat/page.tsx
  page.tsx               # Landing
components/
  chat/ landing/ panels/ sidebar/ ui/
hooks/
  useChat.ts useProvider.ts
lib/
  providers/             # openai.ts, anthropic.ts
  build-system-prompt.ts
public/screenshots/      # Reemplazar por PNG post-deploy
```

## Preguntas que podés responder en entrevista

1. **¿Por qué SSE y no WebSockets?** Unidireccional, simple detrás de CDNs, suficiente para token streaming.
2. **¿Cómo inyectás memoria?** Items del panel → `buildSystemPrompt()` → system message del provider.
3. **¿Cómo manejás providers?** Resolución server-side según env; cliente persiste preferencia en `localStorage`.
4. **¿Qué harías en v3?** RAG con archivos, auth, sync DB, tests e2e Playwright, Vercel AI SDK opcional.

## Stack

Next.js 15 · TypeScript · Tailwind CSS · Edge Runtime · OpenAI · Anthropic · react-markdown · localStorage

---

**Autor:** actualizá `lib/site.ts` con tu nombre y links antes de aplicar a roles frontend / AI UX.
