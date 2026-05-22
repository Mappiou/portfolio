import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = "mobile-check";
const BASE = "http://localhost:5173";

const DEVICE_PRESETS = {
  "iphone-13": {
    ...devices["iPhone 13"],
    viewport: { width: 390, height: 844 },
  },
  "galaxy-s24": {
    viewport: { width: 384, height: 854 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 14; SM-S921B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
  },
};

const ROUTES = [
  { name: "00-chooser", path: "/" },
  { name: "01-editorial-fr", path: "/editorial/fr" },
  { name: "02-editorial-en", path: "/editorial/en" },
  { name: "03-editorial-project-triolinguo", path: "/editorial/fr/projects/triolinguo" },
  { name: "04-cinema-fr", path: "/cinema/fr" },
  { name: "05-cinema-en", path: "/cinema/en" },
  { name: "06-cinema-project-triolinguo", path: "/cinema/fr/projects/triolinguo" },
];

async function captureRoute(context, deviceName, route) {
  const page = await context.newPage();
  page.on("pageerror", (err) => {
    console.error(`  [${deviceName} ${route.name}] PAGE ERROR:`, err.message);
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error(`  [${deviceName} ${route.name}] CONSOLE ERROR:`, msg.text());
    }
  });

  await page.goto(BASE + route.path, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(800);

  const overflowReport = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const viewportWidth = window.innerWidth;
    const docScroll = Math.max(html.scrollWidth, body.scrollWidth);
    const docClient = html.clientWidth;
    const horizontalOverflow = docScroll > docClient + 1;

    const overflowing = [];
    const all = document.querySelectorAll("body *");
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (r.right > viewportWidth + 1 && r.width > 0 && r.left >= -1) {
        const style = getComputedStyle(el);
        if (style.position === "fixed") continue;
        if (style.visibility === "hidden" || style.display === "none") continue;
        overflowing.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          cls: typeof el.className === "string" ? el.className.slice(0, 80) : null,
          right: Math.round(r.right),
          width: Math.round(r.width),
          text: (el.textContent || "").trim().slice(0, 60),
        });
      }
    }
    return { viewportWidth, docScroll, docClient, horizontalOverflow, overflowing: overflowing.slice(0, 8) };
  });

  const outDir = join(OUT_DIR, deviceName);
  await mkdir(outDir, { recursive: true });
  const file = join(outDir, `${route.name}.png`);
  await page.screenshot({ path: file, fullPage: true });

  const tapTargets = await page.evaluate(() => {
    const selectors = "a, button, [role='button']";
    const els = document.querySelectorAll(selectors);
    const small = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.height < 36 && r.width > 12) {
        small.push({
          tag: el.tagName.toLowerCase(),
          h: Math.round(r.height),
          w: Math.round(r.width),
          text: (el.textContent || "").trim().slice(0, 40),
        });
      }
    }
    return small.slice(0, 6);
  });

  await page.close();
  return { route: route.name, overflowReport, tapTargets, file };
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const summary = {};
  for (const [deviceName, preset] of Object.entries(DEVICE_PRESETS)) {
    console.log(`\n=== ${deviceName} ===`);
    const context = await browser.newContext(preset);
    summary[deviceName] = [];
    for (const route of ROUTES) {
      try {
        const result = await captureRoute(context, deviceName, route);
        const o = result.overflowReport;
        const tt = result.tapTargets.length;
        console.log(
          `  ${route.name}: viewport=${o.viewportWidth} scrollWidth=${o.docScroll} ` +
            `overflow=${o.horizontalOverflow ? "❌ YES" : "✅ no"} elements=${o.overflowing.length} smallTaps=${tt}`
        );
        if (o.horizontalOverflow && o.overflowing.length > 0) {
          console.log(`    overflowing:`);
          for (const e of o.overflowing) {
            console.log(`      <${e.tag} class="${e.cls}"> right=${e.right} width=${e.width} text="${e.text}"`);
          }
        }
        summary[deviceName].push(result);
      } catch (err) {
        console.error(`  ${route.name}: ERROR — ${err.message}`);
      }
    }
    await context.close();
  }
  await browser.close();

  console.log("\n=== SUMMARY ===");
  for (const [device, results] of Object.entries(summary)) {
    const bad = results.filter((r) => r.overflowReport.horizontalOverflow).length;
    const taps = results.reduce((acc, r) => acc + r.tapTargets.length, 0);
    console.log(`${device}: ${bad}/${results.length} routes with horizontal overflow, ${taps} small tap targets total`);
  }
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
