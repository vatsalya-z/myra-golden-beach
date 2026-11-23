import { keywordMap } from "@/data/seo/keywordMap";

export function getKeywordsForPath(path: string): string[] {
  const mapping = keywordMap[path];
  if (!mapping) return ["MYRA Golden Beach Resort", "Beach Resort Chirala", "Andhra Pradesh Resort"];
  return [mapping.primaryKeyword, ...mapping.secondaryKeywords, ...mapping.supportingKeywords];
}

export function getPrimaryKeyword(path: string): string {
  return keywordMap[path]?.primaryKeyword || "MYRA Golden Beach Resort";
}
