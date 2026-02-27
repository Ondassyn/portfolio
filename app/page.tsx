import ContactsSection from "@/components/ContactsSection/ContactsSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import GridCanvas from "@/components/ui/GridCanvas";

export default function Home() {
  return (
    <div className="flex h-screen w-full">
      <main className="relative w-full">
        {/* One grid, always present, fixed behind everything */}
        <GridCanvas />

        {/* Projects: GSAP pins this and drives gridState.flattenProgress */}
        <div className="w-full">
          <ProjectsSection />
        </div>

        {/* Contacts: IntersectionObserver drives gridState.targetSpeed */}
        <ContactsSection />
      </main>
    </div>
  );
}
