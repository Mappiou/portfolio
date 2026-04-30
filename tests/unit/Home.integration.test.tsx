import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../../src/components/layout/Layout";
import Home from "../../src/pages/Home";
import ProjectDetail from "../../src/pages/ProjectDetail";
import NotFound from "../../src/pages/NotFound";
import "../../src/i18n";

function renderApp(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("integration — full app render", () => {
  it("renders Home in FR with all sections", () => {
    renderApp("/fr");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByText(/Mathieu/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/parcours/i).length).toBeGreaterThan(0);
  });

  it("renders Home in EN with English content", () => {
    renderApp("/en");
    expect(screen.getAllByText(/Career/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Education/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Skills/i).length).toBeGreaterThan(0);
  });

  it("renders Home in ES with Spanish content", () => {
    renderApp("/es");
    expect(screen.getAllByText(/Trayectoria/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Estudios/i).length).toBeGreaterThan(0);
  });

  it("renders ProjectDetail for volley-meteo with QR code", () => {
    const { container } = renderApp("/fr/projects/volley-meteo");
    expect(screen.getByRole("heading", { level: 1, name: /Volley Météo/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Télécharger/i })).toBeInTheDocument();
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
  });

  it("renders ProjectDetail for scan2pdf in EN", () => {
    renderApp("/en/projects/scan2pdf");
    expect(screen.getByRole("heading", { level: 1, name: /Scan2PDF/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download APK/i })).toBeInTheDocument();
  });

  it("renders ProjectDetail for triolinguo in ES", () => {
    renderApp("/es/projects/triolinguo");
    expect(screen.getByRole("heading", { level: 1, name: /Triolinguo/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Descargar APK/i })).toBeInTheDocument();
  });

  it("renders NotFound page for unknown route", () => {
    renderApp("/fr/this-route-does-not-exist");
    expect(screen.getByText("404")).toBeInTheDocument();
    // back-home link from the NotFound page (additional to header/lang links)
    expect(screen.getAllByRole("link").length).toBeGreaterThan(0);
  });

  it("Footer has email, GitHub and LinkedIn links", () => {
    renderApp("/fr");
    const footer = screen.getByRole("contentinfo");
    expect(footer.querySelector('a[href^="mailto:"]')).toBeTruthy();
    expect(footer.querySelector('a[href*="github"]')).toBeTruthy();
    expect(footer.querySelector('a[href*="linkedin"]')).toBeTruthy();
  });
});
