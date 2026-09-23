const fs = require('fs');

const pdfBuf = fs.readFileSync('public/assets/mgs-brochure.pdf');
console.log('PDF size:', (pdfBuf.length / 1024 / 1024).toFixed(2), 'MB');

// Search for /DCTDecode (JPEGs) in the PDF
let count = 0;
let pos = 0;
while (pos < pdfBuf.length) {
  const streamIdx = pdfBuf.indexOf(Buffer.from('stream'), pos);
  if (streamIdx === -1) break;

  // check if preceding 200 bytes has /DCTDecode
  const headerStart = Math.max(0, streamIdx - 250);
  const header = pdfBuf.slice(headerStart, streamIdx).toString('latin1');
  if (header.includes('/DCTDecode') && header.includes('/Subtype /Image') || (header.includes('/Subtype/Image') && header.includes('/DCTDecode'))) {
    // Find start of stream data (skip \r\n or \n)
    let dataStart = streamIdx + 6;
    if (pdfBuf[dataStart] === 0x0d && pdfBuf[dataStart + 1] === 0x0a) dataStart += 2;
    else if (pdfBuf[dataStart] === 0x0a) dataStart += 1;

    // Find endstream
    const endstreamIdx = pdfBuf.indexOf(Buffer.from('endstream'), dataStart);
    if (endstreamIdx !== -1) {
      const imgData = pdfBuf.slice(dataStart, endstreamIdx);
      // verify JPEG magic bytes: FF D8
      if (imgData[0] === 0xFF && imgData[1] === 0xD8) {
        count++;
        // find width / height in header if possible
        const wMatch = header.match(/\/Width\s+(\d+)/);
        const hMatch = header.match(/\/Height\s+(\d+)/);
        const w = wMatch ? wMatch[1] : '?';
        const h = hMatch ? hMatch[1] : '?';
        console.log(`Image ${count}: ${w}x${h}, ${(imgData.length / 1024).toFixed(1)} KB`);
        fs.writeFileSync(`scratch/extracted_pdf_img_${count}_${w}x${h}.jpg`, imgData);
      }
    }
  }
  pos = streamIdx + 6;
}
console.log(`Total extracted JPEGs: ${count}`);
