const sharp = require('sharp');
const fs = require('fs');

async function searchSubimage(templatePath, searchPath) {
  // Let's get small thumbnail of template
  const tSmall = await sharp(templatePath).resize(40, 40, { fit: 'fill' }).grayscale().raw().toBuffer();

  const searchImg = sharp(searchPath);
  const meta = await searchImg.metadata();

  // Search across searchPath with sliding window or downscaled
  // Downscale search image to say 400x565
  const scaleW = 400;
  const scaleH = Math.round(meta.height * (400 / meta.width));
  const sSmall = await sharp(searchPath).resize(scaleW, scaleH).grayscale().raw().toBuffer();

  let bestDiff = 999999;
  let bestLoc = { x: 0, y: 0, w: 0, h: 0 };

  // Slide window of various aspect ratios/sizes
  const tw = 40;
  const th = 40;

  for (let boxSize = 60; boxSize <= 250; boxSize += 20) {
    const boxW = boxSize;
    const boxH = Math.round(boxSize * (tSmall.length > 0 ? 1 : 1));
    for (let y = 0; y <= scaleH - boxH; y += 15) {
      for (let x = 0; x <= scaleW - boxW; x += 15) {
        // extract box and scale to 40x40
        let sumDiff = 0;
        for (let py = 0; py < 40; py++) {
          const sy = y + Math.floor((py / 40) * boxH);
          for (let px = 0; px < 40; px++) {
            const sx = x + Math.floor((px / 40) * boxW);
            const tVal = tSmall[py * 40 + px];
            const sVal = sSmall[sy * scaleW + sx];
            sumDiff += Math.abs(tVal - sVal);
          }
        }
        const avgDiff = sumDiff / 1600;
        if (avgDiff < bestDiff) {
          bestDiff = avgDiff;
          bestLoc = { x, y, w: boxW, h: boxH };
        }
      }
    }
  }
  return { bestDiff, bestLoc, scaleW, scaleH, origW: meta.width, origH: meta.height };
}

async function test() {
  const targets = [
    { name: 'discover.webp', path: 'public/images/home/discover.webp' },
    { name: 'community.jpg', path: 'public/images/home/community.jpg' },
  ];

  for (const t of targets) {
    console.log(`\nSearching for ${t.name} in brochure pages...`);
    for (let p = 0; p <= 6; p++) {
      const pagePath = `scratch/brochure_page_${p}.jpeg`;
      if (!fs.existsSync(pagePath)) continue;
      const res = await searchSubimage(t.path, pagePath);
      console.log(`  Page ${p}: bestDiff=${res.bestDiff.toFixed(2)} at (${res.bestLoc.x}, ${res.bestLoc.y}, ${res.bestLoc.w}x${res.bestLoc.h})`);
    }
  }
}

test();
