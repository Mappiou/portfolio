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

describe("Home page integration", () => {
  it("renders all main landmarks (header, main, footer)", () => {
    renderApp("/fr");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders FR home with the hero, bio, timeline, principles, projects, contact sections", () => {
    renderApp("/fr");
    expect(screen.getAllByText(/Mathieu/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/AI Engineer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Hexamind/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /étapes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /quatre choses/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /trois apps/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /construisons/i })).toBeInTheDocument();
  });

  it("renders EN home with English headings", () => {
    renderApp("/en");
    expect(screen.getByRole("heading", { name: /a few stops/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /four things/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /three apps/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /let's build/i })).toBeInTheDocument();
  });

  it("renders ES home with Spanish headings", () => {
    renderApp("/es");
    expect(screen.getByRole("heading", { name: /algunas paradas/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /cuatro cosas/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /tres apps/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /construyamos/i })).toBeInTheDocument();
  });

  it("renders the 5 timeline entries with company names", () => {
    renderApp("/fr");
    for (const company of ["Hexamind", "Lincoln", "Capgemini", "Aubay", "Orange Labs"]) {
      expect(screen.getAllByText(new RegExp(company, "i")).length).toBeGreaterThan(0);
    }
  });

  it("renders 3 project cards with their names", () => {
    renderApp("/fr");
    expect(screen.getByRole("heading", { name: /Volley Météo/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Scan2PDF/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Triolinguo/i })).toBeInTheDocument();
  });

  it("renders ProjectDetail in FR with QR + APK link + back link", () => {
    renderApp("/fr/projects/volley-meteo");
    expect(screen.getByRole("heading", { level: 1, name: /Volley Météo/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Télécharger/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Retour/i })).toBeInTheDocument();
  });

  it("renders ProjectDetail in EN with English labels", () => {
    renderApp("/en/projects/scan2pdf");
    expect(screen.getByRole("heading", { level: 1, name: /Scan2PDF/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download APK/i })).toBeInTheDocument();
  });

  it("renders ProjectDetail in ES with Spanish labels", () => {
    renderApp("/es/projects/triolinguo");
    expect(screen.getByRole("heading", { level: 1, name: /Triolinguo/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Descargar APK/i })).toBeInTheDocument();
  });

  it("renders NotFound on unknown sub-route", () => {
    renderApp("/fr/this-route-does-not-exist");
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("Footer has email + LinkedIn links (GitHub appears only when configured)", () => {
    renderApp("/fr");
    const footer = screen.getByRole("contentinfo");
    expect(footer.querySelector('a[href^="mailto:"]')).toBeTruthy();
    expect(footer.querySelector('a[href*="linkedin"]')).toBeTruthy();
  });
});
