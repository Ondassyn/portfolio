"use client";

import React from "react";
import {
  Lock,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Share,
  Plus,
} from "lucide-react";

interface BrowserBarProps {
  url: string;
  className?: string;
}

const BrowserBar: React.FC<BrowserBarProps> = ({ url, className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-2 md:gap-4 px-3 md:px-6 py-2 md:py-4 bg-slate-800 backdrop-blur-md border border-[#314158] rounded-t-xl">
        {/* Traffic Lights */}
        <div className="flex gap-1.5 md:gap-2 shrink-0">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/50" />
        </div>

        {/* Navigation Arrows — hidden on mobile */}
        <div className="hidden md:flex gap-4 ml-4 text-white/30">
          <ChevronLeft size={18} />
          <ChevronRight size={18} />
        </div>

        {/* URL Bar */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-grow flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-white/5 border border-white/10 rounded-lg group transition-all hover:bg-white/10 min-w-0"
        >
          <Lock
            size={10}
            className="text-white/40 group-hover:text-accent-gold transition-colors shrink-0"
          />
          <span className="text-xs md:text-sm text-white/70 font-mono tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
            {url}
          </span>
          <div className="ml-auto shrink-0">
            <RotateCw
              size={10}
              className="text-white/40 cursor-pointer hover:rotate-180 transition-transform duration-500"
            />
          </div>
        </a>

        {/* Action Icons — hidden on mobile */}
        <div className="hidden md:flex gap-4 text-white/40">
          <Share
            size={18}
            className="hover:text-white transition-colors cursor-pointer"
          />
          <Plus
            size={18}
            className="hover:text-white transition-colors cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default BrowserBar;
