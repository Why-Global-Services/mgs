import sharp from 'sharp';

async function findBeginsCoords() {
  const { data, info } = await sharp('Image 1.jpg.jpeg').raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  
  // Find pixels that are dark blue (R < 50, G < 60, B < 80) in the region x: 300..600, y: 400..650
  let minX = 9999, maxX = 0, minY = 9999, maxY = 0;
  for (let y = 400; y < 650; y++) {
    for (let x = 300; x < 600; x++) {
      const idx = (y * w + x) * 3;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      if (r < 60 && g < 75 && b < 100 && (b > r || Math.abs(r - g) < 20)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log('Dark text bounds in Image 1:', { minX, maxX, minY, maxY, relY_min: minY - 218, relY_max: maxY - 218 });
}

findBeginsCoords();
