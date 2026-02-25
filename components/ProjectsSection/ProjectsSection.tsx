"use client";

import Image from "next/image";
import CardSwap, { Card } from "../ui/CardSwap";
import bilorg from "../../public/bilorg.png";
import idp from "../../public/idp.png";
import jeojeo from "../../public/jeojeo.png";
import wholying from "../../public/wholying.png";
import fincher from "../../public/fincher.png";
import SpotlightCard from "../ui/SpotlightCard";
import SplashCursor from "../ui/SplashCursor";
import ScrollingFlipCard from "../ui/ScrollingFlipCard";
import BrowserBar from "../ui/BrowserBar";
import { Boxes } from "../ui/Boxes";

const projects = [
  {
    title: "BIL Platform",
    project: "National Integrated School Management System (ISMS)",
    description: `- Engineered the frontend for a nationwide ERP platform managing student records, staff payroll, and academic performance for a network of 40+ schools all over the country.

- Developed complex data visualization dashboards to provide real-time audits of student and school performance, enabling data-driven decision-making for organization leaders.

- Built secure, role-based authentication flows for diverse user groups (Students, Teachers, Admin, and HR).

- Implemented automated modules for salary calculation and inter-school transfer workflows, reducing manual administrative overhead by streamlining cross-institutional data syncing.`,
    url: "https://bil.org.kz/",
    image: bilorg,
  },
  {
    title: "Student IDP",
    project: "AI-Driven College Admissions & Career Roadmap Platform",
    description: `- Architected a personalized user journey that guides students from career discovery to university acceptance using AI-driven roadmap logic.

- Developed an interactive Career Diagnostic Tool that analyzes student test results to recommend optimal professional paths and degree programs.

- Built a comprehensive Requirements Engine that aggregates and displays real-time admissions data and prerequisites for global universities.

- Integrated a Learning Management System (LMS) module featuring courses and project-based learning to help students bridge qualification gaps.`,
    url: "https://myidp.kz/",
    image: idp,
  },
  {
    title: "JeoJeo",
    project: "Custom Live-Trivia Engine",
    description: `- Built a private, end-to-end quiz platform featuring a Host-Client architecture for real-time competitive gaming.

- Engineered a Room ID system allowing instant-join capabilities for players without requiring traditional account registration.

- Developed a Live Scoring Engine that enables hosts to audit player submissions and update point totals in real-time.

- Managed the entire development lifecycle, from UI/UX design to deploying the real-time backend infrastructure.`,
    url: "https://jeojeo-hazel.vercel.app/",
    image: jeojeo,
  },
  {
    title: "Who is lying?",
    project: "Real-Time Social Deduction Gaming Platform",
    description: `- Real-Time State Synchronization: Leveraged Firebase Realtime Database to orchestrate live game states, ensuring synchronized question delivery and voting phases across all connected clients.

- Hardware Integration: Implemented a QR Code scanning system using the browser’s camera API, streamlining the "Join Room" UX for mobile players.

- Asymmetric Information Logic: Engineered a "Hidden Role" engine that intelligently distributes unique data (the "Odd One Out" question) to a single player while maintaining a consistent UI for the rest of the group.

- Hybrid Database Architecture: Integrated MongoDB for persistent storage of a vast categorized question bank, coupled with Firebase for high-frequency, low-latency game interactions.`,
    url: "https://who-is-lying.vercel.app/",
    image: wholying,
  },
  {
    title: "David Fincher Tribute",
    project: "Interactive Filmmaker Portfolio",
    description: `- Built a visually driven single-page experience showcasing David Fincher's filmography through custom scroll-driven animations and gesture interactions.

- Engineered a drag-and-scroll carousel with dynamic parallax image positioning, smooth easing curves, and an animated loading sequence synchronized to asset load progress.

- Implemented a minimap navigation system mirroring the user's scroll position in real time against a scaled-down content preview — inspired by code editor UX patterns.

- Architected fluid page transitions and staggered reveal animations using Framer Motion, with careful attention to choreography, timing, and motion design.`,
    url: "https://davidfincher.vercel.app/",
    image: fincher,
  },
];

const ProjectsSection = () => {
  return (
    <div className="w-full relative overflow-x-hidden">
      <CardSwap cardDistance={60} verticalDistance={70} projects={projects}>
        {projects.map((project, i) => (
          <Card key={project.title}>
            <SpotlightCard
              className="custom-spotlight-card h-full w-full"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="flex flex-col h-full w-full overflow-hidden [transform-style:preserve-3d]">
                <BrowserBar url={project.url} />
                <div className="grow w-full relative [transform-style:preserve-3d]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover object-left"
                    // Increased translateZ slightly and added rendering hints
                    style={{
                      transform: "translateZ(2px)",
                      imageRendering: "auto",
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </SpotlightCard>
          </Card>
        ))}
      </CardSwap>
    </div>
  );
};

export default ProjectsSection;
