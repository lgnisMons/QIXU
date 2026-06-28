# Feature: 004 — Reality Layer

**Version:** v1.0
**Status:** READY FOR DEVELOPMENT
**Sprint:** Sprint-004 / TASK-0006
**Depends On:** Sprint-003 (Brand Homepage)

---

## Goal

Transform the QIXU homepage from a marketing prototype into a trustworthy beta product by replacing placeholder content with real, maintainable, and extensible information.

## User Story

As a product owner preparing for public beta, I need the homepage to reflect real information — not fabricated metrics, fake endorsements, or placeholder content — so that visitors trust the product and the team can maintain content through configuration rather than code changes.

## Sections

### 1. Hero
- Keep existing layout
- Add "Quick Growth Assessment" card on the right
- Fields: Grade, Target, Subject (optional)
- "Generate Suggestion" → mocked result panel
- No LLM integration yet

### 2. Trust Section
- Remove fabricated statistics
- Replace with four capability badges: AI 学习助手, 真人导师陪伴, 成长档案, 志愿规划（规划中）

### 3. Tutor Section
- Replace placeholder tutors with real profiles
- Add recruitment card for future tutors
- No fabricated bios

### 4. AI Showcase
- Interactive mock workflow: Upload → Analyze → Growth Suggestion
- Mock JSON data only

### 5. Growth Stories
- Remove fictional testimonials
- Replace with recruitment CTAs

### 6. Footer
- Configurable contact info from shared config
- No hardcoded values

### 7. SEO
- Page metadata with natural keywords
- 深圳家教, AI学习助手, AI工具课堂, 高考志愿推荐

### 8. Configuration
- Centralized `/packages/config/src/site.ts`
- Site name, slogan, contact, nav, social, SEO

## Acceptance Criteria
- [ ] No fabricated people, metrics, or endorsements
- [ ] Contact information centralized in config
- [ ] Hero assessment flow works with mocked data
- [ ] Homepage suitable for public beta
- [ ] Code remains componentized and reusable
- [ ] TypeScript typecheck passes
