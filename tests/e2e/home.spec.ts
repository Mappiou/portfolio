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
    test(`/fr/projects/${id} renders with QR + APK link`, async ({ page }) => {
      await page.goto(`/fr/projects/${id}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const downloadLink = page.getByRole("link", { name: /Télécharger l'APK/i });
      await expect(downloadLink).toBeVisible();
      const href = await downloadLink.getAttribute("href");
      expect(href).toMatch(/^https:\/\/github\.com\/.*\.apk$/);
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

test.describe("Accessibility", () => {
  test("home has main landmark + banner + footer", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
