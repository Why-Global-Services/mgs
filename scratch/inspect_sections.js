const sharp = require('sharp');
const fs = require('fs');

async function inspectSections() {
  // Let us inspect the sections:
  // Image 1: Hero section (1440x916)
  // Image 2: 4 highlights (1440x247)
  // Image 3: Discover (1440x463)
  // Image 4: Academic Programs (1440x522)
  // Image 5: Community (1440x520)
  // Image 6: Four Features (1440x307)
  // Image 7: Life at MGS (1440x361)
  // Image 8: Admissions banner (1440x265)
  // Image 9: Footer (1437x357)

  // In Image 3 (Discover): where is the image located?
  // Let us find the bounding box of the middle student image in Image 3
  // In Image 5 (Community): where is the student reading image located?
  // In Image 7 (Life at MGS): where are the 3 cards located?
  // In Image 8 (Admissions): where is the campus building located?

  console.log("Saving crops to scratch for inspection...");
  // Image 1: hero background
  // Image 3: photo in middle
  // Image 5: photo on left
  // Image 7: card photos
  // Image 8: banner photo
}

inspectSections();
