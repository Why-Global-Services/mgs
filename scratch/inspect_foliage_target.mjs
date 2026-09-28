import sharp from 'sharp';

async function inspectFoliageArea() {
  await sharp('Image 1.jpg.jpeg')
    .extract({ left: 540, top: 218 + 250, width: 120, height: 150 })
    .toFile('scratch/test_foliage_target.jpg');
  console.log('Saved test_foliage_target.jpg');
}

inspectFoliageArea();
