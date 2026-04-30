import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LanguageSwitcher } from "../../src/components/layout/LanguageSwitcher";
import "../../src/i18n";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:lang/*" element={<LanguageSwitcher />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("<LanguageSwitcher />", () => {
  it("renders 3 language links", () => {
    renderAt("/fr");
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("marks the active language with aria-current=page", () => {
    renderAt("/en");
    const en = screen.getByRole("link", { current: "page" });
    expect(en.textContent?.toLowerCase()).toContain("en");
  });

  it("preserves the path when switching language", () => {
    renderAt("/fr/projects/volley-meteo");
    const enLink = screen.getByRole("link", { name: /english|anglais|inglés/i });
    expect(enLink.getAttribute("href")).toBe("/en/projects/volley-meteo");
  });
});
