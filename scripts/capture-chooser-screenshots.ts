/**
 * Capture chooser background previews.
 *
 * Snaps the travel-section (#travels) of each variant via Playwright,
 * saves a viewport-sized PNG to public/shared/chooser/.
 *
 * The chooser actually ships .webp files. Manual conversion step after
 * running this script (sharp was removed to keep ignore-scripts=true):
 *
 *   brew install webp                      # one-off
 *   cd public/shared/chooser
 *   cwebp -q 80 cinema.png    -o cinema.webp
 *   cwebp -q 80 editorial.png -o editorial.webp
 *   rm cinema.png editorial.png
 *
 * Usage:
 *   pnpm dev    # in another terminal
 *   npx tsx scripts/capture-chooser-screenshots.ts
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const TARGETS = [
  { url: "http://localhost:5173/cinema/fr", out: "public/shared/chooser/cinema.png" },
  { url: "http://localhost:5173/editorial/fr", out: "public/shared/chooser/editorial.png" },
];

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1200 } });
  for (const { url, out } of TARGETS) {
    await mkdir(dirname(out), { recursive: true });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);
    await page.evaluate(() => {
      const el = document.getElementById("travels");
      if (el) {
        const rect = el.getBoundingClientRect();
        window.scrollTo({ top: rect.top + window.scrollY - 40, behavior: "auto" });
      }
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: out, fullPage: false, type: "png" });
    console.log(`Captured ${url} -> ${out}`);
    await page.close();
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
