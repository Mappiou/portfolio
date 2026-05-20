const SUPPORTED = ["fr", "en", "es"] as const;
export type SupportedLang = (typeof SUPPORTED)[number];

function isSupported(lang: string): lang is SupportedLang {
  return (SUPPORTED as readonly string[]).includes(lang);
}

export function detectInitialLanguage(): SupportedLang {
  if (typeof window === "undefined") return "fr";
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  return isSupported(nav) ? nav : "fr";
}
