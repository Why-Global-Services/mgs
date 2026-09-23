const sharp = require('sharp');

async function testCropImage1() {
  await sharp('Image 1.jpg.jpeg')
    .extract({ left: 350, top: 220, width: 1090, height: 696 })
    .toFile('scratch/image1_hero_crop.jpg');
  console.log("Image 1 hero crop created.");
}

testCropImage1();
