// `primary` items show in the desktop header; all items show in the mobile menu.
export const navItems = [
  { key: "story", href: "/story", primary: true },
  { key: "record", href: "/record", primary: true },
  { key: "projects", href: "/projects", primary: true },
  { key: "map", href: "/map", primary: true },
  { key: "plan", href: "/plan", primary: true },
  { key: "wards", href: "/wards", primary: true },
  { key: "gallery", href: "/gallery", primary: false },
  { key: "news", href: "/news", primary: false },
  { key: "qa", href: "/qa", primary: false },
  { key: "involved", href: "/get-involved", primary: true },
  { key: "contact", href: "/contact", primary: false },
] as const;
