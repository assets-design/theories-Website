export type ServiceCapability = {
  title: string;
  body: string;
};

export type ServiceStage = {
  id: string;
  number: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  /** Light left rail (white panel) vs dark left rail */
  lightLeft: boolean;
  capabilities: readonly ServiceCapability[];
};

/**
 * Services page stages — Theories brand model (homepage-aligned):
 * Shaping → Building → Transforming → Crafting
 * Capability depth informed by industry reference inventories; copy in Theories voice.
 */
export const SERVICES2_STAGES: readonly ServiceStage[] = [
  {
    id: "shaping",
    number: "01",
    title: "Shaping Theories",
    intro:
      "Before anything gets made, it gets decided. Naming, identity, positioning and strategy — the thinking that makes every later choice easier.",
    image: "/images/services2/stage-ai.png",
    imageAlt: "Brand strategy and identity visual",
    lightLeft: false,
    capabilities: [
      {
        title: "Brand Strategy",
        body: "Your brand finds its place in the market before a single pixel is designed. The blueprint that connects what you believe to what you sell.",
      },
      {
        title: "Competitor & Market Research",
        body: "We map your category and find the gaps your brand can credibly own — not the ones everyone else is already shouting into.",
      },
      {
        title: "Brand Architecture",
        body: "A structure that keeps your brand, products and sub-brands clear as you scale. Hierarchy without confusion.",
      },
      {
        title: "Brand Naming & Tagline",
        body: "A name has to survive a phone call, a shopfront and a search bar. We find the ones that stick — and lines that land.",
      },
      {
        title: "Brand Messaging & Tone of Voice",
        body: "Every word earns its place. From tagline to sales deck, a voice that's distinctly yours across every touchpoint.",
      },
      {
        title: "Brand Audit",
        body: "An honest look at where your brand stands today and what needs to change before the next chapter.",
      },
      {
        title: "Brand Identity Design",
        body: "The full visual world of your brand — logo, type, colour and systems. Built so the tenth application looks as considered as the first.",
      },
      {
        title: "Logo Design",
        body: "A mark that's instantly yours. Built to hold its own at any scale, on any surface.",
      },
      {
        title: "Visual Language & Design System",
        body: "A consistent design language that keeps your brand coherent across every surface — digital, print and product.",
      },
      {
        title: "Rebranding",
        body: "When your brand has outgrown itself, we rebuild it for where you're going — without erasing what still works.",
      },
      {
        title: "Brand Positioning",
        body: "We find the difference worth claiming. Then we make sure you're the only one saying it.",
      },
      {
        title: "Packaging Design",
        body: "Three seconds on a shelf. Packaging that wins them, and holds up through print, freight and stocking.",
      },
    ],
  },
  {
    id: "building",
    number: "02",
    title: "Building Theories",
    intro:
      "Websites, apps and platforms that load fast and convert honestly. Design and development in one room, so nothing gets lost in handoff.",
    image: "/images/services2/stage-dashboard.png",
    imageAlt: "Product dashboard and digital product interface",
    lightLeft: true,
    capabilities: [
      {
        title: "UX / UI Design",
        body: "Interfaces that are as intuitive as they are considered — designed around how people actually behave, not how decks look.",
      },
      {
        title: "Web Design",
        body: "Websites built to perform, not just impress. Clear hierarchy, sharp storytelling, conversion in the first fold.",
      },
      {
        title: "Mobile App Design",
        body: "Every tap, scroll and screen designed with purpose. Product UI that feels obvious on day one.",
      },
      {
        title: "Dashboard Design",
        body: "Complex data, made clear. Interfaces that inform without overwhelming the people who use them daily.",
      },
      {
        title: "Wireframing & Prototyping",
        body: "Ideas tested and validated before a single line of production code is written.",
      },
      {
        title: "Design Systems",
        body: "A single source of truth that keeps your product consistent as teams and features scale.",
      },
      {
        title: "UI/UX + Development",
        body: "Design and engineering sit in the same room, so nothing gets lost between the file and the build.",
      },
      {
        title: "Application Development",
        body: "Fast, secure, built to be extended — not rebuilt in eighteen months.",
      },
      {
        title: "Shopify & Custom E-Commerce",
        body: "Stores designed for conversion from day one, or tailored commerce built around how your business actually sells.",
      },
      {
        title: "Platform Migration & Scaling",
        body: "Move fast, lose nothing. Migrations and performance work that keep sites fast as you grow.",
      },
      {
        title: "No-Code & Managed Builds",
        body: "Webflow and Framer builds your team can actually own — pixel-perfect, flexible, and ready to ship.",
      },
      {
        title: "Interaction Design",
        body: "Micro-interactions and flows that feel inevitable. The best outcome is that nobody notices the design at all.",
      },
    ],
  },
  {
    id: "transforming",
    number: "03",
    title: "Transforming Theories",
    intro:
      "Performance marketing, SEO, social and AI automation. Systems that compound instead of campaigns that expire.",
    image: "/images/services2/stage-ai.png",
    imageAlt: "Growth systems and AI-driven marketing visual",
    lightLeft: false,
    capabilities: [
      {
        title: "Performance Marketing",
        body: "Creative and media run by the same team, judged on cost per outcome — not impressions.",
      },
      {
        title: "Media Planning & Digital Ads",
        body: "Always-on campaigns across search, social and display. Planned around where your audience actually spends attention.",
      },
      {
        title: "SEO",
        body: "Technical, content and local. The slow channel that keeps working after the ad budget stops.",
      },
      {
        title: "Growth Marketing",
        body: "Test, read, repeat. Funnels, retention and experiments that find the levers worth pulling twice.",
      },
      {
        title: "Social Media Marketing",
        body: "Calendars, campaigns and community systems built for the platforms your audience actually opens.",
      },
      {
        title: "Social Production",
        body: "Same-week reels through to full content systems. Volume without the drop in standard.",
      },
      {
        title: "Business Automations",
        body: "Manual processes that slow you down, automated so your team can focus on what actually moves the business.",
      },
      {
        title: "AI Automation for Communication",
        body: "Smarter customer communication, powered by AI and built to scale without sounding robotic.",
      },
      {
        title: "WhatsApp Automation",
        body: "Your business, always on. Automated conversations that convert enquiries into outcomes.",
      },
      {
        title: "Deploying AI Agents",
        body: "Custom AI agents that work inside your business workflows — not just as a demo on the side.",
      },
      {
        title: "Zoho & Ops Systems",
        body: "End-to-end implementation and integration — set up, connected, and built to run the day-to-day.",
      },
      {
        title: "Campaign Systems",
        body: "From brief to live. Full-funnel campaigns where creative, media and measurement stay in lockstep.",
      },
    ],
  },
  {
    id: "crafting",
    number: "04",
    title: "Crafting Theories",
    intro:
      "Films, content and campaign creative. Ideas made for where they'll actually be watched — not where they'll be presented.",
    image: "/images/services2/stage-dashboard.png",
    imageAlt: "Creative production and brand content visual",
    lightLeft: true,
    capabilities: [
      {
        title: "Ad Films / Brand Films",
        body: "Stories that stop the scroll and make people feel something about your brand — shot for the platform they'll live on.",
      },
      {
        title: "E-commerce & Product Photography",
        body: "Product imagery that sells — clean, consistent, conversion-ready. Every detail captured with intent.",
      },
      {
        title: "Lifestyle Photography",
        body: "Your brand in the world, shot to feel real, relevant and aspirational.",
      },
      {
        title: "Motion Design & Animation",
        body: "Brands that move. Motion built to communicate, not just decorate the deck.",
      },
      {
        title: "Reels & Social Content",
        body: "Content made for the feed — fast, engaging, and built for the audience that will actually see it.",
      },
      {
        title: "Campaign Creative",
        body: "Big ideas broken into assets that work across paid, owned and earned — without losing the thought.",
      },
      {
        title: "Brochure & Collateral Design",
        body: "Print and digital leave-behinds that carry the same confidence as the brand system behind them.",
      },
      {
        title: "Amazon A+ & Marketplace Content",
        body: "Product storytelling that converts browsers into buyers on the shelves that never close.",
      },
    ],
  },
] as const;
