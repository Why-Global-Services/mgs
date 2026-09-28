const sharp = require('sharp');

async function preparePerfectHero() {
  // Extract hero from Image 1.jpg.jpeg
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 220, width: 1440, height: 696 })
    .toBuffer();

  const { data, info } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const out = Buffer.from(data);

  // 1. Smooth cosine fade to pure white on the left side (x: 0 to 570)
  // This cleanly removes old Guruji and old text without any blurry patches!
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      let fade = 0;

      if (x < 460) {
        fade = 1.0;
      } else if (x < 560) {
        const t = (x - 460) / (560 - 460);
        fade = 0.5 * (1 + Math.cos(t * Math.PI));
      }

      if (fade > 0) {
        out[idx] = Math.round(out[idx] * (1 - fade) + 255 * fade);
        out[idx + 1] = Math.round(out[idx + 1] * (1 - fade) + 255 * fade);
        out[idx + 2] = Math.round(out[idx + 2] * (1 - fade) + 255 * fade);
      }
    }
  }

  // 2. Inpaint the badge area at bottom right: x: 1180 to 1440, y: 470 to 696
  // Behind the badge is the student blazer, skirt, and out-of-focus garden.
  // Sample textures from x: 1100..1180 and y: 350..470 to smoothly blend the area
  // Alternatively, blend the navy tone into the background so the HTML badge sits over it seamlessly!
  for (let y = 470; y < h; y++) {
    for (let x = 1170; x < w; x++) {
      const idx = (y * w + x) * 3;
      const r = out[idx], g = out[idx+1], b = out[idx+2];
      const lum = 0.299*r + 0.587*g + 0.114*b;
      // In the badge box, white text or gold line has high luminance or yellow tint
      if (lum > 70 || (r > 120 && g > 90 && b < 50)) {
        // Sample dark navy backdrop of the badge
        out[idx] = 7;
        out[idx+1] = 28;
        out[idx+2] = 42;
      }
    }
  }

  // Box blur only over text-replaced pixels in the badge
  const smoothed = Buffer.from(out);
  for (let y = 470; y < h; y++) {
    for (let x = 1170; x < w; x++) {
      let rSum = 0, gSum = 0, bSum = 0, c = 0;
      for (let dy = -4; dy <= 4; dy += 2) {
        for (let dx = -4; dx <= 4; dx += 2) {
          const ny = y + dy, nx = x + dx;
          if (ny >= 470 && ny < h && nx >= 1170 && nx < w) {
            const p = (ny * w + nx) * 3;
            rSum += out[p]; gSum += out[p+1]; bSum += out[p+2]; c++;
          }
        }
      }
      if (c > 0) {
        const p = (y * w + x) * 3;
        smoothed[p] = Math.round(rSum / c);
        smoothed[p+1] = Math.round(gSum / c);
        smoothed[p+2] = Math.round(bSum / c);
      }
    }
  }

  // Resize to 1920x928 using high quality Lanczos3
  await sharp(smoothed, { raw: { width: w, height: h, channels: 3 } })
    .resize(1920, 928, { kernel: 'lanczos3' })
    .jpeg({ quality: 96, mozjpeg: true })
    .toFile('public/images/home/hero.jpg');

  console.log('Successfully generated clean 1920x928 public/images/home/hero.jpg');
}

preparePerfectHero().catch(console.error);
