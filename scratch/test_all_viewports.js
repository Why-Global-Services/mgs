const { chromium } = require('playwright');
const path = require('path');

async function testAll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  const viewports = [
    { name: '320', width: 320, height: 568 },
    { name: '375', width: 375, height: 667 },
    { name: '390', width: 390, height: 844 },
    { name: '414', width: 414, height: 896 },
    { name: '430', width: 430, height: 932 },
  ];

  const candidateStyles = [
    {
      id: 'optA_pos45',
      imgPos: '45% 20%',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0.05) 100%)',
      sectionMinH: 'min-h-[520px]',
      padding: 'pt-8 pb-10 px-5 sm:px-8',
    },
    {
      id: 'optB_pos48',
      imgPos: '48% 22%',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 55%, rgba(255,255,255,0.05) 100%)',
      sectionMinH: 'min-h-[520px]',
      padding: 'pt-7 pb-10 px-5 sm:px-8',
    },
    {
      id: 'optC_pos50',
      imgPos: '50% 20%',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 55%, rgba(255,255,255,0.05) 100%)',
      sectionMinH: 'min-h-[520px]',
      padding: 'pt-7 pb-10 px-5 sm:px-8',
    },
    {
      id: 'optD_pos44',
      imgPos: '44% 18%',
      overlay: 'linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.42) 60%, rgba(255,255,255,0.08) 100%)',
      sectionMinH: 'min-h-[520px]',
      padding: 'pt-8 pb-10 px-5 sm:px-8',
    },
  ];

  for (const style of candidateStyles) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500);

      await page.evaluate((s) => {
        const section = document.querySelector('section');
        const img = document.querySelector('.hero-bg-img');
        const overlay = document.querySelector('.hero-bg-wrapper > div');
        const content = document.querySelector('section > .relative.z-20');

        if (img) {
          img.style.transform = 'none';
          img.style.objectPosition = s.imgPos;
        }
        if (overlay) {
          overlay.style.background = s.overlay;
          overlay.style.width = '100%';
        }
        if (section) {
          section.style.minHeight = 'auto';
          section.className = `relative w-full overflow-hidden bg-[#fafaf9] ${s.sectionMinH} flex items-center`;
        }
        if (content) {
          content.className = `relative z-20 mx-auto w-full max-w-[1400px] ${s.padding}`;
          const col = content.querySelector('.hero-content-col');
          if (col) col.style.transform = 'none';
        }
      }, style);

      await page.waitForTimeout(300);
      const hero = await page.$('section');
      const outPath = path.join(__dirname, `${style.id}_${vp.name}.png`);
      await hero.screenshot({ path: outPath });
      await context.close();
    }
    console.log(`Finished ${style.id}`);
  }

  await browser.close();
  console.log('All candidates tested successfully.');
}

testAll().catch(console.error);
