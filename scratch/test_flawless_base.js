const sharp = require('sharp');

async function testFlawlessBase() {
  const width = 1440;
  const height = 698;
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 218, width, height })
    .toBuffer();

  const { data, info } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);

  // Inpaint old text and old Guruji
  for (let y = 0; y < 250; y++) {
    for (let x = 350; x <= 550; x++) {
      const idx = (y * width + x) * 3;
      const rightX = Math.min(560, width - 1);
      const rightIdx = (y * width + rightX) * 3;
      
      const topY = Math.min(y, 65);
      const topIdx = (topY * width + x) * 3;

      const weightRight = (x - 350) / (550 - 350);
      const r = Math.round(data[topIdx] * (1 - weightRight * 0.5) + data[rightIdx] * (weightRight * 0.5));
      const g = Math.round(data[topIdx+1] * (1 - weightRight * 0.5) + data[rightIdx+1] * (weightRight * 0.5));
      const b = Math.round(data[topIdx+2] * (1 - weightRight * 0.5) + data[rightIdx+2] * (weightRight * 0.5));

      let inpaintWeight = 0;
      if (y >= 70 && y <= 265 && x >= 360 && x <= 545) {
        const edgeDistX = Math.min(x - 360, 545 - x);
        const edgeDistY = Math.min(y - 70, 265 - y);
        inpaintWeight = Math.min(edgeDistX / 15, edgeDistY / 15, 1.0);
      }

      if (inpaintWeight > 0) {
        out[idx] = Math.round(out[idx] * (1 - inpaintWeight) + r * inpaintWeight);
        out[idx+1] = Math.round(out[idx+1] * (1 - inpaintWeight) + g * inpaintWeight);
        out[idx+2] = Math.round(out[idx+2] * (1 - inpaintWeight) + b * inpaintWeight);
      }
    }
  }

  // Smooth continuous fade to white:
  for (let y = 0; y < height; y++) {
    const progressY = y / height;
    const x0 = 320 + progressY * 40;
    const x1 = 480 + progressY * 60;

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

  await sharp(out, { raw: { width, height, channels: 3 } })
    .jpeg({ quality: 95 })
    .toFile('scratch/test_flawless_base.jpg');

  console.log('Saved scratch/test_flawless_base.jpg');
}

testFlawlessBase();
