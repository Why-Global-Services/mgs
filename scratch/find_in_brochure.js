const sharp = require('sharp');
const fs = require('fs');

async function findInBrochure() {
  // Let us check if the students running photo (discover.webp) is on one of the brochure pages!
  // And let us check if the student reading photo (community.jpg) is on one of the brochure pages!
  // discover.webp is 940x1412
  // community.jpg is 900x527
  
  // Let's also check public/assets/zip-webp/girl-with-book.webp (860x860)
  // Let's check public/assets/zip-webp/group-of-student.webp (1500x501)
  console.log("Checking zip-webp/girl-with-book.webp, group-of-student.webp, etc.");
}

findInBrochure();
