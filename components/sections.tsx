import { site } from "@/lib/site";
import { TermText } from "./terminal";
import { Container, Figure, H2, Label, Section } from "./ui";

/** Big two-tone statement: what Skelcrew does, then how, in a quieter colour. */
export function Statement() {
  return (
    <Section rule id="how">
      <Label className="mb-8">What it does</Label>
      <p className="max-w-[24ch] text-[clamp(30px,4.2vw,56px)] font-medium leading-[1.12] tracking-[-0.03em]">
        Skelcrew turns work into tasks and runs your agents on them.{" "}
        <span className="text-faint">
          A planner decides what kind of work it is, builders and testers do it, and you step in
          only when a decision is yours.
        </span>
      </p>
      <SystemDiagram />
    </Section>
  );
}

function Box({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border border-line bg-bg p-5 ${className}`}>
      <Label className="mb-3">{label}</Label>
      {children}
    </div>
  );
}

/** Vertical connector between diagram rows, with a dot travelling down it. */
function Connector() {
  return (
    <div className="relative mx-auto h-10 w-px overflow-hidden bg-line-2">
      <span className="absolute inset-x-0 top-0 h-3 animate-flow bg-accent" />
    </div>
  );
}

function SystemDiagram() {
  const phases = ["Triage", "Build", "Review", "Gate"];
  return (
    <Figure n="0.2" note="System" className="mt-16 md:mt-24">
      <Box label="Work comes in">
        <p className="flex flex-wrap gap-x-8 gap-y-1 text-lg">
          <code className="font-mono text-base leading-7">skel add</code>
          <span>GitHub issues</span>
          <span>
            Your tracker <span className="text-faint">soon</span>
          </span>
        </p>
      </Box>
      <Connector />
      <div className="grid gap-3 md:grid-cols-[1fr_40px_260px] md:items-center md:gap-0">
        <div className="rounded-xl border border-accent/70 bg-bg p-5 shadow-[0_0_60px_-24px_var(--color-accent)]">
          <p className="mb-4 text-xl font-semibold">Skelcrew</p>
          <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]">
            {phases.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                <span className="rounded-full border border-line-2 px-3 py-1.5">{p}</span>
                {i < phases.length - 1 && <span className="text-faint">→</span>}
              </span>
            ))}
          </div>
          <Label>Planner · builder · tester · append-only log</Label>
        </div>
        <div className="hidden h-px bg-line-2 md:block" />
        <Box label="You" className="border-dashed">
          <p className="text-lg">Answer questions.</p>
          <p className="text-lg text-muted">Sign off on what matters.</p>
        </Box>
      </div>
      <Connector />
      <div className="grid gap-3 md:grid-cols-2">
        <Box label="Agents in parallel">
          <p className="text-lg">
            Claude Code <span className="text-muted">today, Codex next, more through plugins</span>
          </p>
        </Box>
        <Box label="Work goes out">
          <p className="text-lg">
            A branch, a pull request <span className="text-muted">or a report</span>
          </p>
        </Box>
      </div>
    </Figure>
  );
}

const glance = [
  ["For", "Developers and small teams.", "Who already use coding agents."],
  ["Runs", "In your terminal.", "On your laptop or an always-on machine."],
  ["Works with", "Claude Code, git and GitHub.", "Codex next. Everything else through plugins."],
  ["Price", "Free, open source core.", "Bring your own AI subscription."],
];

export function AtAGlance() {
  return (
    <Container className="pb-20 md:pb-32">
      <Label className="mb-6 border-b border-line pb-6">At a glance</Label>
      <dl className="grid gap-10 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {glance.map(([term, main, rest]) => (
          <div key={term}>
            <dt>
              <Label className="mb-3">{term}</Label>
            </dt>
            <dd className="text-xl leading-snug">
              {main} <span className="text-muted">{rest}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

const steps: { n: string; name: string; body: string; lines: string[] }[] = [
  {
    n: "01",
    name: "Triage",
    body: "The planner decides whether it is a quick fix, a bug to investigate, a feature or an exploration, and how much care it needs.",
    lines: [
      "{dim:T-41 · planner}",
      "intent  {b:bug}",
      "rigor   {b:ship}",
      "brief   VAT field loses its",
      "        value on blur in the",
      "        EU checkout form.",
      "{ok:→ build}",
    ],
  },
  {
    n: "02",
    name: "Build",
    body: "A builder works in its own git worktree, test first, in parallel with every other task in flight.",
    lines: [
      "{dim:T-41 · builder · wt/t-41}",
      "{ok:✓} failing test added",
      "{ok:✓} fix in AddressForm",
      "{ok:✓} 5 commits",
      "{ok:✓} bun run check",
      "",
      "{ok:→ review}",
    ],
  },
  {
    n: "03",
    name: "Review",
    body: "A separate tester reviews it adversarially and collects evidence. It passes the work or sends it back, up to three rounds.",
    lines: [
      "{dim:T-41 · tester · round 1}",
      "{bad:changes requested}",
      "· empty VAT not handled",
      "{dim:T-41 · tester · round 2}",
      "{ok:passed} evidence: 3",
      "",
      "{ok:→ gate}",
    ],
  },
  {
    n: "04",
    name: "Done",
    body: "The task ends as a pull request. If it touches critical code, it waits for your sign-off first. You merge it, or send it back.",
    lines: [
      "{dim:T-41 · gate}",
      "touches {str:src/core/**}",
      "{wait:? needs your sign-off}",
      "  {b:y} approve  {b:n} send back",
      "",
      "{ok:✓ delivered PR #214}",
      "",
    ],
  },
];

export function TaskSteps() {
  return (
    <Section rule>
      <Label className="mb-6">How a task moves</Label>
      <H2 className="mb-14 max-w-[18ch]">From one line of text to a pull request.</H2>
      <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="flex flex-col rounded-2xl border border-line bg-panel p-4">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              {s.n} · {s.name}
            </p>
            <div className="mb-5 rounded-lg border border-line bg-bg px-3.5 py-3">
              <TermText lines={s.lines} small />
            </div>
            <p className="text-[15px] leading-relaxed text-fg-2">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Why() {
  return (
    <Section rule className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <Label className="mb-6">Why</Label>
        <H2 className="max-w-[12ch]">You lead. Agents do the work.</H2>
      </div>
      <div className="space-y-5 text-lg leading-relaxed text-fg-2 md:pt-12">
        <p>
          Coding agents can do real work now, but each one still needs a person in a chat window,
          approving steps and reading every line. Run three at once and your day becomes switching
          between them.
        </p>
        <p>
          That doesn't scale, and it wears people out. Skelcrew is built for the developer's
          well-being, not raw output. You act as the team lead who knows the architecture, and spend
          your attention on the decisions that matter.
        </p>
        <p>
          It stays small and fits the tools you already use. No IDE, no new place to live. Its test
          for every feature: if the next model is twice as good, does this become dead code? If yes,
          it isn't built.
        </p>
      </div>
    </Section>
  );
}

const rules = [
  [
    "No agent approves its own work",
    "Building and reviewing are separate roles. No agent can start more agents than you allow.",
  ],
  [
    "Nothing ships unchecked",
    "The commit that passed review is exactly the commit that gets delivered. Critical paths wait for you.",
  ],
  [
    "Everything is on the record",
    "Every step is an event in an append-only log. See what happened and why, and replay it.",
  ],
  [
    "Nothing is lost",
    "Work is saved before an agent is stopped. A crash or restart picks up where it left off.",
  ],
];

const config = [
  "{key:roles}:",
  "  {key:planner}: { {key:harness}: claude }",
  "  {key:builder}: { {key:harness}: claude }",
  "  {key:tester}:  { {key:harness}: codex }",
  "",
  "{key:repo}:",
  "  {key:test}: [bun run check]",
  "  {key:critical}: [src/core/**]  {dim:# your sign-off}",
  "",
  "{key:limits}:",
  "  {key:max_running}: 2",
];

export function Guarantees() {
  return (
    <Section rule id="guarantees">
      <Label className="mb-6">Why you can leave it running</Label>
      <H2 className="mb-6 max-w-[16ch]">Guarantees in code. Judgment in agents.</H2>
      <p className="mb-14 max-w-150 text-lg text-fg-2">
        Agents propose. A small, deterministic core decides what's allowed, by fixed rules. An agent
        never holds the power to break them.
      </p>
      <div className="grid gap-3 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {rules.map(([title, body], i) => (
            <div key={title} className="bg-panel p-6">
              <p className="mb-6 font-mono text-xs text-accent">0{i + 1}</p>
              <h3 className="mb-2 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="text-[15px] leading-relaxed text-fg-2">{body}</p>
            </div>
          ))}
        </div>
        <Figure n="0.3" note="skelcrew.yaml" caption="The whole setup for one repository.">
          <div className="rounded-lg border border-line bg-bg p-4">
            <TermText lines={config} />
          </div>
        </Figure>
      </div>
    </Section>
  );
}

const stats = [
  [
    "550+",
    "automated tests on the core, including property tests that throw thousands of random scenarios at every rule",
  ],
  [
    "2×",
    "fewer bugs from giving agents project rules and a spec, code, review loop, in a blind comparison",
  ],
  ["8 Oct", "2026: the rebuild started, after an earlier version ran real agents end to end"],
];

type Stage = "done" | "now" | "next" | "then" | "later";

const roadmap: [Stage, React.ReactNode][] = [
  ["done", "The core that decides what agents may do, and the store and loop that survive a crash"],
  [
    "now",
    <>
      First real task end to end: <code className="font-mono text-[0.9em]">skel add</code> to a
      branch, with real agents
    </>,
  ],
  ["next", "A terminal UI for what's running and what waits on you"],
  ["next", "Codex as a second harness, to prove Skelcrew isn't tied to one vendor"],
  ["then", "Skelcrew building itself, every day"],
  ["later", "Hosted skelcrew.dev: steer your crew from anywhere, with approvals in the browser"],
];

const stageColor = (stage: Stage) =>
  stage === "done" ? "text-ok" : stage === "now" ? "text-accent" : "text-faint";

export function Status() {
  return (
    <Section rule id="status">
      <Label className="mb-6">Status</Label>
      <H2 className="mb-6 max-w-[16ch]">Skelcrew is being built by Skelcrew.</H2>
      <p className="mb-14 max-w-150 text-lg text-fg-2">
        The rebuild works the way the product does: agents build it unattended, independent reviews
        by Claude and Codex check each step, and a human approves the decisions.
      </p>
      <div className="mb-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {stats.map(([value, label]) => (
          <div key={value} className="bg-panel p-6">
            <p className="mb-3 text-[40px] font-semibold leading-none tracking-[-0.04em]">
              {value}
            </p>
            <p className="text-[15px] leading-relaxed text-fg-2">{label}</p>
          </div>
        ))}
      </div>
      <ol className="max-w-200 border-t border-line">
        {roadmap.map(([stage, text], i) => (
          <li
            key={String(i)}
            className={`grid grid-cols-[72px_1fr] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[110px_1fr] ${stage === "now" ? "text-fg" : "text-fg-2"}`}
          >
            <span className={`font-mono text-xs uppercase tracking-[0.16em] ${stageColor(stage)}`}>
              {stage}
            </span>
            <span className="text-[17px]">{text}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const faq = [
  [
    "Is this an IDE?",
    "No. Skelcrew runs in your terminal next to the tools you already use. Each agent works in its own git worktree, and results arrive as branches and pull requests you review the usual way.",
  ],
  [
    "Does it merge code for me?",
    "Not on its own say-so. A separate tester reviews every change first, and anything touching paths you mark as critical waits for your sign-off. What gets delivered is exactly the commit that passed review.",
  ],
  [
    "Which agents does it work with?",
    "Claude Code today. Codex is next, through the same plugin contract, which keeps the core free of anything specific to one vendor.",
  ],
  [
    "Do I need a new account or AI subscription?",
    "No. You bring your own Claude or Codex subscription, and the open source core runs free on your own machine. Skelcrew never resells model usage.",
  ],
  [
    "Will there be a hosted version?",
    "Yes, later. Hosted skelcrew.dev will let you steer your crew from anywhere, with notifications and approvals in the browser. The core stays open source.",
  ],
  [
    "When can I use it?",
    "When a real task reliably goes from skel add to a pull request. Leave your email and you'll hear the day it does.",
  ],
];

export function Faq() {
  return (
    <Section rule id="faq" className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <Label className="mb-6">Before you install</Label>
        <H2 className="max-w-[10ch]">Questions, answered.</H2>
      </div>
      <div className="border-t border-line">
        {faq.map(([q, a]) => (
          <details key={q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <span className="font-mono text-xl text-muted transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-6 text-[17px] leading-relaxed text-fg-2">{a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function About() {
  const links = [
    ["simonbc.com", site.author.site],
    ["GitHub", site.author.github],
    ["LinkedIn", site.author.linkedin],
  ];
  return (
    <Section rule id="about" className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <Label className="mb-6">Who's building it</Label>
        <H2 className="mb-8">Simon Carstensen</H2>
        <div className="inline-flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3">
          <span className="grid size-7 place-items-center rounded-[4px] bg-[#f26522] font-bold text-white">
            Y
          </span>
          <span className="font-medium">Combinator S05</span>
        </div>
      </div>
      <div className="space-y-5 text-lg leading-relaxed text-fg-2 md:pt-12">
        <p>
          Senior full-stack developer with two decades of JavaScript and Python, based in Denmark.
          At Y Combinator in 2005 I co-founded Infogami with Aaron Swartz, and later co-created the
          original Jottit with him.
        </p>
        <p>
          These days I focus on putting AI into the development process: agentic coding tools, MCP
          servers, and shaping stacks for agents to work in.
        </p>
        <p className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          {links.map(([label, href]) => (
            <a key={href} href={href} rel="me" className="text-fg underline underline-offset-4">
              {label}
            </a>
          ))}
        </p>
        <p className="rounded-xl border border-line bg-panel p-5 text-base">
          Interested in backing Skelcrew?{" "}
          <a
            href={`mailto:${site.email}?subject=Skelcrew`}
            className="text-fg underline underline-offset-4"
          >
            Get in touch
          </a>{" "}
          and I'll send you the memo and a short demo.
        </p>
      </div>
    </Section>
  );
}
