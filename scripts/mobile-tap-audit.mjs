import { chromium, devices } from "@playwright/test";

const BASE = "http://localhost:5173";
const ROUTES = ["/editorial/fr", "/cinema/fr", "/editorial/fr/projects/triolinguo"];

const DEVICE = {
  ...devices["iPhone 13"],
  viewport: { width: 390, height: 844 },
};

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext(DEVICE);
  for (const path of ROUTES) {
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(800);

    const small = await page.evaluate(() => {
      const selectors = "a, button, [role='button']";
      const els = document.querySelectorAll(selectors);
      const out = [];
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (r.height < 36) {
          out.push({
            tag: el.tagName.toLowerCase(),
            h: Math.round(r.height),
            w: Math.round(r.width),
            top: Math.round(r.top),
            visible: r.top >= 0 && r.top < window.innerHeight,
            text: (el.textContent || "").trim().slice(0, 60),
            ariaLabel: el.getAttribute("aria-label") || null,
          });
        }
      }
      return out;
    });

    console.log(`\n${path}:`);
    for (const t of small) {
      console.log(`  <${t.tag}> ${t.w}x${t.h} top=${t.top} visible=${t.visible} text="${t.text}" aria="${t.ariaLabel}"`);
    }
    await page.close();
  }
  await context.close();
  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
