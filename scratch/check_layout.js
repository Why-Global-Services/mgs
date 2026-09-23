const sharp = require('sharp');
const fs = require('fs');

async function inspectLayout() {
  const wl = await sharp('website layout 1.jpg.jpeg').metadata();
  console.log(`website layout 1: ${wl.width}x${wl.height}`);
  
  // Check if Image 1..9 are exact crops of website layout 1.jpg.jpeg
  let currentY = 0;
  for (let i = 1; i <= 9; i++) {
    const f = `Image ${i}.jpg.jpeg`;
    const m = await sharp(f).metadata();
    console.log(`Image ${i}: ${m.width}x${m.height} at expected Y=${currentY}`);
    currentY += m.height;
  }
}

inspectLayout();
