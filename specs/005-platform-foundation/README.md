# Feature: 005 — Platform Foundation

**Version:** v1.0
**Status:** READY FOR DEVELOPMENT
**Sprint:** Sprint-005 / TASK-0007
**Depends On:** Sprint-004 (Reality Layer)

---

## Goal

Transform QIXU from a marketing website into a scalable education platform foundation. No business logic, no database, no AI integration — only platform architecture.

## Sections

### 1. Global Configuration
- Split `packages/config/src/site.ts` into modular files:
  - `site.ts` — site identity
  - `navigation.ts` — main nav, footer nav
  - `brand.ts` — brand constants
  - `contact.ts` — contact info
  - `seo.ts` — SEO metadata defaults
  - `social.ts` — social links
- All UI must consume configuration instead of hardcoded values.

### 2. Route Foundation
- Create stable routes: `/`, `/ai`, `/tutor`, `/tools`, `/community`, `/about`, `/contact`, `/dashboard`
- Each page uses shared layout, includes metadata, and follows Design System.

### 3. Shared Page Template
- Create reusable components in `packages/ui`: PageHeader, PageSection, PageContainer, PageCTA, Breadcrumb, EmptyState
- Standard building blocks for all pages.

### 4. Mock Data Layer
- Create `packages/mock/` with: teachers.ts, courses.ts, growth.ts, assessment.ts, community.ts
- Typed interfaces, no JSON files.

### 5. Schema Layer
- Create `packages/schemas/` with: teacher.ts, course.ts, growth.ts, assessment.ts
- Use Zod, export inferred TypeScript types.

### 6. SEO Foundation
- Metadata API, OpenGraph, Twitter Card, JSON-LD Organization, canonical URLs
- robots.ts, sitemap.ts, favicon, manifest

### 7. Engineering
- No duplicated constants, route names, or metadata. Everything configurable.

## Acceptance Criteria
- [ ] All routes render
- [ ] Metadata is configured
- [ ] Configuration layer exists
- [ ] Mock data layer exists
- [ ] Zod schemas compile
- [ ] Shared page template is reusable
- [ ] Ready for Sprint-006
