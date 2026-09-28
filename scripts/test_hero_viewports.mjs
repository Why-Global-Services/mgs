import { chromium } from 'playwright';

async function captureHero() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'desktop_1280', width: 1280, height: 800 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1600);

    const hero = page.locator('section').first();
    const savePath = 'scratch/hero_final_' + vp.name + '.png';
    await hero.screenshot({ path: savePath });
    console.log('Saved: ' + savePath);
  }

  await browser.close();
  console.log('All hero viewports captured successfully!');
}

captureHero();
