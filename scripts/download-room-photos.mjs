import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const bases = JSON.parse(fs.readFileSync('scripts/rooms-discovered.json', 'utf8'));

// Filter out avatars
const photoBases = bases.filter((b) => !b.includes('/a-/') && !b.includes('/a/ACg'));

const tempDir = path.join(process.cwd(), 'scripts', 'temp_room_photos');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

function download(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('//')) redirectUrl = 'https:' + redirectUrl;
        return resolve(download(redirectUrl, filePath));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(filePath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log(`Downloading ${photoBases.length} room photos...`);
  for (let i = 0; i < photoBases.length; i++) {
    const base = photoBases[i].startsWith('//') ? 'https:' + photoBases[i] : photoBases[i];
    // try high-res
    const url = `${base}=w1920-h1080-k-no`;
    const outPath = path.join(tempDir, `room_${i + 1}.jpg`);
    try {
      await download(url, outPath);
      const stats = fs.statSync(outPath);
      console.log(`Saved room_${i + 1}.jpg (${(stats.size / 1024).toFixed(1)} KB) - Base: ${base.substring(0, 45)}...`);
    } catch (e) {
      console.error(`Failed ${i + 1}:`, e.message);
    }
  }
}

main().catch(console.error);
