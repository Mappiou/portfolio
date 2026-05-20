import { describe, it, expect } from "vitest";
import { uiStrings } from "../../src/content";

const fr = uiStrings.fr;
const en = uiStrings.en;
const es = uiStrings.es;

function collectKeys(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    collectKeys(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe("locale bundles (uiStrings in src/content.ts)", () => {
  it("FR, EN, ES all share the exact same key set", () => {
    const frKeys = collectKeys(fr).sort();
    const enKeys = collectKeys(en).sort();
    const esKeys = collectKeys(es).sort();
    expect(enKeys).toEqual(frKeys);
    expect(esKeys).toEqual(frKeys);
  });

  it("no locale value is empty", () => {
    function checkValues(obj: unknown, path = "root") {
      if (typeof obj === "string") {
        expect(obj.length, `${path} should not be empty`).toBeGreaterThan(0);
        return;
      }
      if (typeof obj === "object" && obj !== null) {
        for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
          checkValues(v, `${path}.${k}`);
        }
      }
    }
    checkValues(fr, "fr");
    checkValues(en, "en");
    checkValues(es, "es");
  });
});
