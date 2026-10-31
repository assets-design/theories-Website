import type { Metadata } from "next";
import { AircraftBrandMoment } from "@/components/sections/case-studies/aircraft-cloud-pulse/AircraftBrandMoment";
import { AircraftHero } from "@/components/sections/case-studies/aircraft-cloud-pulse/AircraftHero";
import { AircraftLanding } from "@/components/sections/case-studies/aircraft-cloud-pulse/AircraftLanding";
import { AircraftMetrics } from "@/components/sections/case-studies/aircraft-cloud-pulse/AircraftMetrics";
import { AircraftOverview } from "@/components/sections/case-studies/aircraft-cloud-pulse/AircraftOverview";
import { AircraftSocial } from "@/components/sections/case-studies/aircraft-cloud-pulse/AircraftSocial";
import { AircraftUiShowcase } from "@/components/sections/case-studies/aircraft-cloud-pulse/AircraftUiShowcase";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Aircraft Cloud & Aircraft Pulse — Theories Consulting",
  description:
    "UI/UX Design & Web Development case study for Aircraft Cloud & Aircraft Pulse — social creatives, product UI, and web development.",
};

/**
 * Aircraft Cloud & Aircraft Pulse case study — Figma `2173:553`
 * Order: Hero → Overview → Metrics → Social → Landing → UI → Brand moment → CTA
 * Header/Footer via layout. Route: `/projects/aircraft-cloud-pulse`
 */
export default function AircraftCloudPulseCaseStudyPage() {
  return (
    <div className="bg-black">
      <AircraftHero />
      <AircraftOverview />
      <AircraftMetrics />
      <AircraftSocial />
      <AircraftLanding />
      <AircraftUiShowcase />
      <AircraftBrandMoment />
      <ReadyToBuild />
    </div>
  );
}
