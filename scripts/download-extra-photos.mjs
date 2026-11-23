import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const newPhotos = [
  { id: 'gmaps-room-deluxe-main', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TJKS2pL67XXDA8MJw67eDdd73wEbxbgkN-4TdLi9VEuQJwaKbX8L69yGiWz_VPQFfuyXSw0o5XWgaAdFUM6BGzQYXEB6Laf3k7scpppFg9F5UH621riChNsNn3mgC0RoNbbRBDoi5sQgEK' },
  { id: 'gmaps-room-extra-1', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RSRh9wdnv1N4uoZM__q8IkLE8sr_RTCou5h_z315zZ4spwDQ_m9Qtuud4jJSrsrpofuEGqsvNbBBaNA3qVCZsOdQWlGIstYHyDqxIXr2YizIOJrJm1xMNpLpXVhYT0VY0AVQw' },
  { id: 'gmaps-room-extra-2', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Rpn1PdkqpgtgdwyhBjiGGTXix8VLyyts6P9R8z5alNs6EYXBHwrLwssy2iXs5XbO_sJrA1FujncWxwheLDg0_JtePMkCM8aUJ7pFlIFEOZq5XC0qr_U8985NLjM6eK2RRf_gQUAkYAg8WT' },
  { id: 'gmaps-room-extra-3', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S7amZwo9xC2pFo6gLkTwO5dnYLjMa09i8UFejdETTNs04XXofKqQN7Y1TUQagReGcXFXQariPiux6jcnascM-q1bwqNUIWzmFqBynag2IERF5DvGPEtkog6KcTHT-hMlxo_mqm' },
  { id: 'gmaps-room-extra-4', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SiciRvO1h1e8UNyKuJz_wZJjAlfgNyjt7GVltxSKUDSRhbWdfVVmDtB4ES54yQMEg9VJyfxOAYOoo0ZJmlepmh7E5F4daCAdHwbjCg7ZLhESEzuQ3J2zMUO6y9C5uyF6xxqrzq6g' },
  { id: 'gmaps-room-extra-5', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RAEg7NGM6HmR16JmoVScoC_06qYz5UvGLX-mc7D23mL4uoWQuR3EcP2p90OeSTy58dKvJAPVB_AiDsby7UatyT20ozcROil99d8y7t4SZ6YK2O00UuoAqylir9opjhxrVggWQRUw' },
  { id: 'gmaps-room-extra-6', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SLc7rf0uQKvoL6F6lgrfOQYO8xescRvrK0equ4Qbm9uqJl4MP2qRRphSIRGTd5D8g2nFBpMVh60Aws_3aw2ihbUL44In34oWIEzEVpRO6oPBq7GvbN7-e9VCYWszYJtIOMhAKP' },
];

const destDir = path.join(process.cwd(), 'public', 'images', 'gmaps');

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
  console.log('Downloading high-res new room/extra photos...');
  for (let i = 0; i < newPhotos.length; i++) {
    const item = newPhotos[i];
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
