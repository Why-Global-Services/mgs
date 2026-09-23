const sharp = require('sharp');

async function prepareHeroBg() {
  const { data, info } = await sharp('public/assets/ref_hero_hd.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const out = Buffer.from(data);

  // Clean 'ED' letters specifically: x: 450-590, y: 175-215
  for (let y = 175; y <= 215; y++) {
    for (let x = 450; x <= 590; x++) {
      const idx = (y * width + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const lum = 0.299*r + 0.587*g + 0.114*b;
      if (lum < 170) {
        // sample sky from above at y=165
        const refIdx = (165 * width + x) * 3;
        out[idx] = data[refIdx];
        out[idx+1] = data[refIdx+1];
        out[idx+2] = data[refIdx+2];
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < 790; x++) {
      // Guruji preservation (x: 590 to 770, y: 90 to 410)
      if (x >= 590 && x <= 770 && y >= 80 && y <= 410) continue;

      const isEyebrow = (y >= 170 && y <= 245 && x >= 40 && x <= 590);
      const isHeading = (y >= 260 && y <= 630 && x >= 40 && (y > 400 ? x <= 785 : x <= 580));
      const isSubtitle = (y >= 650 && y <= 770 && x >= 40 && x <= 700);
      const isButtons = (y >= 780 && y <= 910 && x >= 40 && x <= 610);

      if (isEyebrow || isHeading || isSubtitle || isButtons) {
        const idx = (y * width + x) * 3;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        const lum = 0.299*r + 0.587*g + 0.114*b;
        const isRedButton = (r > 90 && g < 80 && b < 80);

        if (lum < 185 || isRedButton) {
          const topRatio = y / height;
          out[idx] = Math.round(252 - topRatio * 18);
          out[idx+1] = Math.round(248 - topRatio * 20);
          out[idx+2] = Math.round(242 - topRatio * 32);
        }
      }
    }
  }

  // Box blur over the replaced text zones
  const smoothed = Buffer.from(out);
  for (let y = 160; y < 915; y++) {
    for (let x = 35; x < 790; x++) {
      if (x >= 590 && x <= 770 && y >= 80 && y <= 410) continue;

      let rSum = 0, gSum = 0, bSum = 0, c = 0;
      for (let dy = -4; dy <= 4; dy += 2) {
        for (let dx = -4; dx <= 4; dx += 2) {
          const ny = y + dy, nx = x + dx;
          if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
            if (nx >= 590 && nx <= 770 && ny >= 80 && ny <= 410) continue;
            const p = (ny * width + nx) * 3;
            rSum += out[p]; gSum += out[p+1]; bSum += out[p+2]; c++;
          }
        }
      }
      if (c > 0) {
        const p = (y * width + x) * 3;
        smoothed[p] = Math.round(rSum / c);
        smoothed[p+1] = Math.round(gSum / c);
        smoothed[p+2] = Math.round(bSum / c);
      }
    }
  }

  await sharp(smoothed, { raw: { width, height, channels: 3 } })
    .jpeg({ quality: 96 })
    .toFile('public/assets/mgs_hero_fullwidth_bg.jpg');

  console.log('Saved mgs_hero_fullwidth_bg.jpg cleanly');
}
prepareHeroBg();
