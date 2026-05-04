import { describe, it, expect } from "vitest";
import { resolveAbsoluteUrl } from "../../src/lib/url";

describe("resolveAbsoluteUrl", () => {
  it("keeps absolute https URLs unchanged", () => {
    const url = "https://github.com/mathieudiep/portfolio";
    expect(resolveAbsoluteUrl(url)).toBe(url);
  });

  it("keeps absolute http URLs unchanged", () => {
    const url = "http://example.com/file.pdf";
    expect(resolveAbsoluteUrl(url)).toBe(url);
  });

  it("prefixes relative URLs with window.location.origin", () => {
    expect(resolveAbsoluteUrl("/apks/volley_meteo.apk")).toBe(
      `${window.location.origin}/apks/volley_meteo.apk`,
    );
  });

  it("handles paths without a leading slash", () => {
    expect(resolveAbsoluteUrl("apks/scan2pdf.apk")).toContain("apks/scan2pdf.apk");
  });
});
