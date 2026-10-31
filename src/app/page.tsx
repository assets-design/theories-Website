import { BrandBand } from "@/components/sections/BrandBand";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { MediverseCta } from "@/components/sections/MediverseCta";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <div className="bg-black">
      <Hero />
      <BrandBand />
      <Projects />
      <Services />
      <FeaturedProjects />
      <MediverseCta />
    </div>
  );
}
