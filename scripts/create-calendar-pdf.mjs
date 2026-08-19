import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const lines = [
  "Maharishi Global School",
  "Academic Calendar 2026-27",
  "",
  "April 2026 - Academic year planning and parent orientation",
  "June 2026 - School reopening and induction week",
  "August 2026 - Inquiry showcase and independence day celebration",
  "October 2026 - Term review, student-led reflection, and short break",
  "December 2026 - Winter break and portfolio review",
  "January 2027 - Term two reopening and goal-setting conferences",
  "March 2027 - Exhibition, assessments, and year-end reporting",
  "",
  "Note: Final dates can be updated by the school office.",
];

function esc(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

const content = [
  "BT",
  "/F1 24 Tf",
  "72 760 Td",
  `(${esc(lines[0])}) Tj`,
  "/F1 16 Tf",
  "0 -34 Td",
  `(${esc(lines[1])}) Tj`,
  "/F1 11 Tf",
  ...lines.slice(2).flatMap((line) => ["0 -24 Td", `(${esc(line)}) Tj`]),
  "ET",
].join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (const [index, object] of objects.entries()) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
}
const xrefOffset = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets.slice(1)) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

const outputDir = path.join(process.cwd(), "public", "assets");
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "mgs-academic-calendar-2026-27.pdf"), pdf);
