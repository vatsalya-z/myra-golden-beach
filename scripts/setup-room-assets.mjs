import fs from 'node:fs';
import path from 'node:path';

const roomsDir = path.join(process.cwd(), 'public', 'images', 'rooms');
const gmapsDir = path.join(process.cwd(), 'public', 'images', 'gmaps');
const tempDir = path.join(process.cwd(), 'scripts', 'temp_room_photos');

if (!fs.existsSync(roomsDir)) {
  fs.mkdirSync(roomsDir, { recursive: true });
}

// 1. The exact requested photo (room_1):
// test_crop.jpg -> 1600x1066 landscape
fs.copyFileSync(path.join(tempDir, 'test_crop.jpg'), path.join(roomsDir, 'myra-deluxe-room-ac.jpg'));
// test_w1600.jpg -> 1600x2133 full vertical
fs.copyFileSync(path.join(tempDir, 'test_w1600.jpg'), path.join(roomsDir, 'myra-deluxe-bedroom-main.jpg'));

// 2. Room 8 (TV, wardrobe, dressing mirror, marble floor)
fs.copyFileSync(path.join(tempDir, 'room_8.jpg'), path.join(roomsDir, 'myra-room-tv-wardrobe.jpg'));

// 3. Room 10 (Family Suite Living Room, sofa, dining)
fs.copyFileSync(path.join(tempDir, 'room_10.jpg'), path.join(roomsDir, 'myra-family-suite-lounge.jpg'));

// 4. Room 11 (Marble platform bed with lounge sofa)
fs.copyFileSync(path.join(tempDir, 'room_11.jpg'), path.join(roomsDir, 'myra-deluxe-platform-bed.jpg'));

// 5. Existing authentic cottage photos
if (fs.existsSync(path.join(gmapsDir, 'myra-cottage-sea-view.jpg'))) {
  fs.copyFileSync(path.join(gmapsDir, 'myra-cottage-sea-view.jpg'), path.join(roomsDir, 'myra-cottage-sea-view.jpg'));
}
if (fs.existsSync(path.join(gmapsDir, 'myra-beach-cottages.jpg'))) {
  fs.copyFileSync(path.join(gmapsDir, 'myra-beach-cottages.jpg'), path.join(roomsDir, 'myra-beach-cottages.jpg'));
}
if (fs.existsSync(path.join(gmapsDir, 'myra-room-dining-dressing.jpg'))) {
  fs.copyFileSync(path.join(gmapsDir, 'myra-room-dining-dressing.jpg'), path.join(roomsDir, 'myra-room-dressing.jpg'));
}

// Overwrite the old AI placeholders with the real authentic room photos
fs.copyFileSync(path.join(roomsDir, 'myra-deluxe-room-ac.jpg'), path.join(roomsDir, 'deluxe-double-1.jpg'));
fs.copyFileSync(path.join(roomsDir, 'myra-deluxe-platform-bed.jpg'), path.join(roomsDir, 'deluxe-triple-1.jpg'));
fs.copyFileSync(path.join(roomsDir, 'myra-family-suite-lounge.jpg'), path.join(roomsDir, 'family-suite-1.jpg'));

console.log('Room assets successfully organized in public/images/rooms:');
fs.readdirSync(roomsDir).forEach((file) => {
  const size = fs.statSync(path.join(roomsDir, file)).size;
  console.log(` - ${file} (${(size / 1024).toFixed(1)} KB)`);
});
