import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL, THEME_COLOR } from "@/lib/constants";
import {
  generateHotelSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/common/FloatingContact";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { PageTransition } from "@/components/animations/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Beach Resort in Chirala, Andhra Pradesh`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Discover MYRA Golden Beach Resort in Andhra Pradesh. Enjoy comfortable rooms, swimming pool, multi-cuisine dining and a relaxing coastal stay near Chirala.",
  keywords: [
    "MYRA Golden Beach Resort",
    "beach resort Chirala",
    "resort in Andhra Pradesh",
    "coastal resort near Chirala",
    "hotel near Vodarevu beach",
    "beach resort Andhra Pradesh",
    "Kotha Peta Rural resort",
  ].join(", "),
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Beach Resort in Chirala, Andhra Pradesh`,
    description:
      "Discover MYRA Golden Beach Resort in Andhra Pradesh. Enjoy comfortable rooms, swimming pool, multi-cuisine dining and a relaxing coastal stay near Chirala.",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "MYRA Golden Beach Resort — coastal retreat in Andhra Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Beach Resort in Chirala, Andhra Pradesh`,
    description:
      "Discover MYRA Golden Beach Resort in Andhra Pradesh. Enjoy comfortable rooms, swimming pool, multi-cuisine dining and a relaxing coastal stay near Chirala.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
    },
  },
  other: {
    "theme-color": THEME_COLOR,
    "geo.region": "IN-AP",
    "geo.placename": "Chirala, Andhra Pradesh",
    "geo.position": "15.804438;80.424813",
    "ICBM": "15.804438, 80.424813",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    generateHotelSchema(),
    generateOrganizationSchema(),
    generateWebSiteSchema(),
  ];

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content={THEME_COLOR} />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-inter bg-[#FAF7F0] text-[#1F1F1F] antialiased">
        <ScrollProgress />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-1 pb-16 lg:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <MobileBottomBar />
          <FloatingContact />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
