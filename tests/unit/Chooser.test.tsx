import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { Chooser } from "@shared/components/Chooser";

function renderChooser(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Chooser />
    </MemoryRouter>
  );
}

function PathSentinel() {
  const location = useLocation();
  return <div data-testid="current-path">{location.pathname}</div>;
}

function renderChooserWithRouting() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Chooser />} />
        <Route path="/:variant/:lang" element={<PathSentinel />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Chooser", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders two variant buttons", () => {
    renderChooser();
    expect(screen.getByLabelText(/Portfolio Cinema/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Portfolio Editorial/i)).toBeInTheDocument();
  });

  it("renders the language dropdown", () => {
    renderChooser();
    expect(screen.getByRole("group", { name: /langue/i })).toBeInTheDocument();
  });

  it("shows 'Ta dernière visite' chip when a preference exists", () => {
    window.localStorage.setItem(
      "portfolio:preference",
      JSON.stringify({ variant: "cinema", lang: "fr" })
    );
    renderChooser();
    expect(screen.getByText(/Ta dernière visite/i)).toBeInTheDocument();
  });

  it("updates the active language when clicking the dropdown", () => {
    renderChooser();
    const enButton = screen.getByRole("button", { name: /^en$/i });
    fireEvent.click(enButton);
    expect(enButton).toHaveAttribute("aria-pressed", "true");
  });

  it("clicking a variant half persists the preference and navigates", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    renderChooserWithRouting();
    fireEvent.click(screen.getByLabelText(/Portfolio Cinema/i));

    expect(setItemSpy).toHaveBeenCalledWith(
      "portfolio:preference",
      expect.stringContaining('"variant":"cinema"')
    );
    expect(screen.getByTestId("current-path").textContent).toMatch(/^\/cinema\//);
    setItemSpy.mockRestore();
  });
});
