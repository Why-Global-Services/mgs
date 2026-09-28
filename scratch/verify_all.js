const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verifyAll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const viewports = [
    { name: 'mobile_320', width: 320, height: 600 },
    { name: 'mobile_360', width: 360, height: 740 },
    { name: 'mobile_375', width: 375, height: 667 },
    { name: 'mobile_390', width: 390, height: 844 },
    { name: 'mobile_414', width: 414, height: 896 },
    { name: 'mobile_430', width: 430, height: 932 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'tablet_820', width: 820, height: 1180 },
    { name: 'tablet_834', width: 834, height: 1194 },
    { name: 'desktop_1280', width: 1280, height: 800 },
    { name: 'desktop_1366', width: 1366, height: 768 },
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'desktop_1600', width: 1600, height: 1000 },
    { name: 'desktop_1920', width: 1920, height: 1080 },
  ];

  const results = [];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait for animations to settle
    await page.waitForTimeout(2500);

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    const hero = await page.$('section');
    const heroBox = hero ? await hero.boundingBox() : null;

    // Screenshot hero
    const heroPath = path.join(__dirname, `verified_hero_${vp.name}.png`);
    if (hero) {
      await hero.screenshot({ path: heroPath });
    }

    // Screenshot full viewport
    const pagePath = path.join(__dirname, `verified_page_${vp.name}.png`);
    await page.screenshot({ path: pagePath });

    results.push({
      viewport: vp.name,
      width: vp.width,
      height: vp.height,
      hasOverflow: overflow,
      heroHeight: heroBox ? Math.round(heroBox.height) : 0,
      heroPath,
      pagePath,
    });

    await context.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

verifyAll().catch(err => {
  console.error(err);
  process.exit(1);
});
