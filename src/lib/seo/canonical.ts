import { SITE_URL } from "@/lib/constants";

/**
 * Returns the canonical absolute URL for any path.
 * Strips trailing slashes (except root) and query strings to ensure clean indexing.
 */
export function getCanonicalUrl(path: string = "/"): string {
  const cleanPath = path.split("?")[0].split("#")[0];
  if (!cleanPath || cleanPath === "/") {
    return `${SITE_URL}/`;
  }
  const normalized = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  return `${SITE_URL}${normalized.replace(/\/+$/, "")}`;
}
