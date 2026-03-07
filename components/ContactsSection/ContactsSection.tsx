"use client";

import { useEffect, useRef, useState } from "react";
import { gridState } from "../ui/GridCanvas";
import { useTranslation } from "@/lib/providers/LanguageProvider";
import ScrambleText from "../ui/ScrambleText";
import { Mail } from "lucide-react";

const TelegramIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const ContactsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [popCount, setPopCount] = useState(0);
  const { t, language } = useTranslation();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gridState.flattenProgress = 1;
            gridState.targetSpeed = 0.5;
            setVisible(true);
          } else {
            gridState.targetSpeed = 0;
            setVisible(false);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onPop = (e: Event) => {
      setPopCount((e as CustomEvent).detail);
    };
    window.addEventListener("square-popped", onPop);
    return () => window.removeEventListener("square-popped", onPop);
  }, []);

  return (
    <div
      id="contacts"
      ref={sectionRef}
      className="relative h-screen w-full bg-transparent z-10 pointer-events-none"
    >
      {/* Center text */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 transition-all duration-700 ease-out px-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(24px)",
        }}
      >
        {/* Top label */}
        <div className="flex items-center gap-4">
          <span className="w-12 h-px bg-accent-gold opacity-60" />
          <ScrambleText
            text={t("contacts_label")}
            trigger={language}
            className="text-accent-gold font-mono text-xs tracking-[0.4em] uppercase text-center"
          />
          <span className="w-12 h-px bg-accent-gold opacity-60" />
        </div>

        {/* Main heading */}
        <h2 className="text-white text-3xl md:text-7xl font-black tracking-tighter uppercase italic leading-none text-center">
          <ScrambleText text={t("contacts_heading")} trigger={language} />
        </h2>

        {/* Subtext */}
        <p className="text-zinc-400 text-sm md:text-base font-light text-center max-w-md leading-relaxed">
          <ScrambleText text={t("contacts_subtext")} trigger={language} />
        </p>

        {/* Game hint */}
        <p
          className="font-mono text-sm tracking-widest uppercase text-center"
          style={{
            color: "#E2D1A4",
            filter: "drop-shadow(0 0 8px rgba(226,209,164,0.5))",
            animation: "pulse-gold 2.5s ease-in-out infinite",
          }}
        >
          <ScrambleText text={t("contacts_game_hint")} trigger={language} />
        </p>

        {/* Contact buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 pointer-events-auto w-full sm:w-auto">
          {/* Email */}
          <a
            href="mailto:your@email.com"
            className="cursor-target flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto border border-accent-gold/50 text-accent-gold font-mono text-sm tracking-widest uppercase hover:bg-accent-gold/10 transition-colors duration-300"
          >
            <Mail size={14} />
            oabdrakhmanov@alumni.nu.edu.kz
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/yourtelegramhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto border border-cyan-500/40 text-cyan-400 font-mono text-sm tracking-widest uppercase hover:border-cyan-400/70 hover:bg-cyan-500/10 transition-colors duration-300"
          >
            <TelegramIcon size={14} />
            @cocozohan
          </a>
        </div>
      </div>

      {/* Pop counter — bottom right */}
      <div
        className="absolute bottom-10 right-12 text-right transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(16px)",
          transitionDelay: visible ? "150ms" : "0ms",
        }}
      >
        <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mb-1">
          <ScrambleText text={t("squares_popped")} trigger={language} />
        </div>
        <div className="text-5xl font-mono text-white flex items-baseline gap-1 justify-end">
          <span className="text-accent-gold text-2xl font-bold">#</span>
          <span
            key={popCount}
            style={{
              display: "inline-block",
              animation:
                "pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            {popCount.toString().padStart(3, "0")}
          </span>
        </div>
        <style>{`
          @keyframes pop-in {
            0%   { transform: scale(1.6); opacity: 0; }
            60%  { transform: scale(0.9); opacity: 1; }
            100% { transform: scale(1);   opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactsSection;
