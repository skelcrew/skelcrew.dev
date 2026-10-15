"use client";

import { useEffect, useState } from "react";
import { TermText } from "./terminal";
import { Container, Figure } from "./ui";

// Illustrative output only. Swap in real `skel` output once it exists.
const crew = [
  '{dim:$} skel add {str:"EU customers can\'t save a VAT number at checkout"}',
  "{ok:✓} task {b:T-41} added",
  "",
  "{dim:$} skel ls",
  "{dim:TASK   INTENT        PHASE        ROLE      AGE    STATUS}",
  "T-41   bug · ship    build        builder   4m     {run:● running}",
  "T-39   feature       review r2    tester    18m    {run:● running}",
  "T-38   investigate   triage       planner   22m    {wait:? needs you}",
  "T-36   bug · ship    delivered    –         1h     {ok:✓ PR #212}",
  "T-35   prototype     delivered    –         3h     {ok:✓ branch}",
  "",
  "{dim:limits: max_running 2 · critical: src/core/** needs your sign-off}",
];

const review = [
  "{dim:T-39 · add saved addresses to checkout}",
  "",
  "{b:round 1}   builder   12 commits · bun run check {ok:passing}",
  "          tester    {bad:changes requested}",
  "                    · AddressForm drops the postcode on edit",
  "                    · no test covers the empty-list state",
  "{b:round 2}   builder   3 commits · bun run check {ok:passing}",
  "          tester    {run:reviewing…}",
  "",
  "{b:gate}      touches src/core/**  →  {wait:waits for your sign-off}",
  "{dim:The builder can't approve its own work. The tester can't merge.}",
  "{dim:Only the reviewed commit is delivered.}",
];

const record = [
  "{dim:$} skel log T-36",
  "{dim:09:02:11}  task.added            by you",
  "{dim:09:02:14}  triage.decided        intent=bug rigor=ship   {dim:planner}",
  "{dim:09:02:15}  workspace.created     worktree t-36",
  "{dim:09:14:40}  build.finished        5 commits               {dim:builder}",
  "{dim:09:21:03}  review.passed         evidence: 3 checks      {dim:tester}",
  "{dim:09:21:04}  gate.approved         by you",
  "{dim:09:21:09}  delivered             PR #212  sha 4be1c9e",
  "",
  "{dim:append-only · replayable · survives crashes and restarts}",
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block min-w-5.5 rounded bg-line-2 px-1.5 text-center font-mono text-xs text-fg">
      {children}
    </kbd>
  );
}

function Inbox() {
  const choices = [
    <>
      Fix the timezone assumption in <code className="text-str">validators.ts</code> and ship it
    </>,
    "Write a report on both causes and stop there",
    "Split into two tasks",
  ];
  return (
    <div className="max-w-160 font-mono text-[13px] sm:text-sm">
      <p className="mb-3">
        <span className="text-wait">?</span> <b className="text-white">T-38</b> planner asks{" "}
        <span className="text-muted">· 22m ago</span>
      </p>
      <p className="mb-4">
        The flaky checkout test fails on CI only. I found two causes. Which should I take on?
      </p>
      <ol className="mb-5 grid gap-2">
        {choices.map((c, i) => (
          <li
            key={String(i)}
            className={`flex items-baseline gap-3 rounded-lg border px-3.5 py-3 ${i === 0 ? "border-wait" : "border-line-2"}`}
          >
            <Kbd>{i + 1}</Kbd>
            <span>{c}</span>
          </li>
        ))}
      </ol>
      <p className="text-muted">
        Press a number to answer, <Kbd>a</Kbd> to attach to the session, <Kbd>p</Kbd> to pause.
      </p>
    </div>
  );
}

const tabs = [
  { id: "crew", label: "Run a crew", panel: <TermText lines={crew} /> },
  { id: "inbox", label: "Decision inbox", panel: <Inbox /> },
  { id: "review", label: "Review gates", panel: <TermText lines={review} /> },
  { id: "record", label: "On the record", panel: <TermText lines={record} /> },
];

/** Product preview: a terminal window with tabs that advance on their own until clicked. */
export function Demo() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % tabs.length), 6000);
    return () => clearInterval(timer);
  }, [auto]);

  return (
    <Container className="pb-20 md:pb-32">
      <Figure n="0.1" note="skel · illustrative">
        <div
          role="tablist"
          aria-label="Product preview"
          className="mb-3 flex gap-1 overflow-x-auto rounded-xl border border-line bg-bg p-1 sm:w-fit"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => {
                setAuto(false);
                setActive(i);
              }}
              className="shrink-0 cursor-pointer rounded-lg px-3.5 py-2 text-sm text-muted transition hover:text-fg aria-selected:bg-panel-2 aria-selected:text-fg"
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-bg">
          <div className="flex h-10 items-center gap-4 border-b border-line px-4 font-mono text-xs text-muted">
            <span className="flex gap-1.5">
              <i className="size-2.5 rounded-full bg-line-2" />
              <i className="size-2.5 rounded-full bg-line-2" />
              <i className="size-2.5 rounded-full bg-line-2" />
            </span>
            <span>~/work/acme-web</span>
            <span className="ml-auto hidden sm:inline">2 running · 1 waiting on you</span>
          </div>
          <div
            key={active}
            role="tabpanel"
            className="min-h-85 animate-fade-in px-4 py-5 sm:min-h-95 sm:px-7 sm:py-7"
          >
            {tabs[active]?.panel}
          </div>
        </div>
      </Figure>
    </Container>
  );
}
