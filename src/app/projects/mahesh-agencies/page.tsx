import type { Metadata } from "next";
import { MaheshBrandMoment } from "@/components/sections/case-studies/mahesh-agencies/MaheshBrandMoment";
import { MaheshBuilding } from "@/components/sections/case-studies/mahesh-agencies/MaheshBuilding";
import { MaheshCollateral } from "@/components/sections/case-studies/mahesh-agencies/MaheshCollateral";
import { MaheshHero } from "@/components/sections/case-studies/mahesh-agencies/MaheshHero";
import { MaheshIdentity } from "@/components/sections/case-studies/mahesh-agencies/MaheshIdentity";
import { MaheshLanding } from "@/components/sections/case-studies/mahesh-agencies/MaheshLanding";
import { MaheshOverview } from "@/components/sections/case-studies/mahesh-agencies/MaheshOverview";
import { MaheshSocialFan } from "@/components/sections/case-studies/mahesh-agencies/MaheshSocialFan";
import { MaheshSocialFeed } from "@/components/sections/case-studies/mahesh-agencies/MaheshSocialFeed";
import { MaheshSocialMyth } from "@/components/sections/case-studies/mahesh-agencies/MaheshSocialMyth";
import { MaheshSocialStories } from "@/components/sections/case-studies/mahesh-agencies/MaheshSocialStories";
import { MaheshUiPhones } from "@/components/sections/case-studies/mahesh-agencies/MaheshUiPhones";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Mahesh Agencies — Theories Consulting",
  description:
    "Brand identity, social media, and website case study for Mahesh Agencies — logo system, colour palette, and digital applications.",
};

/**
 * Mahesh Agencies Casestudy — Figma `2263:1115`
 * Site Header/Footer from layout; final CTA reuses ReadyToBuild.
 */
export default function MaheshAgenciesCaseStudyPage() {
  return (
    <div className="bg-black">
      <MaheshHero />
      <MaheshOverview />
      <MaheshIdentity />
      <MaheshCollateral />
      <MaheshBuilding />
      <MaheshSocialFan />
      <MaheshSocialFeed />
      <MaheshSocialMyth />
      <MaheshSocialStories />
      <MaheshLanding />
      <MaheshUiPhones />
      <MaheshBrandMoment />
      <ReadyToBuild />
    </div>
  );
}
