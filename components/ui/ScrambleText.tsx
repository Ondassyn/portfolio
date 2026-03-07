"use client";

import { useRef, useEffect } from "react";
import { useScramble } from "@/lib/hooks/useScramble";

interface ScrambleTextProps {
  text: string;
  trigger: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  as?: string;
}

const ScrambleText = ({
  text,
  trigger,
  className,
  style,
  duration = 400,
}: ScrambleTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  // Set initial text directly on DOM — no children so React never overwrites it
  useEffect(() => {
    if (ref.current) ref.current.textContent = text;
  }, []);

  // Scramble fires on trigger change
  useScramble(ref, text, trigger, duration);

  // Render empty span — content is controlled entirely by the hook
  return <span ref={ref} className={className} style={style} />;
};

export default ScrambleText;
