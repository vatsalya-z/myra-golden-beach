import https from 'node:https';
import fs from 'node:fs';

const targetUrl = 'https://www.google.com/maps/place/MYRA+GOLDEN+BEACH+RESORT/@15.8044375,80.4248125,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICJzdyxzQE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FANWiy9QzquC8DjJDNwBmyGQGwcuLKncYzhYJOwOHb-3uDVhlhjG5bfKugb-9Vv6eqdfbuOVygLT6XU9ADrKGIMNfxootQJWsEmLSVfRq821f22MQ5Au0qRuzR2hDNTbyYVxjFNWLlrNF%3Dw529-h298-k-no!7i4032!8i2268!4m25!1m12!3m11!1s0x3a4a47be2b0a6e8d:0xb5ed5eea5e1df24!2sMYRA+GOLDEN+BEACH+RESORT!5m2!4m1!1i2!8m2!3d15.8044375!4d80.4248125!9m1!1b1!16s%2Fg%2F11trgt_qkq!3m11!1s0x3a4a47be2b0a6e8d:0xb5ed5eea5e1df24!5m2!4m1!1i2!8m2!3d15.8044375!4d80.4248125!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11trgt_qkq';

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching Google Maps page...');
  const html = await fetchUrl(targetUrl);
  console.log('Response length:', html.length);
  
  fs.writeFileSync('scripts/maps-dump.html', html);
  console.log('Saved html dump. Searching for occurrences of googleusercontent:');
  const allInstances = html.match(/[^\s"'<>\\]*googleusercontent[^\s"'<>\\]*/gi) || [];
  console.log('Total googleusercontent strings:', allInstances.length);
  const uniqueInstances = [...new Set(allInstances)];
  uniqueInstances.forEach((str, i) => console.log(`[${i}] ${str.substring(0, 120)}`));

}

run().catch(console.error);
