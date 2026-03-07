"use client";

import { useEffect, useRef, useState } from "react";

export const useBlurSwap = (text: string, trigger: string) => {
  const [displayText, setDisplayText] = useState(text);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  useEffect(() => {
    setPhase("out");
    const swapTimer = setTimeout(() => {
      setDisplayText(text);
      setPhase("in");
    }, 300);
    const idleTimer = setTimeout(() => {
      setPhase("idle");
    }, 600);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(idleTimer);
    };
  }, [trigger]);

  const style: React.CSSProperties = {
    opacity: phase === "out" ? 0 : 1,
    filter: phase === "out" ? "blur(8px)" : "blur(0px)",
    transform: phase === "out" ? "translateY(-8px)" : "translateY(0px)",
    transition: "opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease",
  };

  return { displayText, style };
};
