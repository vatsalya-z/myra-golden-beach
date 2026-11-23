import fs from 'node:fs';
import path from 'node:path';

const gmapsDir = path.join(process.cwd(), 'public', 'images', 'gmaps');
const galDir = path.join(process.cwd(), 'public', 'images', 'gallery');

const maps = [
  { from: path.join(gmapsDir, 'gmaps-room-deluxe-main.jpg'), to: path.join(galDir, 'myra-resort-breakfast.jpg') },
  { from: path.join(gmapsDir, 'gmaps-room-extra-1.jpg'), to: path.join(galDir, 'myra-night-garden-walkway.jpg') },
  { from: path.join(gmapsDir, 'gmaps-room-extra-4.jpg'), to: path.join(galDir, 'myra-morning-beach-tea.jpg') },
  { from: path.join(gmapsDir, 'gmaps-room-extra-6.jpg'), to: path.join(galDir, 'myra-room-service-dining.jpg') },
];

for (const m of maps) {
  if (fs.existsSync(m.from)) {
    fs.copyFileSync(m.from, m.to);
    console.log(`Copied -> ${path.basename(m.to)}`);
  }
}
