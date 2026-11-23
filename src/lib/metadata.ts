import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, THEME_COLOR } from "./constants";

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path,
  image,
  keywords,
  noIndex = false,
}: PageSEO): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/images/og-default.jpg`;

  return {
    title,
    description,
    keywords: keywords && keywords.length > 0 ? keywords.join(", ") : undefined,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    other: {
      "theme-color": THEME_COLOR,
      "geo.region": "IN-AP",
      "geo.placename": "Chirala, Andhra Pradesh",
      "geo.position": "15.804438;80.424813",
      "ICBM": "15.804438, 80.424813",
    },
  };
}
