import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { buttonStyles, Container, H2, Label } from "@/components/ui";

// Buttondown sends confirmed subscribers here.
export const metadata: Metadata = { title: "You're on the list · Skelcrew" };

export default function Thanks() {
  return (
    <>
      <Nav />
      <main>
        <Container className="py-24 md:py-40">
          <Label className="mb-6 text-ok">Confirmed</Label>
          <H2 className="mb-6">You're on the list.</H2>
          <p className="mb-10 max-w-130 text-lg text-fg-2">
            Thanks for confirming. I'll write when there's something worth trying, one or two emails
            a year.
          </p>
          <a href="/" className={buttonStyles.ghost}>
            Back to skelcrew.dev
          </a>
        </Container>
      </main>
      <Footer />
    </>
  );
}
