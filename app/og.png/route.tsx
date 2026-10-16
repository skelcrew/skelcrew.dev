import { ImageResponse } from "next/og";
import { wordmark } from "@/components/wordmark";

// The link preview for social posts and chat apps, rendered to out/og.png at build time.
// A route rather than opengraph-image.tsx, whose output has no file extension and so no
// image/png content type on a static host. app/layout.tsx points og:image here.
// next/og can't read Tailwind classes or CSS variables, so the colours are the hex values
// of the tokens in app/globals.css.
const color = {
  bg: "#0e0e0d",
  line: "#262624",
  line2: "#34342f",
  fg: "#ecebe6",
  fg2: "#b9b8b0",
  muted: "#7d7c75",
  faint: "#55544f",
  accent: "#f0a63a",
};

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

const PAD = 72;
const markWidth = size.width - PAD * 2;
const markHeight = Math.round((markWidth / wordmark.width) * wordmark.height);

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: PAD,
        background: color.bg,
        borderTop: `8px solid ${color.accent}`,
      }}
    >
      <svg
        width={markWidth}
        height={markHeight}
        viewBox={`0 0 ${wordmark.width} ${wordmark.height}`}
        role="img"
        aria-label="skelcrew"
      >
        {wordmark.blocks.map((b) => (
          <rect
            key={`${b.x},${b.y}`}
            x={b.x}
            y={b.y}
            width={b.w}
            height={wordmark.cellHeight + 0.5}
            fill={color.muted}
          />
        ))}
        <path d={wordmark.strokes} stroke={color.line2} strokeWidth="2" fill="none" />
      </svg>
      <div
        style={{
          display: "flex",
          marginTop: 64,
          fontSize: 68,
          letterSpacing: -2,
          color: color.fg,
        }}
      >
        Give your agents tasks, not chats.
      </div>
      <div style={{ display: "flex", marginTop: 18, fontSize: 32, color: color.fg2 }}>
        A small crew of coding agents, with you as the team lead.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: 24,
          borderTop: `1px solid ${color.line}`,
          fontSize: 24,
          color: color.muted,
        }}
      >
        <span>skelcrew.dev</span>
        <span style={{ color: color.accent }}>Open source at first release</span>
      </div>
    </div>,
    size,
  );
}
