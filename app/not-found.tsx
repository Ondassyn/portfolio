"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScrambleText from "@/components/ui/ScrambleText";
import { useTranslation } from "@/lib/providers/LanguageProvider";
import GridCanvas from "@/components/ui/GridCanvas";
import TargetCursor from "@/components/ui/TargetCursor";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function NotFound() {
  const router = useRouter();
  const { t, language } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#060910] flex flex-col items-center justify-center overflow-hidden">
      <TargetCursor targetSelector=".cursor-target" />
      <LanguageSwitcher />
      <GridCanvas standalone />

      {/* Corner brackets — top left */}
      <div className="absolute top-15 left-10 pointer-events-none">
        <div
          style={{ width: 32, height: 2, background: "#E2D1A4", opacity: 0.4 }}
        />
        <div
          style={{
            width: 2,
            height: 32,
            background: "#E2D1A4",
            opacity: 0.4,
            marginTop: -2,
          }}
        />
      </div>
      {/* Corner brackets — top right */}
      <div className="absolute top-15 right-10 flex flex-col items-end pointer-events-none">
        <div
          style={{ width: 32, height: 2, background: "#E2D1A4", opacity: 0.4 }}
        />
        <div
          style={{
            width: 2,
            height: 32,
            background: "#E2D1A4",
            opacity: 0.4,
            marginTop: -2,
          }}
        />
      </div>
      {/* Corner brackets — bottom left */}
      <div className="absolute bottom-15 left-10 flex flex-col justify-end pointer-events-none">
        <div
          style={{ width: 2, height: 32, background: "#E2D1A4", opacity: 0.4 }}
        />
        <div
          style={{
            width: 32,
            height: 2,
            background: "#E2D1A4",
            opacity: 0.4,
            marginTop: -2,
          }}
        />
      </div>
      {/* Corner brackets — bottom right */}
      <div className="absolute bottom-15 right-10 flex flex-col items-end justify-end pointer-events-none">
        <div
          style={{
            width: 2,
            height: 32,
            background: "#E2D1A4",
            opacity: 0.4,
            marginLeft: "auto",
          }}
        />
        <div
          style={{
            width: 32,
            height: 2,
            background: "#E2D1A4",
            opacity: 0.4,
            marginTop: -2,
          }}
        />
      </div>

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 text-center px-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Label */}
        <span
          className="font-mono text-xs tracking-[0.5em] uppercase"
          style={{ color: "#E2D1A4", opacity: 0.6 }}
        >
          <ScrambleText
            text={t("not_found_label")}
            trigger={language}
            duration={600}
          />
        </span>

        {/* 404 */}
        <h1
          className="font-black italic tracking-tighter leading-none text-white select-none"
          style={{
            fontSize: "clamp(100px, 20vw, 200px)",
            textShadow: "0 0 80px rgba(226,209,164,0.08)",
          }}
        >
          404
        </h1>

        {/* Message */}
        <p className="text-zinc-400 font-light text-sm md:text-base max-w-sm leading-relaxed">
          <ScrambleText
            text={t("not_found_message")}
            trigger={language}
            duration={800}
          />
        </p>

        {/* Stay or go */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          {/* Stay — muted, since it's the passive option */}
          <span
            className="font-mono text-sm tracking-widest uppercase"
            style={{ color: "rgba(226,209,164,0.4)" }}
          >
            <ScrambleText
              text={t("not_found_stay")}
              trigger={language}
              duration={400}
            />
          </span>

          <span
            className="font-mono text-xs"
            style={{ color: "rgba(226,209,164,0.3)" }}
          >
            <ScrambleText
              text={t("not_found_or")}
              trigger={language}
              duration={300}
            />
          </span>

          {/* Back to portfolio — gold, primary action */}
          <button
            onClick={() => router.push("/")}
            className="cursor-target px-8 py-3 border border-accent-gold/50 text-accent-gold font-mono text-sm tracking-widest uppercase hover:bg-accent-gold/10 transition-colors duration-300"
            style={{ pointerEvents: "auto" }}
          >
            <ScrambleText
              text={t("not_found_back")}
              trigger={language}
              duration={400}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
