// The ASCII wordmark from the original skelcrew.dev. Solid blocks render in the text
// colour, the outline characters (/ | _ \) render dimmed, like the logo's dashed shadow.

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

export function Wordmark({ className = "" }: { className?: string }) {
  const parts = art.split(/(█+)/);
  return (
    <pre aria-hidden="true" className={`font-mono leading-[1.15] ${className}`}>
      {parts.map((part, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static content
        <span key={i} className={part.startsWith("█") ? "" : "text-faint"}>
          {part}
        </span>
      ))}
    </pre>
  );
}
