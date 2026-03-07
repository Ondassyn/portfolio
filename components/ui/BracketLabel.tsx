interface BracketLabelProps {
  children: React.ReactNode;
  className?: string;
  mode?: "full" | "open";
}

export const BracketLabel = ({
  children,
  className = "",
  mode = "full",
}: BracketLabelProps) => (
  <span
    className={`font-mono text-sm tracking-[0.4em] uppercase text-accent-gold inline-flex items-center gap-2 ${className}`}
    style={{ filter: "drop-shadow(0 0 6px rgba(226, 209, 164, 0.4))" }}
  >
    <span
      className="text-base leading-none"
      style={{ filter: "drop-shadow(0 0 4px #E2D1A4)" }}
    >
      [
    </span>
    {children}
    {mode === "full" && (
      <span
        className="text-base leading-none"
        style={{ filter: "drop-shadow(0 0 4px #E2D1A4)" }}
      >
        ]
      </span>
    )}
  </span>
);
