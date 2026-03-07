"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export const useScramble = (
  ref: React.RefObject<HTMLElement | null>,
  text: string,
  trigger: string, // changes when language switches
  duration = 400,
) => {
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    cancelAnimationFrame(frameRef.current);

    const originalText = text;
    const totalFrames = Math.floor(duration / 16);
    startRef.current = 0;

    const animate = (frame: number) => {
      const progress = Math.min(frame / totalFrames, 1);
      // Add easing — characters resolve slowly at first, faster at end
      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const resolvedCount = Math.floor(easedProgress * originalText.length);

      let result = "";
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === " " || originalText[i] === "\n") {
          result += originalText[i];
        } else if (i < resolvedCount) {
          result += originalText[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      el.textContent = result;

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(() => animate(frame + 1));
      }
    };

    frameRef.current = requestAnimationFrame(() => animate(0));

    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger]);
};
