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

export const SERVICES2_STAGES: readonly ServiceStage[] = [
  {
    id: "shaping",
    number: "01",
    title: "Shaping Theories",
    intro: "Before anything gets made, it gets decided.",
    image: "/images/services2/stage-ai.png",
    imageAlt: "AI-driven efficiency visual — robot head over typography",
    lightLeft: false,
    capabilities: [
      {
        title: "Brand Naming",
        body: "A name has to survive a phone call, a shopfront and a search bar. We find the ones that do. Memorable, ownable, and still right in five years.",
      },
      {
        title: "Brand Identity",
        body: "Logos, type, colour, systems. Built so the tenth application looks as considered as the first.",
      },
      {
        title: "Brand Positioning",
        body: "We find the difference worth claiming. Then we make sure you're the only one saying it.",
      },
      {
        title: "Brand Strategy",
        body: "The blueprint that connects what you believe to what you sell. Every decision after it has something to check itself against.",
      },
    ],
  },
  {
    id: "building",
    number: "02",
    title: "Building Theories",
    intro: "Getting the brand in front of people who matter.",
    image: "/images/services2/stage-dashboard.png",
    imageAlt: "Product dashboard interface mockup",
    lightLeft: true,
    capabilities: [
      {
        title: "Digital Marketing",
        body: "Always-on campaigns across search, social and display. Planned around where your audience actually spends attention, not where it's cheapest to buy.",
      },
      {
        title: "Social Production",
        body: "Same-week reels through to full content calendars. Volume, without the drop in standard.",
      },
      {
        title: "Brand Films",
        body: "Films that earn their runtime. We shoot for the platform they'll live on, not the boardroom where they'll be approved.",
      },
    ],
  },
  {
    id: "transforming",
    number: "03",
    title: "Transforming Theories",
    intro: "Turning attention into revenue.",
    image: "/images/services2/stage-ai.png",
    imageAlt: "AI-driven efficiency visual — robot head over typography",
    lightLeft: false,
    capabilities: [
      {
        title: "Performance Marketing",
        body: "Creative and media run by the same team, judged on cost per outcome. Not impressions.",
      },
      {
        title: "SEO",
        body: "Technical, content, local. The slow channel that keeps working after the ad budget stops.",
      },
      {
        title: "Growth Marketing",
        body: "Test, read, repeat. Funnels, retention and experiments that find the levers worth pulling twice.",
      },
    ],
  },
  {
    id: "crafting",
    number: "04",
    title: "Crafting Theories",
    intro: "The things people actually touch.",
    image: "/images/services2/stage-dashboard.png",
    imageAlt: "Product dashboard interface mockup",
    lightLeft: true,
    capabilities: [
      {
        title: "Interaction Design",
        body: "Interfaces that feel obvious. The best outcome is that nobody notices the design at all.",
      },
      {
        title: "UI/UX + Development",
        body: "Design and engineering sit in the same room, so nothing gets lost between the file and the build.",
      },
      {
        title: "Application Development",
        body: "Fast, secure, built to be extended. Not rebuilt in eighteen months.",
      },
      {
        title: "Packaging Design",
        body: "Three seconds on a shelf. Packaging that wins them, and holds up through print, freight and stocking.",
      },
    ],
  },
] as const;
