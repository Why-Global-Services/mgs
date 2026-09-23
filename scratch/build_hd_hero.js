const sharp = require('sharp');

async function buildHDHero() {
  // Let's inspect Image 1.jpg.jpeg
  // The hero section in Image 1 starts after the navbar header (~y: 115)
  // Let's check where the navbar header ends
  const img1 = sharp('Image 1.jpg.jpeg');
  const meta = await img1.metadata();
  console.log('Image 1 size:', meta.width, meta.height);

  // In Image 1:
  // Navbar is white at the top, approx y: 0 to 118
  // Hero is y: 118 to 916 (height 798)
  // Let's extract this clean hero area
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 118, width: 1440, height: 798 })
    .toBuffer();

  await sharp(heroCrop).toFile('scratch/test_hero_crop_raw.jpg');
  console.log('Raw hero crop extracted.');
}

buildHDHero();
