import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ondassyn Abdrakhmanov — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#060910",
        fontFamily: "serif",
        position: "relative",
      }}
    >
      {/* Grid dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, #1a2744 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }}
      />

      {/* Corner brackets */}
      {/* Top-left */}
      <div style={{ position: "absolute", top: 48, left: 48, display: "flex" }}>
        <div style={{ width: 40, height: 2, background: "#E2D1A4" }} />
      </div>
      <div style={{ position: "absolute", top: 48, left: 48, display: "flex" }}>
        <div style={{ width: 2, height: 40, background: "#E2D1A4" }} />
      </div>
      {/* Top-right */}
      <div
        style={{ position: "absolute", top: 48, right: 48, display: "flex" }}
      >
        <div style={{ width: 40, height: 2, background: "#E2D1A4" }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 48,
          right: 48,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: 2, height: 40, background: "#E2D1A4" }} />
      </div>
      {/* Bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 48,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div style={{ width: 40, height: 2, background: "#E2D1A4" }} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 48,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div style={{ width: 2, height: 40, background: "#E2D1A4" }} />
      </div>
      {/* Bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: 40, height: 2, background: "#E2D1A4" }} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: 2, height: 40, background: "#E2D1A4" }} />
      </div>

      {/* Role label */}
      <div
        style={{
          color: "#E2D1A4",
          fontSize: 14,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          fontFamily: "monospace",
          marginBottom: 24,
          opacity: 0.8,
        }}
      >
        [ FRONTEND ENGINEER ]
      </div>

      {/* Name */}
      <div
        style={{
          color: "#ffffff",
          fontSize: 80,
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        Ondassyn
      </div>
      <div
        style={{
          color: "#ffffff",
          fontSize: 80,
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        Abdrakhmanov
      </div>

      {/* Description */}
      <div
        style={{
          color: "#94a3b8",
          fontSize: 20,
          fontWeight: 300,
          textAlign: "center",
          maxWidth: 600,
          lineHeight: 1.6,
        }}
      >
        turning complex problems into elegant, high-performance interfaces
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          color: "#E2D1A4",
          fontSize: 13,
          fontFamily: "monospace",
          letterSpacing: "0.2em",
          opacity: 0.5,
        }}
      >
        ondassyn.vercel.app
      </div>
    </div>,
    { ...size },
  );
}
