const { chromium } = require('playwright');
const path = require('path');

async function testAlignments() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  await page.evaluate(() => {
    const img = document.querySelector('.hero-bg-img');
    const col = document.querySelector('.hero-content-col');
    if (img) img.style.transform = 'none';
    if (col) col.style.transform = 'none';
  });

  const configs = [
    {
      name: 'align_pos52_center_softoverlay',
      sectionClass: 'relative w-full overflow-hidden bg-[#fafaf9] min-h-[580px] flex items-center',
      contentPad: 'py-10 px-5',
      imgPos: '52% center',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.05) 100%)',
    },
    {
      name: 'align_pos54_center_softoverlay',
      sectionClass: 'relative w-full overflow-hidden bg-[#fafaf9] min-h-[580px] flex items-center',
      contentPad: 'py-10 px-5',
      imgPos: '54% center',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 60%, rgba(255,255,255,0.05) 100%)',
    },
    {
      name: 'align_pos50_top_softoverlay',
      sectionClass: 'relative w-full overflow-hidden bg-[#fafaf9] min-h-[580px] flex items-center',
      contentPad: 'py-8 px-5',
      imgPos: '50% 18%',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 65%, rgba(255,255,255,0.1) 100%)',
    },
    {
      name: 'align_pos48_pt6_softoverlay',
      sectionClass: 'relative w-full overflow-hidden bg-[#fafaf9] min-h-[540px] flex items-center',
      contentPad: 'pt-8 pb-10 px-5',
      imgPos: '48% center',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.05) 100%)',
    },
    {
      name: 'align_pos56_girl_guruji_blend',
      sectionClass: 'relative w-full overflow-hidden bg-[#fafaf9] min-h-[580px] flex items-center',
      contentPad: 'py-10 px-5',
      imgPos: '56% center',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0.05) 100%)',
    },
    {
      name: 'align_pos60_more_girl',
      sectionClass: 'relative w-full overflow-hidden bg-[#fafaf9] min-h-[580px] flex items-center',
      contentPad: 'py-10 px-5',
      imgPos: '60% center',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0.05) 100%)',
    },
    {
      name: 'align_pos65_reference_look',
      sectionClass: 'relative w-full overflow-hidden bg-[#fafaf9] min-h-[540px] flex items-center',
      contentPad: 'pt-8 pb-10 px-5',
      imgPos: '65% center',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.0) 100%)',
    }
  ];

  for (const c of configs) {
    await page.evaluate((cfg) => {
      const section = document.querySelector('section');
      const img = document.querySelector('.hero-bg-img');
      const overlay = document.querySelector('.hero-bg-wrapper > div');
      const content = document.querySelector('section > .relative.z-20');

      if (img) img.style.objectPosition = cfg.imgPos;
      if (overlay) {
        overlay.style.background = cfg.overlay;
        overlay.style.width = '100%';
      }
      if (content) {
        content.className = 'relative z-20 mx-auto w-full max-w-[1400px] ' + cfg.contentPad;
      }
      if (section) {
        section.className = cfg.sectionClass;
      }
    }, c);

    await page.waitForTimeout(300);
    const hero = await page.$('section');
    const outPath = path.join(__dirname, `${c.name}.png`);
    await hero.screenshot({ path: outPath });
    console.log(`Saved: ${c.name}.png`);
  }

  await browser.close();
}

testAlignments().catch(console.error);
