import sharp from 'sharp';

async function testInpaintCard() {
  const width = 1440;
  const height = 698;
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 218, width, height })
    .toBuffer();

  const { data } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);

  // Card in Image 1 is at x: 1175..1415, y: 435..595
  // Left of card (x: 1050..1174) is dark green school blazer and shadow.
  // Below card (y: 595..650) is skirt and blazer.
  // Let's sample dark green blazer texture from x: 1080..1170, y: 435..595
  for (let y = 435; y <= 595; y++) {
    for (let x = 1175; x <= 1415; x++) {
      // Map x across x: 1100..1170
      const offset = 1170 - ((x - 1175) % 65);
      const srcIdx = (y * width + offset) * 3;
      const dstIdx = (y * width + x) * 3;
      out[dstIdx] = data[srcIdx];
      out[dstIdx+1] = data[srcIdx+1];
      out[dstIdx+2] = data[srcIdx+2];
    }
  }

  await sharp(out, { raw: { width, height, channels: 3 } })
    .extract({ left: 1050, top: 400, width: 380, height: 250 })
    .jpeg({ quality: 95 })
    .toFile('scratch/test_inpainted_card_crop.jpg');

  console.log('Saved scratch/test_inpainted_card_crop.jpg');
}

testInpaintCard();
