/** Models to try in order (free tier often has quota on 2.5 / 1.5, not 2.0-flash) */
export const GEMINI_MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.5-flash-preview-05-20",
  "gemini-1.5-flash",
  "gemini-2.0-flash",
].filter((m): m is string => Boolean(m));

export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
