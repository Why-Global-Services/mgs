const { chromium } = require('playwright');

async function check() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const badge = await page.$('.hero-curiosity-badge');
  if (badge) {
    const box = await badge.boundingBox();
    const style = await badge.evaluate(el => ({
      display: window.getComputedStyle(el).display,
      visibility: window.getComputedStyle(el).visibility,
      opacity: window.getComputedStyle(el).opacity,
      zIndex: window.getComputedStyle(el).zIndex,
    }));
    console.log('Badge box:', box);
    console.log('Badge style:', style);
  }
  const hero = await page.$('section');
  if (hero) {
    await hero.screenshot({ path: 'scratch/verified_hero_desktop_1440.png' });
    console.log('Saved verified_hero_desktop_1440.png');
  }
  await browser.close();
}

check().catch(console.error);
