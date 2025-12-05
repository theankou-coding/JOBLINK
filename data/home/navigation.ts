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
// Product categories with icons and descriptions
const productCategories: ProductCategory[] = [
  // {
  //   id: "our-products",
  //   title: "Our Products",
  //   products: [
  //     {
  //       id: "ocr-text-extraction",
  //       name: "OCR Text Extraction",
  //       description: "Extract text from images and documents.",
  //       path: "/products/ocr",
  //       icon: "FiCamera",
  //     },
  //     {
  //       id: "ekyc",
  //       name: "eKYC",
  //       description: "Verify and extract information from ID card images.",
  //       path: "/products/ekyc",
  //       icon: "FiUserCheck",
  //     },
  //     {
  //       id: "mrz-scanner",
  //       name: "MRZ Scanner",
  //       description: "Extract MRZ data from an uploaded image.",
  //       path: "/products/mrz",
  //       icon: "FiCreditCard",
  //     },
  //     {
  //       id: "semantic-search",
  //       name: "Semantic Search",
  //       description: "Understand user intent with semantic search.",
  //       path: "/products/semantic-search",
  //       icon: "FiSearch",
  //     },
  //     {
  //       id: "generative-ai",
  //       name: "Generative AI",
  //       description: "Create new content with generative models.",
  //       path: "/products/generative-ai",
  //       icon: "FiCpu",
  //     },
  //   ],
  // },
  // {
  //   id: "apply-ai",
  //   title: "Apply AI",
  //   products: [
  //     {
  //       id: "data-labeling",
  //       name: "Data Labeling",
  //       description: "Booking Demo for Data Labeling",
  //       path: "https://calendly.com/mrrtmob/30min",
  //       icon: "",
  //     },
  //     {
  //       id: "fine-tuning",
  //       name: "Fine Tuning",
  //       description: "Booking Demo for Fine-tuning",
  //       path: "https://calendly.com/mrrtmob/30min",
  //       icon: "",
  //     },
  //   ],
  // },
  // {
  //   id: "ai-proxies",
  //   title: "AI Proxies",
  //   products: [
  //     {
  //       id: "ai-proxied",
  //       name: "AI Proxies",
  //       description: "AI Proxies",
  //       path: "https://blizzer.chat/",
  //       icon: "",
  //     },
  //   ],
  // },
];

export const navigation: NavigationItem[] = [
  {
    id: "home",
    name: "Home",
    path: "/home",
  },
  {
    id: "job_search",
    name: "Job Search",
    path: "/job-search",
  },
  {
    id: "about",
    name: "About",
    path: "/about",
  },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
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
