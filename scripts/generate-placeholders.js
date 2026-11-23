const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function escapeXml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function makeSvg(width, height, category, title, subtitle) {
  const safeCat = escapeXml(String(category).toUpperCase());
  const safeTitle = escapeXml(title);
  const safeSub = escapeXml(subtitle || 'MYRA Golden Beach Resort · Chirala, Andhra Pradesh');

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#091629" />
          <stop offset="50%" stop-color="#0e1e38" />
          <stop offset="100%" stop-color="#142646" />
        </linearGradient>
        <radialGradient id="gold-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#c9a24b" stop-opacity="0.35" />
          <stop offset="60%" stop-color="#c9a24b" stop-opacity="0.05" />
          <stop offset="100%" stop-color="#0e1e38" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#gold-glow)" />

      <!-- Decorative borders -->
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="#c9a24b" stroke-opacity="0.25" stroke-width="1.5" rx="8" />
      <rect x="28" y="28" width="${width - 56}" height="${height - 56}" fill="none" stroke="#c9a24b" stroke-opacity="0.12" stroke-width="1" rx="6" />

      <!-- Brand icon / emblem -->
      <g transform="translate(${width / 2}, ${height / 2 - 45})">
        <circle r="36" fill="#0e1e38" stroke="#c9a24b" stroke-width="2" />
        <path d="M-18,-6 C-12,-18 12,-18 18,-6 C12,6 -12,6 -18,-6 Z" fill="none" stroke="#c9a24b" stroke-width="2" />
        <circle r="6" fill="#c9a24b" />
        <path d="M-12,14 Q0,20 12,14" fill="none" stroke="#c9a24b" stroke-width="2" />
      </g>

      <!-- Category badge -->
      <g transform="translate(${width / 2}, ${height / 2 + 15})">
        <rect x="-90" y="-12" width="180" height="24" rx="4" fill="#c9a24b" fill-opacity="0.2" stroke="#c9a24b" stroke-width="1" />
        <text text-anchor="middle" y="4" font-family="'Playfair Display', Georgia, serif" font-size="11" font-weight="bold" fill="#c9a24b" letter-spacing="2">
          ${safeCat}
        </text>
      </g>

      <!-- Title -->
      <text x="${width / 2}" y="${height / 2 + 55}" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="${Math.min(26, width / 25)}" font-weight="bold" fill="#ffffff" letter-spacing="0.5">
        ${safeTitle}
      </text>

      <!-- Subtitle -->
      <text x="${width / 2}" y="${height / 2 + 82}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.75" letter-spacing="0.5">
        ${safeSub}
      </text>

      <!-- Watermark / note -->
      <text x="${width / 2}" y="${height - 35}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="10" fill="#c9a24b" fill-opacity="0.6" letter-spacing="1">
        [ PLACEHOLDER — RESORT PHOTOGRAPH PENDING ]
      </text>
    </svg>
  `);
}

function makeLogoSvg(size = 256) {
  return Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#091629" />
          <stop offset="100%" stop-color="#0e1e38" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ecd58c" />
          <stop offset="50%" stop-color="#c9a24b" />
          <stop offset="100%" stop-color="#9a772c" />
        </linearGradient>
      </defs>

      <!-- Rounded base -->
      <rect width="256" height="256" rx="48" fill="url(#logoBg)" />
      <rect x="8" y="8" width="240" height="240" rx="42" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-opacity="0.6" />

      <!-- Circular emblem -->
      <circle cx="128" cy="115" r="64" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" />
      <circle cx="128" cy="115" r="54" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="3 3" />

      <!-- Coastal Waves and Sun -->
      <!-- Sun -->
      <circle cx="128" cy="98" r="18" fill="url(#goldGrad)" />
      
      <!-- Waves -->
      <path d="M85 125 Q106 112 128 125 T171 125" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" />
      <path d="M80 137 Q104 124 128 137 T176 137" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" />
      <path d="M88 149 Q108 138 128 149 T168 149" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round" />

      <!-- Typography -->
      <text x="128" y="202" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="22" font-weight="bold" fill="url(#goldGrad)" letter-spacing="3">
        MYRA
      </text>
      <text x="128" y="222" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#ffffff" fill-opacity="0.85" letter-spacing="4">
        GOLDEN RESORT
      </text>
    </svg>
  `);
}

const imagesToCreate = [
  // OG Default
  { rel: 'images/og-default.jpg', w: 1200, h: 630, cat: 'Resort', title: 'MYRA Golden Beach Resort', sub: 'Chirala, Andhra Pradesh' },

  // Hero
  { rel: 'images/hero/hero-1.jpg', w: 1920, h: 1080, cat: 'Resort Exterior', title: 'Experience the Beauty of a Relaxing Coastal Stay', sub: 'Your Comfortable Escape for Memorable Beachside Moments' },
  { rel: 'images/hero/hero-2.jpg', w: 1920, h: 1080, cat: 'Accommodation', title: 'Comfort Meets Coastal Hospitality', sub: 'Relax, Refresh and Enjoy a Comfortable Resort Experience' },
  { rel: 'images/hero/hero-3.jpg', w: 1920, h: 1080, cat: 'Resort & Pool', title: 'Discover Your Perfect Beach Getaway', sub: 'Enjoy Relaxation, Poolside Moments and Warm Hospitality' },

  // Resort
  { rel: 'images/resort/resort-1.jpg', w: 1000, h: 750, cat: 'Resort Grounds', title: 'Coastal Retreat in Andhra Pradesh', sub: 'Surrounded by lush greenery and coastal breezes' },
  { rel: 'images/resort/resort-2.jpg', w: 1000, h: 750, cat: 'Resort Welcome', title: 'Warm Andhra Hospitality', sub: 'A tranquil destination near Chirala' },

  // Rooms
  { rel: 'images/rooms/deluxe-double-1.jpg', w: 1000, h: 700, cat: 'Deluxe Room', title: 'Deluxe Double Room', sub: 'Air conditioning · Free Wi-Fi · LED TV · Hot Water' },
  { rel: 'images/rooms/deluxe-triple-1.jpg', w: 1000, h: 700, cat: 'Deluxe Room', title: 'Deluxe Triple Room', sub: 'Spacious 3-bed layout for small families' },
  { rel: 'images/rooms/family-suite-1.jpg', w: 1000, h: 700, cat: 'Premium Suite', title: 'Family Suite', sub: 'Generous space with sitting area and premium amenities' },

  // Facilities
  { rel: 'images/facilities/pool-bg.jpg', w: 1920, h: 1080, cat: 'Facilities', title: 'Outdoor Swimming Pool', sub: 'Dive into relaxation under the coastal sun' },
  { rel: 'images/facilities/pool.jpg', w: 1000, h: 700, cat: 'Swimming Pool', title: 'Refreshing Swimming Pool', sub: 'Complimentary outdoor pool for all resort guests' },
  { rel: 'images/facilities/beach.jpg', w: 1000, h: 700, cat: 'Coastal Access', title: 'Direct Beach Access', sub: 'Steps away from the Bay of Bengal shoreline' },
  { rel: 'images/facilities/wifi.jpg', w: 1000, h: 700, cat: 'Connectivity', title: 'High-Speed Wi-Fi', sub: 'Complimentary across the entire resort' },
  { rel: 'images/facilities/parking.jpg', w: 1000, h: 700, cat: 'Convenience', title: 'Free Guest Parking', sub: 'Secure on-site parking for all guests' },
  { rel: 'images/facilities/garden.jpg', w: 1000, h: 700, cat: 'Nature', title: 'Garden & Lawns', sub: 'Peaceful landscaped grounds for relaxation' },
  { rel: 'images/facilities/reception.jpg', w: 1000, h: 700, cat: 'Service', title: '24-Hour Reception', sub: 'Friendly round-the-clock front desk assistance' },
  { rel: 'images/facilities/events.jpg', w: 1000, h: 700, cat: 'Events', title: 'Event Space', sub: 'Host family gatherings and corporate retreats' },

  // Restaurant
  { rel: 'images/restaurant/dining-1.jpg', w: 1000, h: 700, cat: 'Dining', title: 'Multi-Cuisine Restaurant', sub: 'Authentic Andhra & North Indian specialities' },
  { rel: 'images/restaurant/dining-2.jpg', w: 1000, h: 700, cat: 'Cuisine', title: 'Authentic Andhra Flavours', sub: 'Fresh ingredients and traditional recipes' },

  // Attractions
  { rel: 'images/attractions/vodarevu-beach.jpg', w: 1000, h: 700, cat: 'Nearby Beach', title: 'Vodarevu Beach', sub: 'A serene and picturesque coastal escape near Chirala' },
  { rel: 'images/attractions/chirala-beach.jpg', w: 1000, h: 700, cat: 'Nearby Beach', title: 'Chirala Beach', sub: 'Golden sands and refreshing ocean breezes' },
  { rel: 'images/attractions/suryalanka-beach.jpg', w: 1000, h: 700, cat: 'Nearby Beach', title: 'Suryalanka Beach', sub: 'Clean and scenic beach destination near Bapatla' },
  { rel: 'images/attractions/bapatla.jpg', w: 1000, h: 700, cat: 'Town & Culture', title: 'Bapatla Town', sub: 'Local markets, heritage and coastal lifestyle' },
  { rel: 'images/attractions/kondaveedu-fort.jpg', w: 1000, h: 700, cat: 'Heritage', title: 'Kondaveedu Fort', sub: 'Historic hilltop fort with panoramic regional views' },
  { rel: 'images/attractions/narasaraopet.jpg', w: 1000, h: 700, cat: 'Town', title: 'Narasaraopet', sub: 'Regional temples and cultural sights' },

  // Blog
  { rel: 'images/blog/coastal-beauty-chirala.jpg', w: 1200, h: 800, cat: 'Travel Guide', title: 'Coastal Beauty Around Chirala', sub: 'A Nature Lover’s Guide to the Bay of Bengal Coast' },
  { rel: 'images/blog/family-getaway-chirala.jpg', w: 1200, h: 800, cat: 'Family Travel', title: 'Planning the Perfect Family Getaway', sub: 'Tips for an unforgettable beach holiday' },
  { rel: 'images/blog/vodarevu-beach.jpg', w: 1200, h: 800, cat: 'Destinations', title: 'Exploring Vodarevu Beach', sub: 'Andhra Pradesh’s serene coastal gem' },
  { rel: 'images/blog/andhra-beach-holiday.jpg', w: 1200, h: 800, cat: 'Travel Guide', title: 'Why Andhra Pradesh is the Perfect Beach Holiday', sub: 'Discover the undiscovered coastline' },
  { rel: 'images/blog/myra-resort-stay.jpg', w: 1200, h: 800, cat: 'Resort Life', title: 'A Relaxing Stay at MYRA Golden', sub: 'Experience hospitality, comfort and coastal serenity' },

  // Gallery
  { rel: 'images/gallery/exterior-1.jpg', w: 900, h: 675, cat: 'Exterior', title: 'Resort Entrance', sub: 'MYRA Golden Beach Resort' },
  { rel: 'images/gallery/exterior-2.jpg', w: 900, h: 675, cat: 'Exterior', title: 'Resort Grounds', sub: 'Landscaped grounds & pathways' },
  { rel: 'images/gallery/room-1.jpg', w: 900, h: 675, cat: 'Rooms', title: 'Deluxe Room Interior', sub: 'Comfortable coastal accommodations' },
  { rel: 'images/gallery/room-2.jpg', w: 900, h: 675, cat: 'Rooms', title: 'Family Suite', sub: 'Spacious living & sleeping spaces' },
  { rel: 'images/gallery/pool-1.jpg', w: 900, h: 675, cat: 'Pool', title: 'Swimming Pool', sub: 'Open-air swimming pool' },
  { rel: 'images/gallery/pool-2.jpg', w: 900, h: 675, cat: 'Pool', title: 'Poolside Loungers', sub: 'Relaxation area' },
  { rel: 'images/gallery/restaurant-1.jpg', w: 900, h: 675, cat: 'Restaurant', title: 'Dining Hall', sub: 'Multi-cuisine restaurant' },
  { rel: 'images/gallery/restaurant-2.jpg', w: 900, h: 675, cat: 'Restaurant', title: 'Andhra Cuisine', sub: 'Fresh regional dishes' },
  { rel: 'images/gallery/garden-1.jpg', w: 900, h: 675, cat: 'Garden', title: 'Resort Lawns', sub: 'Green garden areas' },
  { rel: 'images/gallery/garden-2.jpg', w: 900, h: 675, cat: 'Garden', title: 'Coastal Walkways', sub: 'Peaceful garden paths' },
  { rel: 'images/gallery/facilities-1.jpg', w: 900, h: 675, cat: 'Facilities', title: 'Reception & Lobby', sub: 'Welcoming front desk' },
  { rel: 'images/gallery/facilities-2.jpg', w: 900, h: 675, cat: 'Facilities', title: 'Event Gathering Area', sub: 'Flexible event spaces' },
];

async function generate() {
  console.log('Generating logo...');
  const logoSvg = makeLogoSvg(256);
  const logoDir = path.join(publicDir, 'logo');
  if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });
  fs.writeFileSync(path.join(logoDir, 'logo.svg'), logoSvg);
  await sharp(logoSvg).png().toFile(path.join(logoDir, 'logo.png'));
  console.log('✓ Logo generated');

  console.log(`Generating ${imagesToCreate.length} placeholder images...`);
  for (const item of imagesToCreate) {
    const fullPath = path.join(publicDir, item.rel);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const svg = makeSvg(item.w, item.h, item.cat, item.title, item.sub);
    await sharp(svg).jpeg({ quality: 85 }).toFile(fullPath);
    console.log(`  ✓ ${item.rel}`);
  }

  console.log('All placeholders created successfully!');
}

generate().catch(console.error);
