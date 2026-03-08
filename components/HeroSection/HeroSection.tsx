"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Loader from "../ui/Loader";
import Brackets from "../ui/Brackets";
import { gridState } from "@/components/ui/GridCanvas";
import { MoveDown } from "lucide-react";
import CustomDecryptedText from "../ui/CustomDecryptedText";
import ScrambleText from "../ui/ScrambleText";
import { useTranslation } from "@/lib/providers/LanguageProvider";
import { useBlurSwap } from "@/lib/hooks/useBlurSwap";
import { PROJECT_IMAGE_SRCS } from "@/lib/constants/projectImages";

gsap.registerPlugin(ScrollTrigger);

const BOX_W_RATIO = 0.65;
const BOX_H_RATIO = 0.55;

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { language, t } = useTranslation();

  const { displayText: descriptionText, style: descriptionStyle } = useBlurSwap(
    t("hero_description"),
    language,
  );

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      document.documentElement.classList.add("is-scrolling");
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, 1000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX > window.innerWidth - 20) {
        document.documentElement.classList.add("is-scrolling");
      } else {
        if (!scrollTimer) {
          document.documentElement.classList.remove("is-scrolling");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(scrollTimer);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1800",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        preventOverlaps: true,
        fastScrollEnd: true,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (gridState) gridState.heroProgress = self.progress;
          setProgress(self.progress);
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      if (el.style.position === "fixed") {
        el.style.width = `${document.documentElement.clientWidth}px`;
        el.style.maxWidth = `${document.documentElement.clientWidth}px`;
      } else {
        el.style.width = "";
        el.style.maxWidth = "";
      }
    });

    observer.observe(el, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  const velocityFactor = Math.pow(progress * 1.6, 2);
  const currentWidth = `${BOX_W_RATIO * 100 + velocityFactor * 60}%`;
  const currentHeight = `${BOX_H_RATIO * 100 + velocityFactor * 40}%`;
  const bracketOpacity = Math.max(0, 1 - progress / 0.3);
  const textOpacity = Math.max(0, 1 - progress / 0.3);

  return (
    <div
      ref={sectionRef}
      style={{ width: "100%" }}
      className="relative w-full h-screen bg-transparent z-10 overflow-hidden flex items-center justify-center"
    >
      <Loader
        imageSrcs={PROJECT_IMAGE_SRCS}
        onComplete={() => setLoaded(true)}
      />

      <Brackets
        width={currentWidth}
        height={currentHeight}
        opacity={bracketOpacity}
        className="absolute z-0"
        transition="width 0.15s ease-out, height 0.15s ease-out, opacity 0.2s ease"
        bottomContent={
          <p
            className="md:hidden font-mono text-[10px] tracking-[0.4em] uppercase text-center px-4"
            style={{ color: "#E2D1A4", opacity: 0.4 }}
          >
            <ScrambleText text={t("desktop_hint")} trigger={language} />
          </p>
        }
      />

      {/* Center text content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none z-10"
        style={{ opacity: textOpacity }}
      >
        {/* Role — scramble */}
        <ScrambleText
          text={t("hero_role")}
          trigger={language}
          as="span"
          className="font-mono text-xs tracking-[0.1rem] md:tracking-[0.5em] uppercase"
          style={{
            color: "#E2D1A4",
            filter: "drop-shadow(0 0 6px rgba(226,209,164,0.5))",
          }}
        />

        {/* Name — kept as CustomDecryptedText, no scramble needed */}
        <div className="flex flex-col items-center gap-1">
          <CustomDecryptedText
            text="Ondassyn"
            secondText="Ондасын"
            speed={70}
            parentClassName="text-2xl md:text-6xl 2xl:text-8xl font-black italic tracking-tighter text-center leading-none text-white"
            useOriginalCharsOnly
          />
          <CustomDecryptedText
            text="Abdrakhmanov"
            secondText="Абдрахманов"
            speed={70}
            parentClassName="text-2xl md:text-6xl 2xl:text-8xl font-black italic tracking-tighter text-center leading-none text-white"
            useOriginalCharsOnly
          />
        </div>

        {/* Description — blur swap */}
        <p
          className="text-zinc-400 text-xs md:text-base font-light text-center max-w-40 md:max-w-md leading-relaxed whitespace-pre-line"
          style={descriptionStyle}
        >
          {descriptionText}
        </p>
      </div>

      {/* Scroll prompt — scramble */}
      {loaded && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: textOpacity }}
        >
          <ScrambleText
            text={`[ ${t("hero_scroll")} ]`}
            trigger={language}
            as="span"
            className="font-mono text-xs tracking-[0.4em] uppercase"
            style={{
              color: "#E2D1A4",
              filter: "drop-shadow(0 0 12px #E2D1A4)",
              animation: "pulse-gold 2s ease-in-out infinite",
            }}
          />
          <MoveDown
            style={{
              color: "#E2D1A4",
              filter: "drop-shadow(0 0 12px #E2D1A4)",
              animation: "pulse-gold 2s ease-in-out infinite",
            }}
            className="h-4"
          />
        </div>
      )}

      <style>{`
        @keyframes pulse-gold {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
