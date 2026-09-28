const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const el = await page.$('.dark-feature-item');
  if (el) {
    const section = await el.evaluateHandle(node => node.closest('section'));
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500); // let scroll animations complete
    await section.screenshot({ path: 'scratch/test_four_strip_scrolled.png' });
    console.log('Saved test_four_strip_scrolled.png');
  }
  await browser.close();
}

test().catch(console.error);
