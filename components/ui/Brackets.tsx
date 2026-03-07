"use client";

interface BracketsProps {
  width: number | string;
  height: number | string;
  borderWidth?: number;
  bracketCorner?: number;
  children?: React.ReactNode;
  opacity?: number;
  className?: string;
  transition?: string; // New prop
}

export default function Brackets({
  width,
  height,
  borderWidth = 3,
  bracketCorner = 28,
  children,
  opacity = 1,
  className = "",
  transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)", // Default for Loader
}: BracketsProps) {
  const commonStyle: React.CSSProperties = {
    position: "absolute",
    width: bracketCorner,
    height: "100%",
    borderColor: "#E2D1A4",
    borderTopWidth: borderWidth,
    borderBottomWidth: borderWidth,
    borderStyle: "solid",
    filter: "drop-shadow(0 0 8px rgba(226,209,164,0.6))",
    transition: transition,
  };

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        position: "relative",
        width,
        height,
        opacity,
        transition: transition,
      }}
    >
      <div
        style={{
          ...commonStyle,
          left: 0,
          borderLeftWidth: borderWidth,
          borderRadius: "3px 0 0 3px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {children}
      </div>
      <div
        style={{
          ...commonStyle,
          right: 0,
          borderRightWidth: borderWidth,
          borderRadius: "0 3px 3px 0",
        }}
      />
    </div>
  );
}
