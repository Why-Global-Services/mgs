const sharp = require('sharp');

async function inspectBeginsArea() {
  const crop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 350, top: 218 + 250, width: 250, height: 140 })
    .toFile('scratch/test_begins_area.jpg');
  console.log('Saved test_begins_area.jpg');
}
inspectBeginsArea();
