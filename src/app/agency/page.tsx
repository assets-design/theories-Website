import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { JoinTheTribe } from "@/components/sections/about/JoinTheTribe";
import { MeetTheCrew } from "@/components/sections/about/MeetTheCrew";
import { OurHappyPlace } from "@/components/sections/about/OurHappyPlace";

export const metadata: Metadata = {
  title: "Agency — Theories Consulting",
  description:
    "Driving startup growth, crafting your brand with precision & impact. Theories Consulting accelerates startup growth through memorable brands and strategic creativity.",
};

export default function AgencyPage() {
  return (
    <div className="bg-black">
      <AboutHero />
      <MeetTheCrew />
      <OurHappyPlace />
      <JoinTheTribe />
    </div>
  );
}
