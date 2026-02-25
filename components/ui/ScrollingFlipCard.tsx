"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const ITEMS = [
  { id: 1, content: "First Face", color: "bg-storm" },
  { id: 2, content: "Second Face", color: "bg-obsidian" },
  { id: 3, content: "Third Face", color: "bg-storm" },
  { id: 4, content: "Fourth Face", color: "bg-accent-gold text-obsidian" },
];

export default function ScrollingFlipCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll (0 to 1) to rotation (0 to -270 degrees)
  // Each face is 90 degrees apart
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -90 * (ITEMS.length - 1)],
  );

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky wrapper keeps the card in view */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-1000">
        {/* 3D Scene */}
        <div className="relative w-80 h-96 perspective-1000">
          <motion.div
            style={{
              rotateX,
              transformStyle: "preserve-3d",
            }}
            className="w-full h-full relative"
          >
            {ITEMS.map((item, i) => (
              <div
                key={item.id}
                style={{
                  // Position each face in 3D space
                  transform: `rotateX(${i * 90}deg) translateZ(192px)`, // 192px is half of 384px (h-96)
                  backfaceVisibility: "hidden",
                }}
                className={`absolute inset-0 flex items-center justify-center text-2xl font-bold border border-white/10 rounded-xl ${item.color}`}
              >
                {item.content}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
