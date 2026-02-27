"use client";

import React, { useRef, useEffect, useCallback } from "react";

const INITIAL_SKEW_X = -48;
const INITIAL_SKEW_Y = 14;
const INITIAL_SCALE = 0.675;
const SQUARE_SIZE = 64;
const BORDER_COLOR = "rgba(51, 65, 85, 0.9)";

const COLORS = [
  "rgb(56, 189, 248)",
  "rgb(0, 255, 255)",
  "rgb(165, 180, 252)",
  "rgb(255, 255, 255)",
];

interface ColoredSquare {
  worldX: number;
  worldY: number;
  color: string;
  pulsePhase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
}

interface PopAnimation {
  x: number;
  y: number;
  color: string;
  particles: Particle[];
  shockwave: number;
  shockwaveAlpha: number;
}

export const gridState = {
  flattenProgress: 0,
  targetSpeed: 0,
  popCount: 0,
};

const GridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const currentSpeed = useRef(0);
  const totalOffset = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const coloredSquares = useRef<ColoredSquare[]>([]);
  const popAnimations = useRef<PopAnimation[]>([]);
  const spawnTimer = useRef(0);

  const worldToScreen = useCallback(
    (wx: number, wy: number) => ({
      sx: wx - totalOffset.current.x,
      sy: wy - totalOffset.current.y,
    }),
    [],
  );

  const spawnSquare = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const nx = Math.ceil(canvas.width / SQUARE_SIZE) + 2;
    const ny = Math.ceil(canvas.height / SQUARE_SIZE) + 2;

    for (let attempt = 0; attempt < 20; attempt++) {
      const col = Math.floor(Math.random() * (nx - 2)) + 1;
      const row = Math.floor(Math.random() * (ny - 2)) + 1;
      const snapX =
        Math.floor(totalOffset.current.x / SQUARE_SIZE) * SQUARE_SIZE;
      const snapY =
        Math.floor(totalOffset.current.y / SQUARE_SIZE) * SQUARE_SIZE;
      const wx = snapX + col * SQUARE_SIZE;
      const wy = snapY + row * SQUARE_SIZE;
      const occupied = coloredSquares.current.some(
        (s) =>
          Math.abs(s.worldX - wx) < SQUARE_SIZE &&
          Math.abs(s.worldY - wy) < SQUARE_SIZE,
      );
      if (!occupied) {
        coloredSquares.current.push({
          worldX: wx,
          worldY: wy,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          pulsePhase: Math.random() * Math.PI * 2,
        });
        break;
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 8; i++) spawnSquare();

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      const p = Math.max(0, Math.min(1, gridState.flattenProgress));
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const skewX = INITIAL_SKEW_X * (1 - eased);
      const skewY = INITIAL_SKEW_Y * (1 - eased);
      const scale = INITIAL_SCALE + (1 - INITIAL_SCALE) * eased;

      const diff = gridState.targetSpeed - currentSpeed.current;
      if (Math.abs(diff) > 0.0005) {
        currentSpeed.current += diff * 0.012;
      } else {
        currentSpeed.current = gridState.targetSpeed;
      }
      const s = currentSpeed.current;
      totalOffset.current.x -= s;
      totalOffset.current.y -= s;

      frameRef.current++;
      spawnTimer.current++;
      if (spawnTimer.current % 60 === 0 && coloredSquares.current.length < 8) {
        spawnSquare();
      }

      coloredSquares.current = coloredSquares.current.filter(
        ({ worldX, worldY }) => {
          const { sx, sy } = worldToScreen(worldX, worldY);
          return (
            sx > -SQUARE_SIZE * 5 &&
            sx < W + SQUARE_SIZE * 5 &&
            sy > -SQUARE_SIZE * 5 &&
            sy < H + SQUARE_SIZE * 5
          );
        },
      );

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0f172b";
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.scale(scale, scale);
      const sx_rad = (skewX * Math.PI) / 180;
      const sy_rad = (skewY * Math.PI) / 180;
      ctx.transform(1, Math.tan(sy_rad), Math.tan(sx_rad), 1, 0, 0);
      ctx.translate(-W / 2, -H / 2);

      const ox =
        ((totalOffset.current.x % SQUARE_SIZE) + SQUARE_SIZE) % SQUARE_SIZE;
      const oy =
        ((totalOffset.current.y % SQUARE_SIZE) + SQUARE_SIZE) % SQUARE_SIZE;
      const padRaw = Math.max(W, H) * 2;
      const pad = Math.ceil(padRaw / SQUARE_SIZE) * SQUARE_SIZE;

      ctx.strokeStyle = BORDER_COLOR;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = -ox - pad; x < W + pad + SQUARE_SIZE; x += SQUARE_SIZE) {
        ctx.moveTo(x, -pad);
        ctx.lineTo(x, H + pad);
      }
      for (let y = -oy - pad; y < H + pad + SQUARE_SIZE; y += SQUARE_SIZE) {
        ctx.moveTo(-pad, y);
        ctx.lineTo(W + pad, y);
      }
      ctx.stroke();

      for (const sq of coloredSquares.current) {
        const { sx, sy } = worldToScreen(sq.worldX, sq.worldY);
        const pulse =
          Math.sin(frameRef.current * 0.08 + sq.pulsePhase) * 0.15 + 0.85;
        ctx.globalAlpha = pulse;
        ctx.fillStyle = sq.color;
        ctx.fillRect(sx + 2, sy + 2, SQUARE_SIZE - 4, SQUARE_SIZE - 4);
        ctx.shadowBlur = 10;
        ctx.shadowColor = sq.color;
        ctx.strokeStyle = sq.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(sx + 2, sy + 2, SQUARE_SIZE - 4, SQUARE_SIZE - 4);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      popAnimations.current = popAnimations.current.filter((anim) => {
        anim.shockwave += 5;
        anim.shockwaveAlpha = Math.max(
          0,
          1 - anim.shockwave / (SQUARE_SIZE * 2.5),
        );

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        if (anim.shockwaveAlpha > 0) {
          ctx.beginPath();
          ctx.arc(anim.x, anim.y, anim.shockwave, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${anim.shockwaveAlpha})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        let anyAlive = false;
        for (const p of anim.particles) {
          p.life -= 0.015;
          if (p.life <= 0) continue;
          anyAlive = true;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx;
          p.y += p.vy;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color
            .replace("rgb", "rgba")
            .replace(")", `,${p.life})`);
          ctx.fill();
        }
        ctx.restore();
        return anyAlive || anim.shockwaveAlpha > 0;
      });

      ctx.restore(); // restore perspective transform

      // Vignette — drawn after ctx.restore() so it's always screen-aligned
      const vignette = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.sqrt(W ** 2 + H ** 2) / 2,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(6,0,16,0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    // Click handler — coordinates only align with the canvas when the grid
    // is flat (identity transform), which is when targetSpeed > 0.
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < coloredSquares.current.length; i++) {
        const { sx, sy } = worldToScreen(
          coloredSquares.current[i].worldX,
          coloredSquares.current[i].worldY,
        );
        if (
          mx >= sx &&
          mx < sx + SQUARE_SIZE &&
          my >= sy &&
          my < sy + SQUARE_SIZE
        ) {
          const sq = coloredSquares.current.splice(i, 1)[0];
          const cx = sx + SQUARE_SIZE / 2;
          const cy = sy + SQUARE_SIZE / 2;
          const particles: Particle[] = Array.from({ length: 25 }, (_, j) => {
            const angle = (j / 25) * Math.PI * 2;
            const spd = 3 + Math.random() * 6;
            return {
              x: cx,
              y: cy,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              radius: 2 + Math.random() * 3,
              color: sq.color,
              life: 1,
            };
          });
          popAnimations.current.push({
            x: cx,
            y: cy,
            color: sq.color,
            particles,
            shockwave: 0,
            shockwaveAlpha: 1,
          });
          gridState.popCount++;
          window.dispatchEvent(
            new CustomEvent("square-popped", { detail: gridState.popCount }),
          );
          setTimeout(() => spawnSquare(), 800);
          return;
        }
      }
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
    };
  }, [spawnSquare, worldToScreen]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-auto cursor-crosshair"
    />
  );
};

export default GridCanvas;
