"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CardSwap, { Card } from "../ui/CardSwap";
import { PROJECT_IMAGES } from "@/lib/constants/projectImages";
import SpotlightCard from "../ui/SpotlightCard";
import BrowserBar from "../ui/BrowserBar";
import MobileCarousel from "./MobileCarousel";
import { useTranslation } from "@/lib/providers/LanguageProvider";

const [bilorg, idp, jeojeo, wholying, fincher] = PROJECT_IMAGES;

const getCardDimensions = (vw: number, vh: number) => {
  let width, height;

  if (vw >= 1536 && vh >= 1200) {
    width = 1000;
    height = 800;
  } else if (vw >= 1280 && vh >= 800) {
    width = 820;
    height = 660;
  } else if (vw >= 1024 && vh >= 600) {
    width = 640;
    height = 520;
  } else {
    width = 520;
    height = 420;
  }

  return { width, height };
};

const ProjectsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cardDims, setCardDims] = useState({ width: 1000, height: 800 });
  const { t, language } = useTranslation();
  const [vh, setVh] = useState(0);

  // Projects built from translations so they reactively update on language change
  const projects = [
    {
      title: t("bil_title"),
      project: t("bil_subtitle"),
      description: t("bil_description"),
      url: "https://bil.org.kz/",
      image: bilorg,
    },
    {
      title: t("idp_title"),
      project: t("idp_subtitle"),
      description: t("idp_description"),
      url: "https://myidp.kz/",
      image: idp,
    },
    {
      title: t("jeojeo_title"),
      project: t("jeojeo_subtitle"),
      description: t("jeojeo_description"),
      url: "https://jeojeo-hazel.vercel.app/",
      image: jeojeo,
    },
    {
      title: t("wholying_title"),
      project: t("wholying_subtitle"),
      description: t("wholying_description"),
      url: "https://who-is-lying.vercel.app/",
      image: wholying,
    },
    {
      title: t("fincher_title"),
      project: t("fincher_subtitle"),
      description: t("fincher_description"),
      url: "https://davidfincher.vercel.app/",
      image: fincher,
    },
  ];

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setIsMobile(vw < 768);
      setVh(vh);
      setCardDims(getCardDimensions(vw, vh));
    };
    update();
    window.addEventListener("resize", update);
    setMounted(true);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full relative overflow-x-hidden">
      {isMobile ? (
        <MobileCarousel projects={projects} language={language} />
      ) : (
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          projects={projects}
          language={language}
          width={cardDims.width}
          height={cardDims.height}
          vh={vh}
        >
          {projects.map((project, i) => (
            <Card key={i}>
              <SpotlightCard
                className="custom-spotlight-card h-full w-full"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="flex flex-col h-full w-full overflow-hidden [transform-style:preserve-3d]">
                  <BrowserBar url={project.url} />

                  <div className="grow w-full relative [transform-style:preserve-3d]">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col h-full w-full overflow-hidden [transform-style:preserve-3d] cursor-pointer"
                      style={{ pointerEvents: "auto" }}
                    >
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover object-left"
                        style={{
                          transform: "translateZ(2px)",
                          imageRendering: "auto",
                        }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </Card>
          ))}
        </CardSwap>
      )}
    </div>
  );
};

export default ProjectsSection;
