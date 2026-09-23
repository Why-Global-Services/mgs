const sharp = require('sharp');

async function extractTextUnderCards() {
  // Image 7 height is 361. Cards end around y=265. Text is from y=265 to 350.
  await sharp('Image 7.jpg.jpeg')
    .extract({ left: 450, top: 265, width: 950, height: 85 })
    .toFile('scratch/layout_card_labels.jpg');
  console.log("Card labels extracted.");
}

extractTextUnderCards();
