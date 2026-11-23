# MYRA GOLDEN BEACH RESORT — Premium Next.js Resort Website

Production-ready, responsive, SEO-optimised web application built for **MYRA GOLDEN BEACH RESORT**, a premier coastal resort in Andhra Pradesh near Chirala.

---

## 🌊 Overview

- **Official Domain:** https://myragoldenbeachresort.co.in
- **Google Business Profile:** https://maps.app.goo.gl/4pKLQH5MvprxSniKA?g_st=aw
- **Location:** RC3F+QW, Kotha Peta Rural, Chirala, Andhra Pradesh 523157, India
- **Phone / WhatsApp:** +91 70751 41079

---

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router, Server Components by default)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS3 custom properties
- **Typography:** Playfair Display (headings) + Inter (body)
- **Animations:** Framer Motion (reduced-motion accessible) + GSAP
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod schema validation
- **Backend Route Handlers:** `/api/enquiry` (with extensible SMTP/CRM placeholders)
- **SEO / AEO / GEO:** Metadata API, JSON-LD schemas, dynamic Sitemap & Robots, `llms.txt`
- **Images:** Next.js Image component with WebP/AVIF support and placeholder system

---

## 📁 Architecture & Folder Structure

```
myra-golden-beach-resort/
├── public/
│   ├── images/
│   │   ├── hero/          # Hero slider images
│   │   ├── rooms/         # Room accommodation images
│   │   ├── resort/        # Grounds & exterior photos
│   │   ├── facilities/    # Pool, garden, parking, etc.
│   │   ├── restaurant/    # Dining & cuisine photos
│   │   ├── attractions/   # Beaches & local landmarks
│   │   ├── blog/          # Travel journal articles
│   │   └── gallery/       # Full categorized gallery
│   ├── logo/              # Vector SVG & PNG logos
│   ├── favicon.ico
│   └── llms.txt           # AI / LLM crawler reference
│
├── src/
│   ├── app/
│   │   ├── (website)/
│   │   │   ├── layout.tsx         # Header, Footer & Floating triggers
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── about/page.tsx     # About Us & Story
│   │   │   ├── rooms/page.tsx     # Rooms & Packages
│   │   │   ├── gallery/page.tsx   # Filterable Photo Gallery
│   │   │   ├── facilities/page.tsx# Resort Amenities
│   │   │   ├── attractions/page.tsx# Nearby Destinations
│   │   │   ├── blog/page.tsx      # Travel Journal
│   │   │   ├── blog/[slug]/page.tsx# Dynamic Article Pages
│   │   │   └── contact/page.tsx   # Contact & Enquiry Form
│   │   ├── api/
│   │   │   └── enquiry/route.ts   # Server-side enquiry processor
│   │   ├── globals.css            # Navy & Gold design tokens
│   │   ├── layout.tsx             # Root layout & global JSON-LD
│   │   ├── sitemap.ts             # Dynamic XML sitemap
│   │   ├── robots.ts              # Robots directives
│   │   ├── not-found.tsx          # 404 handler
│   │   └── error.tsx              # Error boundary
│   │
│   ├── components/
│   │   ├── layout/        # Header, TopBar, Navbar, MobileMenu, Footer
│   │   ├── home/          # HeroSlider, Amenities, Dining, Pool, etc.
│   │   ├── gallery/       # GalleryGrid with lightbox
│   │   ├── common/        # Button, SectionHeading, Breadcrumbs, EnquiryForm, etc.
│   │   └── animations/    # FadeIn, ScrollReveal, ParallaxImage, PageTransition
│   │
│   ├── data/              # Centralized site, rooms, blog & amenities data
│   ├── lib/               # Metadata, schemas, validation & WhatsApp builders
│   ├── hooks/             # useScrollPosition, useMediaQuery, useReducedMotion
│   └── types/             # TypeScript shared interfaces
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🎨 Design System

| Token | Hex Value | Description |
|---|---|---|
| `--primary` | `#0e1e38` | Deep Navy |
| `--primary-dark` | `#091629` | Dark Navy Base |
| `--accent` | `#c9a24b` | Warm Gold |
| `--accent-hover` | `#b38a34` | Deep Gold |
| `--background` | `#faf7f2` | Warm Off-White / Sand |
| `--text-dark` | `#1c2638` | Charcoal Heading & Body |
| `--text-muted` | `#5b6578` | Slate Body Text |

---

## 🔍 SEO & Structured Data

- **Hotel / Resort Schema:** Included on root layout.
- **Organization & WebSite Schema:** Included on root layout.
- **BreadcrumbList Schema:** Generated on all subpages.
- **FAQPage Schema:** Added to FAQ sections.
- **BlogPosting Schema:** Generated for all dynamic blog articles.
- **llms.txt:** Provided at `public/llms.txt` for Generative AI engines (Perplexity, ChatGPT, Gemini, etc.).

---

## 📱 Replacing Placeholders with Original Photos

When you have the resort's original photograph ZIP archive:
1. Replace corresponding files in `public/images/` under `hero/`, `rooms/`, `resort/`, `facilities/`, `restaurant/`, `attractions/`, `gallery/`, and `blog/`.
2. All components use responsive Next.js Image handling and will automatically format, cache, and serve the updated photos.
