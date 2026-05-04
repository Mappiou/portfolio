import { test, expect } from "@playwright/test";

test.describe("Homepage routing", () => {
  test("redirects / to a default language", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBe(true);
    await expect(page).toHaveURL(/\/(fr|en|es)$/);
  });

  test("FR home loads with French sections", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Mathieu/i);
    await expect(page.getByRole("heading", { name: /étapes/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /trois apps/i })).toBeVisible();
  });

  test("EN home loads with English sections", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: /a few stops/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /three apps/i })).toBeVisible();
  });

  test("ES home loads with Spanish sections", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByRole("heading", { name: /algunas paradas/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /tres apps/i })).toBeVisible();
  });

  test("language switcher updates URL and content", async ({ page }) => {
    await page.goto("/fr");
    // Click the EN language pill (aria-label is the localized name "Anglais" when on /fr)
    await page
      .getByRole("link", { name: /english|anglais|inglés/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByRole("heading", { name: /a few stops/i })).toBeVisible();
  });
});

test.describe("Project pages", () => {
  for (const id of ["volley-meteo", "scan2pdf", "triolinguo"]) {
    test(`/fr/projects/${id} renders with QR + APK link that downloads successfully`, async ({
      page,
      request,
    }) => {
      await page.goto(`/fr/projects/${id}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const downloadLink = page.getByRole("link", { name: /Télécharger l'APK/i });
      await expect(downloadLink).toBeVisible();
      const href = await downloadLink.getAttribute("href");
      // APKs are bundled in public/apks/, served from the deployed origin
      expect(href).toMatch(/^\/apks\/[\w-]+\.apk$/);
      // The APK should actually be reachable (the file exists)
      const apkResponse = await request.head(href!);
      expect(apkResponse.status()).toBe(200);
    });
  }

  test("project detail back link returns to home in same language", async ({ page }) => {
    await page.goto("/en/projects/volley-meteo");
    await page.getByRole("link", { name: /Back to home/i }).click();
    await expect(page).toHaveURL(/\/en$/);
  });

  test("clicking a project card from home navigates to detail", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("heading", { name: /Volley Météo/ }).click();
    await expect(page).toHaveURL(/\/fr\/projects\/volley-meteo/);
  });
});

test.describe("CV download", () => {
  test("home has a Download CV link pointing to the PDF", async ({ page }) => {
    await page.goto("/fr");
    const cvLink = page.getByRole("link", { name: /Télécharger le CV/i }).first();
    await expect(cvLink).toBeVisible();
    expect(await cvLink.getAttribute("href")).toBe("/cv/Mathieu_Diep_CV.pdf");
  });
});

test.describe("404 handling", () => {
  test("unknown route inside a language shows 404 page", async ({ page }) => {
    await page.goto("/fr/this-route-does-not-exist");
    await expect(page.getByText("404")).toBeVisible();
  });
});

test.describe("Education section", () => {
  test("renders the 6-step vertical timeline with all milestones", async ({ page }) => {
    await page.goto("/fr");
    await page.locator("#education").scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { level: 3, name: /Baccalauréat/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: /Entrée à l'UTT/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: /Canada/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: /Chine/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: /Diplôme d'ingénieur/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: /Master 2/i })).toBeVisible();
  });

  test("clicking a timeline step expands its details", async ({ page }) => {
    await page.goto("/fr");
    await page.locator("#education").scrollIntoViewIfNeeded();
    const canadaButton = page.getByRole("button", { name: /Canada/i });
    await expect(canadaButton).toHaveAttribute("aria-expanded", "false");
    await canadaButton.click();
    await expect(canadaButton).toHaveAttribute("aria-expanded", "true");
    // Detail content appears (description mentions immersion)
    await expect(
      page.getByText(/immersion académique nord-américaine|culture nord-américaine/i).first(),
    ).toBeVisible();
  });

  test("Education section appears between Timeline and Passions in DOM order", async ({ page }) => {
    await page.goto("/fr");
    const sections = page.locator("section[id]");
    const ids = await sections.evaluateAll((els) => els.map((e) => e.id));
    const tIdx = ids.indexOf("timeline");
    const eIdx = ids.indexOf("education");
    const pIdx = ids.indexOf("passions");
    expect(tIdx).toBeGreaterThan(-1);
    expect(eIdx).toBeGreaterThan(tIdx);
    expect(pIdx).toBeGreaterThan(eIdx);
  });
});

test.describe("Passions section", () => {
  test("renders 3 passion cards (sport, tech, travel) with sub-items", async ({ page }) => {
    await page.goto("/fr");
    await page.locator("#passions").scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { level: 3, name: /^Sport$/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: /Nouvelles technologies/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: /Voyages/i })).toBeVisible();
    // Sub-items visible
    await expect(page.getByText(/Badminton/i).first()).toBeVisible();
    await expect(page.getByText(/Patin à glace/i).first()).toBeVisible();
    await expect(page.getByText(/Amérique du Sud/i).first()).toBeVisible();
  });
});

test.describe("Timeline expand", () => {
  test("clicking a timeline pill expands its detail panel", async ({ page }) => {
    await page.goto("/fr");
    const hexamindPill = page.getByRole("button", { name: /Hexamind/i });
    await expect(hexamindPill).toBeVisible();
    // Initially collapsed
    await expect(hexamindPill).toHaveAttribute("aria-expanded", "false");
    await hexamindPill.click();
    await expect(hexamindPill).toHaveAttribute("aria-expanded", "true");
    // Detail content appears (description + at least one bullet from CV)
    await expect(page.getByText(/RAG/i).first()).toBeVisible();
  });

  test("opening a second pill closes the previous one (single-open accordion)", async ({
    page,
  }) => {
    await page.goto("/fr");
    const hexa = page.getByRole("button", { name: /Hexamind/i });
    const lincoln = page.getByRole("button", { name: /Lincoln/i });
    await hexa.click();
    await expect(hexa).toHaveAttribute("aria-expanded", "true");
    await lincoln.click();
    await expect(lincoln).toHaveAttribute("aria-expanded", "true");
    await expect(hexa).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Accessibility", () => {
  test("home has main landmark + banner + footer", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
