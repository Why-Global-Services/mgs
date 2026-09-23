const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function findSourceMasters() {
  const cards = [
    { name: 'Library', file: 'public/assets/mgs_life_library_hd.jpg' },
    { name: 'Practical', file: 'public/assets/mgs_life_practical_hd.jpg' },
    { name: 'Sports', file: 'public/assets/mgs_life_sports_hd.jpg' }
  ];

  const masters = [
    '3_Modern_Campus.jpeg',
    '5_Smart_IB.jpeg',
    '6_–_Colourful_Library.jpeg',
    '7_Colourful_Library.jpeg',
    '8–_Music.jpeg',
    '10_Indoor_Cricket.jpeg',
    '11_Cricket_Stadium.jpeg',
    '13_Outdoor_Play_.jpeg',
    '14_Outdoor_Play_.jpeg',
    '15_STEM_&.jpeg',
    '16_STEM_&_.jpeg',
    '18_Grand_Finale.jpeg',
    'WhatsApp Image 2026-05-26 at 4.41.21 PM.jpeg'
  ];

  for (const c of cards) {
    const cMeta = await sharp(c.file).metadata();
    console.log(`\n=== Card: ${c.name} (${cMeta.width}x${cMeta.height}) ===`);
    // Sample a 40x40 thumbnail
    const cBuf = await sharp(c.file).resize(40, 40, { fit: 'fill' }).raw().toBuffer();

    for (const m of masters) {
      const mPath = path.join('public/assets', m);
      if (!fs.existsSync(mPath)) continue;
      // slide search
      const mMeta = await sharp(mPath).metadata();
      // resize master to height ~ 400
      const sW = Math.round(mMeta.width * (400 / mMeta.height));
      const sH = 400;
      const sBuf = await sharp(mPath).resize(sW, sH).raw().toBuffer();

      let minD = 999999;
      const boxW = Math.round(400 * (cMeta.width / cMeta.height));
      const boxH = 400;
      if (boxW <= sW) {
        for (let x = 0; x <= sW - boxW; x += 20) {
          let diff = 0;
          for (let py = 0; py < 40; py++) {
            const sy = Math.floor((py / 40) * boxH);
            for (let px = 0; px < 40; px++) {
              const sx = x + Math.floor((px / 40) * boxW);
              const cIdx = (py * 40 + px) * 3;
              const sIdx = (sy * sW + sx) * 3;
              diff += Math.abs(cBuf[cIdx] - sBuf[sIdx]);
              diff += Math.abs(cBuf[cIdx+1] - sBuf[sIdx+1]);
              diff += Math.abs(cBuf[cIdx+2] - sBuf[sIdx+2]);
            }
          }
          diff /= (1600 * 3);
          if (diff < minD) minD = diff;
        }
      }
      if (minD < 50) {
        console.log(`  MATCH: ${m} with diff=${minD.toFixed(2)}`);
      }
    }
  }
}

findSourceMasters();
