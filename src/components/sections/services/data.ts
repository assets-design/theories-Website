export type ServiceItem = {
  title: string;
  body: string;
};

export type ServiceStage = {
  id: string;
  number: string;
  title: string;
  intro: string;
  icon: string;
  image: string;
  imageAlt: string;
  /** true = white left / content feel like polished services2 */
  lightPanel: boolean;
  services: readonly ServiceItem[];
};

export const SERVICES_STAGES: readonly ServiceStage[] = [
  {
    id: "shaping",
    number: "01",
    title: "Shaping Theories",
    intro:
      "Before anything gets made, it gets decided. Naming, identity, positioning and strategy — the thinking that makes every later choice easier.",
    icon: "/images/icons/service-shaping.png",
    image: "/images/services2/stage-ai.png",
    imageAlt: "Brand and strategy visual",
    lightPanel: false,
    services: [
      {
        title: "Brand Strategy",
        body: "Your brand finds its place in the market before a single pixel is designed.",
      },
      {
        title: "Competitor & Market Research",
        body: "We map your category and find the gaps your brand can credibly own.",
      },
      {
        title: "Brand Architecture",
        body: "A structure that keeps brand, products and sub-brands clear as you scale.",
      },
      {
        title: "Brand Naming & Tagline",
        body: "Names that survive a phone call, a shopfront and a search bar.",
      },
      {
        title: "Brand Messaging & Tone of Voice",
        body: "From tagline to sales deck — a voice that's distinctly yours.",
      },
      {
        title: "Brand Audit",
        body: "An honest look at where you stand and what needs to change.",
      },
      {
        title: "Brand Identity Design",
        body: "Logo, type, colour and systems — coherent from first use to the tenth.",
      },
      {
        title: "Logo Design",
        body: "A mark that's instantly yours at any scale, on any surface.",
      },
      {
        title: "Visual Language & Design System",
        body: "A design language that stays consistent across digital, print and product.",
      },
      {
        title: "Rebranding",
        body: "When the brand has outgrown itself, we rebuild it for where you're going.",
      },
      {
        title: "Brand Positioning",
        body: "The difference worth claiming — said by you alone.",
      },
      {
        title: "Packaging Design",
        body: "Three seconds on a shelf. Packaging that wins them and holds through print.",
      },
    ],
  },
  {
    id: "building",
    number: "02",
    title: "Building Theories",
    intro:
      "Websites, apps and platforms that load fast and convert honestly. Design and development in one room.",
    icon: "/images/icons/service-building.png",
    image: "/images/services2/stage-dashboard.png",
    imageAlt: "Digital product interface visual",
    lightPanel: true,
    services: [
      {
        title: "UX / UI Design",
        body: "Interfaces designed around how people actually behave.",
      },
      {
        title: "Web Design",
        body: "Sites built to perform — hierarchy, storytelling, conversion.",
      },
      {
        title: "Mobile App Design",
        body: "Every tap and screen designed with purpose.",
      },
      {
        title: "Dashboard Design",
        body: "Complex data made clear without overwhelming daily users.",
      },
      {
        title: "Wireframing & Prototyping",
        body: "Ideas tested before production code is written.",
      },
      {
        title: "Design Systems",
        body: "A single source of truth as teams and features scale.",
      },
      {
        title: "UI/UX + Development",
        body: "Design and engineering together — nothing lost in handoff.",
      },
      {
        title: "Application Development",
        body: "Fast, secure, built to extend — not rebuild in eighteen months.",
      },
      {
        title: "Shopify & Custom E-Commerce",
        body: "Stores designed for conversion, or commerce tailored to how you sell.",
      },
      {
        title: "Platform Migration & Scaling",
        body: "Move platforms without the mess. Stay fast as you grow.",
      },
      {
        title: "No-Code & Managed Builds",
        body: "Webflow and Framer builds your team can actually own.",
      },
      {
        title: "Interaction Design",
        body: "Flows that feel inevitable. The best design goes unnoticed.",
      },
    ],
  },
  {
    id: "transforming",
    number: "03",
    title: "Transforming Theories",
    intro:
      "Performance, SEO, social and AI automation. Systems that compound instead of campaigns that expire.",
    icon: "/images/icons/service-transforming.png",
    image: "/images/services2/stage-ai.png",
    imageAlt: "Growth and automation visual",
    lightPanel: false,
    services: [
      {
        title: "Performance Marketing",
        body: "Creative and media judged on cost per outcome — not impressions.",
      },
      {
        title: "Media Planning & Digital Ads",
        body: "Always-on campaigns where your audience actually spends attention.",
      },
      {
        title: "SEO",
        body: "Technical, content and local — working long after ads stop.",
      },
      {
        title: "Growth Marketing",
        body: "Funnels, retention and experiments that find levers worth repeating.",
      },
      {
        title: "Social Media Marketing",
        body: "Campaigns and community systems for platforms people open.",
      },
      {
        title: "Social Production",
        body: "Same-week reels to full calendars — volume without dropping standard.",
      },
      {
        title: "Business Automations",
        body: "Manual drag removed so teams focus on what moves the business.",
      },
      {
        title: "AI Automation for Communication",
        body: "Smarter communication that scales without sounding robotic.",
      },
      {
        title: "WhatsApp Automation",
        body: "Always-on conversations that turn enquiries into outcomes.",
      },
      {
        title: "Deploying AI Agents",
        body: "Custom agents inside your workflows — not as a side demo.",
      },
      {
        title: "Zoho & Ops Systems",
        body: "Implementation and integration built to run the day-to-day.",
      },
      {
        title: "Campaign Systems",
        body: "Full-funnel work where creative, media and measurement stay aligned.",
      },
    ],
  },
  {
    id: "crafting",
    number: "04",
    title: "Crafting Theories",
    intro:
      "Films, content and campaign creative — made for where they'll be watched, not where they'll be presented.",
    icon: "/images/icons/service-crafting.png",
    image: "/images/services2/cta-workspace.png",
    imageAlt: "Creative production and studio visual",
    lightPanel: true,
    services: [
      {
        title: "Ad Films / Brand Films",
        body: "Stories that stop the scroll and make people feel something.",
      },
      {
        title: "E-commerce & Product Photography",
        body: "Clean, consistent imagery built to convert.",
      },
      {
        title: "Lifestyle Photography",
        body: "Your brand in the world — real, relevant, aspirational.",
      },
      {
        title: "Motion Design & Animation",
        body: "Motion that communicates — not decoration for the deck.",
      },
      {
        title: "Reels & Social Content",
        body: "Feed-native content: fast, engaging, audience-first.",
      },
      {
        title: "Campaign Creative",
        body: "Big ideas broken into assets across paid, owned and earned.",
      },
      {
        title: "Brochure & Collateral Design",
        body: "Leave-behinds that carry the same confidence as the brand.",
      },
      {
        title: "Amazon A+ & Marketplace Content",
        body: "Product storytelling that turns browsers into buyers.",
      },
    ],
  },
] as const;
