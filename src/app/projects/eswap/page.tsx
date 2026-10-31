import type { Metadata } from "next";
import { EswapHero } from "@/components/sections/case-studies/eswap/EswapHero";
import { EswapIdentity } from "@/components/sections/case-studies/eswap/EswapIdentity";
import { EswapSocial } from "@/components/sections/case-studies/eswap/EswapSocial";
import { EswapUiExplore } from "@/components/sections/case-studies/eswap/EswapUiExplore";
import { EswapUiIntro } from "@/components/sections/case-studies/eswap/EswapUiIntro";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Eswap.in — Theories Consulting",
  description:
    "Mobile app design, logo, and social media case study for Eswap.in — ticket resale product UI and brand system.",
};

/**
 * Eswap Casestudy — Figma `2328:502`
 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.
 */
export default function EswapCaseStudyPage() {
  return (
    <div className="bg-black">
      <EswapHero />
      <EswapUiIntro />
      <EswapUiExplore />
      <EswapIdentity />
      <EswapSocial />
      <ReadyToBuild />
    </div>
  );
}
