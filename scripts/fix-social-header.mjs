import fs from "fs";

/**
 * Align social sections to header width and clip fans so mockups
 * don't cross under the fixed nav — same treatment as How To.
 */
const files = [
  "src/components/sections/case-studies/safari-lodges/SafariSocial.tsx",
  "src/components/sections/case-studies/lohitha/LohithaSocial.tsx",
  "src/components/sections/case-studies/aircraft-cloud-pulse/AircraftSocial.tsx",
  "src/components/sections/case-studies/mahesh-agencies/MaheshSocialFan.tsx",
  "src/components/sections/case-studies/moha/MohaSocialFan.tsx",
  "src/components/sections/case-studies/moha/MohaSocialOverlap.tsx",
  "src/components/sections/case-studies/celeste/CelesteSocial.tsx",
  "src/components/sections/case-studies/zene-ai/ZeneSocial.tsx",
  "src/components/sections/case-studies/zykaz/ZykazSocial.tsx",
  "src/components/sections/case-studies/eswap/EswapSocial.tsx",
  "src/components/sections/case-studies/mahesh-agencies/MaheshSocialStories.tsx",
  "src/components/sections/case-studies/mahesh-agencies/MaheshSocialFeed.tsx",
  "src/components/sections/case-studies/mahesh-agencies/MaheshSocialMyth.tsx",
  "src/components/sections/case-studies/moha/MohaSocialCampaign.tsx",
];

const OLD_PAD = "lg:px-[clamp(1.25rem,6.25vw,7.5rem)]";
const NEW_PAD = "lg:px-[clamp(1rem,6.875vw,16.25rem)]";
const HEADER_MAX = 'max-w-[clamp(920px,72.7vw,1396px)]';

for (const path of files) {
  let c = fs.readFileSync(path, "utf8");
  const nl = c.includes("\r\n") ? "\r\n" : "\n";
  let changed = false;

  if (c.includes(OLD_PAD)) {
    c = c.replaceAll(OLD_PAD, NEW_PAD);
    changed = true;
  }

  // Clip fan/mockup stages so they stay under the header band
  if (c.includes("lg:overflow-visible")) {
    c = c.replaceAll("lg:overflow-visible", "lg:overflow-hidden");
    changed = true;
  }

  // Wrap section inner content once in header max-width (skip if already present)
  if (!c.includes(HEADER_MAX)) {
    // Match: <div className="mx-auto w-full max-w-[1920px] ...">  then content then closing before </section>
    const openRe =
      /(<div className="mx-auto w-full max-w-\[1920px\][^"]*">)/;
    const m = c.match(openRe);
    if (m) {
      c = c.replace(
        m[1],
        `${m[1]}${nl}        <div className="mx-auto w-full ${HEADER_MAX}">`,
      );
      const closeOuter = `      </div>${nl}    </section>`;
      const idx = c.lastIndexOf(closeOuter);
      if (idx !== -1) {
        c = `${c.slice(0, idx)}        </div>${nl}${c.slice(idx)}`;
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(path, c);
    console.log("updated", path);
  } else {
    console.log("skip", path);
  }
}
