const fs = require("fs");
const path = require("path");

function getImageInfo(buffer) {
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    return { type: "png", width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xFF) { offset++; continue; }
      let marker = buffer[offset + 1];
      if (marker === 0xC0 || marker === 0xC2) {
        return {
          type: "jpeg",
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7)
        };
      }
      if (marker === 0xD9 || marker === 0xDA) break;
      let len = buffer.readUInt16BE(offset + 2);
      offset += 2 + len;
    }
  }
  if (buffer.slice(0, 4).toString() === "RIFF" && buffer.slice(8, 12).toString() === "WEBP") {
    const vp8 = buffer.slice(12, 16).toString();
    if (vp8 === "VP8 ") {
      const width = buffer.readUInt16LE(26) & 0x3fff;
      const height = buffer.readUInt16LE(28) & 0x3fff;
      return { type: "webp", width, height };
    } else if (vp8 === "VP8L") {
      const b1 = buffer[21], b2 = buffer[22], b3 = buffer[23], b4 = buffer[24];
      const width = 1 + (((b2 & 0x3f) << 8) | b1);
      const height = 1 + (((b4 & 0xf) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
      return { type: "webp", width, height };
    } else if (vp8 === "VP8X") {
      const width = 1 + buffer.readUIntLE(24, 3);
      const height = 1 + buffer.readUIntLE(27, 3);
      return { type: "webp", width, height };
    }
  }
  return { type: "unknown", width: 0, height: 0 };
}

console.log("=== ROOT IMAGES ===");
const rootFiles = fs.readdirSync(process.cwd());
for (const f of rootFiles) {
  if (/\.(jpg|jpeg|png|webp)$/i.test(f)) {
    const full = path.join(process.cwd(), f);
    const stat = fs.statSync(full);
    const info = getImageInfo(fs.readFileSync(full));
    console.log(`${f}: ${(stat.size/1024).toFixed(1)} KB, ${info.type}, ${info.width}x${info.height}`);
  }
}

console.log("\n=== PUBLIC/IMAGES/HOME ===");
const homeDir = path.join(process.cwd(), "public", "images", "home");
if (fs.existsSync(homeDir)) {
  for (const f of fs.readdirSync(homeDir)) {
    const full = path.join(homeDir, f);
    const stat = fs.statSync(full);
    const info = getImageInfo(fs.readFileSync(full));
    console.log(`${f}: ${(stat.size/1024).toFixed(1)} KB, ${info.type}, ${info.width}x${info.height}`);
  }
}

console.log("\n=== PUBLIC/ASSETS ===");
const assetsDir = path.join(process.cwd(), "public", "assets");
if (fs.existsSync(assetsDir)) {
  for (const f of fs.readdirSync(assetsDir)) {
    const full = path.join(assetsDir, f);
    const stat = fs.statSync(full);
    if (!stat.isDirectory() && /\.(jpg|jpeg|png|webp)$/i.test(f)) {
      const info = getImageInfo(fs.readFileSync(full));
      console.log(`${f}: ${(stat.size/1024).toFixed(1)} KB, ${info.type}, ${info.width}x${info.height}`);
    }
  }
}
