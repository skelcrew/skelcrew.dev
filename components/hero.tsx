import { SignupForm } from "./signup";
import { Container, Label } from "./ui";

export function Hero() {
  return (
    <Container className="pt-20 pb-14 md:pt-32 md:pb-20">
      <h1 className="mb-8 max-w-[11ch] text-[clamp(48px,9vw,120px)] font-semibold leading-[0.95] tracking-[-0.05em]">
        Give your agents tasks, not chats.
      </h1>
      <p className="mb-10 max-w-150 text-[clamp(18px,1.9vw,22px)] leading-normal text-fg-2">
        Skelcrew is a small crew of coding agents with you as the team lead. They plan, build and
        review in parallel while you're away. Every task ends as a branch, a pull request or a
        report.
      </p>
      <SignupForm id="email-top" />
      <Label className="mt-6 leading-relaxed">
        Open source · bring your own agents · one or two emails a year
      </Label>
    </Container>
  );
}
