# Feature: 011 — Admission MVP

**Version:** v1.0
**Status:** READY FOR DEVELOPMENT
**Sprint:** Sprint-011 / TASK-0011
**Depends On:** Sprint-010 (Admission Foundation)

---

## Goal

Launch the first public version of QIXU Admission Recommendation. Prioritize usability and launch speed. No full nationwide coverage — Guangdong only for MVP.

## Sections

### 1. Route: `/admission`
Public-facing admission recommendation page.

### 2. Multi-Step Form (3 steps)
| Step | Fields |
|------|--------|
| 1 | Province, Subject Type, Score, Rank |
| 2 | Budget, City Preference, Major Preference, Career Interest |
| 3 | Adjustment Accepted, Cooperative Program Accepted |

### 3. Recommendation Engine
Generate Reach / Match / Safe schools using existing `runRecommendationEngine()` from @qixu/domain/knowledge. Mock data, replaceable engine.

### 4. Cost Analysis (Key Differentiator)
For every recommendation: Tuition, Living Cost, Estimated 4-Year Cost, Budget Compatibility.

### 5. Recommendation Report
Sections: Student Profile, Admission Analysis, Reach, Match, Safe, Cost Analysis, Career Suggestions.

### 6. SEO Landing Page
Target keywords: 高考志愿推荐, AI志愿填报, 免费志愿推荐, 高考分数能上什么大学, 高考位次推荐.

### 7. Engineering
All logic in domain layer. No hardcoded UI logic. Future crawler integration ready.

## Acceptance Criteria
- [ ] `/admission` available
- [ ] Multi-step form works
- [ ] Recommendation report generated
- [ ] Cost analysis included
- [ ] Ready for public beta launch
