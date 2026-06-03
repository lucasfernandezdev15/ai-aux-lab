export function parseProviderError(
  provider: string,
  status: number,
  rawBody: string
): { message: string; code?: string; fallbackDemo?: boolean } {
  let parsed: { error?: { code?: number; message?: string; status?: string } } = {};
  try {
    parsed = JSON.parse(rawBody) as typeof parsed;
  } catch {
    /* use raw text */
  }

  const apiMessage = parsed.error?.message ?? rawBody.slice(0, 200);

  if (status === 429) {
    return {
      code: "quota_exceeded",
      fallbackDemo: true,
      message:
        `**${provider} quota exceeded (429)**\n\n` +
        `Your API key hit the current rate or usage limit (common on the free tier).\n\n` +
        `**What you can do:**\n` +
        `- Switch **Provider** to **Demo** in the right panel (works without a key)\n` +
        `- Wait and retry later, or check [Gemini rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)\n` +
        `- Add billing / a new key in [Google AI Studio](https://aistudio.google.com/apikey)\n\n` +
        `_Details: ${apiMessage}_`,
    };
  }

  if (status === 401 || status === 403) {
    return {
      code: "auth_error",
      message:
        `**${provider} authentication failed (${status})**\n\n` +
        `Check that \`GEMINI_API_KEY\` is valid in \`.env.local\` (local) or Vercel Environment Variables (production).`,
    };
  }

  if (status === 404) {
    return {
      code: "model_not_found",
      message:
        `**${provider} model not found (404)**\n\n` +
        `Try setting \`GEMINI_MODEL=gemini-1.5-flash\` in your environment.`,
    };
  }

  return {
    message: `**${provider} error (${status})**\n\n${apiMessage}`,
  };
}
