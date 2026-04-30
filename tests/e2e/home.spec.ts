import { test, expect } from "@playwright/test";

test.describe("Homepage routing", () => {
  test("redirects / to a default language", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBe(true);
    await expect(page).toHaveURL(/\/(fr|en|es)$/);
  });

  test("FR home loads with French content", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.getByRole("heading", { name: /Mathieu/i })).toBeVisible();
    await expect(page.getByText(/parcours/i).first()).toBeVisible();
  });

  test("EN home loads with English content", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByText(/Career/i).first()).toBeVisible();
    await expect(page.getByText(/Education/i).first()).toBeVisible();
  });

  test("ES home loads with Spanish content", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByText(/Trayectoria/i).first()).toBeVisible();
    await expect(page.getByText(/Estudios/i).first()).toBeVisible();
  });

  test("language switcher updates URL and content", async ({ page }) => {
    await page.goto("/fr");
    // The EN link is labelled in the current language ("Anglais" when on /fr)
    await page.getByRole("link", { name: /english|anglais|inglés/i }).click();
    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByText(/Career/i).first()).toBeVisible();
  });
});

test.describe("Project pages", () => {
  for (const id of ["volley-meteo", "scan2pdf", "triolinguo"]) {
    test(`/fr/projects/${id} loads with QR code and APK link`, async ({ page }) => {
      await page.goto(`/fr/projects/${id}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const downloadLink = page.getByRole("link", { name: /Télécharger/i });
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
});

test.describe("404 handling", () => {
  test("unknown route inside a language shows 404 page", async ({ page }) => {
    await page.goto("/fr/this-route-does-not-exist");
    await expect(page.getByText("404")).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test("home has main landmark and nav", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("nav").first()).toBeVisible();
  });
});
