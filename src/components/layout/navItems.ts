// `primary` items show as boxed links in the desktop header (Preset A: 3–5 links + the Get involved button);
// every item shows in the mobile menu and the footer.
export const navItems = [
  { key: "story", href: "/story", primary: true },
  { key: "record", href: "/record", primary: true },
  { key: "projects", href: "/projects", primary: false },
  { key: "map", href: "/map", primary: true },
  { key: "plan", href: "/plan", primary: true },
  { key: "wards", href: "/wards", primary: true },
  { key: "gallery", href: "/gallery", primary: false },
  { key: "news", href: "/news", primary: false },
  { key: "qa", href: "/qa", primary: false },
  { key: "involved", href: "/get-involved", primary: false },
  { key: "contact", href: "/contact", primary: false },
] as const;
