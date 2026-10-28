import { site } from "@/lib/site";
import { buttonStyles, Container, GithubIcon, Logo } from "./ui";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#guarantees", label: "Guarantees" },
  { href: "/#status", label: "Status" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <>
      <div className="border-b border-line">
        <Container className="flex min-h-10 flex-wrap items-center justify-center gap-x-3 py-2 text-center text-[13px]">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Building in public
          </span>
          <span className="text-fg-2">Skelcrew is being rebuilt for its first release.</span>
          <a href="/#updates" className="underline underline-offset-4 hover:text-white">
            Get updates
          </a>
        </Container>
      </div>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-md">
        <Container className="flex h-16 items-center gap-10">
          <a href="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            <Logo size={26} />
            Skelcrew
          </a>
          <nav className="hidden gap-7 text-sm text-fg-2 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-5">
            {site.repoPublic && (
              <a
                href={site.repo}
                className="flex items-center gap-2 text-sm text-fg-2 hover:text-fg"
                aria-label="Skelcrew on GitHub"
              >
                <GithubIcon size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            <a href="/#updates" className={`${buttonStyles.amber} h-10 rounded-lg px-4 text-sm`}>
              Get updates
            </a>
          </div>
        </Container>
      </header>
    </>
  );
}
