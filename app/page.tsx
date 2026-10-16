import { Demo } from "@/components/demo";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import {
  About,
  AtAGlance,
  Faq,
  Guarantees,
  Statement,
  Status,
  TaskSteps,
  Why,
} from "@/components/sections";
import { FinalCta } from "@/components/signup";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Demo />
        <AtAGlance />
        <Statement />
        <TaskSteps />
        <Why />
        <Guarantees />
        <Status />
        <Faq />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
