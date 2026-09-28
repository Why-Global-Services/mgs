const sharp = require('sharp');

async function cleanHeroJpg() {
  const { data, info } = await sharp('public/images/home/hero.jpg').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const out = Buffer.from(data);
  
  const pL = 690, pR = 805, pT = 398, pB = 530;
  
  // Fill the interior with bilateral smooth bokeh foliage
  for (let iter = 0; iter < 4; iter++) {
    for (let y = pT; y <= pB; y++) {
      for (let x = pL; x <= pR; x++) {
        let rSum = 0, gSum = 0, bSum = 0, cnt = 0;
        for (let dy = -8; dy <= 8; dy += 2) {
          for (let dx = -8; dx <= 8; dx += 2) {
            const ny = y + dy, nx = x + dx;
            if (ny >= 0 && ny < h && nx >= 0 && nx < w) {
              const p = (ny * w + nx) * 3;
              rSum += out[p]; gSum += out[p+1]; bSum += out[p+2]; cnt++;
            }
          }
        }
        const idx = (y * w + x) * 3;
        out[idx] = Math.round(rSum / cnt);
        out[idx+1] = Math.round(gSum / cnt);
        out[idx+2] = Math.round(bSum / cnt);
      }
    }
  }

  // Feather borders smoothly across 25px
  for (let y = pT - 20; y <= pB + 20; y++) {
    for (let x = pL - 20; x <= pR + 20; x++) {
      if (y >= 0 && y < h && x >= 0 && x < w) {
        const dx = Math.max(0, pL + 10 - x, x - (pR - 10));
        const dy = Math.max(0, pT + 10 - y, y - (pB - 10));
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = 28;
        if (dist > 0 && dist < maxDist) {
          const t = dist / maxDist;
          const blend = 0.5 * (1 + Math.cos(t * Math.PI));
          const idx = (y * w + x) * 3;
          out[idx] = Math.round(out[idx] * blend + data[idx] * (1 - blend));
          out[idx+1] = Math.round(out[idx+1] * blend + data[idx+1] * (1 - blend));
          out[idx+2] = Math.round(out[idx+2] * blend + data[idx+2] * (1 - blend));
        }
      }
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 3 } })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/hero_cleaned.jpg');

  // Replace public/images/home/hero.jpg
  const fs = require('fs');
  fs.copyFileSync('public/images/home/hero_cleaned.jpg', 'public/images/home/hero.jpg');
  console.log('Successfully updated public/images/home/hero.jpg with seamless foliage');
}

cleanHeroJpg().catch(console.error);
