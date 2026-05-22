import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = "mobile-check/detail";
const BASE = "http://localhost:5173";

const DEVICE = {
  ...devices["iPhone 13"],
  viewport: { width: 390, height: 844 },
};

const SCENARIOS = [
  { name: "editorial-home-top", path: "/editorial/fr", action: null },
  { name: "editorial-home-drawer", path: "/editorial/fr", action: "openMenu" },
  { name: "cinema-home-top", path: "/cinema/fr", action: null },
  { name: "cinema-home-drawer", path: "/cinema/fr", action: "openMenu" },
  { name: "editorial-project", path: "/editorial/fr/projects/triolinguo", action: null },
  { name: "cinema-project", path: "/cinema/fr/projects/triolinguo", action: null },
  { name: "editorial-contact", path: "/editorial/fr#contact", action: "scrollToContact" },
  { name: "cinema-contact", path: "/cinema/fr#contact", action: "scrollToContact" },
];

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext(DEVICE);

  for (const sc of SCENARIOS) {
    const page = await context.newPage();
    await page.goto(BASE + sc.path, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(700);

    if (sc.action === "openMenu") {
      await page.click('button[aria-expanded="false"]', { timeout: 5000 });
      await page.waitForTimeout(400);
    }
    if (sc.action === "scrollToContact") {
      await page.evaluate(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
    }

    const file = join(OUT_DIR, `${sc.name}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`  ${sc.name} → ${file}`);
    await page.close();
  }

  await context.close();
  await browser.close();
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
