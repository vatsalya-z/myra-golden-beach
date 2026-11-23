import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const targetUrl = 'https://www.google.com/maps/place/MYRA+GOLDEN+BEACH+RESORT/@15.8044375,80.4248125,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICD4bmqXA!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FANWiy9TAoSRkDXfvoM837O9ckWANF9aXclKVp80H1-4CZqsKUurRkJRGuP1WyAcyEdhVyO_GRieYdWRa2w8kMYDGbCEhm5e5mF1XTVv9KeFDWnN5fP61pqSoMvTCkm17HPzOjjB0R2G8%3Dw203-h270-k-no!7i3024!8i4032!4m25!1m12!3m11!1s0x3a4a47be2b0a6e8d:0xb5ed5eea5e1df24!2sMYRA+GOLDEN+BEACH+RESORT!5m2!4m1!1i2!8m2!3d15.8044375!4d80.4248125!9m1!1b1!16s%2Fg%2F11trgt_qkq!3m11!1s0x3a4a47be2b0a6e8d:0xb5ed5eea5e1df24!5m2!4m1!1i2!8m2!3d15.8044375!4d80.4248125!10e5!14m1!1BCgIYEA!16s%2Fg%2F11trgt_qkq?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D';

async function main() {
  console.log('Launching Edge for Rooms photos...');
  const tempProfile = path.join(os.tmpdir(), `edge_rooms_${Date.now()}`);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    userDataDir: tempProfile,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1280,800',
    ],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  );

  const images = new Set();

  // Also specifically add the exact image from the URL parameter!
  images.add('https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TAoSRkDXfvoM837O9ckWANF9aXclKVp80H1-4CZqsKUurRkJRGuP1WyAcyEdhVyO_GRieYdWRa2w8kMYDGbCEhm5e5mF1XTVv9KeFDWnN5fP61pqSoMvTCkm17HPzOjjB0R2G8');

  page.on('response', async (response) => {
    const resUrl = response.url();
    if (resUrl.includes('googleusercontent.com') || resUrl.includes('ggpht.com')) {
      if (!resUrl.includes('default_avatar') && !resUrl.includes('profile') && !resUrl.includes('favicon')) {
        images.add(resUrl);
      }
    }
  });

  console.log('Navigating to Rooms URL...');
  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 35000 });
  } catch (err) {
    console.log('Navigation notice:', err.message);
  }

  await new Promise((r) => setTimeout(r, 3000));

  console.log('Stepping through photos with keyboard...');
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('ArrowRight');
    await new Promise((r) => setTimeout(r, 600));
  }

  const domImages = await page.evaluate(() => {
    const urls = [];
    document.querySelectorAll('img, div[style*="background-image"]').forEach((el) => {
      if (el.tagName === 'IMG' && el.src) {
        urls.push(el.src);
      }
      const bg = el.style.backgroundImage || '';
      const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
      if (match && match[1]) {
        urls.push(match[1]);
      }
    });
    return urls;
  });

  domImages.forEach((u) => {
    if (u.includes('googleusercontent.com') || u.includes('ggpht.com')) {
      if (!u.includes('default_avatar') && !u.includes('profile') && !u.includes('favicon')) {
        images.add(u);
      }
    }
  });

  const imgArr = Array.from(images);
  console.log(`Found ${imgArr.length} potential images.`);

  fs.writeFileSync('scripts/rooms-raw-images.json', JSON.stringify(imgArr, null, 2));
  await browser.close();
}

main().catch(console.error);
