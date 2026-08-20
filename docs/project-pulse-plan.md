1) Summary
Mona's Project Pulse is a small, static dashboard inside the repo that reads a local JSON file of projects and renders a first-view dashboard of project cards (badges, priorities, status, owner, due dates). The plan produces a lightweight, accessible, responsive HTML/JS/CSS implementation (no framework required), a static sample data file, and a Codespace-friendly .vscode/launch.json so learners can open app/index.html directly. Designer supplies deterministic CSS hooks and visuals; Coder implements HTML/JS/data and the launch configuration; Planner/Orchestrator manage spec, validation and sequencing.

2) Ordered implementation steps
1. Spec & contract — Create the short technical spec with data schema and CSS hook names. (Owner: Planner)  
   Deliverable: small spec file that both Designer and Coder follow (fields required, class names, behavior for badges/priority, error states).
2. Create static sample data — Implement app/project-data.json using the agreed schema with 6 sample projects covering statuses, priorities, owners, and edge cases (missing due date, very long title). (Owner: Coder)
3. Designer: CSS & visual tokens — Implement app/styles.css adhering to the spec: class hooks (.dashboard, .project-card, .project-list, .badge, .priority-high/medium/low, .filter-bar). Provide color palette, spacing scale, and an accessible contrast baseline. Include a small README comment at top describing hooks. (Owner: Designer)
4. Coder: HTML skeleton & client logic — Implement app/index.html and app/main.js: minimal semantic HTML shell, fetch app/project-data.json, render cards into .dashboard, implement client-side sorting/filtering (by status and priority), and graceful error UI when JSON fails or is empty. Add light keyboard support for filters. (Owner: Coder)
5. Coder: VS Code launch config — Add .vscode/launch.json with cwd set to ${workspaceFolder}/app and set index.html as the visible entry so Codespaces/VS Code Live Server or Debugger will open the app. (Owner: Coder)
6. Integrate and polish accessibility/responsiveness — Joint step: Designer and Coder iterate on visuals/HTML/JS to ensure responsive grid, accessible labels/aria, keyboard nav, and no layout break with long text. (Owners: Designer + Coder)
7. QA, validation, docs — Planner/Orchestrator run the validation checklist, update docs (brief run steps and schema note), and fix any regressions. Add docs/project-pulse-plan.md (final plan) and optionally an entry in README.md noting where to launch. (Owner: Planner/Orchestrator)
8. Final review & handoff — Merge instructions, acceptance sign-off, and notes for future enhancements (server data, pagination). (Owner: Orchestrator)

3) File assignments
Step 1 (Spec & contract) — files to create/modify:
- docs/project-pulse-spec.md (Planner)

Step 2 (Sample data) — files to create/modify:
- app/project-data.json (Coder) — REQUIRED

Step 3 (Designer CSS) — files to create/modify:
- app/styles.css (Designer) — REQUIRED

Step 4 (HTML + client logic) — files to create/modify:
- app/index.html (Coder) — REQUIRED
- app/main.js (Coder)

Step 5 (VS Code launch) — files to create/modify:
- .vscode/launch.json (Coder) — REQUIRED (set cwd to ${workspaceFolder}/app and open index.html)

Step 6 (Integration & polish) — files to create/modify:
- app/styles.css (Designer) — tweak as needed
- app/index.html (Coder) — tweak as needed
- app/main.js (Coder) — tweak as needed

Step 7 (QA/docs) — files to create/modify:
- docs/project-pulse-plan.md (Planner) — final plan file (filename suggested at end)
- README.md (optional, Planner) — small note on how to open the app in Codespaces
- docs/validation-checklist.md (Planner) — optional

Step 8 (Final review) — no new files required; merge/pr checklist in PR description (Orchestrator)

Notes:
- Ensure these four required files are included exactly: app/index.html, app/styles.css, app/project-data.json, .vscode/launch.json.
- Ownership is explicit to avoid edit conflicts.

4) Dependencies
- Step 1 (Spec) is a blocker for all implementation work — Designer and Coder must have the spec before implementing to avoid mismatched hooks. (Blocker)
- Step 2 (project-data.json) depends on Step 1.
- Step 3 (styles.css) depends on Step 1.
- Step 4 (index.html + main.js) depends on Step 1 and Step 2 (data schema). The Coder can scaffold HTML before data exists, but integration requires the schema to be final. (Partial blocker)
- Step 5 (.vscode/launch.json) can run after Step 4 or in parallel; depends only on app/ path existing.
- Step 6 (integration) depends on Steps 2–5 being in place.
- Step 7 (QA/docs) depends on Step 6 completion.
Cross-agent dependencies:
- Designer depends on Planner to define CSS hooks and fields; Coder depends on Planner for data schema. Marked as blockers until Step 1 is done.

5) Work that can run in parallel
(Only list steps that have no file overlap or data dependency beyond Step 1)
- After Step 1 (spec):
  - Step 2 (Coder creates app/project-data.json) — no file overlap.
  - Step 3 (Designer creates app/styles.css) — no file overlap.
  - Step 4 (Coder scaffolds app/index.html and app/main.js) — can begin in parallel, but must follow schema and hooks from Step 1. To avoid conflicts, Coder should not edit app/styles.css.
  - Step 5 (.vscode/launch.json by Coder) — independent.
These four can be assigned concurrently as long as the spec is shared and followed. Ensure each owner only edits their files to avoid merge conflicts.

6) Designer responsibilities (checklist)
- Produce app/styles.css following spec with deterministic hooks:
  - Required class hooks: .dashboard, .project-list, .project-card, .project-title, .project-meta, .badge, .priority-high, .priority-medium, .priority-low, .filter-bar, .empty-state.
- Provide accessible color tokens and badge styles; meet WCAG AA contrast for primary text.
- Provide responsive grid: 1 column (mobile) → 2 columns (tablet) → 3+ columns (desktop).
- Include small style notes at top of styles.css describing allowed class names and modifier classes.
- Keep CSS atomic enough for the Coder to rely on class names; avoid changing markup expectations without coordination.
- Provide a 1–2 screenshot or style sample (optional) or a CSS-only mock that shows final look.

7) Coder responsibilities (checklist)
- Create app/project-data.json with sample projects (6 entries) that adhere to the schema in Step 1.
  - Include fields: id, title, description, owner (name, avatarUrl optional), status (proposal, active, blocked, done), priority (high|medium|low), dueDate (ISO or null), tags (array), progress (0-100).
  - Include a short schema comment in docs/project-pulse-spec.md.
- Implement app/index.html (semantic, accessible structure).
  - Hook into .dashboard and .filter-bar classes from CSS spec.
  - Keep HTML minimal so Designer styles can apply cleanly.
- Implement app/main.js to:
  - Fetch project-data.json with fetch(); handle fetch errors and empty arrays.
  - Render project cards in DOM using the class hooks.
  - Implement client-side sort/filter controls (status, priority) and a simple text search.
  - Provide graceful empty-state and error-state UI.
  - Avoid heavy frameworks; keep code readable for learners.
- Add .vscode/launch.json with cwd: ${workspaceFolder}/app and visible entry index.html (so Codespaces opens the app).
- Ensure no console errors and basic keyboard accessibility for controls.

8) Validation expectations (tests and acceptance criteria)
Manual checks (must pass):
- Launch: Open Codespace/VSCode with .vscode/launch.json — launching should open app/index.html in the live preview/browser and show the dashboard.
- Data: At least 6 sample projects render as project cards; sample covers high/medium/low priority and multiple statuses.
- Interactivity: Filters (status, priority) and search produce expected results; sorting works.
- Error handling: If app/project-data.json is missing or 404, user-friendly error message appears in .dashboard (no uncaught exceptions in console).
- Empty data: If JSON is an empty array, an .empty-state UI appears with a helpful message.
- Responsiveness: Cards reflow to 1 column at small widths and to multi-column grid at larger widths.
- Accessibility: Filter controls have labels, interactive elements are keyboard-focusable, color contrast passes AA for primary text.
- No console errors/warnings on page load and during interactions.
Automated/smoke tests (optional):
- A test script that fetches app/project-data.json and asserts JSON.parse and length >= 4.
Acceptance:
- All manual checks pass; Designer provides CSS screenshot; Coder provides basic run instructions and .vscode/launch.json works in Codespaces.

9) Edge cases & risks
- JSON fetch fails (404, network error) — must show friendly error and retry instructions.
- Malformed data (missing fields, null owner, invalid date) — renderer should fallback gracefully (e.g., "Unassigned", "No due date", "Unknown status").
- Very long titles/descriptions — ensure truncation with ellipsis or controlled wrapping so cards don't break layout.
- Large number of projects — client-side rendering of 100s may be slow; flag for future pagination/virtualization.
- Avatar images broken — fallback to initials or placeholder.
- Conflicting edits to shared files (especially app/styles.css) — avoid by strictly owning files per role.
- Designer/Coder disagreement about class names — minimize via explicit spec Step 1.
- Launch config differences across OS — ensure .vscode/launch.json uses workspace variable and relative paths; test in Codespace.
- Accessibility regressions from visual polish — require accessibility checks in Step 6.

10) Open questions (need decisions before work begins)
- Data format finalization: confirm required fields and types (Planner already drafts; confirm acceptance). Example: should dueDate be ISO string or timestamp?
- JS approach: permit vanilla JS only, or permissible to use a minimal utility lib (e.g., preinstalled micro-lib)? (Default: vanilla)
- Do we want any persistent state (filters saved) across reloads? (Default: no)
- Is there a preferred color palette or brand tokens to follow from Mona? (Designer input)
- Should images (avatars) be local assets or remote URLs in the JSON? (Prefer remote URLs with local fallback)
- Are additional build tools permitted (npm, bundlers)? (Default: no — keep static)
- Should we include unit tests or a headless test (optional future work)?

Parallelization summary (who does what concurrently)
- After Step 1:
  - Designer: Step 3 (app/styles.css) — owns styles only
  - Coder: Step 2 (app/project-data.json) — owns data only
  - Coder: Step 4 (app/index.html & app/main.js) — owns HTML/JS only
  - Coder: Step 5 (.vscode/launch.json) — independent
These four tasks have no overlapping files and can be done concurrently provided everyone follows spec.

Work that must run sequentially
- Step 1 (Spec) first. Step 6 (integration) after Steps 2–5. Step 7 after integration.

Validation sign-off criteria
- Planner/Orchestrator will sign off when the acceptance checks in section 8 pass and Designer provides final CSS snapshot, and Coder confirms launch config opens index.html in Codespaces.

Final note for the Coder about .vscode/launch.json
- It must include "cwd": "${workspaceFolder}/app" and configure the default URL to open index.html (or set a Live Server configuration). This is required for an easy Codespace run.

Open-file for future PR
- Add docs/project-pulse-plan.md (the final plan file).