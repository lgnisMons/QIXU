# QIXU 启序 — Changelog

## v0.1.0 — 2026-06-28

### Foundation Layer Complete

**Engineering Foundation (TASK-0002)**
- Initialized Next.js 15 monorepo with pnpm workspaces
- Configured TypeScript, ESLint, Tailwind CSS, Prettier
- Created packages: `@qixu/ui`, `@qixu/config`, `@qixu/types`, `@qixu/utils`
- Set up design tokens with HSL CSS variables (light/dark mode)
- Configured shadcn/ui base components (Button, Card, Input, Badge, Separator, Sheet, DropdownMenu)
- Installed dependencies: next-themes, lucide-react, framer-motion, zod, react-hook-form

**Design Foundation (TASK-0003)**
- Implemented QIXU Design System v1.0
- Complete semantic color token system with light/dark modes
- Typography system (heading hierarchy, body text, mono font)
- Shadow and radius design tokens
- Framer Motion standard transitions configuration
- Base components: Container, Section (with SectionHeader/Title/Description)
- Design Showcase page at `/design-system`
- `prefers-reduced-motion` accessibility support

**Global Layout (TASK-0004)**
- Refactored SiteHeader with active state navigation
- Responsive mobile navigation (Sheet drawer)
- Updated SiteFooter with contact information (email, phone, address, hours)
- Created PageContainer and PlaceholderPage components
- Homepage Hero section (full first screen)
- Placeholder routes:
  - `/` — Homepage (Hero)
  - `/ai` — AI 能力学院
  - `/tutor` — 导师团队
  - `/tools` — 学习工具
  - `/community` — 成长社区
  - `/about` — 关于启序
  - `/contact` — 联系我们
  - `/design-system` — Design System showcase

### Project Structure

```
QIXU/
├── apps/web/              # Next.js application
│   └── src/
│       ├── app/           # App Router pages
│       ├── components/    # App-specific components
│       └── lib/           # Utilities and config
├── packages/
│   ├── ui/                # Shared UI components (@qixu/ui)
│   ├── config/            # Shared config (@qixu/config)
│   ├── types/             # Shared types (@qixu/types)
│   └── utils/             # Shared utilities (@qixu/utils)
├── docs/                  # Project documentation
├── specs/                 # Feature specifications
└── decisions/             # Architecture Decision Records
```

## v0.2.0 — 2026-06-28

### Brand Homepage Complete (Sprint-003 / TASK-0005)

**8 Homepage Sections Implemented:**
- **Hero** — Full-height banner with brand tagline "启于今日，序向未来", CTAs, feature indicators
- **Trust** — Social proof (50,000+ learners, 500+ mentors, 98% satisfaction, 30+ subjects)
- **Growth Sequence** — Core brand philosophy visualized (启蒙 → 序章 → 未来) with Framer Motion
- **Four Core Capabilities** — AI 学习助手, 导师全程指导, 成长档案, 个性化路径 with icon cards
- **Tutor Team** — 6 mock tutor profiles with specialties and bios
- **AI Showcase** — 3 AI capabilities (智能诊断, 自适应学习, 成长预测) with LangGraph extension points
- **Success Stories** — 3 placeholder testimonials with Supabase extension points
- **Final CTA** — Primary-branded call-to-action section

**Technical Highlights:**
- All sections built with `@qixu/ui` design system components (Section, Container, Card, Badge, Button)
- Semantic design tokens only (no hardcoded colors)
- Framer Motion animations: stagger, fade-in-up, card hover (subtle, respects `prefers-reduced-motion`)
- Mock data layer at `apps/web/src/lib/mock-data.ts` with typed interfaces for future Supabase/LangGraph
- Responsive: mobile-first, breakpoints at 640px/768px/1024px/1280px
- TypeScript typecheck passes

**Files:**
- `apps/web/src/app/page.tsx` — Updated to compose 8 sections
- `apps/web/src/components/sections/` — 8 new section components
- `apps/web/src/lib/mock-data.ts` — Mock data with extension point interfaces

### Next Steps
- Sprint-005: Authentication & Growth Profile
- Sprint-006: AI Assistant module
- Sprint-007: Supabase integration

## v0.3.0 — 2026-06-28

### Reality Layer Complete (Sprint-004 / TASK-0006)

**Objective:** Transform homepage from marketing prototype into trustworthy beta product.

**Key Changes:**

| Before | After |
|--------|-------|
| Fake stats (50,000+, 98%) | 4 capability badges (AI助手/导师/档案/志愿规划) |
| 6 fake tutor profiles | 2 real profiles (杨老师 x2) + recruitment card |
| Fake partner logos (清华/北大...) | Removed entirely |
| Static AI cards | Interactive mock workflow (上传→分析→建议) |
| Fake testimonials | "首批成长故事招募中" CTA |
| Hardcoded footer contact | Centralized `@qixu/config/site` config |

**New Features:**
- **Quick Growth Assessment** — Hero right panel: select grade/target/subject → mock analysis result
- **Interactive AI Workflow** — Clickable 3-step flow with expandable detail cards
- **Centralized Site Config** — `packages/config/src/site.ts`: site identity, SEO, contact, navigation, social links, footer — all UI consumes this

**Technical Highlights:**
- No fabricated people, metrics, or endorsements
- All mock content clearly marked as replaceable
- Contact info: centralized, configurable (no hardcoded values)
- Assessment flow: mock-only, no LLM integration
- SEO metadata: keywords naturally included (深圳家教, AI学习助手, AI工具课堂, 高考志愿推荐)
- TypeScript typecheck passes

**Files Changed:**
- `packages/config/src/site.ts` — New centralized config
- `packages/config/src/index.ts` — Export site config
- `packages/config/package.json` — Add site export
- `apps/web/src/app/layout.tsx` — SEO metadata with keywords
- `apps/web/src/components/layout/site-footer.tsx` — Config-driven footer
- `apps/web/src/lib/navigation.ts` — Re-export from config
- `apps/web/src/lib/mock-data.ts` — Real data rewrite
- `apps/web/src/components/sections/hero-section.tsx` — +Assessment card
- `apps/web/src/components/sections/trust-section.tsx` — Capability badges
- `apps/web/src/components/sections/tutor-team-section.tsx` — Real tutors + recruitment
- `apps/web/src/components/sections/ai-showcase-section.tsx` — Interactive workflow
- `apps/web/src/components/sections/success-stories-section.tsx` — Recruitment CTA
- `specs/004-reality-layer/README.md` — Spec document

### Next Steps
- Sprint-006: Authentication & Growth Profile
- Sprint-007: AI Assistant module
- Sprint-008: Supabase integration

## v0.4.0 — 2026-06-28

### Platform Foundation Complete (Sprint-005 / TASK-0007)

**Objective:** Transform QIXU from marketing website into scalable education platform — no business logic, no DB, no AI.

**1. Global Configuration (6 modular files)**
`@qixu/config/brand|contact|navigation|seo|social` + `/site` umbrella.

**2. Route Foundation (8 stable routes)**
`/`, `/ai`, `/tutor`, `/tools`, `/community`, `/about`, `/contact`, `/dashboard` — each with metadata.

**3. Shared Page Templates (5 new in `@qixu/ui`)**
`PageHeader`, `PageSection`, `PageCTA`, `Breadcrumb`, `EmptyState`.

**4. Mock Data (`@qixu/mock`)**
`teachers`, `courses`, `growth`, `assessment`, `community` — typed, no JSON.

**5. Zod Schemas (`@qixu/schemas`)**
`teacher`, `course`, `growth`, `assessment` — inferred types.

**6. SEO Foundation**
OG, Twitter Card, JSON-LD, `robots.ts`, `sitemap.ts`, `manifest.ts`.

**7. Engineering**
`ROUTES` constants, config-driven, full type safety, 7 packages typecheck clean.

### Next Steps
- Sprint-007: Authentication & Growth Profile
- Sprint-008: AI Assistant module
- Sprint-009: Supabase integration

## v0.5.0 — 2026-06-28

### Domain-Driven Architecture Complete (Sprint-006 / TASK-0008)

**Objective:** Domain-Driven Architecture to support scalable AI education features. No UI changes — system-level only.

**1. Contracts Layer — New `@qixu/contracts`**
Pure TypeScript interfaces: `LearningPlan`, `TutorMatch`, `AIRecommendation`, `GrowthReport`, `AssessmentResult`, `UserProfile`.

**2. Domain Layer — New `@qixu/domain` (6 self-contained domains)**
`learning`, `tutor`, `ai`, `growth`, `assessment`, `user` — each with types + mock services. No direct cross-domain imports of internal logic.

**3. Domain Runtime — New `@qixu/domain-runtime`**
6 simulation scenarios: onboarding, AI diagnostic, tutor matching, assessment, learning path generation, growth reports. All mock — ready for Supabase + LangGraph swap.

**4. Page → Domain Mapping**
`/ai`→ai, `/tutor`→tutor, `/dashboard`→growth+user, `/tools`→ai+assessment.

**5. Engineering**
No business logic in React components. Mock first, real backend later. 10 packages typecheck clean.

### Next Steps
- Sprint-008: Authentication & Growth Profile
- Sprint-009: AI Assistant module
- Sprint-010: Supabase integration

## v0.6.0 — 2026-06-28

### Learning Assessment Complete (Sprint-007 / TASK-0009)

**Objective:** Build the first interactive AI capability — Learning Assessment. Multi-step workflow with mocked logic. No LLM, no backend, no database.

**1. Assessment Domain Enhancement**
`engine.ts` — mock engine (profile, strengths/weaknesses, suggested plan, tutor recommendation). `report.ts` — structured report generator with 6 section types.

**2. Multi-Step Assessment Form** (5 steps)
Grade → Subjects & Scores → Learning Goals → Study Habits → Review & Submit. With progress bar, animations, score sliders.

**3. Reusable Assessment Report Component**
6 sections: Learning Snapshot, Strength Analysis, Weakness Analysis, Growth Suggestions (phased plan), Next Step (CTA), Growth Timeline. Plus AI notes footer.

**4. New Routes:** `/assessment` + `/result` — fully responsive.

**5. Engineering**
Assessment logic in domain layer. React components presentation-only. 10 packages typecheck clean. Extension point for LangGraph in Sprint-010+.

### Next Steps
- Sprint-008: Authentication & Growth Profile
- Sprint-009: AI Assistant module
- Sprint-011: Supabase integration

## v0.7.0 — 2026-06-28

### Admission Foundation Complete (Sprint-010 / TASK-0010)

**Objective:** Build the knowledge foundation for the future AI Admission Recommendation System. No AI model, no external APIs, no real datasets — only architecture, schemas, mock data and recommendation rules.

**1. Knowledge Domain — 4 files**
| File | Contents |
|------|----------|
| `types.ts` | University, Major, AdmissionRecord, StudentProfile schemas + recommendation types |
| `repository.ts` | 10 mock universities, 15 majors, 35 admission records (Guangdong 2025) |
| `service.ts` | 8-rule recommendation engine (Reach, Match, Safe, Budget, City, Major, Employment, Risk) |
| `index.ts` | Public API |

**2. University Schema — 10 Fields**
id, name, province, city, tier (985/211/双一流/普通本科/专科), type, tags, website, description.

**3. Major Schema — 6 Fields**
id, name, category (10 categories), employmentDirection, graduateDirection, popularity (1-10).

**4. AdmissionRecord Schema — 9 Fields**
year, province, subjectType (物理类/历史类), universityId, majorId, lowestScore, lowestRank, quota, tuition.

**5. StudentProfile Schema — 10 Fields**
province, score, rank, budget, careerPreference, majorPreference, cityPreference, adjustmentAccepted, cooperativeProgramAccepted, familyFinancialLevel.

**6. Recommendation Rule Engine (8 rules)**
Reach (冲) · Match (稳) · Safe (保) · Budget · City · Major · Employment · Risk. Each rule produces 0-1 score + pass/fail verdict. Composite weighted scoring with tier classification.

**7. Mock Repository** — 10 Guangdong universities × 15 majors × 35 admission records. Repository access functions with filter support.

**8. Engineering** — Domain self-contained. All logic in domain layer. 10 packages typecheck clean. Ready for AI-powered recommendation in Sprint-012.

### Next Steps
- Sprint-008: Authentication & Growth Profile
- Sprint-009: AI Assistant module
- Sprint-011: Supabase integration

## v0.8.0 — 2026-06-28

### Admission MVP Complete (Sprint-011 / TASK-0011)

**Objective:** Launch the first public version of QIXU Admission Recommendation. Prioritize usability and launch speed. Guangdong only for MVP.

**1. Multi-Step Admission Form** (`/admission`)
3 steps: Score & Rank → Preferences (budget, city, major, career) → Review (adjustment, cooperative) & Submit. Responsive with progress bar and animations.

**2. Recommendation Result Page** (`/admission-result`)
Calls `runRecommendationEngine()` from knowledge domain. Displays full analysis.

**3. Recommendation Report Component**
Sections: Student Profile Card, Reach/Match/Safe grouped listings, **Cost Analysis** (tuition + living costs + 4-year estimate), Career Development Suggestions. Each recommendation card shows score breakdown, pass/fail indicators, collapsible rule details.

**4. Cost Analysis (Key Differentiator)**
Per-recommendation cost: tuition, estimated living cost (city-based lookup), 4-year total. Budget compatibility indicators. Tabular comparison.

**5. SEO Landing Page**
Target keywords: 高考志愿推荐, AI志愿填报, 免费志愿推荐, 高考分数能上什么大学, 高考位次推荐. OG metadata configured.

**6. Domain-Runtime Integration**
New `simulateAdmissionRecommendation()` scenario in `@qixu/domain-runtime` — orchestrates knowledge engine + growth records.

**7. Engineering**
All recommendation logic in knowledge domain. React components presentation-only. Engine replaceable. 10 packages typecheck clean. Ready for public beta launch.

### Next Steps
- Sprint-008: Authentication & Growth Profile
- Sprint-009: AI Assistant module
- Sprint-011: Supabase integration
