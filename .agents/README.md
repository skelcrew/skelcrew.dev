# Flows and roles

skel reads the flows in flows/ and the roles in roles/, and ignores this file.
Each flow explains itself in comments. start in skel.yaml names the flow every
task starts with, and then in a phase hands the task to another flow.

A role is a folder with a role.md: its settings between the --- lines, then its
instructions. skel puts its protocol before them, which explains skel report,
and {id} in them becomes the task's number.
The lead is the role skel serve answers conversations with, as server.role
in skel.yaml says. No flow uses it, and {id} means nothing there.

Every setting is optional:

- description: what the role is for, for people reading the file.
- harness: the harness that runs the role, by its profile's name. A role that
  names its harness names its model too, since the default may not suit it.
- model: the model it uses. Left out, the harness and model come from defaults
  in skel.yaml. auto passes no model, so the harness picks its own.
- worktree: what the role may change, and what happens to it.
  - keep: anything, and its changes are the work. This is the default.
  - a list of folders, such as [docs/plans]: only those.
  - scratch: anything, undone when the phase ends.
