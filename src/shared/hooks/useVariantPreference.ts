import { useCallback } from "react";

const STORAGE_KEY = "portfolio:preference";

export type Variant = "cinema" | "editorial";
export type Preference = { variant: Variant; lang: string };

function isValidPreference(value: unknown): value is Preference {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v["variant"] === "cinema" || v["variant"] === "editorial") &&
    typeof v["lang"] === "string"
  );
}

export function useVariantPreference() {
  const get = useCallback((): Preference | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return isValidPreference(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }, []);

  const set = useCallback((p: Preference) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      // localStorage unavailable (Safari private mode, etc.)
    }
  }, []);

  const clear = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // noop
    }
  }, []);

  return { get, set, clear };
}
