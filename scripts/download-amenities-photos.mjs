import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const photoBases = [
  { id: 'amenity-pool-day', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TfnRqcZglVd5IbLwSGh335pZOx8MY4CrA88kWZAzkfa5uu1nbe6Uw-y6OQkwfjvF-vUCTfzL8qHfhZl1SLXjhm5KY4SqQaLS_Z7-s2zZ-yOzERi_vpke9616eVv_rmoDVWrCpjog' },
  { id: 'amenity-2', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QQJg0xPY6b4NgwV_BXcwFB6aj8lWJvvHHqV_GLvpK4PYHBXI1SPGcYilbXFeTQcFxtTnS_p_0RfNNFUlHtgzH1kVktdp3TyEJh_KbZQ7VwpRc_-CeOP2bfPZ2GY30J9N48zhLEBNZ6OoA' },
  { id: 'amenity-3', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Q3FAVHZvjRdG-OL2kYhZVjKcqjpWSzfF6uIxXMy8Gfhe2lAtAe7mbeVvaaObpP1nFpr4ckhdn8GofiNSvwt1Z_5ipH8H2Wa5ZQBtHyPQX-Vlb0jotvR3faDGvSqE__YzQKAfK5' },
  { id: 'amenity-4', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QGuyGs6UIoNM3iSJEySOkq7VuMLYSsNsYoNvc3yHefZJ5gZbc8gncZBHXfo4h6juDuzfHnTOLSZS7xrAFJmWC9LuohaXecuv3zikUx8gKdoI-WhpDVktydJy0il2KeCRkObo4W' },
  { id: 'amenity-5', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RAqQDK2HOiXLXYOtFMqaG5fo_wOyaQHDgzdtkONmRwUoBlASQpvR2s46n7SQsYz-rhatBff1-JbyMlk4uGJQC2_h37d2o1dz-NF0f_P3qY8B9eaLqy9gNNAejQ6yZeIsvJi8IT' },
  { id: 'amenity-6', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QwjQpJZfyzxYCh03aOktA6e6VCYDXt8LO1hp-gFdvDHdS1v0ZadbATVZtRyrnhryTwERzD329KbAj-_70hkXKZmQUVl1VK9nFfhHoKZNqEY1bXVfEkeLp8CpQXUAQfyuZsajYa' },
  { id: 'amenity-7', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Ro3HOzocv5Awz_-HigPBNk8d8aivgkBIPg6HKwGsygQhCZxXvprJ7rFEZ26K62eKXvEuoC34BI4epyrp52pMU4-mPNhGoj_Hg6ASD2uabeee9CYrpFv39A3EwxYFzV6-TGVUc' },
  { id: 'amenity-8', base: 'https://lh3.googleusercontent.com/gpms-cs-s/AM4Q-U-_LOGVcqlsMXDaVaEGLmXdqQJ_IfmghxAhmukMSKP0M8msVoRBFH0EJXeQlIho-GEhytnlQKL00E94tbkV4Ih1m7mHGvGhKDX2o_bUHmQOvcycT4JP2SVHoqipBgU5_1CqMz0DJg' },
  { id: 'amenity-9', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RP_cAmblQTdx_ShaJUyKvNY6R3-3oZJntu_VCcFJVIQyb21kD46YAc5pF3DeWSG92lXENoocs2s1eWfpDJ3Z2bFVSL0Y7ffKexyHCjz0sWtbiamYCR7fhI5ntC5uqEtq6tyk3g' },
  { id: 'amenity-10', base: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tkqn3lz0uheYZ6SByLIkKGkYJufLxyMPecZwoCkVpXxLpDCeTRF_uN84K7eU9nWgP_gAuFxq1mND4miIoF6r-YyGvN9sGFiLGErlhZ0ZtBwKU1qp8p4LSEs8Yzcrk2wlg3COso' },
];

const destDir = path.join(process.cwd(), 'public', 'images', 'amenities');
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
  console.log('Downloading high-res amenities images...');
  for (let i = 0; i < photoBases.length; i++) {
    const item = photoBases[i];
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
