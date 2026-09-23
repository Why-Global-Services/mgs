const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capture() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Ensure all images are loaded and disable animation/sticky header during capture
    await page.evaluate(async () => {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
        header {
          position: static !important;
        }
        .reveal-init {
          opacity: 1 !important;
          transform: none !important;
        }
      `;
      document.head.appendChild(style);

      const images = Array.from(document.querySelectorAll('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      }));
    });

    await page.waitForTimeout(500);

    const outPath = path.join(__dirname, `../scratch/capture_${vp.name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved screenshot: ${outPath}`);

    await context.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
