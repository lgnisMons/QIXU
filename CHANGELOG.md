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

### Next Steps
- Sprint-002: Homepage content sections
- Sprint-003: AI Assistant module
- Sprint-004: Authentication & Growth Profile
