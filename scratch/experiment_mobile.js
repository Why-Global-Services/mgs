const { chromium } = require('playwright');
const path = require('path');

async function testCombinations() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  // Stop GSAP parallax and animations
  await page.evaluate(() => {
    // Disable transforms from GSAP parallax
    const img = document.querySelector('.hero-bg-img');
    const col = document.querySelector('.hero-content-col');
    if (img) img.style.transform = 'none';
    if (col) col.style.transform = 'none';
  });

  const experiments = [
    {
      name: 'exp1_pos42_subtle_grad',
      imgPos: '42% 15%',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 100%)',
      sectionMinH: 'auto',
      contentPad: '2.5rem 1.25rem 2.5rem 1.25rem',
    },
    {
      name: 'exp2_pos46_soft_grad',
      imgPos: '46% 15%',
      overlay: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.85) 100%)',
      sectionMinH: 'auto',
      contentPad: '2.5rem 1.25rem 2.5rem 1.25rem',
    },
    {
      name: 'exp3_pos48_clean',
      imgPos: '48% 20%',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)',
      sectionMinH: 'auto',
      contentPad: '2.5rem 1.25rem 2.5rem 1.25rem',
    },
    {
      name: 'exp4_pos38_ethereal',
      imgPos: '38% 10%',
      overlay: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.2) 100%)',
      sectionMinH: 'auto',
      contentPad: '2.5rem 1.25rem 2.5rem 1.25rem',
    },
    {
      name: 'exp5_pos50_balanced',
      imgPos: '50% 25%',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 60%, rgba(255,255,255,0.1) 100%)',
      sectionMinH: 'auto',
      contentPad: '2.5rem 1.25rem 2.5rem 1.25rem',
    }
  ];

  for (const exp of experiments) {
    await page.evaluate((e) => {
      const section = document.querySelector('section');
      const img = document.querySelector('.hero-bg-img');
      const overlay = document.querySelector('.hero-bg-wrapper > div');
      const content = document.querySelector('section > .relative.z-20');

      if (img) img.style.objectPosition = e.imgPos;
      if (overlay) {
        overlay.style.background = e.overlay;
        overlay.style.width = '100%';
      }
      if (section && e.sectionMinH) {
        section.style.minHeight = e.sectionMinH;
      }
      if (content && e.contentPad) {
        content.style.padding = e.contentPad;
      }
    }, exp);

    await page.waitForTimeout(300);
    const hero = await page.$('section');
    const outPath = path.join(__dirname, `${exp.name}.png`);
    await hero.screenshot({ path: outPath });
    console.log(`Saved: ${exp.name}.png`);
  }

  await browser.close();
}

testCombinations().catch(console.error);
