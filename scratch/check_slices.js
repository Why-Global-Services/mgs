const sharp = require('sharp');
const fs = require('fs');

async function checkLayoutSlices() {
  // Let's inspect Image 3
  console.log("Image 3: 1440x463");
  // Let's also check what photos are in Image 3, 5, 7, 8
  // Let's save thumbnails of Image 1..9 to scratch
  for (let i = 1; i <= 9; i++) {
    await sharp(`Image ${i}.jpg.jpeg`)
      .resize(360)
      .toFile(`scratch/thumb_img_${i}.jpg`);
  }
  console.log("Saved thumb_img_1..9.jpg");
}

checkLayoutSlices();
