import { site } from "@/lib/site";
import { Container, Label } from "./ui";
import { Wordmark } from "./wordmark";

export function Footer() {
  const links = [
    ...(site.repoPublic ? [["GitHub", site.repo]] : []),
    ["/llms.txt", "/llms.txt"],
    ["Contact", `mailto:${site.email}`],
  ];
  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <Wordmark className="mb-12 text-line-2" shadowClassName="text-faint" />
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
          <p>
            Built in public by{" "}
            <a
              href={site.author.linkedin}
              rel="me"
              className="text-fg-2 underline underline-offset-4"
            >
              {site.author.name}
            </a>{" "}
            in Denmark
          </p>
          <nav className="flex gap-6 font-mono text-[13px]">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-fg">
                {label}
              </a>
            ))}
          </nav>
          <Label className="sm:ml-auto">skelcrew.dev</Label>
        </div>
      </Container>
    </footer>
  );
}
