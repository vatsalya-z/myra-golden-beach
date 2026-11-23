import fs from 'node:fs';
import path from 'node:path';

const beachDir = path.join(process.cwd(), 'public', 'images', 'beach');
const gmapsDir = path.join(process.cwd(), 'public', 'images', 'gmaps');

const copies = [
  { from: path.join(beachDir, 'beach-extra-6.jpg'), to: path.join(beachDir, 'myra-beach-arch-selfie-point.jpg') },
  { from: path.join(beachDir, 'beach-extra-2.jpg'), to: path.join(beachDir, 'myra-beach-promenade-palms.jpg') },
  { from: path.join(beachDir, 'beach-extra-3.jpg'), to: path.join(beachDir, 'myra-beach-entrance-path.jpg') },
  { from: path.join(gmapsDir, 'myra-beach-loungers.jpg'), to: path.join(beachDir, 'myra-beach-loungers-ocean.jpg') },
  { from: path.join(gmapsDir, 'myra-beach-cottages.jpg'), to: path.join(beachDir, 'myra-beach-cottages-panorama.jpg') },
];

for (const c of copies) {
  if (fs.existsSync(c.from)) {
    fs.copyFileSync(c.from, c.to);
    console.log(`Copied -> ${path.basename(c.to)}`);
  }
}
