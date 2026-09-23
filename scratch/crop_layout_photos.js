const sharp = require('sharp');

async function cropPhotos() {
  // In Image 3 (Discover):
  // 1440x463. Discover has: Left text, Middle image (approx x: 480 to 960?), Right red panel
  // Let's crop x: 400 to 1040
  await sharp('Image 3.jpg.jpeg')
    .extract({ left: 450, top: 40, width: 450, height: 380 })
    .toFile('scratch/crop_image_3_photo.jpg');

  // In Image 5 (Community):
  // 1440x520. Photo is on the left
  await sharp('Image 5.jpg.jpeg')
    .extract({ left: 100, top: 40, width: 600, height: 440 })
    .toFile('scratch/crop_image_5_photo.jpg');

  // In Image 7 (Life at MGS):
  // 1440x361. Cards are on the right
  await sharp('Image 7.jpg.jpeg')
    .extract({ left: 500, top: 40, width: 900, height: 300 })
    .toFile('scratch/crop_image_7_cards.jpg');

  // In Image 8 (Admissions banner):
  // 1440x265. Banner photo on left
  await sharp('Image 8.jpg.jpeg')
    .extract({ left: 100, top: 20, width: 450, height: 220 })
    .toFile('scratch/crop_image_8_banner.jpg');

  console.log("Crops created successfully.");
}

cropPhotos();
