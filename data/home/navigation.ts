interface SubProduct {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
}

interface ProductCategory {
  id: string;
  title: string;
  products: SubProduct[];
}

interface NavigationItem {
  id: string;
  name: string;
  path?: string;
  megaMenu?: ProductCategory[];
  children?: Array<{
    id: string;
    name: string;
    path: string;
    description?: string;
  }>;
}

export const navigation: NavigationItem[] = [
  {
    id: "home",
    name: "Home",
    path: "/",
  },
  {
    id: "features",
    name: "Features",
    path: "/features",
  },
  {
    id: "how_it_work",
    name: "How It Work",
    path: "/how_it_work",
  },
  {
    id: "pricing",
    name: "Pricing",
    path: "/pricing",
  },
  {
    id: "testimonials",
    name: "testimonials",
    path: "/testimonials",
  },
  {
    id: "faq",
    name: "FAQ",
    path: "/faq",
  },
];

export const footerNavigation = {
  product: [
    { id: "ocr", name: "OCR Text Extraction", path: "/products/ocr" },
    { id: "mrz", name: "MRZ Text EXtraction", path: "/products/mrz" },
    { id: "ekyc", name: "EKYC", path: "/products/ekyc" },
    {
      id: "sematic-search",
      name: "Sematic Search",
      path: "/products/semantic-search",
    },
    {
      id: "generative-ai",
      name: "Generative AI",
      path: "/products/generative-ai",
    },
  ],
  company: [
    { id: "footer-about", name: "About Us", path: "/about" },
    { id: "footer-blog", name: "Blog", path: "/blog" },
  ],
  resources: [
    { id: "footer-docs", name: "Documentation", path: "/docs" },
    { id: "footer-help", name: "Help Center", path: "/help" },
    { id: "footer-community", name: "Community", path: "/community" },
    { id: "footer-partners", name: "Partner Program", path: "/partners" },
    { id: "footer-resources", name: "Resources", path: "/resources" },
    { id: "footer-webinars", name: "Webinars", path: "/webinars" },
  ],
  legal: [
    { id: "footer-terms", name: "Terms of Service", path: "/terms-of-service" },
    { id: "footer-privacy", name: "Privacy Policy", path: "/privacy-policy" },
  ],
  social: [
    {
      id: "social-telegram",
      name: "Telegram",
      path: "https://t.me/blizzerkh",
      isExternal: true,
    },
    {
      id: "social-github",
      name: "GitHub",
      path: "https://github.com/theankou-coding",
      isExternal: true,
    },
    {
      id: "social-facebook",
      name: "Facebook",
      path: "https://www.facebook.com/thean.kuor",
      isExternal: true,
    },
  ],
};

export const userNavigation = [
  { id: "user-profile", name: "Your Profile", path: "/profile" },
  { id: "user-settings", name: "Settings", path: "/settings" },
  { id: "user-billing", name: "Billing", path: "/billing" },
  { id: "user-team", name: "Team", path: "/team" },
  { id: "user-help", name: "Help", path: "/help" },
  { id: "user-logout", name: "Sign out", path: "/logout" },
];
