"use client";

import { useCallback, useEffect, useState } from "react";
import type { AIProvider } from "@/lib/ai-providers";

const STORAGE_KEY = "ai-ux-lab-provider";

export function useProvider() {
  const [provider, setProviderState] = useState<AIProvider>("demo");
  const [available, setAvailable] = useState<AIProvider[]>(["demo"]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((data: { available: AIProvider[]; default: AIProvider }) => {
        setAvailable(data.available);
        const stored = localStorage.getItem(STORAGE_KEY) as AIProvider | null;
        const pick =
          stored && data.available.includes(stored)
            ? stored
            : (data.default ?? "demo");
        setProviderState(pick);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const setProvider = useCallback(
    (p: AIProvider) => {
      if (!available.includes(p)) return;
      setProviderState(p);
      localStorage.setItem(STORAGE_KEY, p);
    },
    [available]
  );

  return { provider, setProvider, available, loaded };
}
