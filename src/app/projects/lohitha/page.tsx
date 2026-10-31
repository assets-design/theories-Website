import type { Metadata } from "next";
import { LohithaBrandMoment } from "@/components/sections/case-studies/lohitha/LohithaBrandMoment";
import { LohithaHero } from "@/components/sections/case-studies/lohitha/LohithaHero";
import { LohithaIdentity } from "@/components/sections/case-studies/lohitha/LohithaIdentity";
import { LohithaLanding } from "@/components/sections/case-studies/lohitha/LohithaLanding";
import { LohithaSocial } from "@/components/sections/case-studies/lohitha/LohithaSocial";
import { LohithaWireframes } from "@/components/sections/case-studies/lohitha/LohithaWireframes";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Lohitha Foods — Theories Consulting",
  description:
    "Social Media, UI/UX Design & Web Development case study for Lohitha Foods — creatives, wireframes, identity, and high-fidelity product design.",
};

/**
 * Lohitha Foods case study — Figma `2031:829`
 * Order: Hero (title+overview+metrics) → Social → Landing → Wireframes → Identity → Brand moment → CTA
 * Header/Footer via layout. Route: `/projects/lohitha/`
 */
export default function LohithaCaseStudyPage() {
  return (
    <div className="bg-black">
      <LohithaHero />
      <LohithaSocial />
      <LohithaLanding />
      <LohithaWireframes />
      <LohithaIdentity />
      <LohithaBrandMoment />
      <ReadyToBuild />
    </div>
  );
}
