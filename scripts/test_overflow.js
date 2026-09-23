const { chromium } = require('playwright');

async function checkOverflow() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const viewports = [1440, 1280, 1024, 768, 430, 390, 375, 320];
  let allPass = true;

  for (const w of viewports) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    });
    console.log(`Viewport ${w}px: scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}, overflow=${overflow.hasOverflow}`);
    if (overflow.hasOverflow) {
      allPass = false;
    }
    await page.close();
  }

  await browser.close();
  if (allPass) {
    console.log('SUCCESS: All viewports have ZERO horizontal overflow!');
  } else {
    console.error('FAILURE: Horizontal overflow detected!');
    process.exit(1);
  }
}

checkOverflow().catch(err => {
  console.error(err);
  process.exit(1);
});
