import { chromium } from 'playwright';

async function checkBounds() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const hero = await page.locator('section').first().boundingBox();
  const eyebrow = await page.locator('.hero-eyebrow').boundingBox();
  const heading = await page.locator('.hero-heading').boundingBox();
  const subtitle = await page.locator('.hero-subtitle').boundingBox();
  const buttons = await page.locator('.hero-buttons').boundingBox();
  const img = await page.locator('.hero-bg-img').boundingBox();

  console.log('Hero section:', hero);
  console.log('Hero Eyebrow:', eyebrow);
  console.log('Hero Heading:', heading);
  console.log('Hero Subtitle:', subtitle);
  console.log('Hero Buttons:', buttons);
  console.log('Hero Image:', img);

  await browser.close();
}

checkBounds();
