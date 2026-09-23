const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compareImages() {
  console.log("Analyzing zip-webp files against raw assets...");
  const zipWebpDir = path.join(process.cwd(), 'public', 'assets', 'zip-webp');
  const zipFiles = fs.readdirSync(zipWebpDir);

  const rawAssets = [
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

  for (const z of zipFiles) {
    const meta = await sharp(path.join(zipWebpDir, z)).metadata();
    console.log(`zip-webp: ${z} -> ${meta.width}x${meta.height}`);
  }
}

compareImages();
