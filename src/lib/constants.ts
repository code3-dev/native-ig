type NavLink = {
  name: string;
  href: string;
};

export const siteLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Terms of Service",
    href: "/terms-of-service",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "API Docs",
    href: "/api-docs"
  },
];

export const externalLinks: NavLink[] = [
  {
    name: "Creator",
    href: "https://t.me/h3dev/",
  },
];
