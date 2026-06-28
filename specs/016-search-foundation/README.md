# Feature: 016 — Search Foundation (SEO + GEO)

**Version:** v1.0
**Status:** READY FOR DEVELOPMENT
**Sprint:** Sprint-016
**Depends On:** Sprint-012 (Platform Foundation)

## Goal
Establish complete SEO and GEO foundation. QIXU must be discoverable by traditional search engines (百度/Google) and AI answer engines (ChatGPT/Copilot/Perplexity/Gemini).

## Sections

### 1. Metadata Generator
Reusable `packages/seo/` package: title, description, keywords, canonical, OG, Twitter Card.

### 2. Structured Data (JSON-LD)
EducationalOrganization, WebSite, FAQPage, Course, Person.

### 3. SEO Landing Pages
/gaokao-volunteer, /shenzhen-tutor, /ai-study-planner, /ai-tools-course

### 4. Content Foundation
Markdown-based articles/guides/faq in `content/`.

### 5. GEO Readiness
Each page answers one specific user question. Semantic headings + FAQ blocks. Optimized for AI answer engines.

## Acceptance Criteria
- Dynamic metadata system
- sitemap.xml + robots.txt
- JSON-LD enabled
- SEO landing pages available
- GEO-ready content structure
