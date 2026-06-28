/**
 * Normalizer — converts normalized input shapes into full domain entities.
 *
 * Responsibilities:
 * - Generate stable IDs for universities and majors
 * - Deduplicate entities (by name+province for universities, by name+category for majors)
 * - Resolve references (admission record → universityId, majorId)
 * - Fill in default values for missing optional fields
 */

import type {
  University,
  Major,
  AdmissionRecord,
  UniversityTier,
  UniversityType,
} from "@qixu/domain/knowledge";
import type {
  NormalizedUniversityInput,
  NormalizedMajorInput,
  NormalizedAdmissionInput,
} from "../types";

/** Generate a deterministic ID from a string key */
function stableId(prefix: string, key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `${prefix}_${Math.abs(hash).toString(36)}`;
}

export interface NormalizeResult {
  universities: University[];
  majors: Major[];
  admissions: AdmissionRecord[];
  /** Warnings generated during normalization */
  warnings: string[];
}

export function normalizeEntities(
  universityInputs: NormalizedUniversityInput[],
  majorInputs: NormalizedMajorInput[],
  admissionInputs: NormalizedAdmissionInput[]
): NormalizeResult {
  const warnings: string[] = [];

  // ---- Deduplicate and build universities ----
  const universityMap = new Map<string, University>();
  for (const input of universityInputs) {
    const key = `${input.name}_${input.province}`;
    const id = stableId("u", key);
    if (universityMap.has(id)) {
      // Merge: prefer non-empty values
      const existing = universityMap.get(id)!;
      if (!existing.tier && input.tier) existing.tier = input.tier;
      if (!existing.type && input.type) existing.type = input.type;
      if (existing.tags.length === 0 && input.tags) existing.tags = input.tags;
      if (!existing.website && input.website) existing.website = input.website;
      if (!existing.description && input.description) existing.description = input.description;
      continue;
    }

    const tier: UniversityTier = input.tier ?? inferTier(input.name);
    const type: UniversityType = input.type ?? inferType(input.name);

    universityMap.set(id, {
      id,
      name: input.name.trim(),
      province: input.province.trim(),
      city: input.city.trim(),
      tier,
      type,
      tags: input.tags ?? [],
      website: input.website ?? "",
      description: input.description ?? "",
    });
  }

  // ---- Deduplicate and build majors ----
  const majorMap = new Map<string, Major>();
  for (const input of majorInputs) {
    const key = `${input.name}_${input.category}`;
    const id = stableId("m", key);
    if (majorMap.has(id)) {
      const existing = majorMap.get(id)!;
      if (existing.employmentDirection.length === 0 && input.employmentDirection) {
        existing.employmentDirection = input.employmentDirection;
      }
      if (existing.graduateDirection.length === 0 && input.graduateDirection) {
        existing.graduateDirection = input.graduateDirection;
      }
      if (!existing.popularity && input.popularity) {
        existing.popularity = input.popularity;
      }
      continue;
    }

    majorMap.set(id, {
      id,
      name: input.name.trim(),
      category: input.category,
      employmentDirection: input.employmentDirection ?? [],
      graduateDirection: input.graduateDirection ?? [],
      popularity: input.popularity ?? 5,
    });
  }

  // ---- Build admission records with resolved references ----
  const admissions: AdmissionRecord[] = [];
  let admissionCounter = 0;

  for (const input of admissionInputs) {
    // Resolve university
    const uniKey = `${input.universityName.trim()}_${input.province.trim()}`;
    const uniId = stableId("u", uniKey);

    // If university doesn't exist in our map, create a minimal entry
    if (!universityMap.has(uniId)) {
      warnings.push(`大学「${input.universityName}」(${input.province})在录取数据中出现但未在大学列表中，已自动创建`);
      universityMap.set(uniId, {
        id: uniId,
        name: input.universityName.trim(),
        province: input.province.trim(),
        city: input.city.trim(),
        tier: inferTier(input.universityName),
        type: inferType(input.universityName),
        tags: [],
        website: "",
        description: "",
      });
    }

    // Resolve major
    const majorKey = `${input.majorName.trim()}_${"工学"}`; // Default category if not specified
    // Try to find existing major by name (category may differ across sources)
    let majId = "";
    for (const [id, m] of majorMap) {
      if (m.name === input.majorName.trim()) {
        majId = id;
        break;
      }
    }
    if (!majId) {
      // Create a minimal major entry
      const newMajId = stableId("m", input.majorName.trim());
      warnings.push(`专业「${input.majorName}」在录取数据中出现但未在专业列表中，已自动创建`);
      majorMap.set(newMajId, {
        id: newMajId,
        name: input.majorName.trim(),
        category: "工学", // Default
        employmentDirection: [],
        graduateDirection: [],
        popularity: 5,
      });
      majId = newMajId;
    }

    admissionCounter++;
    admissions.push({
      id: stableId("ar", `${input.year}_${uniId}_${majId}_${input.subjectType}_${admissionCounter}`),
      year: input.year,
      province: input.province.trim(),
      subjectType: input.subjectType,
      universityId: uniId,
      majorId: majId,
      lowestScore: input.lowestScore,
      lowestRank: input.lowestRank,
      quota: input.quota ?? 0,
      tuition: input.tuition ?? 6850,
    });
  }

  return {
    universities: Array.from(universityMap.values()),
    majors: Array.from(majorMap.values()),
    admissions,
    warnings,
  };
}

/** Heuristic tier inference — overridden by explicit data */
function inferTier(name: string): UniversityTier {
  if (/清华|北大|复旦|交大|浙大|南京|中科大|人大|中山|华工|武大|华科|同济|北航|北师大/.test(name)) return "985";
  if (/211|暨南|华南师范|苏州|武汉理工|西南交/.test(name)) return "211";
  if (/南方科技|港中|中外合作|西交利物浦|宁波诺丁汉/.test(name)) return "双一流";
  return "普通本科";
}

/** Heuristic type inference */
function inferType(name: string): UniversityType {
  if (/师范/.test(name)) return "师范";
  if (/医|药/.test(name)) return "医药";
  if (/理工|工业|科技|技术|工程|邮电|航空|交通/.test(name)) return "理工";
  if (/财经|经贸|工商/.test(name)) return "财经";
  if (/政法|法学|警察/.test(name)) return "政法";
  if (/农|林/.test(name)) return "农林";
  if (/语言|外语|翻译/.test(name)) return "语言";
  if (/艺术|音乐|美术|电影|戏剧/.test(name)) return "艺术";
  if (/体育/.test(name)) return "体育";
  return "综合";
}
