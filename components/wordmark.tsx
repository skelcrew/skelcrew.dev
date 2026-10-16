// The ASCII wordmark from the original skelcrew.dev, drawn as SVG on a character grid
// so it scales exactly and doesn't depend on fonts: each █ becomes a filled cell, and the
// outline characters (/ | _ \) become thin strokes, like the logo's shadow.

const art = String.raw`
           /██                 /██
          | ██                | ██
  /███████| ██   /██  /██████ | ██  /███████  /██████   /██████  /██  /██  /██
 /██_____/| ██  /██/ /██__  ██| ██ /██_____/ /██__  ██ /██__  ██| ██ | ██ | ██
|  ██████ | ██████/ | ████████| ██| ██      | ██  \__/| ████████| ██ | ██ | ██
 \____  ██| ██_  ██ | ██_____/| ██| ██      | ██      | ██_____/| ██ | ██ | ██
 /███████/| ██ \  ██|  ███████| ██|  ███████| ██      |  ███████|  █████/████/
|_______/ |__/  \__/ \_______/|__/ \_______/|__/       \_______/ \_____/\___/
`.slice(1, -1);

const CELL_W = 12;
const CELL_H = 22;

const rows = art.split("\n");
const cols = Math.max(...rows.map((r) => r.length));

const blocks: { x: number; y: number; w: number }[] = [];
let strokes = "";

rows.forEach((row, r) => {
  const top = r * CELL_H;
  const bottom = top + CELL_H;
  let c = 0;
  while (c < row.length) {
    const left = c * CELL_W;
    const right = left + CELL_W;
    const ch = row[c];
    if (ch === "█") {
      let end = c;
      while (row[end] === "█") end++;
      blocks.push({ x: left, y: top, w: (end - c) * CELL_W });
      c = end;
      continue;
    }
    if (ch === "/") strokes += `M${left} ${bottom}L${right} ${top}`;
    if (ch === "\\") strokes += `M${left} ${top}L${right} ${bottom}`;
    if (ch === "|") strokes += `M${left + CELL_W / 2} ${top}V${bottom}`;
    if (ch === "_") strokes += `M${left} ${bottom - 1}H${right}`;
    c++;
  }
});

/** The raw drawing, for places that can't use the component (the share image). */
export const wordmark = {
  width: cols * CELL_W,
  height: rows.length * CELL_H,
  cellHeight: CELL_H,
  blocks,
  strokes,
};

/** Blocks take the text colour; `shadowClassName` sets the colour of the outline strokes. */
export function Wordmark({
  className = "",
  shadowClassName = "text-faint",
}: {
  className?: string;
  shadowClassName?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${cols * CELL_W} ${rows.length * CELL_H}`}
      className={`block h-auto w-full ${className}`}
      role="img"
      aria-label="skelcrew"
    >
      <g fill="currentColor">
        {blocks.map((b) => (
          // A hair of extra height closes the seams between rows.
          <rect key={`${b.x},${b.y}`} x={b.x} y={b.y} width={b.w} height={CELL_H + 0.5} />
        ))}
      </g>
      <path
        d={strokes}
        className={shadowClassName}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
