import type { Metadata } from "next";
import { CelesteBrandMoment } from "@/components/sections/case-studies/celeste/CelesteBrandMoment";
import { CelesteCampus } from "@/components/sections/case-studies/celeste/CelesteCampus";
import { CelesteHero } from "@/components/sections/case-studies/celeste/CelesteHero";
import { CelesteLanding } from "@/components/sections/case-studies/celeste/CelesteLanding";
import { CelesteMetrics } from "@/components/sections/case-studies/celeste/CelesteMetrics";
import { CelesteOverview } from "@/components/sections/case-studies/celeste/CelesteOverview";
import { CelesteServices } from "@/components/sections/case-studies/celeste/CelesteServices";
import { CelesteSocial } from "@/components/sections/case-studies/celeste/CelesteSocial";
import { CelesteUiPhones } from "@/components/sections/case-studies/celeste/CelesteUiPhones";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Celeste International Schools — Theories Consulting",
  description:
    "600+ admissions in 3 months. Performance marketing, social, and web case study for Celeste International Schools.",
};

/**
 * Celeste International Schools — Figma `2281:1469`
 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.
 */
export default function CelesteCaseStudyPage() {
  return (
    <div className="bg-black">
      <CelesteHero />
      <CelesteOverview />
      <CelesteCampus />
      <CelesteMetrics />
      <CelesteServices />
      <CelesteSocial />
      <CelesteLanding />
      <CelesteUiPhones />
      <CelesteBrandMoment />
      <ReadyToBuild />
    </div>
  );
}
