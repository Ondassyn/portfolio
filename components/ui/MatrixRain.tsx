"use client";

/**
 * MatrixRain.tsx
 * Faithful recreation of the Matrix digital rain.
 *
 * Deps: gsap  (npm i gsap)
 * Font: Share Tech Mono from Google Fonts (add to your layout/head)
 *   <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
 *
 * Drop into any Next.js / Vite+React project and render <MatrixRain />
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

// ─── GLYPHS ──────────────────────────────────────────────────────────────────
// Half-width katakana + numerals + sparse latin — exactly as in the film
const GLYPH_STRING =
  "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ" +
  "0123456789" +
  "Z@#$%&*<>?";
const GLYPHS = GLYPH_STRING.split("");
const rg = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const FS = 16; // font size px
const COL = 16; // column width px — tight density like the film

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Drop {
  col: number;
  head: number; // y position in ROWS (float), head = lowest visible char
  speed: number; // rows per normalised tick
  trailLen: number; // number of lit chars above head
  buf: string[]; // per-row char buffer for this column
  mut: number[]; // countdown to next mutation per row
}

// ─── COLOUR ──────────────────────────────────────────────────────────────────
// function charColour(depth: number, trailLen: number): [number, number, number] {
//   if (depth <= 2) return [0, 255, 65];
//   if (depth <= 5) return [0, 200, 50];
//   const t = Math.min((depth - 5) / Math.max(trailLen - 5, 1), 1);
//   return [
//     0,
//     Math.round(160 * (1 - t) + 30 * t),
//     Math.round(28 * (1 - t) + 5 * t),
//   ];
// }
function charColour(depth: number, trailLen: number): [number, number, number] {
  // Near the head: Antique Gold (#E2D1A4) converted to RGB: 226, 209, 164
  if (depth <= 3) return [226, 209, 164];

  // Mid trail: A slightly more "weathered" gold
  if (depth <= 7) return [180, 160, 120];

  // Fading tail: Transitioning into Smoke (#4A4A4A) / Storm Grey
  const t = Math.min((depth - 7) / Math.max(trailLen - 7, 1), 1);
  return [
    Math.round(74 * (1 - t) + 20 * t), // R (Smoke 74 -> Dark)
    Math.round(74 * (1 - t) + 20 * t), // G
    Math.round(74 * (1 - t) + 20 * t), // B
  ];
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const sizeRef = useRef({ W: 0, H: 0, COLS: 0 });

  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [clockStr, setClockStr] = useState("");

  const isPausedRef = useRef(false);
  const speedRef = useRef(1);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // ── Drop factory ───────────────────────────────────────────────────────────
  const newDrop = useCallback((col: number, scatter: boolean): Drop => {
    const { H } = sizeRef.current;
    const rows = Math.ceil(H / FS) + 40;
    return {
      col,
      head: scatter
        ? -((Math.random() * (H / FS)) | 0)
        : -(5 + Math.random() * 25),
      speed: 0.28 + Math.random() * 0.72,
      trailLen: 10 + ((Math.random() * 24) | 0),
      buf: Array.from({ length: rows }, rg),
      mut: Array.from({ length: rows }, () => 2 + ((Math.random() * 10) | 0)),
    };
  }, []);

  // ── Resize ─────────────────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const COLS = Math.ceil(W / COL);
    canvas.width = W;
    canvas.height = H;
    sizeRef.current = { W, H, COLS };
    dropsRef.current = Array.from({ length: COLS }, (_, i) => newDrop(i, true));

    // warm font
    const ctx = canvas.getContext("2d")!;
    ctx.font = `${FS}px 'Share Tech Mono',monospace`;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillText("ﾊ", 0, 0);
  }, [newDrop]);

  // ── Draw frame ─────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const { W, H } = sizeRef.current;

    // ctx.fillStyle = "#000";
    // ctx.fillRect(0, 0, W, H);
    ctx.clearRect(0, 0, W, H);

    ctx.font = `${FS}px 'Share Tech Mono',monospace`;
    ctx.textAlign = "center";

    const drops = dropsRef.current;

    for (let ci = 0; ci < drops.length; ci++) {
      const d = drops[ci];
      const x = d.col * COL + COL / 2;
      const hr = d.head | 0;

      // mutate chars
      for (let r = 0; r < d.buf.length; r++) {
        if (--d.mut[r] <= 0) {
          d.buf[r] = rg();
          d.mut[r] = 2 + ((Math.random() * 12) | 0);
        }
      }

      // paint trail (depth 0 = head, going up)
      for (let depth = 0; depth <= d.trailLen; depth++) {
        const row = hr - depth;
        if (row < 0 || row >= d.buf.length) continue;
        const y = row * FS;
        if (y < -FS || y > H) continue;

        // if (depth === 0) {
        //   ctx.shadowColor = "#ccffdd";
        //   ctx.shadowBlur = 20;
        //   ctx.fillStyle = "#ffffff";
        // } else {
        //   const [r_, g_, b_] = charColour(depth, d.trailLen);
        //   const alpha = 1 - (depth / (d.trailLen + 1)) * 0.4;
        //   ctx.shadowColor = depth <= 3 ? "#00ff41" : "transparent";
        //   ctx.shadowBlur = depth <= 3 ? 8 : 0;
        //   ctx.fillStyle = `rgba(${r_},${g_},${b_},${alpha})`;
        // }
        if (depth === 0) {
          // Use a soft Bone White glow instead of harsh green
          ctx.shadowColor = "#F5F5F7";
          ctx.shadowBlur = 15;
          ctx.fillStyle = "#F5F5F7"; // Bone White
        } else {
          const [r_, g_, b_] = charColour(depth, d.trailLen);
          // Soften the opacity so the gold feels "etched" into the darkness
          const alpha = 1 - (depth / (d.trailLen + 1)) * 0.6;

          // Only add glow to the very top of the gold trail
          ctx.shadowColor =
            depth <= 4 ? "rgba(226, 209, 164, 0.5)" : "transparent";
          ctx.shadowBlur = 5;

          ctx.fillStyle = `rgba(${r_},${g_},${b_},${alpha})`;
        }

        ctx.fillText(d.buf[row], x, y + FS);
      }
      ctx.shadowBlur = 0;
    }
  }, []);

  // ── Main effect — GSAP ticker ──────────────────────────────────────────────
  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    // GSAP ticker at 30fps — authentic to the film's look
    gsap.ticker.fps(30);

    const tick = (_time: number, deltaMs: number) => {
      if (isPausedRef.current) return;

      const ticks = (deltaMs / 1000) * 30 * speedRef.current;
      const drops = dropsRef.current;
      const { H, COLS } = sizeRef.current;

      for (let ci = 0; ci < drops.length; ci++) {
        const d = drops[ci];
        d.head += d.speed * ticks;

        if ((d.head - d.trailLen) * FS > H + FS * 10) {
          drops[ci] = newDrop(ci, false);
        }
      }

      // keep drop count in sync with COLS (after resize)
      while (drops.length < COLS) drops.push(newDrop(drops.length, true));
      if (drops.length > COLS) drops.length = COLS;

      draw();
    };

    gsap.ticker.add(tick);

    // HUD fade-in
    if (hudRef.current) {
      gsap.fromTo(
        hudRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2.5, delay: 1, ease: "power2.out" },
      );
    }

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
    };
  }, [resize, draw, newDrop]);

  // ── Clock ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () =>
      setClockStr(new Date().toISOString().replace("T", " ").slice(0, 19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        // position: "fixed",
        // inset: 0,
        // background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Add font + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        @keyframes flicker {
          0%,100%{opacity:1} 88%{opacity:1} 89%{opacity:.7} 90%{opacity:1} 93%{opacity:.85} 94%{opacity:1}
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .matrix-logo { animation: flicker 6s ease-in-out infinite; }
        .matrix-cursor { animation: blink 1s step-end infinite; }
      `}</style>

      {/* Main canvas */}
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
