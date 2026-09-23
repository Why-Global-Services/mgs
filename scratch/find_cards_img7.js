const sharp = require('sharp');

async function findCardsInImage7() {
  const meta = await sharp('Image 7.jpg.jpeg').metadata();
  console.log('Image 7 dimensions:', meta.width, meta.height);

  // Let's create an annotated or sliced view
  // Let's check pixel rows and columns in Image 7
  const { data, info } = await sharp('Image 7.jpg.jpeg').raw().toBuffer({ resolveWithObject: true });
  // find columns with non-white pixels
  for (let x = 0; x < info.width; x += 50) {
    let nonWhite = 0;
    for (let y = 0; y < info.height; y++) {
      const idx = (y * info.width + x) * 3;
      if (data[idx] < 240 || data[idx+1] < 240 || data[idx+2] < 240) nonWhite++;
    }
    console.log(`x=${x}: nonWhite=${nonWhite}`);
  }
}

findCardsInImage7();
