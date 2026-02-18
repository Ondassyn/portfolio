"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Magnifier = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Spring config
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

  // Create the clip-path string: rect(top, right, bottom, left)
  // We calculate the edges of the 240x160 rectangle
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

  const imageSrc = "/portrait.png"; // Replace with your image

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* LAYER 1: The Dark Background */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt="background"
          className="h-full w-full object-cover object-top brightness-[0.5]"
        />
      </div>

      {/* LAYER 2: The Bright "Magnified" Layer */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ clipPath }}
      >
        <img
          src={imageSrc}
          alt="magnified"
          className="h-full w-full object-cover object-top brightness-100 scale-[1.05] origin-center"
        />

        {/* Optional: The Rectangle Border */}
        {/* <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            width: 240,
            height: 160,
          }}
          className="absolute border border-white/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        /> */}

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
