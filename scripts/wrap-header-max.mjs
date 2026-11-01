import fs from "fs";

const files = [
  "src/components/sections/case-studies/hbb/HbbWireframes.tsx",
  "src/components/sections/case-studies/amol/AmolWireframes.tsx",
  "src/components/sections/case-studies/jcn-consulting/JcnWireframes.tsx",
  "src/components/sections/case-studies/rppl/RpplWireframes.tsx",
  "src/components/sections/case-studies/safari-lodges/SafariWireframes.tsx",
  "src/components/sections/case-studies/airus/AirusWireframes.tsx",
  "src/components/sections/case-studies/lohitha/LohithaWireframes.tsx",
  "src/components/sections/case-studies/airus/AirusLanding.tsx",
  "src/components/sections/case-studies/safari-lodges/SafariLanding.tsx",
  "src/components/sections/case-studies/aircraft-cloud-pulse/AircraftLanding.tsx",
  "src/components/sections/case-studies/celeste/CelesteLanding.tsx",
  "src/components/sections/case-studies/mahesh-agencies/MaheshLanding.tsx",
  "src/components/sections/case-studies/lohitha/LohithaLanding.tsx",
  "src/components/sections/case-studies/amol/AmolShowcase.tsx",
  "src/components/sections/case-studies/rppl/RpplShowcase.tsx",
];

const HEADER_MAX =
  '        <div className="mx-auto w-full max-w-[clamp(920px,72.7vw,1396px)]">';

function wrapFile(path) {
  let c = fs.readFileSync(path, "utf8");
  const nl = c.includes("\r\n") ? "\r\n" : "\n";
  if (c.includes("max-w-[clamp(920px,72.7vw,1396px)]")) {
    console.log("already", path);
    return;
  }

  const openPatterns = [
    `px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] py-[clamp(2.5rem,4.17vw,5rem)]">`,
    `px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">`,
    `px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)] pt-[clamp(2.5rem,6.25vw,7.5rem)] pb-[clamp(2.5rem,4.17vw,5rem)]">`,
  ];

  let matched = null;
  for (const p of openPatterns) {
    if (c.includes(p)) {
      matched = p;
      break;
    }
  }
  if (!matched) {
    console.log("no needle", path);
    return;
  }

  c = c.replace(matched, `${matched}${nl}${HEADER_MAX}`);

  const closeOuter = `      </div>${nl}    </section>`;
  const idx = c.lastIndexOf(closeOuter);
  if (idx === -1) {
    console.log("no close", path);
    return;
  }
  c = `${c.slice(0, idx)}        </div>${nl}${c.slice(idx)}`;
  fs.writeFileSync(path, c);
  console.log("wrapped", path);
}

for (const f of files) wrapFile(f);
