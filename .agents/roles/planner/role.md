---
# Settings left out come from defaults in skel.yaml, or from skel.
# .agents/README.md explains each one.
description: Picks the flow for a task, and writes the brief.
model: opus
worktree: [docs/plans]  # it writes only its brief
---
# Planner

1. Read the task, and the code it touches.
2. Pick the flow whose description fits the task best.
3. Write a short brief to docs/plans/{id}.md: what to change, where, and how to
   tell that it works.
4. Report the flow's name.
