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
    <div className={`w-[1000] ${className}`}>
      {/* Browser Window Header */}
      <div className="flex items-center gap-4 px-6 py-4 bg-slate-800 backdrop-blur-md border border-[#314158] rounded-t-xl">
        {/* 1. Traffic Lights (MacOS Style) */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>

        {/* 2. Navigation Arrows */}
        <div className="flex gap-4 ml-4 text-white/30">
          <ChevronLeft size={18} />
          <ChevronRight size={18} />
        </div>

        {/* 3. The Search / URL Bar */}
        <div className="flex-grow flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg group transition-all hover:bg-white/10">
          <Lock
            size={12}
            className="text-white/40 group-hover:text-accent-gold transition-colors"
          />
          <span className="text-sm text-white/70 font-mono tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
            {url}
          </span>
          <div className="ml-auto">
            <RotateCw
              size={12}
              className="text-white/40 cursor-pointer hover:rotate-180 transition-transform duration-500"
            />
          </div>
        </div>

        {/* 4. Action Icons */}
        <div className="flex gap-4 text-white/40">
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
