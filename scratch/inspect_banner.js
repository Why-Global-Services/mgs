const sharp = require('sharp');
const fs = require('fs');

async function inspectBanner() {
  console.log("=== ADMISSIONS BANNER INSPECTION ===");
  const curMeta = await sharp('public/images/home/admissions.png').metadata();
  console.log('Current admissions.png:', curMeta.width, curMeta.height);

  const colMeta = await sharp('public/assets/mgs_admissions_colonnade.jpg').metadata();
  console.log('Colonnade master:', colMeta.width, colMeta.height);

  // Compare admissions.png with mgs_admissions_colonnade.jpg
  // Let's see what admissions.png contains
  const admBuf = await sharp('public/images/home/admissions.png').resize(40, 20).raw().toBuffer();
  const colBuf = await sharp('public/assets/mgs_admissions_colonnade.jpg').resize(40, 20).raw().toBuffer();
  let d = 0;
  for (let i = 0; i < admBuf.length; i++) d += Math.abs(admBuf[i] - colBuf[i]);
  console.log('Diff between admissions.png and colonnade:', d / admBuf.length);

  // Check Image 8.jpg.jpeg
  const img8Meta = await sharp('Image 8.jpg.jpeg').metadata();
  console.log('Image 8:', img8Meta.width, img8Meta.height);
}

inspectBanner();
