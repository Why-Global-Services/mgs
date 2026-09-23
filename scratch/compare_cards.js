const sharp = require('sharp');

async function compareCards() {
  const card1 = await sharp('scratch/layout_card1_library.jpg').resize(40, 40).raw().toBuffer();
  const card2 = await sharp('scratch/layout_card2_practical.jpg').resize(40, 40).raw().toBuffer();
  const card3 = await sharp('scratch/layout_card3_sports.jpg').resize(40, 40).raw().toBuffer();

  const homeLib = await sharp('public/images/home/library.jpg').resize(40, 40).raw().toBuffer();
  const homeLearn = await sharp('public/images/home/learning.jpg').resize(40, 40).raw().toBuffer();
  const homeSports = await sharp('public/images/home/sports.jpg').resize(40, 40).raw().toBuffer();

  const zipReading = await sharp('public/assets/zip-webp/reading.webp').resize(40, 40).raw().toBuffer();
  const zipStem = await sharp('public/assets/zip-webp/stem-learning.webp').resize(40, 40).raw().toBuffer();
  const zipChampion = await sharp('public/assets/zip-webp/champion-court.webp').resize(40, 40).raw().toBuffer();

  function diff(a, b) {
    let d = 0;
    for (let i = 0; i < a.length; i++) d += Math.abs(a[i] - b[i]);
    return d / a.length;
  }

  console.log("Card 1 (Library) vs home/library.jpg:", diff(card1, homeLib));
  console.log("Card 1 (Library) vs zip-webp/reading.webp:", diff(card1, zipReading));

  console.log("Card 2 (Practical) vs home/learning.jpg:", diff(card2, homeLearn));
  console.log("Card 2 (Practical) vs zip-webp/stem-learning.webp:", diff(card2, zipStem));

  console.log("Card 3 (Sports) vs home/sports.jpg:", diff(card3, homeSports));
  console.log("Card 3 (Sports) vs zip-webp/champion-court.webp:", diff(card3, zipChampion));
}

compareCards();
