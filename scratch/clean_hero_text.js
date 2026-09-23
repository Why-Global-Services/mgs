const sharp = require('sharp');

async function cleanHeroText() {
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 220, width: 1440, height: 696 })
    .toBuffer();

  const { data, info } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  const out = Buffer.from(data);

  // 1. Inpaint "ED" at x: 380 to 445, y: 130 to 180 using clean sky/cloud from x: 445-470 (or from y: 80-130)
  for (let y = 125; y <= 185; y++) {
    for (let x = 370; x <= 445; x++) {
      // sample from clean sky above/around
      const refY = y - 45;
      const refIdx = (refY * width + x) * 3;
      const idx = (y * width + x) * 3;
      out[idx] = data[refIdx];
      out[idx+1] = data[refIdx+1];
      out[idx+2] = data[refIdx+2];
    }
  }

  // 2. Inpaint "Begins" at x: 380 to 585, y: 270 to 380
  // Behind "Begins" is soft garden foliage.
  // We can sample sunny yellow/green bush texture from x: 500-600, y: 380-450 or right next to it!
  for (let y = 280; y <= 390; y++) {
    for (let x = 380; x <= 585; x++) {
      const refY = y + 40; // sample foliage from slightly lower
      const refX = Math.min(width - 1, x + 30);
      const refIdx = (refY * width + refX) * 3;
      const idx = (y * width + x) * 3;
      out[idx] = data[refIdx];
      out[idx+1] = data[refIdx+1];
      out[idx+2] = data[refIdx+2];
    }
  }

  // 3. Inpaint "ridge" and button at bottom left x: 380 to 500, y: 470 to 650
  for (let y = 470; y < height; y++) {
    for (let x = 380; x <= 500; x++) {
      const refY = y;
      const refX = Math.min(width - 1, x + 70);
      const refIdx = (refY * width + refX) * 3;
      const idx = (y * width + x) * 3;
      out[idx] = data[refIdx];
      out[idx+1] = data[refIdx+1];
      out[idx+2] = data[refIdx+2];
    }
  }

  // 4. Now apply the smooth fade to white from x: 0 to 480
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      let fade = 0;
      if (x < 350) {
        fade = 1.0;
      } else if (x < 520) {
        const t = (x - 350) / (520 - 350);
        // ease out near Guruji
        if (y < 200 && x > 410) {
          fade = Math.max(0, 1.0 - ((x - 350) / 60));
        } else {
          fade = 0.5 * (1 + Math.cos(t * Math.PI));
        }
      }

      if (fade > 0) {
        out[idx] = Math.round(out[idx] * (1 - fade) + 255 * fade);
        out[idx+1] = Math.round(out[idx+1] * (1 - fade) + 255 * fade);
        out[idx+2] = Math.round(out[idx+2] * (1 - fade) + 255 * fade);
      }
    }
  }

  // Save 1920x928 sharp HD hero
  await sharp(out, { raw: { width, height, channels: 3 } })
    .resize(1920, 928, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('scratch/hero_hd_clean.jpg');

  console.log('Clean HD hero generated.');
}

cleanHeroText();
