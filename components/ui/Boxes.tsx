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
  "rgb(56, 189, 248)", // Sky Blue 400
  "rgb(0, 255, 255)", // Pure Cyan
  "rgb(165, 180, 252)", // Indigo 300
  "rgb(255, 255, 255)", // White (for a 'star' effect)
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const BoxCell = React.memo(({ showPlus }: { showPlus: boolean }) => (
  <motion.div
    className="relative h-8 w-16 border-r border-t border-slate-700"
    whileHover={{
      backgroundColor: getRandomColor(),
      transition: { duration: 0 },
    }}
    transition={{ duration: 2 }}
  >
    {showPlus && (
      <svg
        className="pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 text-slate-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </motion.div>
));

BoxCell.displayName = "BoxCell";

const BoxRow = React.memo(
  ({ rowIndex, cols }: { rowIndex: number; cols: number }) => (
    <div className="relative h-8 w-16 border-l border-slate-700">
      {Array.from({ length: cols }).map((_, colIndex) => (
        <BoxCell
          key={colIndex}
          showPlus={rowIndex % 2 === 0 && colIndex % 2 === 0}
        />
      ))}
    </div>
  ),
);

BoxRow.displayName = "BoxRow";

export const Boxes = ({ className, rows = 150, cols = 100 }: BoxesProps) => {
  const rowElements = useMemo(
    () =>
      Array.from({ length: rows }).map((_, rowIndex) => (
        <BoxRow key={rowIndex} rowIndex={rowIndex} cols={cols} />
      )),
    [rows, cols],
  );

  return (
    <div
      className={cn("pointer-events-auto absolute inset-0 z-0 flex", className)}
      style={{
        transform:
          "translate(-50%, -50%) skewX(-48deg) skewY(14deg) scale(0.675)",
        transformOrigin: "center center",
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
