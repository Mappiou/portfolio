import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import { dirname } from "node:path";

const TARGETS = [
  { url: "http://localhost:5173/cinema/fr", out: "public/shared/chooser/cinema.webp" },
  { url: "http://localhost:5173/editorial/fr", out: "public/shared/chooser/editorial.webp" },
];

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1200 } });
  for (const { url, out } of TARGETS) {
    await mkdir(dirname(out), { recursive: true });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);
    // Snap the travel timeline section (#travels). This shows the
    // signature "voyages" frieze of each variant so the chooser
    // previews actually compare the two visual languages.
    await page.evaluate(() => {
      const el = document.getElementById("travels");
      if (el) {
        const rect = el.getBoundingClientRect();
        window.scrollTo({ top: rect.top + window.scrollY - 40, behavior: "auto" });
      }
    });
    await page.waitForTimeout(1500);
    const pngBuffer = await page.screenshot({ fullPage: false, type: "png" });
    await sharp(pngBuffer).webp({ quality: 78 }).toFile(out);
    const sizeKb = Math.round((await stat(out)).size / 1024);
    console.log(`Captured ${url} -> ${out} (${sizeKb} kB)`);
    await page.close();
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
