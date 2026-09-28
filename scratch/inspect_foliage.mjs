import sharp from 'sharp';

async function inspectFoliage() {
  await sharp('Image 1.jpg.jpeg')
    .extract({ left: 530, top: 218 + 290, width: 80, height: 90 })
    .toFile('scratch/test_foliage_close.jpg');
  console.log('Saved test_foliage_close.jpg');
}

inspectFoliage();
