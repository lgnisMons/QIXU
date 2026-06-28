# QIXU — Codex Handoff Specification
Version: v0.1
Status: ACTIVE
Owner: Architecture Layer (ChatGPT)

---

## 1. Project Definition

QIXU is an AI-native education system composed of:

- Traditional tutoring system (human teachers)
- AI learning assistant
- AI tool training system (Claude Code / LangGraph oriented)
- Exam + growth tracking system
- Future expansion: training camps / recommendation system / admin system

It is NOT:
- A simple tutoring website
- A course marketplace
- A static content site

It is:

> A modular AI-driven education operating system.

---

## 2. Core Philosophy

### 2.1 Growth Sequence Model

All user experience is based on:

> Input → Learning → Feedback → Growth → Recommendation

Everything must map to this loop.

---

### 2.2 System Stability Rule (ABSOLUTE)

The architecture must never drift.

Rules:

- docs/ is IMMUTABLE (never add new docs files)
- specs/ is ITERABLE (feature definition lives here)
- tasks/ is EXECUTION LAYER (Claude/Codex uses this)
- apps/ is IMPLEMENTATION (Next.js code only)
- decisions/ is ARCHITECTURE HISTORY (ADR log)

---

### 2.3 RFC First Rule

No structural or system-level change is allowed without:

> RFC (Request for Change)

No direct modification of:
- docs/
- architecture
- core workflows

---

### 2.4 Specification-First Development

Codex MUST always follow:

1. Read spec
2. Convert to tasks
3. Execute tasks
4. Validate against acceptance criteria

Never directly implement features from vague prompts.

---

## 3. Repository Structure (FINAL)

---

## 4. docs/ Layer (IMMUTABLE SYSTEM)

Contains exactly 6 files:

- 00_CONSTITUTION.md
- 01_BRAND.md
- 02_PRODUCT.md
- 03_DESIGN.md
- 04_ENGINEERING.md
- 05_OPERATION.md

Rules:
- NEVER create new files here
- NEVER split into sub-docs
- ONLY update via RFC approval

---

## 5. specs/ Layer (FEATURE DEFINITIONS)

Each feature must have:

Example:

- 001-home
- 002-ai-assistant
- 003-growth
- 004-teacher-system

Each spec must include:

- Goal
- User story
- Flow
- UI behavior
- Data requirements
- API needs
- Acceptance criteria

---

## 6. tasks/ Layer (EXECUTION LAYER)

Each spec is broken into tasks:

Rules:

- Each task = atomic execution unit
- Must be implementable in one Codex run
- Must include acceptance check

---

## 7. AI Execution Model

Codex / Claude MUST follow:

### Input:
spec → tasks → implementation

### Output:
- code
- tests (if applicable)
- minimal explanation
- commit-ready changes

No speculation allowed.

---

## 8. .claude Runtime Layer

Contains:

- agents/
- skills/
- commands/

### Agents:
- product
- frontend
- backend
- reviewer
- AI (optional orchestration)

Designer is NOT an agent.

### Skills:
- nextjs
- tailwind
- shadcn
- supabase
- langgraph
- seo
- ui-system
- motion

Skills are reusable capabilities.

---

## 9. Decision System (ADR)

All architectural decisions must be recorded:

Examples:
- database choice
- monorepo structure
- AI orchestration approach

---

## 10. Development Flow (ABSOLUTE RULE)

1. Read docs (system rules)
2. Read spec
3. Generate tasks
4. Execute tasks
5. Validate against acceptance criteria
6. Commit
7. Update ADR if needed

---

## 11. AI Development Constraints

Codex MUST NOT:

- Directly modify docs/ structure
- Skip spec layer
- Implement without task breakdown
- Mix UI + architecture decisions in code
- Add new frameworks without RFC

---

## 12. Current State (v0.1)

Status:

- Repository initialized
- Structure complete
- Engineering foundation pending
- First feature not yet implemented

Next step:

> Sprint-001: Engineering Foundation (Next.js setup)

---

## 13. Immediate Next Action for Codex

Codex should:

1. Initialize Next.js in apps/web
2. Install UI stack:
   - Tailwind
   - shadcn/ui
   - framer-motion
3. Setup monorepo structure
4. Prepare design token system
5. Ensure empty homepage runs

NO business logic allowed.

---

END OF SPEC