const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function getStats(file) {
  return await sharp(file).resize(32, 32, { fit: 'fill' }).grayscale().raw().toBuffer();
}

function dist(b1, b2) {
  let d = 0;
  for (let i = 0; i < b1.length; i++) d += Math.abs(b1[i] - b2[i]);
  return d / b1.length;
}

async function matchCrops() {
  const assets = fs.readdirSync('public/assets')
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .map(f => ({ name: f, path: path.join('public/assets', f) }));

  const zipWebp = fs.readdirSync('public/assets/zip-webp')
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .map(f => ({ name: 'zip-webp/' + f, path: path.join('public/assets/zip-webp', f) }));

  const all = [...assets, ...zipWebp];
  const allHashes = [];
  for (const item of all) {
    try {
      const h = await getStats(item.path);
      allHashes.push({ name: item.name, hash: h });
    } catch (e) {}
  }

  const crops = [
    'scratch/crop_image_3_photo.jpg',
    'scratch/crop_image_5_photo.jpg',
    'scratch/crop_image_7_cards.jpg',
    'scratch/crop_image_8_banner.jpg'
  ];

  for (const c of crops) {
    const ch = await getStats(c);
    const scored = allHashes.map(a => ({ name: a.name, diff: dist(ch, a.hash) }));
    scored.sort((a, b) => a.diff - b.diff);
    console.log(`\nCROP: ${c}`);
    for (let i = 0; i < 5; i++) {
      console.log(`  ${scored[i].name} (diff=${scored[i].diff.toFixed(2)})`);
    }
  }
}

matchCrops();
