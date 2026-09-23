const sharp = require('sharp');
const fs = require('fs');

async function extractDetailCrops() {
  // 1. In Image 7 (Life at MGS), let's crop each of the 3 cards precisely
  // Image 7 is 1440x361
  // In Image 7, cards start around y=40, height ~220
  // Card 1: Library
  // Card 2: Practical Learning
  // Card 3: Sports
  await sharp('Image 7.jpg.jpeg')
    .extract({ left: 520, top: 40, width: 260, height: 200 })
    .toFile('scratch/layout_card1_library.jpg');

  await sharp('Image 7.jpg.jpeg')
    .extract({ left: 810, top: 40, width: 260, height: 200 })
    .toFile('scratch/layout_card2_practical.jpg');

  await sharp('Image 7.jpg.jpeg')
    .extract({ left: 1100, top: 40, width: 260, height: 200 })
    .toFile('scratch/layout_card3_sports.jpg');

  // 2. In Image 8 (Admissions banner), crop the photo
  // Image 8 is 1440x265
  await sharp('Image 8.jpg.jpeg')
    .extract({ left: 100, top: 25, width: 450, height: 215 })
    .toFile('scratch/layout_banner_photo.jpg');

  // 3. In Image 5 (Community), crop the boy
  // Image 5 is 1440x520
  await sharp('Image 5.jpg.jpeg')
    .extract({ left: 100, top: 40, width: 580, height: 440 })
    .toFile('scratch/layout_community_boy.jpg');

  // 4. In Image 3 (Discover), crop the students
  // Image 3 is 1440x463
  await sharp('Image 3.jpg.jpeg')
    .extract({ left: 470, top: 35, width: 420, height: 390 })
    .toFile('scratch/layout_discover_students.jpg');

  // 5. In Image 6 (Four feature strip), crop background sample
  await sharp('Image 6.jpg.jpeg')
    .extract({ left: 0, top: 0, width: 500, height: 307 })
    .toFile('scratch/layout_four_feature_bg.jpg');

  console.log("Detail crops generated.");
}

extractDetailCrops();
