const sharp = require('sharp');
const fs = require('fs');

async function checkImages() {
  for (let i = 1; i <= 9; i++) {
    const f = `Image ${i}.jpg.jpeg`;
    if (fs.existsSync(f)) {
      const meta = await sharp(f).metadata();
      console.log(`${f}: format=${meta.format} size=${meta.width}x${meta.height} channels=${meta.channels} density=${meta.density}`);
    }
  }
  const wl = 'website layout 1.jpg.jpeg';
  if (fs.existsSync(wl)) {
    const meta = await sharp(wl).metadata();
    console.log(`${wl}: format=${meta.format} size=${meta.width}x${meta.height}`);
  }
}

checkImages();
