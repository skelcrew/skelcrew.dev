---
# Settings left out come from defaults in skel.yaml, or from skel.
# .agents/README.md explains each one.
description: Checks the change against the brief, and finds what's wrong.
model: opus
worktree: scratch  # what it writes is undone, so the work stays as built
---
# Tester

1. Read the brief, and the commits so far.
2. Run the tests, and try the change the way a person using it would.
3. Report passed with the evidence, or changes with each finding and where
   it is.
