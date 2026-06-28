# Feature: 001 - Homepage & App Shell

**Version:** v1.0
**Status:** READY FOR DEVELOPMENT
**Sprint:** UI Sprint 001
**Depends On:** Engineering Foundation (complete)

---

## Goal

Establish the application shell: theme provider, root layout structure, core shadcn/ui components, navigation, footer, and a rendered homepage with placeholder sections. No business data, no real content, no Supabase. Pure UI scaffolding.

## User Story

As a developer preparing for feature sprints, I need the app shell and core UI components in place so that subsequent feature specs can implement content without rebuilding layout infrastructure.

## Flow

N/A — this is structural, not user-facing flow.

## UI Behavior

### Root Layout
- HTML lang set properly
- Body with antialiased text, background/foreground from semantic tokens
- Theme provider wrapping children (light/dark mode support via class)
- No content jump on hydration

### Navigation Bar
- Fixed or sticky top navigation
- Logo placeholder "QIXU 启序" on left
- Navigation links: 首页, 学业成长, AI能力, 创新训练营, 成长成果, 导师团队, 学习资源, 关于启序
- Theme toggle button (sun/moon icon)
- Mobile: hamburger menu that opens a sheet/drawer
- Links are non-functional placeholders (href="#") for now

### Homepage Sections (empty placeholders)
Each section is a full-width container with:
1. Hero section (placeholder height)
2. Dual CTA entry (学业入口 / AI能力入口)
3. Core values section
4. Academic growth center placeholder
5. AI academy placeholder
6. Bootcamp placeholder
7. Growth achievements placeholder
8. Teachers placeholder
9. Resources placeholder
10. Testimonials placeholder
11. CTA/contact placeholder
12. Footer

Sections have proper vertical spacing (py-16/py-24) and container width constraint. Content is placeholder text only.

### Footer
- Brand name and slogan
- Navigation column links (placeholder)
- Copyright notice
- Links to terms/privacy (placeholders)

### Core shadcn/ui Components
Initialize the following base components via shadcn CLI:
- Button
- Card
- Input
- Sheet (for mobile menu)
- Dropdown Menu (for theme toggle)
- Separator
- Badge
- Typography (basic heading/text components)

### Theme Toggle
- Button that switches between light/dark mode
- Uses next-themes
- Persists in localStorage
- Respects system preference on first visit
- No flash on page load (suppressHydrationWarning)

## Data Requirements

None. All content is placeholder. No database, no API calls.

## API Needs

None. No Supabase in this sprint.

## Technical Requirements

1. Install `next-themes` for theme management
2. Install `@radix-ui/react-slot` (already installed via shadcn dependencies)
3. Add shadcn components via CLI
4. Create layout components in `src/components/layout/`:
   - `site-header.tsx`
   - `site-footer.tsx`
   - `theme-provider.tsx`
   - `theme-toggle.tsx`
   - `mobile-nav.tsx`
5. Create section components in `src/components/sections/`:
   - `hero-section.tsx`
   - (other section placeholders)
6. All sections use semantic color tokens, no hardcoded colors
7. Responsive: mobile-first, proper breakpoints
8. Use framer-motion for subtle entrance animations (optional at this stage)

## Acceptance Criteria

- [ ] `pnpm dev` starts without errors
- [ ] Homepage renders with all placeholder sections visible
- [ ] Navigation bar shows all 8 nav links + logo + theme toggle
- [ ] Mobile menu opens/closes (Sheet component)
- [ ] Theme toggle switches between light/dark mode
- [ ] No flash of incorrect theme on page load
- [ ] Footer renders at bottom
- [ ] All sections use semantic color tokens (no raw hex/rgb)
- [ ] Responsive layout works at mobile (375px) and desktop (1440px)
- [ ] TypeScript typecheck passes
- [ ] ESLint passes
- [ ] No business content/data
- [ ] No Supabase
- [ ] Core shadcn/ui components available for use in future sprints
