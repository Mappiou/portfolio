import { test, expect } from "@playwright/test";

test.describe("portfolio routing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("/ shows the Chooser with both variants", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel(/Portfolio Cinema/i)).toBeVisible();
    await expect(page.getByLabel(/Portfolio Editorial/i)).toBeVisible();
  });

  test("clicking Cinema navigates to /cinema/:lang", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/Portfolio Cinema/i).click();
    await expect(page).toHaveURL(/\/cinema\/(fr|en|es)/);
  });

  test("clicking Editorial navigates to /editorial/:lang", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/Portfolio Editorial/i).click();
    await expect(page).toHaveURL(/\/editorial\/(fr|en|es)/);
  });

  test("VariantSwitchButton on /cinema goes to /editorial", async ({ page }) => {
    await page.goto("/cinema/fr");
    await page.getByRole("button", { name: /Voir l'autre vue/i }).click();
    await expect(page).toHaveURL(/\/editorial\/fr/);
  });

  test("VariantSwitchButton on /editorial goes to /cinema", async ({ page }) => {
    await page.goto("/editorial/fr");
    await page.getByRole("button", { name: /Voir l'autre vue/i }).click();
    await expect(page).toHaveURL(/\/cinema\/fr/);
  });

  test("unknown URLs redirect to the Chooser", async ({ page }) => {
    await page.goto("/projects/anything");
    await expect(page).toHaveURL("/");
    await expect(page.getByLabel(/Portfolio Cinema/i)).toBeVisible();
  });

  test("preference is persisted across reloads", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/Portfolio Editorial/i).click();
    await expect(page).toHaveURL(/\/editorial\/(fr|en|es)/);

    await page.goto("/");
    await expect(page.getByText(/Ta dernière visite/i)).toBeVisible();
  });

  test("internal nav links stay under /cinema/... (regression: variant prefix preserved)", async ({ page }) => {
    await page.goto("/cinema/fr");
    await page.waitForURL(/\/cinema\/fr/);
    const navLinks = page.getByRole("navigation").getByRole("link");
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith("/#") && href !== "/") {
        expect(href).toMatch(/^\/(cinema|editorial)\//);
      }
    }
  });

  test("direct navigation to /cinema/en persists preference to localStorage", async ({ page }) => {
    await page.goto("/cinema/en");
    const pref = await page.evaluate(() => window.localStorage.getItem("portfolio:preference"));
    expect(pref).not.toBeNull();
    const parsed = JSON.parse(pref!);
    expect(parsed.variant).toBe("cinema");
    expect(parsed.lang).toBe("en");
  });
});
