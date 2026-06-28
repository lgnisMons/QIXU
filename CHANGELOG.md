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
- Sprint-004: Authentication & Growth Profile
- Sprint-005: AI Assistant module
- Sprint-006: Supabase integration
