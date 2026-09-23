const sharp = require('sharp');

async function createSeamlessHero() {
  const targetW = 1920;
  const targetH = 922;

  // 1. Right side: mgs_hero_students_perfect.jpg (1100x908)
  const students = await sharp('public/assets/mgs_hero_students_perfect.jpg')
    .resize({ height: targetH })
    .toBuffer();
  
  const sMeta = await sharp(students).metadata();
  const sW = sMeta.width;
  const sX = targetW - sW; // ~ 803

  // 2. Build atmospheric SVG matching the morning sunlight and sky
  // Sample sky blue from top of arch: #b8d0e5 to #e3ecf5
  // Sample sun glow: #ffffff, warm gold #f8f3e8, garden green/sand at base #c5cbba / #d9d5c5
  const svgBg = Buffer.from(`
    <svg width="${targetW}" height="${targetH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sun" cx="30%" cy="18%" r="65%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
          <stop offset="40%" stop-color="#faf8f2" stop-opacity="1" />
          <stop offset="75%" stop-color="#f2ede2" stop-opacity="1" />
          <stop offset="100%" stop-color="#ded8c9" stop-opacity="1" />
        </radialGradient>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#b6cde2" />
          <stop offset="22%" stop-color="#dce7f1" />
          <stop offset="48%" stop-color="#fbf9f4" />
          <stop offset="76%" stop-color="#eae0cc" />
          <stop offset="100%" stop-color="#b8bfab" />
        </linearGradient>
      </defs>
      <rect width="${targetW}" height="${targetH}" fill="url(#sky)" />
      <circle cx="380" cy="200" r="680" fill="url(#sun)" opacity="0.85" />
    </svg>
  `);

  const bg = await sharp(svgBg).png().toBuffer();

  // Create smooth feathered alpha mask for students
  // Seamless ease transition across 140px
  const maskSvg = Buffer.from(`
    <svg width="${sW}" height="${targetH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0%" y1="0%" x2="140" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="black" />
          <stop offset="20%" stop-color="#222222" />
          <stop offset="50%" stop-color="#777777" />
          <stop offset="80%" stop-color="#cccccc" />
          <stop offset="100%" stop-color="white" />
        </linearGradient>
      </defs>
      <rect width="${sW}" height="${targetH}" fill="url(#fade)" />
    </svg>
  `);
  const mask = await sharp(maskSvg).toColourspace('b-w').toBuffer();

  // Apply mask to students
  const studentsMasked = await sharp(students)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Load Guruji portrait
  const guruji = await sharp('public/assets/guruji_ethereal_cloud.png')
    .resize({ width: 220 })
    .toBuffer();

  const finalComp = await sharp(bg)
    .composite([
      { input: studentsMasked, left: sX, top: 0 },
      { input: guruji, left: Math.round(sX - 10), top: 85 }
    ])
    .jpeg({ quality: 95 })
    .toFile('public/assets/mgs_hero_editorial_composite.jpg');

  console.log('Updated mgs_hero_editorial_composite.jpg');
}
createSeamlessHero();
