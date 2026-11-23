export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function buildBreadcrumbs(path: string, customTitle?: string): BreadcrumbItem[] {
  const segments = path.split("/").filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let currentPath = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    let label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    if (segment === "rooms") label = "Rooms & Packages";
    if (segment === "about") label = "About Us";
    if (segment === "contact") label = "Contact Us";
    if (segment === "gallery") label = "Gallery";
    if (segment === "blog") label = "Blog";

    if (i === segments.length - 1 && customTitle) {
      label = customTitle;
    }

    crumbs.push({ label, href: currentPath });
  }

  return crumbs;
}
