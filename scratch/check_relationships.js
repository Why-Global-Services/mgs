const sharp = require('sharp');
const fs = require('fs');

async function testMatch(zFile, mFile) {
  const zBuf = await sharp(zFile).resize(50, 30, { fit: 'fill' }).grayscale().raw().toBuffer();
  const mBuf = await sharp(mFile).resize(50, 30, { fit: 'fill' }).grayscale().raw().toBuffer();
  let diff = 0;
  for (let i = 0; i < zBuf.length; i++) {
    diff += Math.abs(zBuf[i] - mBuf[i]);
  }
  return diff / zBuf.length;
}

async function checkRelationships() {
  console.log("melody-makers.webp vs 8–_Music.jpeg:", 
    await testMatch('public/assets/zip-webp/melody-makers.webp', 'public/assets/8–_Music.jpeg'));

  console.log("reading.webp vs 6_–_Colourful_Library.jpeg:", 
    await testMatch('public/assets/zip-webp/reading.webp', 'public/assets/6_–_Colourful_Library.jpeg'));
  console.log("reading.webp vs 7_Colourful_Library.jpeg:", 
    await testMatch('public/assets/zip-webp/reading.webp', 'public/assets/7_Colourful_Library.jpeg'));

  console.log("stem-learning.webp vs 15_STEM_&.jpeg:", 
    await testMatch('public/assets/zip-webp/stem-learning.webp', 'public/assets/15_STEM_&.jpeg'));
  console.log("stem-learning.webp vs 16_STEM_&_.jpeg:", 
    await testMatch('public/assets/zip-webp/stem-learning.webp', 'public/assets/16_STEM_&_.jpeg'));

  console.log("champion-court.webp vs 10_Indoor_Cricket.jpeg:", 
    await testMatch('public/assets/zip-webp/champion-court.webp', 'public/assets/10_Indoor_Cricket.jpeg'));
  console.log("champion-court.webp vs 11_Cricket_Stadium.jpeg:", 
    await testMatch('public/assets/zip-webp/champion-court.webp', 'public/assets/11_Cricket_Stadium.jpeg'));

  console.log("campus.jpg vs 3_Modern_Campus.jpeg:", 
    await testMatch('public/images/home/campus.jpg', 'public/assets/3_Modern_Campus.jpeg'));

  console.log("admissions.png vs mgs_admissions_colonnade.jpg:", 
    await testMatch('public/images/home/admissions.png', 'public/assets/mgs_admissions_colonnade.jpg'));
  console.log("admissions.png vs 3_Modern_Campus.jpeg:", 
    await testMatch('public/images/home/admissions.png', 'public/assets/3_Modern_Campus.jpeg'));
}

checkRelationships();
