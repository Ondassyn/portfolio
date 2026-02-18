"use client";

import { useState } from "react";
import Magnifier from "./Magnifier";
import MainText from "./MainText";
import { motion, Transition } from "framer-motion";
import StaggeredShutter from "./StaggeredShutter";
import TrueFocus from "../ui/TrueFocus";
import MatrixRain from "../ui/MatrixRain";

const HeroSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const glowColor = "rgba(0, 255, 0, 0.6)";
  const borderColor = "#E2D1A4";

  const bracketTransition: Transition = {
    duration: 0.8,
    ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for smooth organic feel
  };

  const textTransition: Transition = {
    duration: 0.8,
    delay: 0.3,
    ease: "easeOut",
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="relative w-full h-screen bg-black overflow-hidden cursor-pointer"
    >
      <StaggeredShutter isOpened={isExpanded} />
      <Magnifier />

      <motion.div className="absolute left-16 top-12 z-10">
        <TrueFocus
          manualMode={true}
          blurAmount={1.5}
          borderColor={borderColor}
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none text-amber-100">
        <div
          className="flex items-center gap-8"
          style={
            {
              "--border-color": borderColor,
              "--glow-color": glowColor,
            } as React.CSSProperties
          }
        >
          {/* 1. Left Bracket */}
          <motion.div
            animate={{
              height: isExpanded ? "260px" : "60px",
              width: isExpanded ? "24px" : "12px",
            }}
            transition={bracketTransition}
            className="border-l-4 border-t-4 border-b-4 shrink-0 rounded-[3px]"
            style={{
              borderColor: "var(--border-color)",
              filter: "drop-shadow(0 0 4px var(--border-color))",
            }}
          />

          {/* 2. Dynamic Width Text Area */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: isExpanded ? "800px" : "120px",
              height: isExpanded ? "260px" : "60px",
              transition:
                "width 0.8s cubic-bezier(0.4, 0.0, 0.2, 1), height 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          >
            {/* QWERTY */}
            <motion.div
              animate={{
                opacity: isExpanded ? 0 : 1,
                scale: isExpanded ? 0.9 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="absolute font-merriweather whitespace-nowrap"
            >
              QWERTY
            </motion.div>

            {/* MainText */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={textTransition}
                className="absolute"
              >
                <MainText />
              </motion.div>
            )}
          </div>

          {/* 3. Right Bracket */}
          <motion.div
            animate={{
              height: isExpanded ? "260px" : "60px",
              width: isExpanded ? "24px" : "12px",
            }}
            transition={bracketTransition}
            className="border-r-4 border-t-4 border-b-4 shrink-0  rounded-[3px]"
            style={{
              borderColor: "var(--border-color)",
              filter: "drop-shadow(0 0 4px var(--border-color))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
