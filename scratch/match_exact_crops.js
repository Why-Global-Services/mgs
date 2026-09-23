const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function getStats(file) {
  return await sharp(file).resize(40, 40, { fit: 'fill' }).grayscale().raw().toBuffer();
}

function dist(b1, b2) {
  let d = 0;
  for (let i = 0; i < b1.length; i++) d += Math.abs(b1[i] - b2[i]);
  return d / b1.length;
}

async function matchExact() {
  const candidates = [
    // 2752x1536 raw photos
    'public/assets/3_Modern_Campus.jpeg',
    'public/assets/5_Smart_IB.jpeg',
    'public/assets/6_–_Colourful_Library.jpeg',
    'public/assets/7_Colourful_Library.jpeg',
    'public/assets/8–_Music.jpeg',
    'public/assets/10_Indoor_Cricket.jpeg',
    'public/assets/11_Cricket_Stadium.jpeg',
    'public/assets/13_Outdoor_Play_.jpeg',
    'public/assets/14_Outdoor_Play_.jpeg',
    'public/assets/15_STEM_&.jpeg',
    'public/assets/16_STEM_&_.jpeg',
    'public/assets/18_Grand_Finale.jpeg',
    'public/assets/mgs_admissions_colonnade.jpg',
    'public/assets/hero-students-campus.jpg',
    'public/assets/mgs_community_boy.jpg',
    // zip-webp
    'public/assets/zip-webp/reading.webp',
    'public/assets/zip-webp/stem-learning.webp',
    'public/assets/zip-webp/champion-court.webp',
    'public/assets/zip-webp/melody-makers.webp',
    'public/assets/zip-webp/design-hive.webp',
    'public/assets/zip-webp/global-desk.webp',
    'public/assets/zip-webp/main-image.webp',
    'public/assets/zip-webp/girl-with-book.webp',
    'public/assets/zip-webp/group-of-student.webp',
    // brochure pages
    'scratch/brochure_page_0.jpeg',
    'scratch/brochure_page_1.jpeg',
    'scratch/brochure_page_2.jpeg',
    'scratch/brochure_page_3.jpeg',
    'scratch/brochure_page_4.jpeg',
    'scratch/brochure_page_5.jpeg',
    'scratch/brochure_page_6.jpeg',
  ];

  const candHashes = [];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      const h = await getStats(c);
      candHashes.push({ file: c, hash: h });
    }
  }

  const queries = [
    'scratch/layout_card1_library.jpg',
    'scratch/layout_card2_practical.jpg',
    'scratch/layout_card3_sports.jpg',
    'scratch/layout_banner_photo.jpg',
    'scratch/layout_community_boy.jpg',
    'scratch/layout_discover_students.jpg',
    'scratch/layout_four_feature_bg.jpg',
  ];

  for (const q of queries) {
    const qh = await getStats(q);
    const scored = candHashes.map(c => ({ file: c.file, diff: dist(qh, c.hash) }));
    scored.sort((a, b) => a.diff - b.diff);
    console.log(`\nTARGET: ${q}`);
    for (let i = 0; i < 4; i++) {
      console.log(`  ${scored[i].file} -> diff=${scored[i].diff.toFixed(2)}`);
    }
  }
}

matchExact();
