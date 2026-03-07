"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ScrambleText from "@/components/ui/ScrambleText";
import { useTranslation } from "@/lib/providers/LanguageProvider";

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
      {/* Subtle grid dot background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1a2744 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      />

      {/* Corner brackets — top left */}
      <div className="absolute top-10 left-10 pointer-events-none">
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
      <div className="absolute top-10 right-10 flex flex-col items-end pointer-events-none">
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
      <div className="absolute bottom-10 left-10 flex flex-col justify-end pointer-events-none">
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
      <div className="absolute bottom-10 right-10 flex flex-col items-end justify-end pointer-events-none">
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
        className="flex flex-col items-center gap-6 text-center px-6"
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

        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-8 py-3 border border-accent-gold/50 text-accent-gold font-mono text-sm tracking-widest uppercase hover:bg-accent-gold/10 transition-colors duration-300"
        >
          <ScrambleText
            text={t("not_found_back")}
            trigger={language}
            duration={400}
          />
        </button>
      </div>
    </div>
  );
}
