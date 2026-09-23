const sharp = require('sharp');

async function findBrochurePhotos() {
  const meta = await sharp('scratch/brochure_page_0.jpeg').metadata();
  console.log('brochure_page_0:', meta.width, meta.height);

  // In 2481x3508, the 4 bottom cards are around y: 2800 to 3200
  // Card 1: x ~ 0 to 600
  // Card 2: x ~ 620 to 1230 (Library)
  // Card 3: x ~ 1250 to 1860 (Practical)
  // Card 4: x ~ 1880 to 2481 (Sports)
  console.log("Analyzing bottom row...");
}

findBrochurePhotos();
