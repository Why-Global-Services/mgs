const sharp = require('sharp');

async function getCardBoxes() {
  const { data, info } = await sharp('Image 7.jpg.jpeg').raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < info.height; y += 10) {
    let nonWhite1 = 0;
    for (let x = 500; x < 750; x++) {
      const idx = (y * info.width + x) * 3;
      if (data[idx] < 240 || data[idx+1] < 240 || data[idx+2] < 240) nonWhite1++;
    }
    console.log(`y=${y}: nonWhite in card 1 = ${nonWhite1}`);
  }
}

getCardBoxes();
