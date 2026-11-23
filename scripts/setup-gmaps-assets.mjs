import fs from 'node:fs';
import path from 'node:path';

const gmapsDir = path.join(process.cwd(), 'public', 'images', 'gmaps');

const fileMapping = [
  { src: 'gmaps-photo-7.jpg', dest: 'myra-beach-cottages.jpg' },
  { src: 'gmaps-photo-8.jpg', dest: 'myra-resort-signboard.jpg' },
  { src: 'gmaps-photo-4.jpg', dest: 'myra-swimming-pool-night.jpg' },
  { src: 'gmaps-photo-3.jpg', dest: 'myra-cottages-night.jpg' },
  { src: 'gmaps-photo-11.jpg', dest: 'myra-cottage-sea-view.jpg' },
  { src: 'gmaps-photo-5.jpg', dest: 'myra-beach-loungers.jpg' },
  { src: 'gmaps-photo-9.jpg', dest: 'myra-restaurant-dining.jpg' },
  { src: 'gmaps-photo-2.jpg', dest: 'myra-deluxe-room-ac.jpg' },
  { src: 'gmaps-photo-1.jpg', dest: 'myra-room-bed.jpg' },
  { src: 'gmaps-photo-6.jpg', dest: 'myra-room-dining-dressing.jpg' },
];

for (const map of fileMapping) {
  const from = path.join(gmapsDir, map.src);
  const to = path.join(gmapsDir, map.dest);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    console.log(`Copied ${map.src} -> ${map.dest}`);
  }
}
