import sharp from 'sharp';

async function extractCard() {
  await sharp('Image 1.jpg.jpeg')
    .extract({ left: 1150, top: 218 + 400, width: 270, height: 200 })
    .toFile('scratch/test_card_crop.jpg');
  console.log('Saved test_card_crop.jpg');
}

extractCard();
