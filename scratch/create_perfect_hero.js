const sharp = require('sharp');

async function createPerfectHero() {
  const width = 1440;
  const height = 698;
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 218, width, height })
    .toBuffer();

  const { data, info } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);

  // 1. Inpaint gins of Begins at x: 465..516, y: 280..345 using foliage from x: 515..566
  for (let y = 280; y <= 345; y++) {
    for (let x = 465; x <= 516; x++) {
      const srcX = x + 50;
      const srcIdx = (y * width + srcX) * 3;
      const dstIdx = (y * width + x) * 3;
      const w = Math.min((x - 465) / 10, (516 - x) / 5, 1.0);
      out[dstIdx] = Math.round(data[dstIdx] * (1 - w) + data[srcIdx] * w);
      out[dstIdx+1] = Math.round(data[dstIdx+1] * (1 - w) + data[srcIdx+1] * w);
      out[dstIdx+2] = Math.round(data[dstIdx+2] * (1 - w) + data[srcIdx+2] * w);
    }
  }

  // 2. Inpaint old Guruji & old sky text at y: 0..265, x: 340..560
  for (let y = 0; y < 265; y++) {
    for (let x = 340; x <= 560; x++) {
      const idx = (y * width + x) * 3;
      
      const rightX = Math.min(575, width - 1);
      const rightIdx = (y * width + rightX) * 3;
      
      const topY = Math.min(y, 60);
      const topIdx = (topY * width + x) * 3;

      const weightRight = Math.max(0, Math.min(1, (x - 340) / (560 - 340)));
      const r = Math.round(data[topIdx] * (1 - weightRight * 0.6) + data[rightIdx] * (weightRight * 0.6));
      const g = Math.round(data[topIdx+1] * (1 - weightRight * 0.6) + data[rightIdx+1] * (weightRight * 0.6));
      const b = Math.round(data[topIdx+2] * (1 - weightRight * 0.6) + data[rightIdx+2] * (weightRight * 0.6));

      if (y >= 70 && y <= 265 && x >= 360 && x <= 558) {
        const edgeDistX = Math.min(x - 360, 558 - x);
        const edgeDistY = Math.min(y - 70, 265 - y);
        const inpaintWeight = Math.min(edgeDistX / 15, edgeDistY / 15, 1.0);
        out[idx] = Math.round(out[idx] * (1 - inpaintWeight) + r * inpaintWeight);
        out[idx+1] = Math.round(out[idx+1] * (1 - inpaintWeight) + g * inpaintWeight);
        out[idx+2] = Math.round(out[idx+2] * (1 - inpaintWeight) + b * inpaintWeight);
      }
    }
  }

  // 3. Smooth continuous fade to pure white on the left:
  for (let y = 0; y < height; y++) {
    const progressY = y / height;
    const x0 = 340 + progressY * 80; // 340 -> 420
    const x1 = 490 + progressY * 50; // 490 -> 540

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

  // Convert raw to png buffer for crisp compositing
  const cleanBasePng = await sharp(out, { raw: { width, height, channels: 3 } })
    .png()
    .toBuffer();

  await sharp(cleanBasePng).jpeg({ quality: 95 }).toFile('scratch/test_clean_base_v2.jpg');
  console.log('Saved scratch/test_clean_base_v2.jpg');

  // 4. Composite HD Guruji
  const gurujiResized = await sharp('scratch/guruji_feathered_hd.png')
    .resize(155, null, { kernel: 'lanczos3' })
    .linear(1.12, -8)
    .sharpen({ sigma: 1.1, m1: 1.2, m2: 2.0 })
    .toBuffer();

  const gurujiMeta = await sharp(gurujiResized).metadata();
  console.log('Guruji size:', gurujiMeta.width, gurujiMeta.height);

  const leftPos = 450;
  const topPos = 20;

  const composited = await sharp(cleanBasePng)
    .composite([
      {
        input: gurujiResized,
        left: leftPos,
        top: topPos,
        blend: 'over'
      }
    ])
    .jpeg({ quality: 96 })
    .toFile('scratch/test_composited_v2.jpg');

  console.log('Saved scratch/test_composited_v2.jpg');
}

createPerfectHero();
