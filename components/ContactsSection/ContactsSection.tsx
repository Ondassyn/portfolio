"use client";

import { useEffect, useRef, useState } from "react";
import { gridState } from "../ui/GridCanvas";

const ContactsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [popCount, setPopCount] = useState(0);

  // Show/hide based on scroll position
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gridState.flattenProgress = 1;
            gridState.targetSpeed = 1;
            setVisible(true);
          } else {
            gridState.targetSpeed = 0;
            setVisible(false);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Listen for pops from GridCanvas
  useEffect(() => {
    const onPop = (e: Event) => {
      setPopCount((e as CustomEvent).detail);
    };
    window.addEventListener("square-popped", onPop);
    return () => window.removeEventListener("square-popped", onPop);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full bg-transparent z-10 pointer-events-none"
    >
      {/* Center text */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(24px)",
        }}
      >
        <div className="flex items-center gap-4">
          <span className="w-12 h-px bg-cyan-400" />
          <span className="text-cyan-400 font-mono text-sm tracking-[0.4em] uppercase">
            Let&apos;s connect
          </span>
          <span className="w-12 h-px bg-cyan-400" />
        </div>

        <h2 className="text-white text-7xl font-black tracking-tighter uppercase italic leading-none text-center">
          Get in touch
        </h2>

        <p className="text-zinc-400 text-lg font-light text-center max-w-md leading-relaxed">
          Open to new opportunities, collaborations, and interesting projects.
          Pop a square or drop a message.
        </p>

        {/* Email — re-enable pointer events */}
        <a
          href="mailto:your@email.com"
          className="pointer-events-auto mt-2 px-8 py-3 border border-cyan-400/50 text-cyan-400 font-mono text-sm tracking-widest uppercase hover:bg-cyan-400/10 transition-colors duration-300"
        >
          your@email.com
        </a>
      </div>

      {/* Pop counter — bottom right */}
      <div
        className="absolute bottom-10 right-12 text-right transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(16px)",
          transitionDelay: visible ? "150ms" : "0ms",
        }}
      >
        <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mb-1">
          Squares_Popped
        </div>
        <div className="text-5xl font-mono text-white flex items-baseline gap-1 justify-end">
          <span className="text-cyan-400 text-2xl font-bold">#</span>
          <span
            key={popCount}
            style={{
              display: "inline-block",
              animation:
                "pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            {popCount.toString().padStart(3, "0")}
          </span>
        </div>
        <style>{`
          @keyframes pop-in {
            0%   { transform: scale(1.6); opacity: 0; }
            60%  { transform: scale(0.9); opacity: 1; }
            100% { transform: scale(1);   opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactsSection;
