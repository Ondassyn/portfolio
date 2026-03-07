"use client";

import { useTranslation } from "@/lib/providers/LanguageProvider";
import { Language } from "@/lib/utils/translations";
import { useState } from "react";

const LANGUAGES: Language[] = ["en", "ru", "kz"];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();
  const [flashing, setFlashing] = useState(false);

  const handleSwitch = (lang: Language) => {
    if (lang === language) return;
    // setFlashing(true);
    // setTimeout(() => {
    //   setLanguage(lang);
    //   setFlashing(false);
    // }, 150);
    setLanguage(lang);
  };

  return (
    <div
      className="fixed top-6 right-6 z-[100] flex items-center gap-1 font-mono text-sm tracking-widest uppercase select-none"
      style={{
        // opacity: flashing ? 0.3 : 1,
        transition: "opacity 0.15s ease",
      }}
    >
      <span
        style={{
          color: "#E2D1A4",
          filter: "drop-shadow(0 0 4px rgba(226,209,164,0.4))",
        }}
      >
        [
      </span>

      {LANGUAGES.map((lang, i) => (
        <span key={lang} className="flex items-center gap-1">
          <button
            onClick={() => handleSwitch(lang)}
            className="transition-all duration-300 cursor-pointer"
            style={{
              color: language === lang ? "#E2D1A4" : "rgba(226,209,164,0.3)",
              filter:
                language === lang
                  ? "drop-shadow(0 0 6px rgba(226,209,164,0.7))"
                  : "none",
              fontWeight: language === lang ? 700 : 400,
              transform: language === lang ? "scale(1.1)" : "scale(1)",
              display: "inline-block",
            }}
          >
            {lang.toUpperCase()}
          </button>
          {i < LANGUAGES.length - 1 && (
            <span style={{ color: "rgba(226,209,164,0.2)" }}>·</span>
          )}
        </span>
      ))}

      <span
        style={{
          color: "#E2D1A4",
          filter: "drop-shadow(0 0 4px rgba(226,209,164,0.4))",
        }}
      >
        ]
      </span>
    </div>
  );
};

export default LanguageSwitcher;
