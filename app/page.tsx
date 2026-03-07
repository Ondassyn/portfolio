"use client";

import ContactsSection from "@/components/ContactsSection/ContactsSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import GridCanvas from "@/components/ui/GridCanvas";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import TargetCursor from "@/components/ui/TargetCursor";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    ScrollTrigger.normalizeScroll(true);
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <LanguageSwitcher />
      {showCursor && <TargetCursor targetSelector=".cursor-target" />}
      <GridCanvas />
      <main className="relative w-full bg-transparent overflow-x-clip">
        <HeroSection />
        <ProjectsSection />
        <div
          onMouseEnter={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
        >
          <ContactsSection />
        </div>
      </main>
    </>
  );
}
