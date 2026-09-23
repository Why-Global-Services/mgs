const sharp = require('sharp');

async function extractBannerHD() {
  await sharp('Image 8.jpg.jpeg')
    .extract({ left: 0, top: 0, width: 680, height: 265 })
    .toFile('scratch/test_banner_hd.jpg');
  console.log("Banner HD extracted.");
}

extractBannerHD();
