import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LanguageSwitcher } from "../../src/variants/cinema/components/layout/LanguageSwitcher";
import "@shared/i18n";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/cinema/:lang/*" element={<LanguageSwitcher />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("<LanguageSwitcher />", () => {
  it("renders 3 language links", () => {
    renderAt("/cinema/fr");
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("marks the active language with aria-current=page", () => {
    renderAt("/cinema/en");
    const en = screen.getByRole("link", { current: "page" });
    expect(en.textContent?.toLowerCase()).toContain("en");
  });

  it("preserves the path when switching language", () => {
    renderAt("/cinema/fr/projects/volley-meteo");
    const enLink = screen.getByRole("link", { name: /english|anglais|inglés/i });
    expect(enLink.getAttribute("href")).toBe("/cinema/en/projects/volley-meteo");
  });
});
