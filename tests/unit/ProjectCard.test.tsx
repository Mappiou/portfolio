import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ProjectCard } from "../../src/components/projects/ProjectCard";
import { projects } from "../../src/data/projects";
import "../../src/i18n";

function renderCard(lang: "fr" | "en" | "es", projectIndex = 0) {
  const project = projects[projectIndex]!;
  return render(
    <MemoryRouter initialEntries={[`/${lang}`]}>
      <Routes>
        <Route path="/:lang" element={<ProjectCard project={project} index={0} />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("<ProjectCard />", () => {
  it("renders the project name and tagline in FR", () => {
    renderCard("fr", 0);
    expect(screen.getByText("Volley Météo")).toBeInTheDocument();
    expect(screen.getByText(/idéale pour jouer au volley/i)).toBeInTheDocument();
  });

  it("links to the right project detail page using the current language", () => {
    renderCard("en", 1);
    const link = screen.getByRole("link", { name: /Scan2PDF/i });
    expect(link.getAttribute("href")).toBe("/en/projects/scan2pdf");
  });

  it("renders a QR code SVG", () => {
    const { container } = renderCard("fr", 2);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });
});
