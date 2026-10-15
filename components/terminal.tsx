// Terminal-styled text. Lines use a tiny markup for colour: "{ok:✓ passing}" renders
// "✓ passing" in the ok colour. Tones: dim, ok, run, wait, bad, str, key, b (bold).
// Braces, not brackets: Tailwind reads "[name:value]" in source files as a CSS property.

const tones = {
  dim: "text-muted",
  ok: "text-ok",
  run: "text-run animate-pulse-dot",
  wait: "text-wait",
  bad: "text-bad",
  str: "text-str",
  key: "text-run",
  b: "font-semibold text-white",
} as const;

const token = /\{(dim|ok|run|wait|bad|str|key|b):([^}]*)\}/g;

function renderLine(line: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(token)) {
    parts.push(line.slice(last, m.index));
    parts.push(
      <span key={m.index} className={tones[m[1] as keyof typeof tones]}>
        {m[2]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  parts.push(line.slice(last));
  return parts;
}

export function TermText({
  lines,
  small = false,
  className = "",
}: {
  lines: string[];
  small?: boolean;
  className?: string;
}) {
  const size = small ? "text-[11.5px]" : "text-[11.5px] sm:text-sm";
  return (
    <pre className={`overflow-x-auto font-mono leading-[1.75] text-fg ${size} ${className}`}>
      {lines.map((line, i) => (
        // Lines are static and never reorder, so the index is a stable key.
        // biome-ignore lint/suspicious/noArrayIndexKey: static content
        <div key={i}>{line === "" ? " " : renderLine(line)}</div>
      ))}
    </pre>
  );
}
