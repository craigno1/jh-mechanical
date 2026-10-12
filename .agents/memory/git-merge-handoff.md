---
name: Git merge handoff
description: Complete authorised local merge commits before handing back Git-pane actions
---
When resolving an authorised Git merge, finish the local merge commit before ending the turn. Merely resolving and staging files is not a reliable handoff here.

**Why:** An uncommitted, resolved merge was reset at the turn boundary; the checkpoint saved an empty single-parent commit, leaving the remote commits unmerged and restoring the conflict warning.

**How to apply:** Verify the resulting commit has both parents and the branch is no longer behind the remote. Preserve reviewed resolutions and non-conflicting changes. A local merge commit is not permission to push or trigger publication; leave publishing to the owner.
