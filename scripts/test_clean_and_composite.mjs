import sharp from 'sharp';

async function generateFlawlessHero() {
  const width = 1440;
  const height = 698;

  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 218, width, height })
    .toBuffer();

  const { data } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);

  // 1. Inpaint letter s and in of Begins at x: 520..584, y: 275..395
  // using the pristine foliage from x: 586..620
  for (let y = 275; y <= 395; y++) {
    for (let x = 520; x <= 584; x++) {
      const offset = ((x - 520) % 26) + 586;
      const srcIdx = (y * width + offset) * 3;
      const dstIdx = (y * width + x) * 3;
      
      let w = 1.0;
      if (x > 580) w = (584 - x) / 4;
      
      out[dstIdx] = Math.round(data[dstIdx] * (1 - w) + data[srcIdx] * w);
      out[dstIdx+1] = Math.round(data[dstIdx+1] * (1 - w) + data[srcIdx+1] * w);
      out[dstIdx+2] = Math.round(data[dstIdx+2] * (1 - w) + data[srcIdx+2] * w);
    }
  }

  // 2. Inpaint sky: old Guruji & old eyebrow text (x: 320..580, y: 0..270)
  // Pristine sky references: top y: 15..45, right x: 586..605
  for (let y = 0; y < 270; y++) {
    for (let x = 320; x <= 584; x++) {
      const idx = (y * width + x) * 3;
      const rightX = Math.min(590, width - 1);
      const rightIdx = (y * width + rightX) * 3;
      
      const topY = Math.min(y, 45);
      const topIdx = (topY * width + x) * 3;

      const weightRight = Math.max(0, Math.min(1, (x - 320) / (584 - 320)));
      const r = Math.round(data[topIdx] * (1 - weightRight * 0.55) + data[rightIdx] * (weightRight * 0.55));
      const g = Math.round(data[topIdx+1] * (1 - weightRight * 0.55) + data[rightIdx+1] * (weightRight * 0.55));
      const b = Math.round(data[topIdx+2] * (1 - weightRight * 0.55) + data[rightIdx+2] * (weightRight * 0.55));

      if (y >= 45 && y <= 270 && x >= 330 && x <= 584) {
        const edgeDistX = Math.min(x - 330, 584 - x);
        const edgeDistY = Math.min(y - 45, 270 - y);
        const inpaintWeight = Math.min(edgeDistX / 10, edgeDistY / 10, 1.0);
        out[idx] = Math.round(out[idx] * (1 - inpaintWeight) + r * inpaintWeight);
        out[idx+1] = Math.round(out[idx+1] * (1 - inpaintWeight) + g * inpaintWeight);
        out[idx+2] = Math.round(out[idx+2] * (1 - inpaintWeight) + b * inpaintWeight);
      }
    }
  }

  // 3. Smooth continuous fade to pure white:
  // Sky (y < 200): x0 = 320, x1 = 430
  // Transition (y 200..265): smooth ease
  // Foliage (y >= 265): x0 = 480, x1 = 585
  for (let y = 0; y < height; y++) {
    let x0, x1;
    if (y < 200) {
      x0 = 320;
      x1 = 430;
    } else if (y < 265) {
      const t = (y - 200) / (265 - 200);
      const easeT = 0.5 * (1 - Math.cos(t * Math.PI));
      x0 = 320 + easeT * (480 - 320);
      x1 = 430 + easeT * (585 - 430);
    } else {
      x0 = 480;
      x1 = 585;
    }

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      let fade = 0;
      if (x < x0) {
        fade = 1.0;
      } else if (x < x1) {
        const t = (x - x0) / (x1 - x0);
        fade = 0.5 * (1 + Math.cos(t * Math.PI));
      }

      if (fade > 0) {
        out[idx] = Math.round(out[idx] * (1 - fade) + 255 * fade);
        out[idx+1] = Math.round(out[idx+1] * (1 - fade) + 255 * fade);
        out[idx+2] = Math.round(out[idx+2] * (1 - fade) + 255 * fade);
      }
    }
  }

  // Save clean base image
  await sharp(out, { raw: { width, height, channels: 3 } })
    .jpeg({ quality: 95 })
    .toFile('scratch/test_clean_flawless_base.jpg');
  console.log('Saved test_clean_flawless_base.jpg');

  // 4. Composite HD Guruji
  const gurujiPrepared = await sharp('scratch/guruji_feathered_hd.png')
    .resize(165, null, { kernel: 'lanczos3' })
    .linear(1.15, -6)
    .sharpen({ sigma: 1.1, m1: 1.25, m2: 2.2 })
    .toBuffer();

  const composited = await sharp(out, { raw: { width, height, channels: 3 } })
    .composite([
      {
        input: gurujiPrepared,
        left: 433,
        top: 15,
        blend: 'over'
      }
    ])
    .png()
    .toBuffer();

  // 5. Upscale to 1920x931 MozJPEG
  await sharp(composited)
    .resize(1920, 931, { kernel: 'lanczos3' })
    .jpeg({ quality: 96, mozjpeg: true })
    .toFile('public/images/home/hero.jpg');

  console.log('Successfully updated public/images/home/hero.jpg!');
}

generateFlawlessHero();
