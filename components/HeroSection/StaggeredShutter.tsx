"use client";
import { motion } from "framer-motion";

export default function StaggeredShutter({ isOpened }: { isOpened: boolean }) {
  // Number of shutter blades (more blades = more complex look)
  const BLADES = 6;
  const bladesArray = Array.from({ length: BLADES });

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex">
      <div className="flex flex-col w-1/2">
        {bladesArray.map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "0%" }}
            animate={{ x: isOpened ? "-100%" : "0%" }}
            transition={{
              duration: 1.2,
              ease: [0.45, 0, 0.55, 1],
              // This is the magic line: it delays each blade based on its index
              delay: isOpened ? (BLADES - i) * 0.1 : i * 0.05,
            }}
            className="flex-1 bg-storm"
          />
        ))}
        {bladesArray.map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "0%" }}
            animate={{ x: isOpened ? "-100%" : "0%" }}
            transition={{
              duration: 1.2,
              ease: [0.45, 0, 0.55, 1],
              // This is the magic line: it delays each blade based on its index
              delay: isOpened ? i * 0.1 : (BLADES - i) * 0.05,
            }}
            className="flex-1 bg-storm"
          />
        ))}
      </div>
      <div className="flex flex-col w-1/2">
        {bladesArray.map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "0%" }}
            animate={{ x: isOpened ? "100%" : "0%" }}
            transition={{
              duration: 1.2,
              ease: [0.45, 0, 0.55, 1],
              // This is the magic line: it delays each blade based on its index
              delay: isOpened ? (BLADES - i) * 0.1 : i * 0.05,
            }}
            className="flex-1 bg-storm"
          />
        ))}
        {bladesArray.map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "0%" }}
            animate={{ x: isOpened ? "100%" : "0%" }}
            transition={{
              duration: 1.2,
              ease: [0.45, 0, 0.55, 1],
              // This is the magic line: it delays each blade based on its index
              delay: isOpened ? i * 0.1 : (BLADES - i) * 0.05,
            }}
            className="flex-1 bg-storm"
          />
        ))}
      </div>
    </div>
  );
}
