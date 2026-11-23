import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const newBeachPhotos = [
  { id: 'beach-extra-1', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RZTTO9LU9-rgvZM6oNeqvZk8M_1dVaBn0tdtPASvyRKAJ1LYPnHk7N2zhxLcOmIE6xlm98z2jdCnwBiI6FIYg5QQ-wvIimXce7clEWm-GsHLadXo-nvLLd_z1zWknBuyNPQ2UI' },
  { id: 'beach-extra-2', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SRI3Hwn9QqVBWGDcu_eqJ17bI58eBXT08n83m9z9l2j70384Viy9goYEekV2APafZf_7iZZaMEnmOQXl5WqVlbyzS7Eg80TEGwRcnoytUxGBKvvZTUqyEX-8yk6gXEVe_HOhMzGMON7IWQ' },
  { id: 'beach-extra-3', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TY3N9OJKLs5ZlhOPSuYWDG40C9U9EHd9aOxrVkVhM2rK869sPONzAZNZyJOLs_3FJz5pqEejlU8iUR0_9rplnkSDKxAL8oj7JVdYbthf0RvKrl2De_au9WnuZrPT5QfmHiL3_L4Q' },
  { id: 'beach-extra-4', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QLuoHTawyInO2YWxeV19Txl4ZWtOERtj6Ev0sG2rctmX2PDyITE9bgW73Fsd8h_vKQFEw04eFN7y-w4OJPm0_U1OyJ9WoODMY50wqJLh0ir5glo7Wertj5ZlS_HCRs_vLx5VU' },
  { id: 'beach-extra-5', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T8JuU8KrGe6maCtwK9MRgcrS7f6W3sLRYkW1Ai-ekhm4fd_h0mw39o6a5sHedl0JvoxrWDIS5T-8eKB6AHgwt-jd3a281UuzK7AfftSlzuP57eckKlqrDLwp0c-yXj4PXmag7x' },
  { id: 'beach-extra-6', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T76VUjDhwzReLXpEwc8T-71dUmnWeGfAaWw_H263JL9nqj3MySIoYdvDu2Dp5Mq6lmrJX5EcQazyENbXGSCQe8JdMVd_Jnw56HRmMbXmsSd0hu99_Db0Dn_pR42_Ap393VDhOOsg' },
];

const destDir = path.join(process.cwd(), 'public', 'images', 'beach');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, filePath));
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
  console.log('Downloading high-res new beach photos...');
  for (let i = 0; i < newBeachPhotos.length; i++) {
    const item = newBeachPhotos[i];
    const highResUrl = `${item.base}=w1920-h1080-k-no`;
    const outPath = path.join(destDir, `${item.id}.jpg`);
    try {
      await download(highResUrl, outPath);
      const size = fs.statSync(outPath).size;
      console.log(`Saved ${item.id}.jpg (${(size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`Error downloading ${item.id}:`, e.message);
    }
  }
}

main();
