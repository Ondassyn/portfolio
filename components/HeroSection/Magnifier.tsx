"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Magnifier = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  const clipPath = useTransform([smoothX, smoothY], ([x, y]: number[]) => {
    const width = 384;
    const height = 256;
    const top = y - height / 2;
    const left = x - width / 2;
    const bottom = y + height / 2;
    const right = x + width / 2;
    const borderRadius = 6;
    return `inset(${top}px calc(100% - ${right}px) calc(100% - ${bottom}px) ${left}px round ${borderRadius}px)`;
  });

  const imageSrc = "/portrait.png";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      // bg-transparent — GridCanvas shows through at 0.15 opacity behind the photo
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      {/* Dark background photo */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt="background"
          className="h-full w-full object-cover object-top brightness-[0.5]"
        />
      </div>

      {/* Bright magnified layer */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ clipPath }}
      >
        <img
          src={imageSrc}
          alt="magnified"
          className="h-full w-full object-cover object-top brightness-100 scale-[1.05] origin-center"
        />

        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="pointer-events-none absolute top-0 left-0 z-20 w-96 h-64 shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] 
            flex items-center justify-center"
        >
          <div className="absolute w-4 h-px bg-white/50" />
          <div className="absolute h-4 w-px bg-white/50" />
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/60" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Magnifier;
