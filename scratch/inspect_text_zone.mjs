import sharp from 'sharp';

async function inspectTextZone() {
  await sharp('Image 1.jpg.jpeg')
    .extract({ left: 350, top: 218 + 184, width: 250, height: 205 })
    .toFile('scratch/test_text_zone.jpg');
  console.log('Saved test_text_zone.jpg');
}

inspectTextZone();
