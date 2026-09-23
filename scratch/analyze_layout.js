const sharp = require('sharp');
const fs = require('fs');

async function analyzeLayout() {
  // Let us inspect what Image 1 to Image 9 look like
  for (let i = 1; i <= 9; i++) {
    const f = `Image ${i}.jpg.jpeg`;
    const meta = await sharp(f).metadata();
    console.log(`Image ${i}: ${meta.width}x${meta.height}`);
  }
}

analyzeLayout();
