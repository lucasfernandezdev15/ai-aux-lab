/** Short streamed reply when Gemini quota fails — not the full portfolio demo doc */
export function getQuotaFallbackReply(retrySeconds?: number): string {
  const retry = retrySeconds
    ? `Retry Gemini in ~${retrySeconds}s, or `
    : "";

  return (
    `I'm running in **Demo mode** because Gemini returned a quota error.\n\n` +
    `${retry}pick **Provider → Demo** in the right panel to avoid this message.\n\n` +
    `Your message was received. On the free tier, \`gemini-2.0-flash\` often has **limit: 0** — use \`GEMINI_MODEL=gemini-2.5-flash\` in env vars.\n\n` +
    `**Sample reply (demo):** This project streams tokens over SSE, renders markdown, and supports multi-session chat — switch to Demo anytime for interviews without an API key.`
  );
}
