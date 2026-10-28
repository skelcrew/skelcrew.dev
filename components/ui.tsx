// Small building blocks shared by the page sections.

const buttonBase =
  "inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-xl px-5 text-[15px] font-medium transition hover:-translate-y-px disabled:opacity-60";

export const buttonStyles = {
  solid: `${buttonBase} bg-fg text-bg hover:bg-white`,
  amber: `${buttonBase} bg-accent text-bg hover:bg-accent-2`,
  ghost: `${buttonBase} border border-line-2 text-fg hover:bg-panel-2`,
};

/** Page-width container. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`mx-auto w-full max-w-310 px-4 sm:px-8 ${className}`}>{children}</div>;
}

/** Small uppercase mono label, used above headings and on figures. */
export function Label({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={`font-mono text-xs uppercase tracking-[0.18em] text-muted ${className}`}>
      {children}
    </p>
  );
}

export function H2({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={`text-[clamp(32px,4.4vw,56px)] font-semibold leading-[1.04] tracking-[-0.035em] ${className}`}
    >
      {children}
    </h2>
  );
}

/** Page section: generous vertical space, optional anchor id, optional rule above. */
export function Section({
  id,
  rule = false,
  className = "",
  children,
}: {
  id?: string;
  rule?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={rule ? "border-t border-line" : ""}>
      <Container className={`py-20 md:py-32 ${className}`}>{children}</Container>
    </section>
  );
}

/** Numbered figure frame, like a diagram in a paper: "FIG 0.1" on the left, a note on the right. */
export function Figure({
  n,
  note,
  caption,
  className = "",
  children,
}: {
  n: string;
  note?: string;
  caption?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={`rounded-2xl border border-line bg-panel p-3 sm:p-5 ${className}`}>
      <div className="mb-3 flex items-center justify-between px-1 sm:mb-4">
        <Label>Fig {n}</Label>
        {note && <Label>{note}</Label>}
      </div>
      {children}
      {caption && (
        <figcaption className="mt-3 px-1 font-mono text-xs text-faint">{caption}</figcaption>
      )}
    </figure>
  );
}

/**
 * The Skelcrew mark: a block S with a dashed outline shadow, redrawn from
 * public/skelcrew-icon.png so it follows the text colour.
 */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="150 110 760 800" width={size} height={size} aria-hidden="true">
      <g fill="currentColor">
        <rect x="362" y="128" width="524" height="146" />
        <rect x="287" y="252" width="151" height="146" />
        <rect x="362" y="376" width="449" height="146" />
        <rect x="736" y="500" width="150" height="146" />
        <rect x="287" y="624" width="524" height="146" />
      </g>
      <g stroke="currentColor" strokeOpacity="0.4" strokeWidth="14" fill="none">
        <path d="M350 155 300 252M275 278l-50 100M176 398v122M225 525l50 102M275 650l-50 100M176 770v122M215 889h521M800 773l-54 102M873 650l-53 100M873 278l-53 100" />
      </g>
    </svg>
  );
}

export function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}
