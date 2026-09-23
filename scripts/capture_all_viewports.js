const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-360', width: 360, height: 740 },
];

async function capture() {
  const browser = await chromium.launch();
  const outDir = path.join(process.cwd(), 'scratch', 'screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });

    console.log(`Navigating to 127.0.0.1:3000 at ${vp.name} (${vp.width}x${vp.height})...`);
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
    
    // Wait for GSAP intro animation to settle
    await page.waitForTimeout(2000);

    // Capture hero & top viewport
    const heroShot = path.join(outDir, `${vp.name}-hero.png`);
    await page.screenshot({ path: heroShot });
    console.log(`Captured ${heroShot}`);

    // Check horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`${vp.name} horizontal overflow: ${hasOverflow}`);

    // Capture full page
    const fullShot = path.join(outDir, `${vp.name}-full.png`);
    await page.screenshot({ path: fullShot, fullPage: true });
    console.log(`Captured ${fullShot}`);

    await page.close();
  }

  // Also test reduced motion
  const reducedPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await reducedPage.emulateMedia({ reducedMotion: 'reduce' });
  await reducedPage.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
  await reducedPage.screenshot({ path: path.join(outDir, 'reduced-motion-1440.png') });
  console.log('Captured reduced motion test');
  await reducedPage.close();

  await browser.close();
  console.log('All viewport captures complete!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
