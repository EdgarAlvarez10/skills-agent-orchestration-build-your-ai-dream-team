# Agent team

This repository defines a custom agent team for building Mona's Project Pulse dashboard. Each agent's definition lives under .github/agents.

- Orchestrator — model: Claude Opus 4.7 (copilot)
  - Responsibility: Coordinate the Planner, Coder, and Designer; break work into phases, assign file scopes, and verify integration.
  - Definition: .github/agents/orchestrator.agent.md

- Planner — model: Claude Opus 4.7 (copilot)
  - Responsibility: Research the codebase, produce implementation plans, list steps, file assignments, dependencies, and edge cases.
  - Definition: .github/agents/planner.agent.md

- Coder — model: GPT-5.5 (copilot)
  - Responsibility: Implement code, fixes, and runnable app support (e.g., deterministic launch configs); follow file scopes assigned by the Orchestrator.
  - Definition: .github/agents/coder.agent.md

- Designer — model: Gemini 3.1 Pro (copilot)
  - Responsibility: UI/UX, accessibility, visual design and styling for Project Pulse (project cards, badges, responsive layout, and CSS hooks).
  - Definition: .github/agents/designer.agent.md

Note: Work is orchestrated using the GitHub Copilot CLI running in a Codespace. Agents do not stage, commit, or push changes — learners control all git operations.