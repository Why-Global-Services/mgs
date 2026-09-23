const sharp = require('sharp');

async function createHDHero() {
  const meta = await sharp('Image 1.jpg.jpeg').metadata();
  
  // Hero starts at y=130 down to 916 (height 786)
  // Let's extract the full 1440x786 hero
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 130, width: 1440, height: 786 })
    .toBuffer();

  const { data, info } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  const out = Buffer.from(data);

  // We want to fade the left portion (x from 0 to 520) into pure white
  // smoothly so that no text remains visible on the left, but Guruji (around x=480, y=100-260)
  // and the students (x > 500) remain untouched and pristine!
  // Let's create an alpha mask or blend with white
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      
      // Determine fade factor: 1 = pure white, 0 = original image
      // For Guruji area (x: 420-560, y: 0-260), we don't fade him!
      let fade = 0;
      if (x < 360) {
        // Left side with main text: fully fade to white
        fade = 1.0;
      } else if (x < 520) {
        // Transition zone
        const t = (x - 360) / (520 - 360);
        // If near Guruji in top-middle, ease out faster
        if (y < 280 && x > 410) {
          fade = Math.max(0, 1.0 - ((x - 360) / 70));
        } else {
          fade = Math.cos(t * Math.PI * 0.5); // 1 to 0
        }
      } else {
        fade = 0;
      }

      if (fade > 0) {
        out[idx] = Math.round(data[idx] * (1 - fade) + 255 * fade);
        out[idx+1] = Math.round(data[idx+1] * (1 - fade) + 255 * fade);
        out[idx+2] = Math.round(data[idx+2] * (1 - fade) + 255 * fade);
      }
    }
  }

  // Also scale up with Lanczos3 to 1920 width for crisp full-HD desktop rendering
  const finalHero = await sharp(out, { raw: { width, height, channels: 3 } })
    .resize(1920, 1048, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toBuffer();

  await sharp(finalHero).toFile('scratch/hero_hd_test.jpg');
  console.log('HD hero created: 1920x1048');
}

createHDHero();
