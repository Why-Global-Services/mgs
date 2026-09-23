const sharp = require('sharp');
const fs = require('fs');

async function analyze() {
  console.log("=== CURRENT IMAGES VS HIGH-RES CANDIDATES ===");

  // 1. LOGO
  console.log("\n--- 1. LOGO ---");
  const logoCurrent = await sharp('public/images/home/logo.png').metadata();
  console.log(`Current logo: ${logoCurrent.width}x${logoCurrent.height}, ${logoCurrent.format}`);
  const logoHighRes = await sharp('public/assets/mgs-logo-transparent-highres.png').metadata();
  console.log(`High-res logo: ${logoHighRes.width}x${logoHighRes.height}, ${logoHighRes.format}`);

  // 2. HERO
  console.log("\n--- 2. HERO ---");
  const heroCurrent = await sharp('public/images/home/hero.jpg').metadata();
  console.log(`Current hero: ${heroCurrent.width}x${heroCurrent.height}`);
  const heroRef = await sharp('public/assets/ref_hero_hd.jpg').metadata();
  console.log(`Ref hero HD: ${heroRef.width}x${heroRef.height}`);
  const image1 = await sharp('Image 1.jpg.jpeg').metadata();
  console.log(`Image 1.jpg.jpeg: ${image1.width}x${image1.height}`);
  const heroStudents = await sharp('public/assets/hero-students-campus.jpg').metadata();
  console.log(`hero-students-campus.jpg: ${heroStudents.width}x${heroStudents.height}`);

  // 3. DISCOVER
  console.log("\n--- 3. DISCOVER ---");
  const discCurrent = await sharp('public/images/home/discover.webp').metadata();
  console.log(`Current discover: ${discCurrent.width}x${discCurrent.height}, size: ${fs.statSync('public/images/home/discover.webp').size} bytes`);
  const image3 = await sharp('Image 3.jpg.jpeg').metadata();
  console.log(`Image 3.jpg.jpeg: ${image3.width}x${image3.height}`);

  // 4. COMMUNITY
  console.log("\n--- 4. COMMUNITY ---");
  const commCurrent = await sharp('public/images/home/community.jpg').metadata();
  console.log(`Current community: ${commCurrent.width}x${commCurrent.height}, size: ${fs.statSync('public/images/home/community.jpg').size} bytes`);
  const image5 = await sharp('Image 5.jpg.jpeg').metadata();
  console.log(`Image 5.jpg.jpeg: ${image5.width}x${image5.height}`);

  // 5. CAMPUS DARK (Four Features)
  console.log("\n--- 5. CAMPUS DARK ---");
  const campusCurrent = await sharp('public/images/home/campus.jpg').metadata();
  console.log(`Current campusDark: ${campusCurrent.width}x${campusCurrent.height}, size: ${fs.statSync('public/images/home/campus.jpg').size} bytes`);
  const campusMaster = await sharp('public/assets/3_Modern_Campus.jpeg').metadata();
  console.log(`Master 3_Modern_Campus.jpeg: ${campusMaster.width}x${campusMaster.height}, size: ${fs.statSync('public/assets/3_Modern_Campus.jpeg').size} bytes`);
  const image6 = await sharp('Image 6.jpg.jpeg').metadata();
  console.log(`Image 6.jpg.jpeg: ${image6.width}x${image6.height}`);

  // 6. LIFE AT MGS CARDS
  console.log("\n--- 6. LIFE AT MGS CARDS ---");
  const cards = [
    { key: 'lifeLibrary', current: 'public/assets/zip-webp/reading.webp' },
    { key: 'lifePractical', current: 'public/assets/zip-webp/stem-learning.webp' },
    { key: 'lifeSports', current: 'public/assets/zip-webp/champion-court.webp' },
    { key: 'lifeMusic', current: 'public/assets/zip-webp/melody-makers.webp' },
    { key: 'lifeDesign', current: 'public/assets/zip-webp/design-hive.webp' },
    { key: 'lifeLeadership', current: 'public/assets/zip-webp/global-desk.webp' },
  ];
  for (const c of cards) {
    const m = await sharp(c.current).metadata();
    console.log(`${c.key}: current=${m.width}x${m.height}, size=${fs.statSync(c.current).size} bytes`);
  }

  // 7. ADMISSIONS BANNER
  console.log("\n--- 7. ADMISSIONS BANNER ---");
  const admCurrent = await sharp('public/images/home/admissions.png').metadata();
  console.log(`Current admissions: ${admCurrent.width}x${admCurrent.height}, size: ${fs.statSync('public/images/home/admissions.png').size} bytes`);
  const admColonnade = await sharp('public/assets/mgs_admissions_colonnade.jpg').metadata();
  console.log(`mgs_admissions_colonnade.jpg: ${admColonnade.width}x${admColonnade.height}, size: ${fs.statSync('public/assets/mgs_admissions_colonnade.jpg').size} bytes`);
  const image8 = await sharp('Image 8.jpg.jpeg').metadata();
  console.log(`Image 8.jpg.jpeg: ${image8.width}x${image8.height}`);
}

analyze();
