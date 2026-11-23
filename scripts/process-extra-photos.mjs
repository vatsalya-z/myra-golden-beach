import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scripts/gallery-extra-photos.json', 'utf8'));

const photoMap = new Map();

for (const item of data) {
  if (typeof item !== 'string') continue;
  if (item.includes('default-user') || item.includes('/a-/') || item.includes('/a/')) continue;
  if (!item.includes('googleusercontent.com')) continue;
  
  const base = item.split('=')[0];
  if (!photoMap.has(base)) {
    photoMap.set(base, item);
  }
}

console.log(`Found ${photoMap.size} unique authentic resort photos in Extra / Rooms:`);
let idx = 1;
for (const [base, sample] of photoMap.entries()) {
  console.log(`[${idx++}] ${base}`);
}
