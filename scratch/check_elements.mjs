import { chromium } from 'playwright';

async function checkElements() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const hero = await page.locator('section').first().boundingBox();
  const applyBtn = await page.locator('.hero-btn-apply').boundingBox();
  const card = await page.locator('.hero-quote-card').boundingBox();
  const cardHtml = await page.locator('.hero-quote-card').innerHTML();
  const cardOpacity = await page.locator('.hero-quote-card').evaluate(el => window.getComputedStyle(el).opacity);
  const cardDisplay = await page.locator('.hero-quote-card').evaluate(el => window.getComputedStyle(el).display);

  console.log('Hero:', hero);
  console.log('ApplyBtn:', applyBtn);
  console.log('Card box:', card);
  console.log('Card opacity:', cardOpacity, 'display:', cardDisplay);
  console.log('Card HTML:', cardHtml);

  await browser.close();
}

checkElements();
