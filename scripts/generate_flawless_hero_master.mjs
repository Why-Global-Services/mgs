import sharp from 'sharp';

async function generateMasterHero() {
  const width = 1440;
  const height = 698;

  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 218, width, height })
    .toBuffer();

  const { data } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);

  // 1. Inpaint letter s and in of Begins at x: 440..584, y: 275..395
  for (let y = 275; y <= 395; y++) {
    for (let x = 440; x <= 584; x++) {
      const offset = ((x - 440) % 26) + 586;
      const srcIdx = (y * width + offset) * 3;
      const dstIdx = (y * width + x) * 3;
      
      let w = 1.0;
      if (x > 580) w = (584 - x) / 4;
      
      out[dstIdx] = Math.round(data[dstIdx] * (1 - w) + data[srcIdx] * w);
      out[dstIdx+1] = Math.round(data[dstIdx+1] * (1 - w) + data[srcIdx+1] * w);
      out[dstIdx+2] = Math.round(data[dstIdx+2] * (1 - w) + data[srcIdx+2] * w);
    }
  }

  // 2. Inpaint sky: old Guruji & old eyebrow text (x: 320..584, y: 0..270)
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

  // 3. Perfect natural bokeh behind card (x: 1160..1440, y: 410..635)
  // Seamlessly eliminates the old baked card and blends with surrounding garden & blazer bokeh
  const xStart = 1160;
  const xEnd = 1440;
  const yStart = 410;
  const yEnd = 635;

  for (let y = yStart; y < yEnd; y++) {
    const v = (y - yStart) / (yEnd - yStart);
    for (let x = xStart; x < xEnd; x++) {
      const u = (x - xStart) / (xEnd - xStart);
      const idx = (y * width + x) * 3;

      const topY = Math.max(360, yStart - 10 - (y - yStart) * 0.1);
      const topX = Math.min(x, 1435);
      const topIdx = (Math.round(topY) * width + topX) * 3;

      const botY = Math.min(height - 1, yEnd + 8 + (yEnd - y) * 0.1);
      const botX = Math.min(x, 1435);
      const botIdx = (Math.round(botY) * width + botX) * 3;

      const leftX = Math.max(1050, xStart - 8 - (x - xStart) * 0.15);
      const leftY = y;
      const leftIdx = (Math.round(leftY) * width + Math.round(leftX)) * 3;

      const rightIdx = (y * width + 1438) * 3;

      const wTop = (1 - v) * (0.3 + 0.5 * u);
      const wBot = v * (0.4 + 0.3 * (1 - u));
      const wLeft = (1 - u) * (0.6 * (1 - v) + 0.3 * v);
      const wRight = u * 0.2;
      const totalW = wTop + wBot + wLeft + wRight;

      const r = (data[topIdx] * wTop + data[botIdx] * wBot + data[leftIdx] * wLeft + data[rightIdx] * wRight) / totalW;
      const g = (data[topIdx+1] * wTop + data[botIdx+1] * wBot + data[leftIdx+1] * wLeft + data[rightIdx+1] * wRight) / totalW;
      const b = (data[topIdx+2] * wTop + data[botIdx+2] * wBot + data[leftIdx+2] * wLeft + data[rightIdx+2] * wRight) / totalW;

      const edgeDist = Math.min(x - xStart, xEnd - 1 - x, y - yStart, yEnd - 1 - y);
      const blend = Math.min(edgeDist / 14, 1.0);

      out[idx] = Math.round(data[idx] * (1 - blend) + r * blend);
      out[idx+1] = Math.round(data[idx+1] * (1 - blend) + g * blend);
      out[idx+2] = Math.round(data[idx+2] * (1 - blend) + b * blend);
    }
  }

  // 4. Smooth continuous fade to pure white on the left:
  // Sky (y < 220): x0 = 330, x1 = 430
  // Transition (y 220..260): smooth ease
  // Lower section (y >= 260): x0 = 575, x1 = 645 (clean white under all heading text)
  for (let y = 0; y < height; y++) {
    let x0, x1;
    if (y < 220) {
      x0 = 330;
      x1 = 430;
    } else if (y < 260) {
      const t = (y - 220) / (260 - 220);
      const easeT = 0.5 * (1 - Math.cos(t * Math.PI));
      x0 = 330 + easeT * (575 - 330);
      x1 = 430 + easeT * (645 - 430);
    } else {
      x0 = 575;
      x1 = 645;
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

  // 5. Composite HD Guruji
  // Width: 185, height: ~223
  const gurujiPrepared = await sharp('scratch/guruji_feathered_hd.png')
    .resize(185, null, { kernel: 'lanczos3' })
    .linear(1.2, -3)
    .sharpen({ sigma: 1.15, m1: 1.35, m2: 2.3 })
    .toBuffer();

  const gMeta = await sharp(gurujiPrepared).metadata();
  console.log('Guruji size:', gMeta.width, gMeta.height);

  // Position Guruji higher up in the open sky:
  // Centered at x = 525 (left = 525 - 185/2 = 432.5 -> 432)
  // Top: 8px (relative to 698px height)
  const composited = await sharp(out, { raw: { width, height, channels: 3 } })
    .composite([
      {
        input: gurujiPrepared,
        left: 432,
        top: 8,
        blend: 'over'
      }
    ])
    .png()
    .toBuffer();

  // 6. Upscale to 1920x931 MozJPEG
  await sharp(composited)
    .resize(1920, 931, { kernel: 'lanczos3' })
    .jpeg({ quality: 96, mozjpeg: true })
    .toFile('public/images/home/hero.jpg');

  console.log('Master hero image successfully generated with softened card bokeh!');
}

generateMasterHero();
