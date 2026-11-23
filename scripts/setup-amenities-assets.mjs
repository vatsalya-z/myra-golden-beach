import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'public', 'images', 'amenities');

const files = [
  { src: 'amenity-pool-day.jpg', dest: 'resort-pool-illuminated.jpg' },
  { src: 'amenity-2.jpg', dest: 'resort-garden-lawn-deck.jpg' },
  { src: 'amenity-5.jpg', dest: 'resort-kids-pool.jpg' },
  { src: 'amenity-7.jpg', dest: 'resort-pool-fun.jpg' },
  { src: 'amenity-6.jpg', dest: 'resort-pool-pergola.jpg' },
];

for (const f of files) {
  const from = path.join(dir, f.src);
  const to = path.join(dir, f.dest);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    console.log(`Copied ${f.src} -> ${f.dest}`);
  }
}
