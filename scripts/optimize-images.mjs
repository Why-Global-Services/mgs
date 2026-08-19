import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "assets", "optimized");

const remoteImages = [
  {
    name: "hero-campus.jpg",
    url: "https://www.theschoolofraya.com/static/images/Life_At_School_01.JPG",
    width: 1400,
    quality: 62,
  },
  {
    name: "program-ib.jpg",
    url: "https://www.theschoolofraya.com/static/images/AP_PYP.webp",
    width: 900,
    quality: 62,
  },
  {
    name: "program-cambridge.jpg",
    url: "https://www.theschoolofraya.com/static/images/AP_MYP.webp",
    width: 900,
    quality: 62,
  },
  {
    name: "program-pyp.jpg",
    url: "https://www.theschoolofraya.com/static/images/AP_DP.webp",
    width: 900,
    quality: 62,
  },
  {
    name: "life-inquiry.jpg",
    url: "https://www.theschoolofraya.com/static/images/Sports_and_Athletics.webp",
    width: 720,
    quality: 60,
  },
  {
    name: "life-holistic.jpg",
    url: "https://www.theschoolofraya.com/static/images/Visual_Performance_Arts.webp",
    width: 720,
    quality: 60,
  },
  {
    name: "life-mindedness.jpg",
    url: "https://www.theschoolofraya.com/static/images/Beyond_the_classroom.webp",
    width: 720,
    quality: 60,
  },
  {
    name: "life-facilities.jpg",
    url: "https://www.theschoolofraya.com/static/images/WSA_Home_Dining.webp",
    width: 720,
    quality: 60,
  },
  {
    name: "life-boarding.jpg",
    url: "https://www.theschoolofraya.com/static/images/WSA_Home_Health_Wellbeing.webp",
    width: 720,
    quality: 60,
  },
  {
    name: "life-future.jpg",
    url: "https://www.theschoolofraya.com/static/images/WSA_Home_Eco_School.webp",
    width: 720,
    quality: 60,
  },
  {
    name: "location-map.jpg",
    url: "https://www.theschoolofraya.com/static/images/Map_Mobile.webp",
    width: 720,
    quality: 62,
  },
  {
    name: "head-school.jpg",
    url: "https://www.theschoolofraya.com/static/images/AP_MYP.webp",
    width: 720,
    quality: 62,
  },
];

const eventImages = Array.from({ length: 8 }, (_, index) => {
  const number = String(18 - index).padStart(2, "0");
  return {
    name: `event-${index + 1}.jpg`,
    url: `https://www.theschoolofraya.com/static/images/Index_Events_At_Raya_${number}.webp`,
    width: 420,
    quality: 55,
  };
});

async function fetchBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function optimizeBuffer(input, image) {
  const output = await sharp(input)
    .rotate()
    .resize({ width: image.width, withoutEnlargement: true })
    .jpeg({ quality: image.quality, mozjpeg: true })
    .toBuffer();
  await writeFile(path.join(outDir, image.name), output);
  return { name: image.name, kb: Math.round(output.length / 1024) };
}

await mkdir(outDir, { recursive: true });

const localLogo = await readFile(
  path.join(process.cwd(), "public", "assets", "maharishi-logo.jpeg"),
);
const transparentLogo = await sharp(localLogo)
  .rotate()
  .resize({ width: 280, withoutEnlargement: true })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let index = 0; index < transparentLogo.data.length; index += 4) {
  const red = transparentLogo.data[index];
  const green = transparentLogo.data[index + 1];
  const blue = transparentLogo.data[index + 2];
  if (red > 242 && green > 242 && blue > 242) {
    transparentLogo.data[index + 3] = 0;
  }
}

const transparentLogoPng = await sharp(transparentLogo.data, {
  raw: transparentLogo.info,
})
  .png({ compressionLevel: 9, quality: 90 })
  .toBuffer();
await writeFile(
  path.join(outDir, "maharishi-logo-transparent.png"),
  transparentLogoPng,
);

const results = [
  {
    name: "maharishi-logo-transparent.png",
    kb: Math.round(transparentLogoPng.length / 1024),
  },
  await optimizeBuffer(localLogo, {
    name: "maharishi-logo-small.jpg",
    width: 240,
    quality: 70,
  }),
];

for (const image of [...remoteImages, ...eventImages]) {
  const input = await fetchBuffer(image.url);
  results.push(await optimizeBuffer(input, image));
}

console.table(results);
