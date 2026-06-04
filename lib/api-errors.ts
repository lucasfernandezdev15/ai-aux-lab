export function parseProviderError(
  provider: string,
  status: number,
  rawBody: string
): { message: string; code?: string; fallbackDemo?: boolean; retrySeconds?: number } {
  let parsed: { error?: { code?: number; message?: string; status?: string } } = {};
  try {
    parsed = JSON.parse(rawBody) as typeof parsed;
  } catch {
    /* use raw text */
  }

  const apiMessage = parsed.error?.message ?? "";
  const retryMatch = rawBody.match(/retry in ([\d.]+)s/i);
  const retrySeconds = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : undefined;
  const limitZero = /limit:\s*0/i.test(rawBody);
  const modelMatch = rawBody.match(/model:\s*([\w.-]+)/i);
  const model = modelMatch?.[1] ?? "this model";

  if (status === 429) {
    const retryLine = retrySeconds
      ? `You can retry Gemini in about **${retrySeconds}s**, or use **Demo** now.`
      : "Wait a minute and retry, or use **Demo** now.";

    const modelHint = limitZero
      ? `\n\nFree tier shows **no quota** for \`${model}\`. Set \`GEMINI_MODEL=gemini-2.5-flash\` (or \`gemini-1.5-flash\`) in Vercel / \`.env.local\`.`
      : "";

    return {
      code: "quota_exceeded",
      fallbackDemo: true,
      retrySeconds,
      message:
        `**Gemini quota exceeded**\n\n` +
        `${retryLine} Demo mode needs no API key — switch **Provider → Demo** in the right panel.` +
        modelHint,
    };
  }

  if (status === 401 || status === 403) {
    return {
      code: "auth_error",
      message:
        `**${provider} authentication failed (${status})**\n\n` +
        `Check \`GEMINI_API_KEY\` in \`.env.local\` or Vercel Environment Variables.`,
    };
  }

  if (status === 404) {
    return {
      code: "model_not_found",
      message:
        `**${provider} model not found (404)**\n\n` +
        `Try \`GEMINI_MODEL=gemini-2.5-flash\` or \`gemini-1.5-flash\`.`,
    };
  }

  return {
    message:
      `**${provider} error (${status})**\n\n` +
      (apiMessage || rawBody.slice(0, 180)),
  };
}
