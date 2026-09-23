const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function getStats(file) {
  // Resize to 32x32 grayscale for fast perceptual hashing
  const buf = await sharp(file)
    .resize(32, 32, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer();
  return buf;
}

function dist(b1, b2) {
  let d = 0;
  for (let i = 0; i < b1.length; i++) {
    d += Math.abs(b1[i] - b2[i]);
  }
  return d / b1.length;
}

async function run() {
  const targets = [
    'public/images/home/hero.jpg',
    'public/images/home/discover.webp',
    'public/images/home/community.jpg',
    'public/images/home/campus.jpg',
    'public/images/home/admissions.png',
    'public/images/home/logo.png',
    'public/images/home/library.jpg',
    'public/images/home/learning.jpg',
    'public/images/home/sports.jpg',
    'public/assets/zip-webp/reading.webp',
    'public/assets/zip-webp/stem-learning.webp',
    'public/assets/zip-webp/champion-court.webp',
    'public/assets/zip-webp/melody-makers.webp',
    'public/assets/zip-webp/design-hive.webp',
    'public/assets/zip-webp/global-desk.webp',
  ];

  const pool = [
    ...fs.readdirSync('.').filter(f => f.startsWith('Image') || f.startsWith('website')),
    ...fs.readdirSync('public/assets').filter(f => /\.(jpe?g|png|webp)$/i.test(f)).map(f => 'public/assets/' + f),
    ...fs.readdirSync('scratch').filter(f => /\.(jpe?g|png|webp)$/i.test(f)).map(f => 'scratch/' + f)
  ];

  const poolHashes = [];
  for (const p of pool) {
    try {
      const h = await getStats(p);
      poolHashes.push({ file: p, hash: h });
    } catch (e) {}
  }

  for (const t of targets) {
    if (!fs.existsSync(t)) continue;
    const th = await getStats(t);
    const matches = [];
    for (const p of poolHashes) {
      if (p.file === t) continue;
      const d = dist(th, p.hash);
      matches.push({ file: p.file, diff: d });
    }
    matches.sort((a, b) => a.diff - b.diff);
    console.log(`\nTARGET: ${t}`);
    for (let i = 0; i < 4 && i < matches.length; i++) {
      console.log(`  diff=${matches[i].diff.toFixed(2)}: ${matches[i].file}`);
    }
  }
}

run();
