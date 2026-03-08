"use client";

import { useEffect, useRef, useState } from "react";
import Brackets from "./Brackets";

const MIN_DISPLAY_MS = 1200; // always show loader for at least this long

export default function Loader({
  onComplete,
  imageSrcs = [],
}: {
  onComplete: () => void;
  imageSrcs?: string[];
}) {
  const [pct, setPct] = useState(0);
  const [expanding, setExpanding] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());
  const displayedPct = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "unset";
  }, [done]);

  useEffect(() => {
    // Two asset groups to track:
    // - Images: 70% of progress (the heaviest assets)
    // - Fonts:  30% of progress (Merriweather + mono, can flash on slow connections)
    const IMAGE_WEIGHT = 70;
    const FONT_WEIGHT = 30;

    let imageProgress = 0; // 0-70
    let fontProgress = 0; // 0-30

    const update = () => {
      const total = imageProgress + fontProgress;
      animateTo(total);
      if (total >= 100) finish();
    };

    // ── Images ──────────────────────────────────────────
    const total = imageSrcs.length;
    if (total === 0) {
      imageProgress = IMAGE_WEIGHT;
    } else {
      let loadedImages = 0;
      const onLoad = () => {
        loadedImages++;
        imageProgress = Math.round((loadedImages / total) * IMAGE_WEIGHT);
        update();
      };
      imageSrcs.forEach((src) => {
        const img = new window.Image();
        img.onload = onLoad;
        img.onerror = onLoad;
        img.src = src;
      });
    }

    // ── Fonts ───────────────────────────────────────────
    // Animate font progress smoothly while waiting, then jump to full on resolve
    let fontDone = false;
    let fakeFontPct = 0;
    const fontTick = () => {
      if (fontDone) return;
      fakeFontPct = Math.min(25, fakeFontPct + Math.random() * 3 + 1); // creeps to 25, last 5% waits for real load
      fontProgress = Math.round(fakeFontPct);
      update();
      if (fakeFontPct < 25) setTimeout(fontTick, 80);
    };
    setTimeout(fontTick, 50);

    document.fonts.ready.then(() => {
      fontDone = true;
      fontProgress = FONT_WEIGHT;
      update();
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Smoothly animate the displayed percentage
  const animateTo = (target: number) => {
    cancelAnimationFrame(rafRef.current);
    const step = () => {
      if (displayedPct.current < target) {
        displayedPct.current = Math.min(target, displayedPct.current + 2);
        setPct(displayedPct.current);
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const finish = () => {
    // Animate to 100% first
    animateTo(100);
    // Then wait for minimum display time before expanding
    const elapsed = Date.now() - startTime.current;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
    setTimeout(() => {
      setPct(100);
      setTimeout(() => setExpanding(true), 300);
    }, remaining);
  };

  useEffect(() => {
    if (expanding) {
      setTimeout(() => {
        setDone(true);
        onComplete();
      }, 800);
    }
  }, [expanding, onComplete]);

  const width = expanding ? "max(65%, 320px)" : 180;
  const height = expanding ? "55%" : 80;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080e1a]"
      style={{
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "all",
        transition: "opacity 0.4s ease",
      }}
    >
      <Brackets width={width} height={height}>
        {!expanding && (
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-mono font-black tabular-nums text-4xl text-[#E2D1A4]"
              style={{ filter: "drop-shadow(0 0 5px rgba(226,209,164,0.8))" }}
            >
              {pct.toString().padStart(3, "0")} %
            </span>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#E2D1A4] opacity-50">
              loading
            </span>
          </div>
        )}
      </Brackets>
    </div>
  );
}
