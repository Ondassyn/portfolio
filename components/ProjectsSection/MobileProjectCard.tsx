"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import BrowserBar from "../ui/BrowserBar";
import { BracketLabel } from "../ui/BracketLabel";
import { ChevronDown } from "lucide-react";

interface MobileProjectCardProps {
  title: string;
  project: string;
  description: string;
  url: string;
  image: StaticImageData;
  index: number;
}

const MobileProjectCard = ({
  title,
  project,
  description,
  url,
  image,
  index,
}: MobileProjectCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        filter: visible ? "blur(0px)" : "blur(6px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, filter 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Title area */}
      <div className="px-5 pt-8 pb-4 flex flex-col gap-2">
        <BracketLabel>{project}</BracketLabel>
        <div className="flex items-start gap-2 mt-1">
          <span
            className="text-3xl font-black leading-none shrink-0 text-accent-gold"
            style={{ filter: "drop-shadow(0 0 8px rgba(226,209,164,0.5))" }}
          >
            [
          </span>
          <h2 className="text-bone text-4xl font-black tracking-tighter uppercase italic leading-none">
            {title}
          </h2>
          <span
            className="text-3xl font-black leading-none shrink-0 text-accent-gold opacity-40"
            style={{ filter: "drop-shadow(0 0 8px rgba(226,209,164,0.3))" }}
          >
            ]
          </span>
        </div>
      </div>

      {/* Card */}
      <div className="mx-4 rounded-xl border border-[#314158]/50 bg-[#060910] overflow-hidden shadow-2xl">
        <BrowserBar url={url} />
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-left"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pt-4 pb-6">
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: expanded ? "600px" : "80px" }}
        >
          <p className="text-zinc-300 text-sm leading-relaxed font-light italic whitespace-pre-line font-serif">
            {description}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 font-mono text-xs tracking-widest uppercase"
          style={{
            color: "#E2D1A4",
            filter: "drop-shadow(0 0 4px rgba(226,209,164,0.4))",
          }}
        >
          {expanded ? "collapse" : "read more"}
          <ChevronDown
            size={12}
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default MobileProjectCard;
