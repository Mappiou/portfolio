import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useVariantPreference } from "@shared/hooks/useVariantPreference";

describe("useVariantPreference", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when no preference is stored", () => {
    const { result } = renderHook(() => useVariantPreference());
    expect(result.current.get()).toBeNull();
  });

  it("persists and retrieves a preference", () => {
    const { result } = renderHook(() => useVariantPreference());
    result.current.set({ variant: "cinema", lang: "fr" });
    expect(result.current.get()).toEqual({ variant: "cinema", lang: "fr" });
  });

  it("ignores invalid stored values", () => {
    window.localStorage.setItem("portfolio:preference", '{"variant":"unknown"}');
    const { result } = renderHook(() => useVariantPreference());
    expect(result.current.get()).toBeNull();
  });

  it("ignores malformed JSON", () => {
    window.localStorage.setItem("portfolio:preference", "{not-json");
    const { result } = renderHook(() => useVariantPreference());
    expect(result.current.get()).toBeNull();
  });

  it("clears the preference", () => {
    const { result } = renderHook(() => useVariantPreference());
    result.current.set({ variant: "editorial", lang: "en" });
    result.current.clear();
    expect(result.current.get()).toBeNull();
  });
});
