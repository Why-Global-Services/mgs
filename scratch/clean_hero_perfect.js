const sharp = require('sharp');

async function cleanHeroPerfect() {
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 220, width: 1440, height: 696 })
    .toBuffer();

  const { data, info } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  const out = Buffer.from(data);

  // 1. Inpaint "ED" at x: 360 to 450, y: 120 to 190 using sky
  for (let y = 120; y <= 195; y++) {
    for (let x = 360; x <= 450; x++) {
      const refY = y - 45;
      const refIdx = (refY * width + x) * 3;
      const idx = (y * width + x) * 3;
      out[idx] = data[refIdx];
      out[idx+1] = data[refIdx+1];
      out[idx+2] = data[refIdx+2];
    }
  }

  // 2. Smooth fade to white
  // Top region (y < 230): Guruji is at x: 420 to 570. Left of x: 400 fades to white.
  // Middle & bottom region (y >= 230): Students walk at x >= 600.
  // Between x: 0 and 600, fade smoothly to pure white so that no text remains at all!
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      let fade = 0;

      if (y < 230) {
        // Upper part with sky and Guruji
        if (x < 370) {
          fade = 1.0;
        } else if (x < 430) {
          const t = (x - 370) / (430 - 370);
          fade = 0.5 * (1 + Math.cos(t * Math.PI));
        }
      } else {
        // Lower part below Guruji (where "Begins", etc. were)
        if (x < 480) {
          fade = 1.0;
        } else if (x < 620) {
          const t = (x - 480) / (620 - 480);
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

  // Lanczos3 resize to 1920x928 with 95% mozjpeg quality
  await sharp(out, { raw: { width, height, channels: 3 } })
    .resize(1920, 928, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('scratch/hero_hd_perfect.jpg');

  console.log('Hero HD Perfect generated.');
}

cleanHeroPerfect();
