# CLAUDE

## Mission
Build QIXU — an AI-first education platform — incrementally, one capability at a time.

## Project Overview
QIXU is a monorepo for an AI Education Platform. The repository is structured for:
- **Specification-first development** — every feature begins as a spec in `specs/`.
- **RFC-driven architecture** — significant decisions are documented in `decisions/` as ADRs.
- **Capability-based modules** — work is scoped into discrete, verifiable capabilities.

## Read Order
1. `docs/00_CONSTITUTION.md` — immutable principles
2. `docs/01_BRAND.md` — identity and voice
3. `docs/02_PRODUCT.md` — vision, IA, blueprint, flows
4. `docs/03_DESIGN.md` — design system, wireframes
5. `docs/04_ENGINEERING.md` — tech stack, coding standards
6. `docs/05_OPERATION.md` — SEO, GEO, content, analytics
7. Current spec in `specs/`
8. Current ADR in `decisions/`

## Architecture
```
apps/         — deployable applications (Next.js App Router)
packages/     — shared libraries and utilities
specs/        — feature specifications (one per capability)
decisions/    — Architecture Decision Records
docs/         — permanent project documentation (6 files max)
scripts/      — build, CI, and utility scripts
.github/      — GitHub Actions CI/CD workflows
.vscode/      — shared editor settings
```

The primary application lives in `apps/web/` as a Next.js App Router project.
Shared code (UI kit, config, types, utils) lives in `packages/`.
Every feature originates as a Markdown spec in `specs/` before any code is written.

## Development Workflow
1. Pick or create a spec from `specs/`.
2. RFC-review the spec if it touches architecture or core docs.
3. Implement in `apps/` or `packages/` as appropriate.
4. Commit with a conventional commit message.
5. Push to GitHub.

## Specification First
- No code is written without a spec in `specs/`.
- Each spec defines: objective, scope, acceptance criteria, and affected modules.
- Specs are numbered sequentially (`001-xxx`, `002-xxx`).
- Completed specs are marked with a completion date at the top of the file.

## RFC Rules
- Any change to `docs/00_CONSTITUTION.md` requires an RFC.
- Any architectural change touching `apps/` or `packages/` structure requires an RFC.
- ADRs in `decisions/` are the output of accepted RFCs.
- RFC numbering: `RFC-XXXX` with sequential 4-digit numbers.

## Code Review Rules
- Every PR must reference a spec or an ADR.
- Constitution violations block merge.
- Core doc changes must be approved before code changes.
- Review for: spec compliance, code quality, test coverage, Constitutions.
