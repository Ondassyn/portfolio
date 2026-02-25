"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

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
  alpha: number;
  life: number;
  maxLife: number;
}

interface PopAnimation {
  x: number;
  y: number;
  color: string;
  particles: Particle[];
  shockwave: number;
  shockwaveAlpha: number;
}

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  numColoredSquares?: number;
}

const Squares: React.FC<SquaresProps> = ({
  direction = "diagonal",
  speed = 0.5,
  borderColor = "rgba(148, 163, 184, 0.2)",
  squareSize = 40,
  numColoredSquares = 8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const totalOffset = useRef({ x: 0, y: 0 });
  const coloredSquares = useRef<ColoredSquare[]>([]);
  const popAnimations = useRef<PopAnimation[]>([]);
  const frameRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);

  const [counter, setCounter] = useState(0);

  const solidColors = [
    "rgb(56, 189, 248)", // Sky Blue 400
    "rgb(0, 255, 255)", // Pure Cyan
    "rgb(165, 180, 252)", // Indigo 300
    "rgb(255, 255, 255)", // White
  ];

  const worldToScreen = useCallback(
    (wx: number, wy: number) => ({
      sx: wx - totalOffset.current.x,
      sy: wy - totalOffset.current.y,
    }),
    [],
  );

  const spawnColoredSquare = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const nx = numSquaresX.current;
    const ny = numSquaresY.current;
    if (nx <= 0 || ny <= 0) return;

    for (let attempt = 0; attempt < 20; attempt++) {
      const col = Math.floor(Math.random() * (nx - 2)) + 1;
      const row = Math.floor(Math.random() * (ny - 2)) + 1;

      const snapX = Math.floor(totalOffset.current.x / squareSize) * squareSize;
      const snapY = Math.floor(totalOffset.current.y / squareSize) * squareSize;
      const wx = snapX + col * squareSize;
      const wy = snapY + row * squareSize;

      const occupied = coloredSquares.current.some(
        (s) =>
          Math.abs(s.worldX - wx) < squareSize &&
          Math.abs(s.worldY - wy) < squareSize,
      );

      if (!occupied) {
        const color =
          solidColors[Math.floor(Math.random() * solidColors.length)];
        coloredSquares.current.push({
          worldX: wx,
          worldY: wy,
          color,
          pulsePhase: Math.random() * Math.PI * 2,
        });
        break;
      }
    }
  }, [squareSize]);

  const createPopAnimation = (
    cx: number,
    cy: number,
    color: string,
  ): PopAnimation => {
    const particles: Particle[] = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const spd = 3 + Math.random() * 7;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        radius: 2 + Math.random() * 3,
        color,
        alpha: 1,
        life: 1,
        maxLife: 0.8 + Math.random() * 0.4,
      });
    }
    return { x: cx, y: cy, color, particles, shockwave: 0, shockwaveAlpha: 1 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    coloredSquares.current = [];
    for (let i = 0; i < numColoredSquares; i++) spawnColoredSquare();

    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const offsetX = totalOffset.current.x % squareSize;
      const offsetY = totalOffset.current.y % squareSize;

      // 1. Grid Lines
      ctx.strokeStyle = borderColor as string;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = -offsetX; x < canvas.width + squareSize; x += squareSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = -offsetY; y < canvas.height + squareSize; y += squareSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // 2. Colored Squares
      for (const sq of coloredSquares.current) {
        const { sx, sy } = worldToScreen(sq.worldX, sq.worldY);
        if (
          sx > canvas.width ||
          sx < -squareSize ||
          sy > canvas.height ||
          sy < -squareSize
        )
          continue;

        const pulse =
          Math.sin(frameRef.current * 0.08 + sq.pulsePhase) * 0.15 + 0.85;
        ctx.globalAlpha = pulse;
        ctx.fillStyle = sq.color;
        ctx.fillRect(sx + 2, sy + 2, squareSize - 4, squareSize - 4);

        ctx.shadowBlur = 10;
        ctx.shadowColor = sq.color;
        ctx.strokeStyle = sq.color;
        ctx.strokeRect(sx + 2, sy + 2, squareSize - 4, squareSize - 4);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      // 3. Enhanced Pop Animations
      popAnimations.current = popAnimations.current.filter((anim) => {
        anim.shockwave += 5;
        anim.shockwaveAlpha = Math.max(
          0,
          1 - anim.shockwave / (squareSize * 2.5),
        );

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        if (anim.shockwaveAlpha > 0) {
          ctx.beginPath();
          ctx.arc(anim.x, anim.y, anim.shockwave, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${anim.shockwaveAlpha})`;
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(anim.x, anim.y, anim.shockwave + 2, 0, Math.PI * 2);
          ctx.strokeStyle = anim.color
            .replace("rgb", "rgba")
            .replace(")", `,${anim.shockwaveAlpha * 0.5})`);
          ctx.lineWidth = 6;
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
          ctx.fillStyle = "#fff";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * p.life + 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color
            .replace("rgb", "rgba")
            .replace(")", `,${p.life * 0.6})`);
          ctx.fill();
        }
        ctx.restore();
        return anyAlive || anim.shockwaveAlpha > 0;
      });

      // 4. Vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2,
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(6, 0, 16, 0.8)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      frameRef.current++;
      spawnTimerRef.current++;
      const s = Math.max(speed, 0.1);

      // Reversed directions
      switch (direction) {
        case "right":
          totalOffset.current.x -= s;
          break;
        case "left":
          totalOffset.current.x += s;
          break;
        case "up":
          totalOffset.current.y += s;
          break;
        case "down":
          totalOffset.current.y -= s;
          break;
        case "diagonal":
          totalOffset.current.x -= s;
          totalOffset.current.y -= s;
          break;
      }

      coloredSquares.current = coloredSquares.current.filter((sq) => {
        const { sx, sy } = worldToScreen(sq.worldX, sq.worldY);
        return (
          sx > -squareSize * 5 &&
          sx < canvas.width + squareSize * 5 &&
          sy > -squareSize * 5 &&
          sy < canvas.height + squareSize * 5
        );
      });

      if (
        spawnTimerRef.current % 60 === 0 &&
        coloredSquares.current.length < numColoredSquares
      ) {
        spawnColoredSquare();
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

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
          mx < sx + squareSize &&
          my >= sy &&
          my < sy + squareSize
        ) {
          const sq = coloredSquares.current[i];
          coloredSquares.current.splice(i, 1);
          popAnimations.current.push(
            createPopAnimation(
              sx + squareSize / 2,
              sy + squareSize / 2,
              sq.color,
            ),
          );
          setCounter((prev) => prev + 1);
          setTimeout(() => spawnColoredSquare(), 800);
          return;
        }
      }
    };

    canvas.addEventListener("click", handleClick);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("click", handleClick);
    };
  }, [
    direction,
    speed,
    borderColor,
    squareSize,
    numColoredSquares,
    spawnColoredSquare,
    worldToScreen,
  ]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-8 right-8 z-50 pointer-events-none select-none text-right">
        <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mb-1">
          Sync_Points
        </div>
        <div className="text-4xl font-mono text-white flex items-baseline gap-1 justify-end">
          <span className="text-cyan-400 text-xl font-bold">#</span>
          {counter.toString().padStart(3, "0")}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
      />
    </div>
  );
};

export default Squares;
