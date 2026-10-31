import type { Metadata } from "next";
import { ProjectsListing } from "@/components/sections/projects/ProjectsListing";
import { ReadyToBuild } from "@/components/sections/projects/ReadyToBuild";

export const metadata: Metadata = {
  title: "Projects — Theories Consulting",
  description:
    "Designing brands. Growing businesses. Explore Theories Consulting projects across websites, apps, branding, and marketing.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-black">
      <ProjectsListing />
      <ReadyToBuild />
    </div>
  );
}
