# Feature: 010 — Admission Foundation

**Version:** v1.0
**Status:** READY FOR DEVELOPMENT
**Sprint:** Sprint-010 / TASK-0010
**Depends On:** Sprint-006 (Domain System), Sprint-007 (Learning Assessment)

---

## Goal

Build the knowledge foundation for QIXU's future AI Admission Recommendation System. No AI model, no external APIs, no real admission datasets — only architecture, schemas, mock data and recommendation rules.

## Sections

### 1. Knowledge Domain
`packages/domain/src/knowledge/`
- `index.ts` — public API
- `types.ts` — domain types (University, Major, AdmissionRecord, StudentProfile)
- `service.ts` — recommendation rule engine
- `repository.ts` — mock data store

### 2. University Schema
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | University name |
| province | string | Province |
| city | string | City |
| tier | string | 985/211/双一流/普通本科/专科 |
| type | string | 综合/理工/师范/医药/农林/政法/财经/语言/艺术/体育 |
| tags | string[] | Feature tags |
| website | string | Official website |
| description | string | Brief description |

### 3. Major Schema
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Major name |
| category | string | 工学/理学/医学/文学/经济学/管理学/法学/教育学/艺术学/农学 |
| employmentDirection | string[] | Possible career paths |
| graduateDirection | string[] | Further education paths |
| popularity | number | 1-10 scale |

### 4. AdmissionRecord Schema
| Field | Type | Description |
|-------|------|-------------|
| year | number | Admission year |
| province | string | Province |
| subjectType | string | 物理类/历史类 |
| universityId | string | FK to University |
| majorId | string | FK to Major |
| lowestScore | number | Lowest admitted score |
| lowestRank | number | Lowest admitted rank |
| quota | number | Enrollment quota |
| tuition | number | Annual tuition (CNY) |

### 5. StudentProfile Schema
| Field | Type | Description |
|-------|------|-------------|
| province | string | Student's province |
| score | number | Gaokao score |
| rank | number | Province rank |
| budget | number | Max annual tuition |
| careerPreference | string[] | Preferred career directions |
| majorPreference | string[] | Preferred major categories |
| cityPreference | string[] | Preferred cities |
| adjustmentAccepted | boolean | Accept major adjustment |
| cooperativeProgramAccepted | boolean | Accept Sino-foreign cooperative programs |
| familyFinancialLevel | string | low/medium/high |

### 6. Recommendation Rules (Mock Engine)
Rule categories: Reach, Match, Safe, Budget, City, Major, Employment, Risk.
Each rule scored, composite recommendation produced.

### 7. Mock Knowledge Repository
Mock universities, majors, admission records — all typed, all extensible.

## Acceptance Criteria
- [ ] Knowledge Domain established
- [ ] Schemas completed
- [ ] Rule engine exists (8 rule categories)
- [ ] Mock repository works (5+ universities, 10+ majors)
- [ ] Ready for AI Admission Recommendation
