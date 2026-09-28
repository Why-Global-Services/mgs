import { chromium } from 'playwright';

async function checkOpacities() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  const getStyle = async sel => page.locator(sel).first().evaluate(el => ({
    opacity: window.getComputedStyle(el).opacity,
    transform: window.getComputedStyle(el).transform,
    visibility: window.getComputedStyle(el).visibility,
  }));

  console.log('Heading inner:', await getStyle('.hero-heading .line-mask-inner'));
  console.log('Apply button:', await getStyle('.hero-btn-apply'));
  console.log('Explore button:', await getStyle('.hero-btn-explore'));
  console.log('Quote card:', await getStyle('.hero-quote-card'));

  await browser.close();
}

checkOpacities();
