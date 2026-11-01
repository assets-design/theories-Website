import fs from "fs";
import path from "path";

const root = path.resolve("src/components/sections/case-studies");

function read(p) {
  return fs.readFileSync(p, "utf8");
}
function write(p, s) {
  // Preserve CRLF if the file already uses it
  const original = fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
  const out = original.includes("\r\n") ? s.replace(/\n/g, "\r\n").replace(/\r\r\n/g, "\r\n") : s;
  fs.writeFileSync(p, out);
  console.log("updated", path.relative(root, p));
}
function norm(s) {
  return s.replace(/\r\n/g, "\n");
}
function replaceInFile(file, from, to) {
  const p = path.join(root, file);
  const raw = read(p);
  const s = norm(raw);
  const f = norm(from);
  const t = norm(to);
  if (!s.includes(f)) {
    console.error("MISS in", file);
    return false;
  }
  const next = s.replaceAll(f, t);
  const out = raw.includes("\r\n") ? next.replace(/\n/g, "\r\n") : next;
  fs.writeFileSync(p, out);
  console.log("updated", path.relative(root, p));
  return true;
}
function replaceRegex(file, re, to) {
  const p = path.join(root, file);
  const raw = read(p);
  const s = norm(raw);
  if (!re.test(s)) {
    console.error("MISS regex in", file, re);
    return false;
  }
  re.lastIndex = 0;
  const next = s.replace(re, to);
  const out = raw.includes("\r\n") ? next.replace(/\n/g, "\r\n") : next;
  fs.writeFileSync(p, out);
  console.log("updated", path.relative(root, p));
  return true;
}

const chronicles2 = `Creative Chronicles is your gateway to the dynamic world of
                creativity, design, and innovation. It is more than just a
                blog—it&apos;s a curated collection of insights, trends, and
                stories from the forefront of the creative industry. Whether
                you&apos;re a brand strategist, designer, marketer, or simply a
                creativity enthusiast, Creative Chronicles offers a fresh
                perspective on how ideas are transformed into impactful
                realities.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                Our mission is to inspire and empower creative minds by sharing
                real-world case studies, behind-the-scenes looks at
                groundbreaking projects, and expert opinions on emerging trends.
                We dive deep into the creative process, exploring everything
                from conceptual ideation to execution, and reveal the strategies
                that bring bold visions to life.`;

const chronicles2Alt = chronicles2.replace(
  'className="mt-[clamp(1rem,1.56vw,1.875rem)]"',
  'className="mt-[1.125rem]"',
);

const chroniclesLanding = `Creative Chronicles is your gateway to the dynamic world of
            creativity, design, and innovation. It is more than just a
            blog—it&apos;s a curated collection of insights, trends, and
            stories from the forefront of the creative industry. Whether
            you&apos;re a brand strategist, designer, marketer, or simply a
            creativity enthusiast, Creative Chronicles offers a fresh
            perspective on how ideas are transformed into impactful realities.`;

const moha3 = `MOHA is a premium lifestyle and fashion brand inspired by
                timeless Indian elegance and modern minimalism. Designed for
                those who appreciate refined craftsmanship, MOHA blends
                heritage-inspired aesthetics with contemporary design to create
                products that feel effortless, sophisticated, and enduring.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The brand was envisioned to offer more than just beautiful
                products—it aims to create meaningful experiences through
                thoughtful design, premium quality, and attention to every
                detail. From its visual identity to customer touchpoints, every
                element reflects understated luxury and authenticity.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                MOHA approached us to build a complete brand ecosystem from the
                ground up. We crafted the brand strategy, visual identity, logo
                system, digital presence, and customer experience, ensuring
                every interaction communicates elegance, trust, and exclusivity.
                The result is a distinctive premium brand that stands
                confidently in a competitive market while remaining true to its
                timeless philosophy.`;

const overviewChronicles = [
  [
    "hbb/HbbOverview.tsx",
    `Hyderabad Black Birds is a racing team that needed a digital home as fast as the cars on track. Fans came for race updates, media, and team stories — not a dusty archive of old results.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We redesigned and built the platform around live energy: race calendars, driver profiles, media galleries, and a structure that keeps supporters close to every session. The result is a fan-first experience that matches the pace of motorsport.`,
  ],
  [
    "rppl/RpplOverview.tsx",
    `RPPL Motor Racing brings track-level ambition into a digital identity. The brief was to make the brand feel as precise and competitive as the cars themselves — clear, fast, and impossible to ignore.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed and developed a web experience that translates motorsport energy into UI: bold hierarchy, race-ready storytelling, and a system built for updates as the season moves. Every screen reinforces speed, craft, and team pride.`,
  ],
  [
    "jcn-consulting/JcnOverview.tsx",
    `JCN Consulting is a growth studio that needed a digital presence as sharp as their execution. Complex venture work had to feel clear, confident, and easy for decision-makers to trust at a glance.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed and built a website that turns dense consulting narratives into a crisp brand story — structured services, proof-led messaging, and a visual system that signals seriousness without slowing the read.`,
  ],
  [
    "safari-lodges/SafariOverview.tsx",
    `Safari Lodges India is a wildlife hospitality brand that needed a digital experience as immersive as the lodges themselves — nature-forward, quiet luxury, and easy booking journeys.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed the website and social system around wilderness atmosphere, lodge discovery, and stay conversion. From wireframes to high-fidelity UI and social creatives, every touchpoint invites guests into the landscape before they arrive.`,
  ],
  [
    "amol/AmolOverview.tsx",
    `Amol is a commercial real estate brand that needed a digital front door as solid as the buildings it represents — clarity, projects, and trust in the first scroll.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed and developed a website that puts listings, credibility, and enquiry flows first. Clean layouts, strong project storytelling, and a structure built for buyers and partners who decide carefully.`,
  ],
  [
    "aircraft-cloud-pulse/AircraftOverview.tsx",
    `Aircraft Cloud and Aircraft Pulse are two products under one coherent software brand. The challenge was to make complex aviation technology feel obvious — shared language, clear positioning, and interfaces people can trust.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We shaped the brand system and digital experience across both products: UI/UX, web development, SEO, and social. The result is a unified presence where product depth never gets in the way of clarity.`,
  ],
];

for (const [file, to] of overviewChronicles) {
  replaceInFile(file, chronicles2, to);
}

replaceInFile(
  "lohitha/LohithaHero.tsx",
  chronicles2Alt,
  `Lohitha Foods is a trusted local name ready for national shelf presence. The brand needed packaging-led storytelling and a digital reach that could compete beyond the neighbourhood aisle.
              </p>
              <p className="mt-[1.125rem]">
                We built the website, social system, and WhatsApp commerce touchpoints around everyday food rituals — fortified rice, atta, and festive campaigns — so every post and page feels familiar, honest, and ready to scale.`,
);

replaceInFile(
  "lohitha/LohithaLanding.tsx",
  chroniclesLanding,
  `The Lohitha landing experience brings farm-to-family storytelling onto the screen — product clarity, nutritional trust, and a warm visual system that feels local and national at once. Designed for shoppers who decide with both heart and label.`,
);

const overviewMoha = [
  [
    "zykaz/ZykazOverview.tsx",
    `Zykaz is a clothing label built for a generation that decides in three seconds. Identity, storefront, and social had to work as one — sharp, trend-aware, and instantly scroll-stopping.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We shaped brand positioning, UI/UX, web development, SEO, social, and performance marketing into a single system. From lookbook energy to conversion paths, every touchpoint reinforces a brand that feels current without trying too hard.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The outcome is a fashion-forward digital ecosystem where product drops, campaigns, and the website share the same voice — fast, confident, and built for Gen-Z attention spans.`,
  ],
  [
    "zene-ai/ZeneOverview.tsx",
    `Zene AI is an education brand that needed social content which turns curiosity into admissions. The mascot, message, and campaign system had to feel approachable while still sounding smart.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We built Instagram creatives, reels, and campaign frameworks around clear learning benefits and character-led storytelling. Every asset is designed to stop the scroll and move parents or students one step closer to enquiry.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The result is a social system that makes AI-powered education feel human — memorable, consistent, and ready to convert attention into conversations.`,
  ],
  [
    "mahesh-agencies/MaheshOverview.tsx",
    `Mahesh Agencies needed a logo system that could travel from stationery to ID badges to building signage without losing strength. The monogram had to feel established, modern, and unmistakably theirs.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed the wordmark, colour palette, and brand applications across print and environmental touchpoints. Every application keeps the same confidence — whether it sits on a card, a desk, or a façade.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The finished identity gives Mahesh Agencies a coherent brand presence that looks as reliable as the business behind it.`,
  ],
  [
    "howto/HowtoOverview.tsx",
    `How To needed an identity system that felt instantly familiar and impossible to confuse — clear, memorable, and ready for brochure and social use from day one.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We built the logo, brand identity, brochure system, and social design language around clarity-first messaging. The visual system makes complex ideas feel simple without watering them down.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The result is a brand toolkit that works across print and digital — consistent, distinctive, and easy for teams to apply.`,
  ],
  [
    "dcasa/DcasaOverview.tsx",
    `D'CASA Suites needed a logo system that signals hospitality with quiet confidence — monogram, wordmark, and applications that feel premium on stationery and signage.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed a mark and brand kit that travels cleanly from letterhead to façade. Every application reinforces comfort, care, and a sense of place guests remember.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The identity positions D'CASA as a suite experience that looks as considered as the stay itself.`,
  ],
  [
    "celeste/CelesteOverview.tsx",
    `Celeste International Schools serves parents who compare carefully before they commit. The digital front door had to feel trustworthy, modern, and clear about what makes Celeste different.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We built social, performance marketing, SEO, UI/UX, and web development around admissions outcomes — proof, clarity, and campaigns that turn interest into enrolled students.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                In three months the system helped drive 600+ admissions, with creatives and landing experiences working as one pipeline from awareness to confirmation.`,
  ],
  [
    "airus/AirusOverview.tsx",
    `Airus needed a logo system built for product and packaging — a wordmark, droplet mark, and applications that feel clean, fluid, and instantly ownable on shelf and screen.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed the mark and brand applications to stay consistent across packaging, product, and digital use. Soft geometry and a clear droplet cue make the brand readable at any size.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The finished system gives Airus a distinctive identity that feels premium, simple, and ready for every customer touchpoint.`,
  ],
  [
    "eswap/EswapHero.tsx",
    `Eswap.in is a ticket resale platform that needed a seamless mobile experience and campaigns that drive real downloads. Buyers and sellers had to move fast without friction or doubt.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                We designed the app UI/UX, brand touchpoints, and social system around clarity and trust — listings, checkout flows, and creatives that make resale feel safe and simple.
              </p>
              <p className="mt-[clamp(1rem,1.56vw,1.875rem)]">
                The result is a product and campaign ecosystem built for high-intent users: fewer steps, stronger confidence, and a brand that looks as reliable as the tickets people trade.`,
  ],
];

for (const [file, to] of overviewMoha) {
  replaceInFile(file, moha3, to);
}

// Eswap meta
replaceInFile(
  "eswap/EswapHero.tsx",
  `const meta = [
  { label: "Project Name", value: "AIRUS" },
  { label: "TimeFrame", value: "2026" },
  { label: "Role", value: "Logo Designing" },
] as const;`,
  `const meta = [
  { label: "Project Name", value: "Eswap.in" },
  { label: "TimeFrame", value: "2025" },
  { label: "Role", value: "UI/UX Design & App Development" },
] as const;`,
);

// Landing titles
replaceInFile("howto/HowtoLanding.tsx", "Safari Lodges India", "How To");
replaceRegex(
  "howto/HowtoLanding.tsx",
  /How To(\s*<br className="hidden sm:block" \/>\s*<span className="sm:hidden"> <\/span>\s*)UI\/UX Design &amp; Web Development/,
  "How To$1Brand Identity &amp; Social Design",
);
replaceInFile("celeste/CelesteLanding.tsx", "Safari Lodges India", "Celeste International Schools");

// Captions
replaceInFile(
  "zykaz/ZykazSocial.tsx",
  `"From farms to families, 2025 was a year of real impact.",
    "Thank you for choosing Lohitha. In 2026, we grow stronger.",`,
  `"New drops. New looks. Same energy.",
    "Zykaz — wear what feels like you. Next season starts now.",`,
);
replaceInFile(
  "zene-ai/ZeneSocial.tsx",
  `"From farms to families, 2025 was a year of real impact.",
    "Thank you for choosing Lohitha. In 2026, we grow stronger.",`,
  `"Learning that feels human. Powered by AI.",
    "Zene AI — curiosity today, confidence tomorrow.",`,
);
replaceInFile(
  "eswap/EswapSocial.tsx",
  `"From farms to families, 2025 was a year of real impact.",
    "Thank you for choosing Lohitha. In 2026, we grow stronger.",`,
  `"Sold out? Not anymore.",
    "Eswap.in — resell tickets fast, buy with confidence.",`,
);
replaceInFile(
  "moha/MohaHeritageCards.tsx",
  `"From farms to families, 2025 was a year of real impact.",
    "Thank you for choosing Lohitha. In 2026, we grow stronger.",`,
  `"Heritage woven into every silhouette.",
    "MOHA — timeless craft, modern ease.",`,
);
replaceInFile(
  "mahesh-agencies/MaheshSocialStories.tsx",
  `"From farms to families, 2025 was a year of real impact.",
    "Thank you for choosing Lohitha. In 2026, we grow stronger.",`,
  `"Driven by trust. Built for the road ahead.",
    "Mahesh Agencies — your journey, our commitment.",`,
);
replaceInFile(
  "howto/HowtoSocial.tsx",
  `"From farms to families, 2025 was a year of real impact.",
  "Thank you for choosing Lohitha. In 2026, we grow stronger.",`,
  `"Clarity before growth. Always.",
  "How To — frameworks that turn confusion into action.",`,
);

// Meta roles if still old
replaceInFile(
  "zykaz/ZykazOverview.tsx",
  `{ label: "Role", value: "Social Media Marketing" }`,
  `{ label: "Role", value: "Brand, Web & Performance Marketing" }`,
);
replaceInFile(
  "celeste/CelesteOverview.tsx",
  `{ label: "Role", value: "Performance Marketing" }`,
  `{ label: "Role", value: "Web, Social & Performance Marketing" }`,
);

// Ensure remaining social headings (idempotent)
const socialHeadings = [
  ["zykaz/ZykazSocial.tsx", "Social Media For Zykaz"],
  ["zene-ai/ZeneSocial.tsx", "Social Media For Zene AI"],
  ["safari-lodges/SafariSocial.tsx", "Social Media For Safari Lodges India"],
  ["moha/MohaSocialFan.tsx", "Social Media For MOHA"],
  ["mahesh-agencies/MaheshSocialFan.tsx", "Social Media For Mahesh Agencies"],
  ["howto/HowtoSocial.tsx", "Social Media For How To"],
  ["eswap/EswapSocial.tsx", "Social Media For Eswap"],
  ["celeste/CelesteSocial.tsx", "Social Media For Celeste"],
  ["aircraft-cloud-pulse/AircraftSocial.tsx", "Social Media For Aircraft"],
  ["lohitha/LohithaSocial.tsx", "Social Media For Lohitha"],
];
for (const [file, to] of socialHeadings) {
  replaceInFile(file, "Social Media For lohitha", to);
}

// Hero titles if still wrong
replaceInFile(
  "zykaz/ZykazHero.tsx",
  "600+&nbsp;Admissions in 3 Months.",
  "Fashion That Stops the Scroll.",
);
replaceInFile(
  "zene-ai/ZeneHero.tsx",
  "600+&nbsp;Admissions in 3 Months.",
  "Curiosity Into Admissions.",
);
replaceInFile(
  "eswap/EswapHero.tsx",
  "600+&nbsp;Admissions in 3 Months.",
  "Ticket Resale, Built for Speed.",
);

console.log("DONE");
