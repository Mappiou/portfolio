export function resolveAbsoluteUrl(href: string): string {
  if (typeof window === "undefined") return href;
  if (/^https?:\/\//i.test(href)) return href;
  try {
    return new URL(href, window.location.origin).toString();
  } catch {
    return href;
  }
}
