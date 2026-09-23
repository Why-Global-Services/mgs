import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateAllHDImages() {
  console.log('--- Starting HD Image Generation ---');
  fs.mkdirSync('public/images/home', { recursive: true });

  // 1. LOGO: High-Res 1024x1024 transparent PNG
  console.log('1. Generating HD Logo...');
  await sharp('public/assets/mgs-logo-transparent-highres.png')
    .png({ compressionLevel: 9 })
    .toFile('public/images/home/logo.png');
  console.log('✓ Logo generated (1024x1024 PNG)');

  // 2. HERO: 1920x928 HD from Photoshop Master Image 1
  console.log('2. Generating HD Hero...');
  const heroCrop = await sharp('Image 1.jpg.jpeg')
    .extract({ left: 0, top: 220, width: 1440, height: 696 })
    .toBuffer();

  const { data: heroData, info: heroInfo } = await sharp(heroCrop).raw().toBuffer({ resolveWithObject: true });
  const hWidth = heroInfo.width;
  const hHeight = heroInfo.height;
  const heroOut = Buffer.from(heroData);

  // Inpaint 'TURED' at x: 320..445, y: 115..170 using clean sky above
  for (let y = 115; y <= 170; y++) {
    for (let x = 320; x <= 445; x++) {
      const refY = y - 45;
      const refIdx = (refY * hWidth + x) * 3;
      const idx = (y * hWidth + x) * 3;
      heroOut[idx] = heroData[refIdx];
      heroOut[idx + 1] = heroData[refIdx + 1];
      heroOut[idx + 2] = heroData[refIdx + 2];
    }
  }

  // Inpaint 'ins' at x: 520..595, y: 300..395 using out-of-focus foliage below
  for (let y = 300; y <= 395; y++) {
    for (let x = 520; x <= 595; x++) {
      const refY = y + 90;
      const refIdx = (refY * hWidth + x) * 3;
      const idx = (y * hWidth + x) * 3;
      heroOut[idx] = heroData[refIdx];
      heroOut[idx + 1] = heroData[refIdx + 1];
      heroOut[idx + 2] = heroData[refIdx + 2];
    }
  }

  // Smooth cosine fade to pure white on the left side
  for (let y = 0; y < hHeight; y++) {
    for (let x = 0; x < hWidth; x++) {
      const idx = (y * hWidth + x) * 3;
      let fade = 0;

      if (y < 240) {
        if (x < 430) {
          fade = 1.0;
        } else if (x < 460) {
          const t = (x - 430) / (460 - 430);
          fade = 0.5 * (1 + Math.cos(t * Math.PI));
        }
      } else {
        if (x < 520) {
          fade = 1.0;
        } else if (x < 565) {
          const t = (x - 520) / (565 - 520);
          fade = 0.5 * (1 + Math.cos(t * Math.PI));
        }
      }

      if (fade > 0) {
        heroOut[idx] = Math.round(heroOut[idx] * (1 - fade) + 255 * fade);
        heroOut[idx + 1] = Math.round(heroOut[idx + 1] * (1 - fade) + 255 * fade);
        heroOut[idx + 2] = Math.round(heroOut[idx + 2] * (1 - fade) + 255 * fade);
      }
    }
  }

  await sharp(heroOut, { raw: { width: hWidth, height: hHeight, channels: 3 } })
    .resize(1920, 928, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/hero.jpg');
  console.log('✓ Hero generated (1920x928 JPEG)');

  // 3. DISCOVER: 1000x1240 HD from camera raw hero-students-campus.jpg
  console.log('3. Generating HD Discover...');
  const discoverCrop = sharp('public/assets/hero-students-campus.jpg')
    .extract({ left: 0, top: 0, width: 1121, height: 1390 })
    .resize(1000, 1240, { kernel: 'lanczos3' });

  await discoverCrop
    .clone()
    .webp({ quality: 95, effort: 6 })
    .toFile('public/images/home/discover.webp');

  await discoverCrop
    .clone()
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/discover.jpg');
  console.log('✓ Discover generated (1000x1240 WebP & JPEG)');

  // 4. COMMUNITY: 1200x830 HD from Photoshop Master Image 5
  console.log('4. Generating HD Community...');
  await sharp('Image 5.jpg.jpeg')
    .extract({ left: 0, top: 0, width: 746, height: 516 })
    .resize(1200, 830, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/community.jpg');
  console.log('✓ Community generated (1200x830 JPEG)');

  // 5. CAMPUS DARK: 1920x1071 HD from 2752x1536 camera master
  console.log('5. Generating HD Campus Dark...');
  await sharp('public/assets/3_Modern_Campus.jpeg')
    .resize(1920, 1071, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/campus.jpg');
  console.log('✓ Campus Dark generated (1920x1071 JPEG)');

  // 6. ADMISSIONS BANNER: 1200x411 HD from Photoshop Master Image 8
  console.log('6. Generating HD Admissions Banner...');
  const bannerCrop = sharp('Image 8.jpg.jpeg')
    .extract({ left: 0, top: 29, width: 680, height: 233 })
    .resize(1200, 411, { kernel: 'lanczos3' });

  await bannerCrop
    .clone()
    .png({ compressionLevel: 9 })
    .toFile('public/images/home/admissions.png');

  await bannerCrop
    .clone()
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/admissions.jpg');
  console.log('✓ Admissions Banner generated (1200x411 PNG & JPEG)');

  // 7. LIFE AT MGS CARDS: 6 Cards at 1200x900 (4:3) HD
  console.log('7. Generating 6 HD Life at MGS Cards...');

  // Card 1: Library & Reading Culture (from 2481x3508 300 DPI master)
  await sharp('scratch/extracted_pdf_img_3_2481x3508.jpg')
    .extract({ left: 870, top: 2028, width: 720, height: 546 })
    .resize(1200, 900, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/card-library.jpg');
  console.log('✓ Card 1 (Library) generated');

  // Card 2: Practical Learning (from 2752x1536 camera master)
  await sharp('public/assets/16_STEM_&_.jpeg')
    .extract({ left: 352, top: 0, width: 2048, height: 1536 })
    .resize(1200, 900, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/card-practical.jpg');
  console.log('✓ Card 2 (Practical Learning) generated');

  // Card 3: Sports Activities (from 2481x3508 300 DPI master)
  await sharp('scratch/extracted_pdf_img_6_2481x3508.jpg')
    .extract({ left: 1666, top: 2028, width: 710, height: 546 })
    .resize(1200, 900, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/card-sports.jpg');
  console.log('✓ Card 3 (Sports Activities) generated');

  // Card 4: Music & Performance (from 2481x3508 300 DPI master)
  await sharp('scratch/extracted_pdf_img_6_2481x3508.jpg')
    .extract({ left: 82, top: 2028, width: 715, height: 546 })
    .resize(1200, 900, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/card-music.jpg');
  console.log('✓ Card 4 (Music & Performance) generated');

  // Card 5: Design & Innovation (from 2481x3508 300 DPI master)
  await sharp('scratch/extracted_pdf_img_4_2481x3508.jpg')
    .extract({ left: 1665, top: 2028, width: 710, height: 546 })
    .resize(1200, 900, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/card-design.jpg');
  console.log('✓ Card 5 (Design & Innovation) generated');

  // Card 6: Leadership & Collaboration (from 2481x3508 300 DPI master)
  await sharp('scratch/extracted_pdf_img_5_2481x3508.jpg')
    .extract({ left: 872, top: 2028, width: 715, height: 546 })
    .resize(1200, 900, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile('public/images/home/card-leadership.jpg');
  console.log('✓ Card 6 (Leadership & Collaboration) generated');

  console.log('--- All HD Images Successfully Generated! ---');
}

generateAllHDImages().catch(err => {
  console.error('Error generating HD images:', err);
  process.exit(1);
});
