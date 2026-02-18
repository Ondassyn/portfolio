"use client";
import { motion } from "framer-motion";

export default function CenterRevealOverlay({
  isOpened,
}: {
  isOpened: boolean;
}) {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex">
      {/* Left Half */}
      <motion.div
        animate={{ x: isOpened ? "-100%" : "0%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-1/2 h-full bg-storm"
      />
      {/* Right Half */}
      <motion.div
        animate={{ x: isOpened ? "100%" : "0%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-1/2 h-full bg-storm"
      />
    </div>
  );
}
