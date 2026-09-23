const sharp = require('sharp');

async function testNaturalInpaint() {
  const { data, info } = await sharp('public/assets/ref_hero_hd.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const out = Buffer.from(data);

  // Clean 'ED' at x: 460-550, y: 170-230
  for (let y = 170; y <= 230; y++) {
    for (let x = 460; x <= 550; x++) {
      const idx = (y * width + x) * 3;
      // fill with clean sky from x=450
      const refIdx = (y * width + 440) * 3;
      out[idx] = data[refIdx];
      out[idx+1] = data[refIdx+1];
      out[idx+2] = data[refIdx+2];
    }
  }

  // Vertical gradient for x from 0 to 550
  for (let x = 0; x < 550; x++) {
    const topY = 140;
    const botY = 890;
    const topIdx = (topY * width + x) * 3;
    const botIdx = (botY * width + x) * 3;

    const tR = data[topIdx], tG = data[topIdx+1], tB = data[topIdx+2];
    const bR = data[botIdx], bG = data[botIdx+1], bB = data[botIdx+2];

    for (let y = topY; y <= botY; y++) {
      const t = (y - topY) / (botY - topY);
      const ease = Math.pow(t, 1.8);
      const r = Math.round(tR * (1 - ease) + bR * ease);
      const g = Math.round(tG * (1 - ease) + bG * ease);
      const b = Math.round(tB * (1 - ease) + bB * ease);

      const idx = (y * width + x) * 3;
      out[idx] = r;
      out[idx+1] = g;
      out[idx+2] = b;
    }
  }

  // Below Guruji: x from 550 to 800, y from 400 to 890
  for (let x = 550; x < 800; x++) {
    const topY = 400;
    const botY = 890;
    const topIdx = (topY * width + x) * 3;
    const botIdx = (botY * width + x) * 3;

    const tR = data[topIdx], tG = data[topIdx+1], tB = data[topIdx+2];
    const bR = data[botIdx], bG = data[botIdx+1], bB = data[botIdx+2];

    for (let y = topY; y <= botY; y++) {
      const t = (y - topY) / (botY - topY);
      const ease = Math.pow(t, 1.8);
      const r = Math.round(tR * (1 - ease) + bR * ease);
      const g = Math.round(tG * (1 - ease) + bG * ease);
      const b = Math.round(tB * (1 - ease) + bB * ease);

      const idx = (y * width + x) * 3;
      out[idx] = r;
      out[idx+1] = g;
      out[idx+2] = b;
    }
  }

  // Heavy horizontal & vertical Gaussian smoothing across the gradient area
  // We can blur the buffer, and then copy back only the gradient area and Guruji/students
  const blurred = await sharp(out, { raw: { width, height, channels: 3 } })
    .blur(32)
    .raw()
    .toBuffer();

  const finalOut = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;

      // Guruji portrait bounds: x: 550 to 780, y: 70 to 400
      const isGuruji = (x >= 550 && x <= 780 && y >= 70 && y <= 400);
      if (isGuruji) {
        finalOut[idx] = data[idx];
        finalOut[idx+1] = data[idx+1];
        finalOut[idx+2] = data[idx+2];
        continue;
      }

      // Crisp students & arch: x >= 810
      if (x >= 810) {
        finalOut[idx] = data[idx];
        finalOut[idx+1] = data[idx+1];
        finalOut[idx+2] = data[idx+2];
        continue;
      }

      // Seam between blurred and students (x: 770 to 810)
      if (x >= 770 && y > 400) {
        const blendT = (x - 770) / 40;
        finalOut[idx] = Math.round(blurred[idx] * (1 - blendT) + data[idx] * blendT);
        finalOut[idx+1] = Math.round(blurred[idx+1] * (1 - blendT) + data[idx+1] * blendT);
        finalOut[idx+2] = Math.round(blurred[idx+2] * (1 - blendT) + data[idx+2] * blendT);
        continue;
      }

      // Inside gradient area:
      finalOut[idx] = blurred[idx];
      finalOut[idx+1] = blurred[idx+1];
      finalOut[idx+2] = blurred[idx+2];
    }
  }

  await sharp(finalOut, { raw: { width, height, channels: 3 } })
    .jpeg({ quality: 95 })
    .toFile('public/assets/mgs_hero_editorial_seamless.jpg');

  console.log('Saved mgs_hero_editorial_seamless.jpg with clean smooth atmosphere');
}
testNaturalInpaint();
