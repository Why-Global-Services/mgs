const sharp = require('sharp');

async function inspectHairArea() {
  const crop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 520, top: 218 + 80, width: 90, height: 180 })
    .toFile('scratch/test_hair_boundary.jpg');
  console.log('Saved test_hair_boundary.jpg');
}
inspectHairArea();
