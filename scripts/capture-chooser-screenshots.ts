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
    // Scroll past the Hero ("Salut, je suis Mathieu") so the chooser
    // background previews show actual content sections (bio, projects).
    await page.evaluate(() => window.scrollTo(0, 1100));
    await page.waitForTimeout(800);
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
