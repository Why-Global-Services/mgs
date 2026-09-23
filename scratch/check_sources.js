const fs = require("fs");
const path = require("path");

// Let us inspect the brochure, root images, and public assets
console.log("Checking PDF brochure content or page extracts...");
if (fs.existsSync(path.join(process.cwd(), "scratch"))) {
  const scratchFiles = fs.readdirSync(path.join(process.cwd(), "scratch"));
  console.log("scratch files:", scratchFiles.filter(f => !f.endsWith(".png")));
}

// Let us inspect the root Image 1..9
for (let i = 1; i <= 9; i++) {
  const p = path.join(process.cwd(), `Image ${i}.jpg.jpeg`);
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    console.log(`Image ${i}.jpg.jpeg: ${stat.size} bytes`);
  }
}
