import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'desktop_1280', width: 1280, height: 800 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 },
  ];

  fs.mkdirSync('scratch/captures', { recursive: true });

  for (const vp of viewports) {
    console.log(`Capturing ${vp.name}...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2, // retina 2x
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500); // let GSAP initial reveals settle

    // 1. Hero & Header
    await page.screenshot({ path: `scratch/captures/${vp.name}_hero.png` });

    // 2. Discover section
    const discover = page.locator('#discover');
    if (await discover.count() > 0) {
      await discover.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.screenshot({ path: `scratch/captures/${vp.name}_discover.png` });
    }

    // 3. Community section
    const comm = page.locator('text=A Community That Belongs').first();
    if (await comm.count() > 0) {
      await comm.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.screenshot({ path: `scratch/captures/${vp.name}_community.png` });
    }

    // 4. Life at MGS section
    const life = page.locator('#life-at-mgs');
    if (await life.count() > 0) {
      await life.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.screenshot({ path: `scratch/captures/${vp.name}_life_cards.png` });
    }

    // 5. Admissions Banner
    const adm = page.locator('#admissions-banner');
    if (await adm.count() > 0) {
      await adm.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.screenshot({ path: `scratch/captures/${vp.name}_admissions_banner.png` });
    }

    await context.close();
  }

  await browser.close();
  console.log('--- All Viewport Captures Completed Successfully! ---');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
