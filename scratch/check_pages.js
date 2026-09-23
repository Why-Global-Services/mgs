const sharp = require('sharp');
const fs = require('fs');

async function inspectPages() {
  // Let's generate low-res thumbnails or inspect sections of each page
  // We can also check if the students in discover.webp or community.jpg or hero are on these pages
  console.log("Analyzing pages...");
  for (let i = 0; i < 7; i++) {
    const f = `scratch/brochure_page_${i}.jpeg`;
    const meta = await sharp(f).metadata();
    console.log(`Page ${i}: ${meta.width}x${meta.height}`);
  }
}

inspectPages();
