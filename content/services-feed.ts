/**
 * Services page content feed
 * Source reference: https://www.mellowdesigns.co/service
 * Captured for Theories services page build — edit freely before implementation.
 */

export type ServiceItem = {
  name: string;
  description: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  /** Optional vertical / dedicated brand callout */
  vertical?: {
    name: string;
    tagline: string;
  };
  services: ServiceItem[];
};

export const servicesPageHero = {
  eyebrow: "Services",
  headline: "Design that begins where the business does.",
  support:
    "We work across strategy, brand, digital, and AI. But everything begins with the same first step: understanding the business decision the work needs to serve.",
} as const;

export const serviceCategories: ServiceCategory[] = [
  {
    id: "branding",
    title: "Branding",
    services: [
      {
        name: "Brand Strategy",
        description:
          "Your brand finds its place in the market, before a single pixel is designed.",
      },
      {
        name: "Competitor & Market Research",
        description:
          "We map your category and find the gaps your brand can credibly own.",
      },
      {
        name: "Brand Architecture",
        description:
          "A structure that keeps your brand, products, and sub-brands clear as you scale.",
      },
      {
        name: "Tone of Voice",
        description:
          "A voice that's distinctly yours across every touchpoint and every platform.",
      },
      {
        name: "Brand Messaging",
        description:
          "Every word earns its place. From your tagline to your sales deck.",
      },
      {
        name: "Brand Naming & Tagline",
        description: "Names that stick and lines that land.",
      },
      {
        name: "Brand Audit",
        description:
          "An honest look at where your brand stands and what needs to change.",
      },
      {
        name: "Brand Identity Design",
        description:
          "The full visual world of your brand, including logo, type, colour, and everything in between.",
      },
      {
        name: "Logo Design",
        description:
          "A mark that's instantly yours. Built to hold its own at any scale.",
      },
      {
        name: "Visual Language & Design System",
        description:
          "A consistent design language that keeps your brand coherent across every surface.",
      },
      {
        name: "Rebranding",
        description:
          "When your brand has outgrown itself, we rebuild it for where you're going.",
      },
      {
        name: "Packaging Design",
        description:
          "Packaging that earns its place on the shelf and makes people pick it up.",
      },
    ],
  },
  {
    id: "ui-ux",
    title: "User Experience (UI/UX)",
    vertical: {
      name: "Mellow X",
      tagline:
        "UI/UX, and websites, designed for how brands work in the AI era.",
    },
    services: [
      {
        name: "UX / UI Design",
        description:
          "Interfaces that are as intuitive as they are considered and designed around how people actually behave.",
      },
      {
        name: "Web Design",
        description: "Websites built to perform, not just impress.",
      },
      {
        name: "Mobile App Design",
        description: "Every tap, scroll, and screen designed with purpose.",
      },
      {
        name: "Dashboard Design",
        description:
          "Complex data, made clear. Interfaces that inform without overwhelming.",
      },
      {
        name: "Wire-framing & Prototyping",
        description:
          "Ideas tested and validated before a single line of code is written.",
      },
      {
        name: "Design System",
        description:
          "A single source of truth that keeps your product consistent as it scales.",
      },
    ],
  },
  {
    id: "website-development",
    title: "Website Development",
    vertical: {
      name: "Mellow X",
      tagline:
        "UI/UX, and websites, designed for how brands work in the AI era.",
    },
    services: [
      {
        name: "Business Automations",
        description:
          "Manual processes that slow you down, automated so your team can focus on what matters.",
      },
      {
        name: "Zoho ERP",
        description:
          "End-to-end Zoho implementation. Set up, integrated, and built to run your business.",
      },
      {
        name: "AI Automation for Communication",
        description:
          "Smarter customer communication, powered by AI and built to scale.",
      },
      {
        name: "WhatsApp Automation",
        description:
          "Your business, always on. Automated conversations that convert.",
      },
      {
        name: "Deploying AI Agents",
        description:
          "Custom AI agents that work inside your business, not just alongside it.",
      },
      {
        name: "Shopify Stores",
        description:
          "Built to sell. Shopify stores designed for conversion from day one.",
      },
      {
        name: "Custom E-Commerce",
        description:
          "Tailored eCommerce solutions built around how your business actually works.",
      },
      {
        name: "Platform Migration & Scaling",
        description:
          "Move fast, lose nothing. We handle migrations without the mess.",
      },
      {
        name: "Webflow Development",
        description:
          "Pixel-perfect Webflow builds that your team can actually manage.",
      },
      {
        name: "No Code Framer Development",
        description:
          "Fast, flexible, and built for brands that need to move quickly.",
      },
      {
        name: "Scaling & Performance",
        description:
          "Sites that stay fast as you grow. Optimised for speed, stability, and scale.",
      },
    ],
  },
  {
    id: "films-content",
    title: "Films & Content",
    vertical: {
      name: "Mellow Films",
      tagline:
        "AI films and photography built to scale D2C brands without scaling the cost.",
    },
    services: [
      {
        name: "Ad Films / Brand Films",
        description:
          "Stories that stop the scroll and make people feel something about your brand.",
      },
      {
        name: "E-commerce Shoot",
        description:
          "Product imagery that sells — clean, consistent, and conversion-ready.",
      },
      {
        name: "Product Photography",
        description:
          "Every detail, captured with intent. Photography that makes your product the hero.",
      },
      {
        name: "Lifestyle Photography",
        description:
          "Your brand in the world, shot to feel real, relevant, and aspirational.",
      },
      {
        name: "Motion Design & Animation",
        description:
          "Brands that move. Motion built to communicate, not just decorate.",
      },
      {
        name: "Reels & Social Content",
        description:
          "Content made for the feed — fast, engaging, and built for your audience.",
      },
    ],
  },
];

/** Compact capability chips also shown on the reference page footer-style lists */
export const capabilityChips = {
  branding: [
    "Brand Strategy",
    "Visual Identity",
    "Brand Positioning",
    "Motion Identity",
    "Logo Design",
  ],
  uiUx: [
    "User Flows",
    "No-code Frontend",
    "Prototyping",
    "Mobile/Web Apps",
    "Design Systems",
    "Design Audits",
  ],
  performanceMarketing: [
    "Media Planning",
    "Digital Ads",
    "Campaigns",
    "SEO",
    "Production",
  ],
} as const;

export const servicesFlatList = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({
    categoryId: category.id,
    categoryTitle: category.title,
    ...service,
  })),
);
