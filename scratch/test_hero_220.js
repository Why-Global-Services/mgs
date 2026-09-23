const sharp = require('sharp');

async function testHeroCrop220() {
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 220, width: 1440, height: 696 })
    .toBuffer();

  const { data, info } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  const out = Buffer.from(data);

  // Smooth fade to clean white / light sky on the left
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      
      let fade = 0;
      // Guruji is at x: 420-560, y: 0-200
      if (x < 380) {
        fade = 1.0;
      } else if (x < 520) {
        const t = (x - 380) / (520 - 380);
        if (y < 200 && x > 410) {
          fade = Math.max(0, 1.0 - ((x - 380) / 40));
        } else {
          fade = 0.5 * (1 + Math.cos(t * Math.PI)); // smooth cosine ease
        }
      } else {
        fade = 0;
      }

      if (fade > 0) {
        // Target color: pure white
        out[idx] = Math.round(data[idx] * (1 - fade) + 255 * fade);
        out[idx+1] = Math.round(data[idx+1] * (1 - fade) + 255 * fade);
        out[idx+2] = Math.round(data[idx+2] * (1 - fade) + 255 * fade);
      }
    }
  }

  // Scale up to 1920x928 with Lanczos3
  const finalHero = await sharp(out, { raw: { width, height, channels: 3 } })
    .resize(1920, 928, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toBuffer();

  await sharp(finalHero).toFile('scratch/hero_hd_220.jpg');
  console.log('HD hero 220 created.');
}

testHeroCrop220();
