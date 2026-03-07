"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import BrowserBar from "../ui/BrowserBar";
import { BracketLabel } from "../ui/BracketLabel";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import ScrambleText from "../ui/ScrambleText";
import { useBlurSwap } from "@/lib/hooks/useBlurSwap";
import { useTranslation } from "@/lib/providers/LanguageProvider";

interface Project {
  title: string;
  project: string;
  description: string;
  url: string;
  image: StaticImageData;
}

interface MobileCarouselProps {
  projects: Project[];
  language?: string;
}

const MobileCarousel = ({ projects, language = "en" }: MobileCarouselProps) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const project = projects[activeIndex];

  const { displayText: descText, style: descStyle } = useBlurSwap(
    project.description,
    // Trigger on both language change and project change
    `${language}-${activeIndex}`,
  );

  const goTo = (index: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setExpanded(false);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 300);
  };

  const prev = () => {
    if (activeIndex === 0) return;
    goTo(activeIndex - 1, "left");
  };

  const next = () => {
    if (activeIndex === projects.length - 1) return;
    goTo(activeIndex + 1, "right");
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
      if (dx > dy) e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      const dy = Math.abs(
        (touchStartY.current ?? 0) - e.changedTouches[0].clientY,
      );
      const dx = Math.abs(diff);
      if (dx > 50 && dx > dy) {
        if (diff > 0) next();
        else prev();
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeIndex]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-8 pb-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <ScrambleText
          text={`[ ${t("selected_work")} ]`}
          trigger={language}
          as="span"
          className="font-mono text-xs tracking-[0.5em] uppercase"
          style={{
            color: "#E2D1A4",
            filter: "drop-shadow(0 0 6px rgba(226,209,164,0.5))",
          }}
        />
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > activeIndex ? "right" : "left")}
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: "#E2D1A4",
                opacity: i === activeIndex ? 1 : 0.25,
                transition: "all 0.4s ease",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Card — swipeable area */}
      <div
        className="flex-1 flex flex-col"
        ref={containerRef}
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === "right" ? "-30px" : "30px"})`
            : "translateX(0px)",
          filter: animating ? "blur(4px)" : "blur(0px)",
          transition:
            "opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease",
        }}
      >
        {/* Title */}
        <div className="px-5 pb-4 flex flex-col gap-2 items-center">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 mt-1 group"
          >
            <h2 className="text-bone text-4xl text-center font-black tracking-tighter uppercase italic leading-none">
              <ScrambleText
                text={project.title}
                trigger={`${language}-${activeIndex}`}
                as="span"
              />
            </h2>
          </a>
          <BracketLabel>
            <div className="text-center leading-[1rem] tracking-wide">
              <ScrambleText
                text={project.project}
                trigger={`${language}-${activeIndex}`}
                as="span"
              />
            </div>
          </BracketLabel>
        </div>

        {/* Image card */}
        <div className="mx-4 my-4 rounded-xl border border-[#314158]/50 bg-[#060910] overflow-hidden shadow-2xl">
          <BrowserBar url={project.url} />
          <div className="relative w-full" style={{ aspectRatio: "99/50" }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-left"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Description — blur swap */}
        <div className="flex-1 px-5 pt-4 pb-2 overflow-y-auto">
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: expanded ? "600px" : "170px" }}
          >
            <p
              className="text-zinc-300 text-sm leading-snug font-light italic whitespace-pre-line font-serif"
              style={descStyle}
            >
              {descText}
            </p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-1 font-mono text-xs tracking-widest uppercase"
            style={{
              color: "#E2D1A4",
              filter: "drop-shadow(0 0 4px rgba(226,209,164,0.4))",
            }}
          >
            <ScrambleText
              text={expanded ? t("collapse") : t("read_more")}
              trigger={`${language}-${expanded}`}
              as="span"
            />
            <ChevronDown
              size={12}
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>
      </div>

      {/* Prev / Next buttons */}
      <div className="flex justify-between items-center px-5 mt-6">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="flex items-center gap-1 font-mono text-xs tracking-widest uppercase"
          style={{
            color: "#E2D1A4",
            opacity: activeIndex === 0 ? 0.2 : 1,
            filter: "drop-shadow(0 0 4px rgba(226,209,164,0.4))",
          }}
        >
          <ChevronLeft size={14} />
          <ScrambleText text={t("prev")} trigger={language} as="span" />
        </button>

        <span
          className="font-mono text-xs"
          style={{ color: "#E2D1A4", opacity: 0.5 }}
        >
          {activeIndex + 1} / {projects.length}
        </span>

        <button
          onClick={next}
          disabled={activeIndex === projects.length - 1}
          className="flex items-center gap-1 font-mono text-xs tracking-widest uppercase"
          style={{
            color: "#E2D1A4",
            opacity: activeIndex === projects.length - 1 ? 0.2 : 1,
            filter: "drop-shadow(0 0 4px rgba(226,209,164,0.4))",
          }}
        >
          <ScrambleText text={t("next")} trigger={language} as="span" />
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default MobileCarousel;
