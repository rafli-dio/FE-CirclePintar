import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutVisionMission from "@/components/sections/about/AboutVisionMission";
import AboutValues from "@/components/sections/about/AboutValues";

export const metadata: Metadata = {
  title: "Tentang Kami | Circle Pintar",
  description: "Kenali lebih dekat cerita, visi, misi, dan nilai-nilai yang Circle Pintar pegang teguh untuk mentransformasi pendidikan digital di Indonesia.",
};

export default function AboutPage() {
  return (
    <main className="w-full flex flex-col pt-[70px]">
      <AboutHero />
      <AboutStory />
      <AboutVisionMission />
      <AboutValues />
    </main>
  );
}
