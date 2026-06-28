# Feature: 020 — Ethics & Trust Framework for AI Admission

**Version:** v1.0
**Status:** FROZEN (requires RFC to modify)
**Sprint:** Cross-cutting (apply to all admission features)
**Depends On:** Sprint-005 (Platform), Sprint-010 (Admission Foundation)

---

## Goal

Establish the ethical framework that governs all AI-powered admission recommendation features in QIXU. This is not optional — it is a precondition for any recommendation feature to go live.

---

## 1. Human-in-the-Loop Principles

These five principles are **binding** on all admission-related AI features:

### Principle 1: AI Can Recommend, Not Decide

> AI 可以推荐，不可决定。

- The final choice always belongs to the user (learner + parent/guardian).
- AI recommendations are **advisory only**.
- UI must make it visually clear that the user is making the decision, not the system.
- No "一键填报" (one-click submit) feature without explicit confirmation per choice.

### Principle 2: AI Must Show Its Work

> AI 必须说明依据。

- Every recommendation must include a visible rationale summary.
- Rationale must cover: data source, ranking logic, confidence level, risk flags.
- Users can expand to see the full rule breakdown if desired.
- The question "为什么推荐这个学校？" must have an answer visible on screen.

### Principle 3: No Guarantees or Superlatives

> AI 不得声称"保证录取"或"最佳答案"。

- Forbidden phrases:
  - "保证录取" — Guaranteed admission
  - "最佳选择" — Best choice
  - "最优方案" — Optimal plan
  - "100%录取" — 100% admission rate
- Required phrasing:
  - "根据历年数据推测" — Based on historical data
  - "参考建议" — Reference suggestion
  - "录取概率较高/中等/较低" — Probability qualifiers

### Principle 4: High-Risk Recommendations Require Mentor Flag

> 高风险建议需要导师复核标注。

- Any recommendation with **rank ratio below 0.85** (reach with significant gap) must be flagged.
- Flagged recommendations show: "建议咨询导师后再做决定"
- Future: route to human mentor review queue.

### Principle 5: Data Transparency

> 数据透明度。

- Users can see what data was used to generate their recommendations.
- Each dataset carries: source label, update date, confidence score.
- If data is simulated/mock, this must be clearly disclosed.
- No fabricated endorsements, no fake institutional logos.

---

## 2. The Four-Layer Trust Architecture

```
┌─────────────────────────────────────────┐
│  Layer 4: Human Mentor Review           │  ← 导师复核
│  "导师确认 / 调整 / 补充 / 标记"          │
├─────────────────────────────────────────┤
│  Layer 3: AI Natural Language           │  ← AI 自然语言解释
│  "用普通话解释为什么推荐"                 │
├─────────────────────────────────────────┤
│  Layer 2: Explainable Rule Engine       │  ← 可解释规则引擎
│  "8 条规则 × 每条依据 × 分数可追溯"      │
├─────────────────────────────────────────┤
│  Layer 1: High-Quality Data Pipeline    │  ← 高质量数据
│  "官方来源 · 多年度 · 可验证 · 有置信度"  │
└─────────────────────────────────────────┘
```

### Layer 1: Data Quality (Foundation)

| Requirement | Status |
|-------------|--------|
| Multi-year data (≥ 3 years) | TODO |
| Multi-province coverage (≥ 10 provinces) | TODO |
| Source provenance on every record | @qixu/data-quality |
| Confidence score per dataset | @qixu/data-quality |
| Update schedule & freshness check | @qixu/data-quality |
| No fabricated data presented as real | ✅ (mock data clearly labeled) |

### Layer 2: Explainable Rules (Current)

| Requirement | Status |
|-------------|--------|
| 8 rule categories with 0-1 scores | ✅ |
| Each rule produces a human-readable detail string | ✅ |
| Composite score uses weighted, documented formula | ✅ |
| Tier classification (reach/match/safe) | ✅ |
| Recommendation rationale summary per entry | TODO |

### Layer 3: AI Natural Language (Future)

| Requirement | Status |
|-------------|--------|
| LLM translates rule results into plain Chinese | TODO |
| LLM does NOT make recommendation decisions | Design constraint |
| LLM output is labeled as AI-generated | Required |
| User can toggle AI explanation on/off | Future UX |

### Layer 4: Human Mentor Review (Future)

| Requirement | Status |
|-------------|--------|
| High-risk recommendations flagged for mentor | TODO |
| Mentor can confirm / adjust / annotate / reject | Future |
| Mentor annotations shown alongside AI output | Future |
| Mentor review queue & dashboard | Future |

---

## 3. UI Requirements

### Decision Reminder Banner

Every recommendation page must display:

> ⚠️ 以上推荐基于历年录取数据分析和规则引擎生成，仅供参考。最终志愿填报决策由你做出。正式填报请以各省教育考试院官方数据为准。

### Risk Flag

Recommendations with reach rank ratio < 0.85:

> 🟡 此推荐为冲刺目标，录取概率相对较低，建议结合稳妥和保底选择综合考量。

### Data Source Footer

> 数据来源：模拟2023-2025年录取数据 · 置信度：中等 · 更新时间：2025年6月

---

## 4. Prohibited Behaviors

The following are **never** permitted in any QIXU admission feature:

- ❌ "一键填报" without per-choice confirmation
- ❌ "AI 最优方案" or similar superlative claims
- ❌ Fabricated testimonials from non-existent students
- ❌ Fake institutional logos or endorsements
- ❌ Urgency/scarcity tactics ("仅剩3个名额")
- ❌ Hidden paid promotion presented as organic recommendation
- ❌ Collecting user data without explicit consent
- ❌ Recommending schools the student cannot afford (budget mismatch without warning)

---

## 5. Acceptance Criteria

- [ ] All 5 Human-in-the-Loop principles documented and referenced in code
- [ ] Four-layer trust architecture documented
- [ ] Decision reminder banner on every result page
- [ ] Risk flag visible on high-risk recommendations
- [ ] Recommendation rationale summary visible per entry
- [ ] Data source attribution on every result
- [ ] No prohibited phrases in any copy
- [ ] Constitution principles (AI Second, High Trust, High Transparency) are upheld

---

## 6. Reference

- Constitution: `docs/00_CONSTITUTION.md` §2.3 Design Principles, §8 AI Guardian Code
- Brand: `docs/01_BRAND.md` §3 Brand Voice (warm, professional, encouraging, restrained)
- Design: `docs/03_DESIGN.md` §1.2 AI Design Principles (AI Second, explainable, rejectable, warm)
