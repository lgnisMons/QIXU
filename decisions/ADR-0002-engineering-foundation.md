# ADR-0002: Engineering Foundation Decisions

**Date:** 2026-06-28
**Status:** Accepted
**Layer:** Engineering

---

## Context

Establishing the engineering foundation for QIXU as a production-ready Next.js monorepo.

## Decisions

### 1. Package Manager: pnpm

**Decision:** Use pnpm as the package manager with hoisted node linker.

**Reason:** pnpm workspaces provide efficient monorepo support. The `node-linker=hoisted` setting was chosen because pnpm's default isolated (symlinked) mode caused broken junction links on Windows, preventing Next.js from resolving `styled-jsx` and other dependencies.

**Consequences:**
- Slightly less strict dependency isolation, but acceptable for this project
- Windows compatibility ensured
- Faster install times due to content-addressable store

### 2. Monorepo Structure: pnpm workspaces with 4 packages

**Decision:**
- `apps/web` - Next.js application
- `packages/ui` - Shared UI component library
- `packages/config` - Shared configuration (Tailwind preset)
- `packages/types` - Shared TypeScript types
- `packages/utils` - Shared utilities (cn, formatDate, etc.)

**Reason:** Clear separation of concerns, reusable across potential future apps (admin, etc.).

### 3. UI Stack

**Decision:** Next.js 15 + React 18 + TypeScript + Tailwind CSS + shadcn/ui + framer-motion + lucide-react

**Reason:** Modern, well-supported stack aligned with the handoff specification. shadcn/ui provides copy-paste components that can be customized; cva for variant management; Tailwind CSS variables for semantic design tokens.

### 4. Form Handling: react-hook-form + zod

**Decision:** Use react-hook-form for form state management with zod for schema validation and @hookform/resolvers for integration.

### 5. Design Token System: HSL CSS Variables

**Decision:** Use HSL-based CSS custom properties for semantic color tokens (primary, secondary, surface, background, success, warning, danger). No business colors at foundation stage.

**Reason:** Enables easy dark mode switching via `.dark` class, consistent with shadcn/ui conventions.

### 6. Code Quality: Prettier + import sorting + EditorConfig + ESLint

**Decision:**
- Prettier with `@ianvs/prettier-plugin-sort-imports` for import sorting
- `prettier-plugin-tailwindcss` for Tailwind class sorting
- EditorConfig for cross-editor consistency
- ESLint via `next/core-web-vitals` and `next/typescript`

### 7. Path Aliases

**Decision:**
- `@/*` → `apps/web/src/*`
- `@qixu/ui/*` → `packages/ui/src/*`
- `@qixu/config/*` → `packages/config/src/*`
- `@qixu/types/*` → `packages/types/src/*`
- `@qixu/utils/*` → `packages/utils/src/*`

### 8. Repository Structure (6-layer)

**Decision:** Follow the 6-layer structure from the handoff:
- `docs/` - 6 immutable system documents
- `specs/` - Feature definitions
- `tasks/` - Execution layer
- `apps/` - Next.js implementation
- `decisions/` - ADR log
- `.claude/` - AI runtime (agents, skills, commands)

**Reason:** Enforces spec-first development and clear separation between system rules, feature definitions, and implementation.

## Alternatives Considered

- **Turborepo**: Rejected for initial setup; pnpm workspaces sufficient. Can be added later if build orchestration needs arise.
- **npm/yarn**: Rejected; pnpm superior for monorepos.
- **Radix UI directly**: shadcn/ui chosen because it wraps Radix with Tailwind styling conventions.
- **Default pnpm linker**: Rejected due to Windows junction resolution issues.

## Consequences

- Supabase intentionally NOT installed per task requirements (deferred to Data Layer Sprint)
- No business logic implemented (engineering foundation only)
- Empty homepage renders successfully at localhost:3000
