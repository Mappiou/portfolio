import { describe, it, expect } from "vitest";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, isSupportedLanguage } from "../../src/i18n";

describe("i18n config", () => {
  it("supports fr, en, es", () => {
    expect(SUPPORTED_LANGUAGES).toEqual(["fr", "en", "es"]);
  });

  it("defaults to fr", () => {
    expect(DEFAULT_LANGUAGE).toBe("fr");
  });

  it("isSupportedLanguage accepts known languages", () => {
    expect(isSupportedLanguage("fr")).toBe(true);
    expect(isSupportedLanguage("en")).toBe(true);
    expect(isSupportedLanguage("es")).toBe(true);
  });

  it("isSupportedLanguage rejects unknown languages", () => {
    expect(isSupportedLanguage("de")).toBe(false);
    expect(isSupportedLanguage("zh")).toBe(false);
    expect(isSupportedLanguage("")).toBe(false);
  });
});
