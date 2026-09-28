import sharp from 'sharp';

async function inspectSampleArea() {
  await sharp('Image 1.jpg.jpeg')
    .extract({ left: 560, top: 218 + 275, width: 60, height: 115 })
    .toFile('scratch/test_sample_area.jpg');
  console.log('Saved test_sample_area.jpg');
}

inspectSampleArea();
