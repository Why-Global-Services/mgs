const fs = require('fs');

console.log("Looking at files in public/assets/zip-webp:");
const zipWebp = fs.readdirSync('public/assets/zip-webp');
console.log(zipWebp);

console.log("\nLooking at files in public/assets/webp:");
const webp = fs.readdirSync('public/assets/webp');
console.log(webp);
