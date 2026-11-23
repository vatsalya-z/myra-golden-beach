import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const photoBases = [
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S8pLHpD06cVGJqUel8p5p9xrc3vTU5CAE_Axe36DCdIxwvAnNZx_yQuVBEY9Gm28kHxfplfG2uW166gR7OzIyCToNmCW8i4ygf46l2iSR_LyCXwP2K2mSKEnesqAK50y01ANVK",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TAoSRkDXfvoM837O9ckWANF9aXclKVp80H1-4CZqsKUurRkJRGuP1WyAcyEdhVyO_GRieYdWRa2w8kMYDGbCEhm5e5mF1XTVv9KeFDWnN5fP61pqSoMvTCkm17HPzOjjB0R2G8",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QzquC8DjJDNwBmyGQGwcuLKncYzhYJOwOHb-3uDVhlhjG5bfKugb-9Vv6eqdfbuOVygLT6XU9ADrKGIMNfxootQJWsEmLSVfRq821f22MQ5Au0qRuzR2hDNTbyYVxjFNWLlrNF",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Qn4o_pBJzwBchWs3FsG6xQEHclP_euRePxtjp8OjD47Ukr6eINLqV9TbL6eblByuEFqArAwNOGVwOz_30Qyhhtvsjn7P1t9A2SB5atiOHpgIFGeC4hDc18ovDMakdyVTJRa_bj",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RsWZAOtVdgANL5rYteIPIeum9NLrpafjx6VeyDsK1bFYeA1qQ31AwTkauojs_lZVMn6T38Lp_lbswfH5F2RYEr6EZDcTWDygeN3kWhKvuNNjRS6H3XDZ66u4QdnTAL7jkkGaIy654pOZc",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R5fDvco4nBKjaiwCFpV88j6F4urd0su6dgT2ujajHl5l8aHBmQNIfrnq-_2MkBAXASSdyFHv4XVIUaMvlUZrD8Xf97UF0gIJIKyuKwk9rQ3YignCK7bBByISdXfe_034YYVoeaIDJ8KOM",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QrQsjAowXUrgh7QYnbrkwXCIXujtbNHvDPben13Zl4izrbiivV9M6T3gqsOs9dwKsvD1qJScUPLuOQgt9MKk6snlpQC8TjtS3GysKeqzjBBKTKZCl8I6QsNhsvJkjO0MED1Wyx",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SdIynstdcJplrsnAV9oyLh-4KQj3iYCQk9769DaIsxv4ehALzclJSR8V2qhQhdp20em2sdIsyiKvgQhFIhYEdRyAF2LsasQw8jl-iLRKcKjxVLeUi3arHMfADbVMMYsrt1J6hT3g",
  "https://lh3.googleusercontent.com/gps-proxy/ALd4DhHprOgJWtoGKhfguqnCbHHnw0pb3_9NfL9HayLXNkVUbjfv-LNX3OG1LYQnXHqFeICt9mpLCBaWPlvWkyb2zelO5ly3LUs78cwvVp4EKhr-9zp3fkRx0jDi9A_1BAvRhj8c2EVdKcnFVUmwxfdzfwMbBUc1gdm23FSKs9tLWeHQoADynXDmFfod4A",
  "https://lh3.googleusercontent.com/gpms-cs-s/AM4Q-U-u0P1HBPmQ2aSw0aeORdkCjdT6jIR3s_RxasqmzWalLrJ7h_RzW4SrpeO_0fKHWlPlgaFLGjeyDMaVrPtCu4ICouMESgRajKo-RZ7QqBqcwCnHZuzl6vJF6Mhk-NzFuQ0Moeb7",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9ToUuLDmMDoLQcBuyqgiCDHyWM1pwM3XOz9KjdRqDK1TF4khqlsEchj5-6dNVkg3fKw5wwsEoxm2GzPX_H-jIgOOyfDMUL-jcwW0XxF2gjxL3S3tBepcPDiLk_ASe_DuV0j8j8Gtg"
];

const destDir = path.join(process.cwd(), 'public', 'images', 'gmaps');
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
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
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
  console.log('Downloading high-res images...');
  for (let i = 0; i < photoBases.length; i++) {
    const base = photoBases[i];
    const highResUrl = `${base}=w1920-h1080-k-no`;
    const outPath = path.join(destDir, `gmaps-photo-${i + 1}.jpg`);
    try {
      await download(highResUrl, outPath);
      const size = fs.statSync(outPath).size;
      console.log(`Saved gmaps-photo-${i + 1}.jpg (${(size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`Error downloading photo ${i + 1}:`, e.message);
    }
  }
}

main();
