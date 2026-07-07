import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.screenshot({ path: ".screenshots/01-splash.png" });
await page.evaluate(() => window.scrollTo(0, 500));
await page.waitForTimeout(1000);
await page.screenshot({ path: ".screenshots/02-carousel.png" });
await page.evaluate(() => window.scrollTo(0, 1500));
await page.waitForTimeout(1000);
await page.screenshot({ path: ".screenshots/03-notes.png" });
await browser.close();
console.log("done");
