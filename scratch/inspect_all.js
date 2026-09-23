const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function inspectAll() {
  console.log("=== INSPECTING CARD IMAGES & SOURCE MATCHES ===");
  
  // Let us inspect the brochure pages in scratch/
  for (let i = 0; i <= 6; i++) {
    const f = `scratch/brochure_page_${i}.jpeg`;
    if (fs.existsSync(f)) {
      const meta = await sharp(f).metadata();
      console.log(`${f}: ${meta.width}x${meta.height}, ${(fs.statSync(f).size / 1024 / 1024).toFixed(2)} MB`);
    }
  }

  // Let us inspect the 2752x1536 images in public/assets/
  const assets2752 = [
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
    'mgs_admissions_colonnade.jpg',
    'hero-students-campus.jpg'
  ];

  for (const a of assets2752) {
    const p = path.join('public/assets', a);
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      console.log(`Asset ${a}: ${meta.width}x${meta.height}, ${(fs.statSync(p).size / 1024 / 1024).toFixed(2)} MB`);
    }
  }
}

inspectAll();
