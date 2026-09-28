import sharp from 'sharp';

async function generateHero() {
  const width = 1440;
  const height = 698;

  // Extract from Image 1 starting below navbar at y=218
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 218, width, height })
    .toBuffer();

  const { data } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);

  // 1. Inpaint Begins text completely (x: 350..518, y: 275..350)
  // We sample foliage and flowers from x: 520..570
  for (let y = 275; y <= 350; y++) {
    for (let x = 350; x <= 518; x++) {
      // Map x: 350..518 into x: 520..565 cyclically/offset
      const offset = ((x - 350) % 45) + 520;
      const srcIdx = (y * width + offset) * 3;
      const dstIdx = (y * width + x) * 3;
      out[dstIdx] = data[srcIdx];
      out[dstIdx + 1] = data[srcIdx + 1];
      out[dstIdx + 2] = data[srcIdx + 2];
    }
  }

  // 2. Inpaint old Guruji & old sky text (x: 340..560, y: 0..270)
  // Pristine sky references: y: 15..60 (above), and x: 565..585 (right)
  for (let y = 0; y < 270; y++) {
    for (let x = 340; x <= 560; x++) {
      const idx = (y * width + x) * 3;
      const rightX = Math.min(575, width - 1);
      const rightIdx = (y * width + rightX) * 3;
      
      const topY = Math.min(y, 55);
      const topIdx = (topY * width + x) * 3;

      const weightRight = Math.max(0, Math.min(1, (x - 340) / (560 - 340)));
      const r = Math.round(data[topIdx] * (1 - weightRight * 0.6) + data[rightIdx] * (weightRight * 0.6));
      const g = Math.round(data[topIdx+1] * (1 - weightRight * 0.6) + data[rightIdx+1] * (weightRight * 0.6));
      const b = Math.round(data[topIdx+2] * (1 - weightRight * 0.6) + data[rightIdx+2] * (weightRight * 0.6));

      if (y >= 60 && y <= 270 && x >= 350 && x <= 558) {
        const edgeDistX = Math.min(x - 350, 558 - x);
        const edgeDistY = Math.min(y - 60, 270 - y);
        const inpaintWeight = Math.min(edgeDistX / 12, edgeDistY / 12, 1.0);
        out[idx] = Math.round(out[idx] * (1 - inpaintWeight) + r * inpaintWeight);
        out[idx+1] = Math.round(out[idx+1] * (1 - inpaintWeight) + g * inpaintWeight);
        out[idx+2] = Math.round(out[idx+2] * (1 - inpaintWeight) + b * inpaintWeight);
      }
    }
  }

  // 3. Smooth continuous fade to pure white on the left:
  // x < x0 is pure white #ffffff
  // between x0 and x1 is smooth cosine ease
  // x > x1 is 100% full opacity image
  // For y in sky (y < 250): x0 = 340, x1 = 450 (so Guruji at 450..580 is completely free of white wash)
  // For y in pathway (y >= 250): x0 = 400, x1 = 525 (clean foliage starts at 525)
  for (let y = 0; y < height; y++) {
    const progressY = Math.max(0, Math.min(1, (y - 180) / (height - 180)));
    const x0 = 340 + progressY * 60; // 340 -> 400
    const x1 = 450 + progressY * 75; // 450 -> 525

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

  // Convert raw to png buffer
  const cleanBasePng = await sharp(out, { raw: { width, height, channels: 3 } })
    .png()
    .toBuffer();

  // 4. Prepare HD Feathered Guruji
  // Resize to width: 160 (height ~193)
  // Apply linear contrast + unsharp mask for enhanced clarity and sharpness
  const gurujiPrepared = await sharp('scratch/guruji_feathered_hd.png')
    .resize(160, null, { kernel: 'lanczos3' })
    .linear(1.15, -6)
    .sharpen({ sigma: 1.1, m1: 1.25, m2: 2.2 })
    .toBuffer();

  const gMeta = await sharp(gurujiPrepared).metadata();
  console.log('Guruji prepared size:', gMeta.width, gMeta.height);

  // Center Guruji at x = 520 (left = 520 - 80 = 440), top = 16
  const composited1440 = await sharp(cleanBasePng)
    .composite([
      {
        input: gurujiPrepared,
        left: 440,
        top: 16,
        blend: 'over'
      }
    ])
    .png()
    .toBuffer();

  // 5. Upscale to 1920x931 with Lanczos3 for crisp HD quality
  await sharp(composited1440)
    .resize(1920, 931, { kernel: 'lanczos3' })
    .jpeg({ quality: 96, mozjpeg: true })
    .toFile('public/images/home/hero.jpg');

  console.log('Successfully generated public/images/home/hero.jpg (1920x931)!');
}

generateHero();
