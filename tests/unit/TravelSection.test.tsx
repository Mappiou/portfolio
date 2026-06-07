import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { TravelSection as EditorialTravelSection } from "../../src/variants/editorial/components/sections/TravelSection";
import { TravelSection as CinemaTravelSection } from "../../src/variants/cinema/components/sections/TravelSection";
import "@shared/i18n";

const variants = [
  { name: "editorial", base: "editorial", Section: EditorialTravelSection },
  { name: "cinema", base: "cinema", Section: CinemaTravelSection },
] as const;

function renderSection(base: string, Section: () => React.ReactElement) {
  return render(
    <MemoryRouter initialEntries={[`/${base}/fr`]}>
      <Routes>
        <Route path={`/${base}/:lang`} element={<Section />} />
      </Routes>
    </MemoryRouter>,
  );
}

function heroSrc(): string | null {
  return screen.getByAltText("Pérou").getAttribute("src");
}

function thumbButtons() {
  return screen.getAllByRole("button", { name: /agrandir/i });
}

describe.each(variants)("<TravelSection /> [$name] — échange photo héros / vignette", ({ base, Section }) => {
  it("affiche le Pérou en grand avec photos/peru-1.jpg par défaut", () => {
    renderSection(base, Section);
    expect(heroSrc()).toBe("/travels/peru-1.jpg");
  });

  it("rend exactement 3 vignettes cliquables", () => {
    renderSection(base, Section);
    expect(thumbButtons()).toHaveLength(3);
  });

  it("un seul clic sur une vignette la fait passer en grande photo", () => {
    renderSection(base, Section);
    const thumbs = thumbButtons();
    const clickedSrc = within(thumbs[0]!).getByRole("img").getAttribute("src");
    expect(clickedSrc).toBe("/travels/peru-2.jpg");

    fireEvent.click(thumbs[0]!);

    expect(heroSrc()).toBe("/travels/peru-2.jpg");
  });

  it("renvoie l'ancienne grande photo dans les vignettes après l'échange", () => {
    renderSection(base, Section);
    fireEvent.click(thumbButtons()[0]!);

    const thumbSrcs = thumbButtons().map((b) => within(b).getByRole("img").getAttribute("src"));
    expect(thumbSrcs).toContain("/travels/peru-1.jpg");
    expect(thumbSrcs).not.toContain("/travels/peru-2.jpg");
    expect(heroSrc()).toBe("/travels/peru-2.jpg");
  });

  it("permet plusieurs échanges successifs", () => {
    renderSection(base, Section);
    fireEvent.click(thumbButtons()[0]!);
    expect(heroSrc()).toBe("/travels/peru-2.jpg");

    const lastThumb = thumbButtons()[2]!;
    const lastSrc = within(lastThumb).getByRole("img").getAttribute("src");
    fireEvent.click(lastThumb);
    expect(heroSrc()).toBe(lastSrc);
  });

  it("conserve une seule grande photo (pas de doublon) après échange", () => {
    renderSection(base, Section);
    fireEvent.click(thumbButtons()[1]!);

    const allSrcs = [
      heroSrc(),
      ...thumbButtons().map((b) => within(b).getByRole("img").getAttribute("src")),
    ];
    expect(new Set(allSrcs).size).toBe(allSrcs.length);
  });
});
