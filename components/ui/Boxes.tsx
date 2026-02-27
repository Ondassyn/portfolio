"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

export interface BoxesProps {
  className?: string;
  rows?: number;
  cols?: number;
}

const colors = [
  "rgb(56, 189, 248)",
  "rgb(0, 255, 255)",
  "rgb(165, 180, 252)",
  "rgb(255, 255, 255)",
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const BoxCell = React.memo(() => (
  <motion.div
    className="relative h-16 w-16 border-r border-t border-slate-700"
    whileHover={{
      backgroundColor: getRandomColor(),
      transition: { duration: 0 },
    }}
    transition={{ duration: 2 }}
  />
));

BoxCell.displayName = "BoxCell";

const BoxRow = React.memo(({ cols }: { cols: number }) => (
  <div className="relative h-16 w-16 border-l border-slate-700">
    {Array.from({ length: cols }).map((_, colIndex) => (
      <BoxCell key={colIndex} />
    ))}
  </div>
));

BoxRow.displayName = "BoxRow";

export const Boxes = ({ className, rows = 150, cols = 100 }: BoxesProps) => {
  const rowElements = useMemo(
    () =>
      Array.from({ length: rows }).map((_, rowIndex) => (
        <BoxRow key={rowIndex} cols={cols} />
      )),
    [rows, cols],
  );

  return (
    // No transform here at all — CardSwap's GSAP sets and animates the full
    // transform (skewX, skewY, scale, xPercent, yPercent) on this element
    // using gsap.set / masterTl.to targeting "#perspective-grid".
    <div
      id="perspective-grid"
      className={cn("pointer-events-auto absolute z-0 flex", className)}
      style={{
        top: "50%",
        left: "50%",
        width: "300vw",
        height: "300vh",
      }}
    >
      {rowElements}
    </div>
  );
};
