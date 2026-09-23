const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function extractAndIdentify() {
  await sharp('Image 7.jpg.jpeg')
    .extract({ left: 485, top: 65, width: 260, height: 200 })
    .toFile('scratch/exact_card1.jpg');

  await sharp('Image 7.jpg.jpeg')
    .extract({ left: 805, top: 65, width: 260, height: 200 })
    .toFile('scratch/exact_card2.jpg');

  await sharp('Image 7.jpg.jpeg')
    .extract({ left: 1125, top: 65, width: 260, height: 200 })
    .toFile('scratch/exact_card3.jpg');

  console.log("Exact cards extracted.");

  // Now compare exact_card1, 2, 3 against all images in public/assets (including subdirectories)
  const allImages = [];
  function getImages(dir) {
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        if (f !== 'node_modules' && f !== '.next' && f !== '.git' && f !== 'scratch') {
          getImages(full);
        }
      } else if (/\.(jpe?g|png|webp)$/i.test(f)) {
        allImages.push(full);
      }
    }
  }
  getImages('public');

  for (const cardName of ['exact_card1.jpg', 'exact_card2.jpg', 'exact_card3.jpg']) {
    const cardPath = path.join('scratch', cardName);
    const cardBuf = await sharp(cardPath).resize(32, 24, { fit: 'fill' }).grayscale().raw().toBuffer();

    const matches = [];
    for (const imgPath of allImages) {
      try {
        const imgBuf = await sharp(imgPath).resize(32, 24, { fit: 'fill' }).grayscale().raw().toBuffer();
        let diff = 0;
        for (let i = 0; i < cardBuf.length; i++) {
          diff += Math.abs(cardBuf[i] - imgBuf[i]);
        }
        diff /= cardBuf.length;
        matches.push({ path: imgPath, diff });
      } catch (e) {}
    }
    matches.sort((a, b) => a.diff - b.diff);
    console.log(`\n=== MATCHES FOR ${cardName} ===`);
    for (let i = 0; i < 5; i++) {
      console.log(`  diff=${matches[i].diff.toFixed(2)} -> ${matches[i].path}`);
    }
  }
}

extractAndIdentify();
