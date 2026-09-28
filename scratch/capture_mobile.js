const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const viewports = [
    { name: '320', width: 320, height: 600 },
    { name: '375', width: 375, height: 667 },
    { name: '390', width: 390, height: 844 },
    { name: '414', width: 414, height: 896 },
    { name: '430', width: 430, height: 932 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait for animations
    await page.waitForTimeout(1600);

    const hero = await page.$('section');
    const outPath = path.join(__dirname, `current_hero_${vp.name}.png`);
    if (hero) {
      await hero.screenshot({ path: outPath });
    } else {
      await page.screenshot({ path: outPath });
    }
    console.log(`Saved: current_hero_${vp.name}.png`);
    await context.close();
  }

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
