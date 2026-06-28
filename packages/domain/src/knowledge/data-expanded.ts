/**
 * Knowledge domain — EXPANDED mock data (P0: multi-province, multi-year).
 *
 * Covering 10 provinces × ~40 universities × 3 years (2023/2024/2025).
 * All data simulated for development. Clearly labeled as MOCK.
 *
 * Data source: simulated · Confidence: low (mock) · Year range: 2023–2025
 */

import type { University, Major, AdmissionRecord } from "./types";

// ---------------------------------------------------------------------------
// Additional Universities
// ---------------------------------------------------------------------------

export const expandedUniversities: University[] = [
  // === 北京 (2) ===
  { id: "u-011", name: "北京工业大学", province: "北京", city: "北京", tier: "211", type: "理工", tags: ["市属重点","工科强校"], website: "https://www.bjut.edu.cn", description: "北京市属重点大学，国家211工程。" },
  { id: "u-012", name: "首都师范大学", province: "北京", city: "北京", tier: "双一流", type: "师范", tags: ["教师摇篮","人文学科"], website: "https://www.cnu.edu.cn", description: "北京市属重点大学，双一流建设高校。" },
  // === 浙江 (3) ===
  { id: "u-013", name: "浙江工业大学", province: "浙江", city: "杭州", tier: "普通本科", type: "理工", tags: ["省属重点","工科强校"], website: "https://www.zjut.edu.cn", description: "浙江省属重点大学。" },
  { id: "u-014", name: "杭州电子科技大学", province: "浙江", city: "杭州", tier: "普通本科", type: "理工", tags: ["电子信息","数字经济"], website: "https://www.hdu.edu.cn", description: "电子信息特色突出的大学。" },
  { id: "u-015", name: "浙江师范大学", province: "浙江", city: "金华", tier: "普通本科", type: "师范", tags: ["教师教育"], website: "https://www.zjnu.edu.cn", description: "浙江省属重点师范大学。" },
  // === 湖北 (3) ===
  { id: "u-016", name: "武汉理工大学", province: "湖北", city: "武汉", tier: "211", type: "理工", tags: ["建材","交通","汽车"], website: "https://www.whut.edu.cn", description: "教育部直属全国重点大学。" },
  { id: "u-017", name: "华中师范大学", province: "湖北", city: "武汉", tier: "211", type: "师范", tags: ["教师教育","人文社科"], website: "https://www.ccnu.edu.cn", description: "教育部直属重点师范大学。" },
  { id: "u-018", name: "湖北大学", province: "湖北", city: "武汉", tier: "普通本科", type: "综合", tags: ["省属重点"], website: "https://www.hubu.edu.cn", description: "湖北省属重点综合性大学。" },
  // === 江苏 (3) ===
  { id: "u-019", name: "南京邮电大学", province: "江苏", city: "南京", tier: "双一流", type: "理工", tags: ["通信","电子信息","计算机"], website: "https://www.njupt.edu.cn", description: "电子信息特色高校，双一流建设。" },
  { id: "u-020", name: "南京工业大学", province: "江苏", city: "南京", tier: "普通本科", type: "理工", tags: ["化工","材料","安全工程"], website: "https://www.njtech.edu.cn", description: "江苏省属重点理工科大学。" },
  { id: "u-021", name: "江苏大学", province: "江苏", city: "镇江", tier: "普通本科", type: "综合", tags: ["农机","汽车","医学"], website: "https://www.ujs.edu.cn", description: "江苏省属重点综合性大学。" },
  // === 四川 (2) ===
  { id: "u-022", name: "西南交通大学", province: "四川", city: "成都", tier: "211", type: "理工", tags: ["轨道交通","土木","电气"], website: "https://www.swjtu.edu.cn", description: "教育部直属全国重点大学。" },
  { id: "u-023", name: "成都理工大学", province: "四川", city: "成都", tier: "双一流", type: "理工", tags: ["地质","能源","环境"], website: "https://www.cdut.edu.cn", description: "四川省属重点大学，双一流建设高校。" },
  // === 湖南 (2) ===
  { id: "u-024", name: "湖南师范大学", province: "湖南", city: "长沙", tier: "211", type: "师范", tags: ["教师教育","人文"], website: "https://www.hunnu.edu.cn", description: "湖南省属重点师范大学。" },
  { id: "u-025", name: "湘潭大学", province: "湖南", city: "湘潭", tier: "双一流", type: "综合", tags: ["数学","法学"], website: "https://www.xtu.edu.cn", description: "湖南省属重点大学，双一流建设。" },
  // === 山东 (2) ===
  { id: "u-026", name: "青岛大学", province: "山东", city: "青岛", tier: "普通本科", type: "综合", tags: ["医学","纺织"], website: "https://www.qdu.edu.cn", description: "山东省属重点综合性大学。" },
  { id: "u-027", name: "山东科技大学", province: "山东", city: "青岛", tier: "普通本科", type: "理工", tags: ["矿业","测绘","计算机"], website: "https://www.sdust.edu.cn", description: "山东省属重点理工科大学。" },
  // === 河南 (2) ===
  { id: "u-028", name: "河南大学", province: "河南", city: "郑州", tier: "双一流", type: "综合", tags: ["生物学","教育学"], website: "https://www.henu.edu.cn", description: "河南省属重点大学，双一流建设。" },
  { id: "u-029", name: "郑州轻工业大学", province: "河南", city: "郑州", tier: "普通本科", type: "理工", tags: ["轻工","食品","设计"], website: "https://www.zzuli.edu.cn", description: "河南省属理工科大学。" },
  // === 福建 (2) ===
  { id: "u-030", name: "福州大学", province: "福建", city: "福州", tier: "211", type: "理工", tags: ["化学","化工","电气"], website: "https://www.fzu.edu.cn", description: "福建省属重点大学，国家211工程。" },
  { id: "u-031", name: "福建师范大学", province: "福建", city: "福州", tier: "普通本科", type: "师范", tags: ["教师教育"], website: "https://www.fjnu.edu.cn", description: "福建省属重点师范大学。" },
];

// ---------------------------------------------------------------------------
// Year-based score/rank modifiers (simulated trends)
// 2023 → 2024 → 2025: scores generally rising ~3-5 pts/year
// ---------------------------------------------------------------------------

function yearMod(year: number): { scoreShift: number; rankShift: number } {
  if (year === 2023) return { scoreShift: -8, rankShift: +3000 };
  if (year === 2024) return { scoreShift: -3, rankShift: +1000 };
  return { scoreShift: 0, rankShift: 0 }; // 2025 baseline
}

// ---------------------------------------------------------------------------
// Generate multi-year records for one province
// ---------------------------------------------------------------------------

function genRecords(
  province: string,
  uniMajors: { universityId: string; majorId: string; score: number; rank: number; quota: number; tuition: number }[],
  years: number[] = [2023, 2024, 2025],
): AdmissionRecord[] {
  const records: AdmissionRecord[] = [];
  let counter = 0;
  for (const year of years) {
    const mod = yearMod(year);
    for (const um of uniMajors) {
      counter++;
      records.push({
        id: `ar-exp-${province.slice(0,2)}-${counter}`,
        year, province, subjectType: "物理类",
        universityId: um.universityId, majorId: um.majorId,
        lowestScore: um.score + mod.scoreShift,
        lowestRank: um.rank + mod.rankShift,
        quota: um.quota, tuition: um.tuition,
      });
    }
  }
  // Also add 历史类 records for a subset of majors
  const histMajors = uniMajors.filter((um) => {
    const mid = um.majorId;
    return mid === "m-007" || mid === "m-008" || mid === "m-009" || mid === "m-010" || mid === "m-012" || mid === "m-015";
  });
  for (const year of years) {
    const mod = yearMod(year);
    for (const um of histMajors) {
      counter++;
      records.push({
        id: `ar-exp-${province.slice(0,2)}-hist-${counter}`,
        year, province, subjectType: "历史类",
        universityId: um.universityId, majorId: um.majorId,
        lowestScore: um.score + mod.scoreShift - 35,
        lowestRank: Math.round(um.rank * 0.35) + mod.rankShift,
        quota: Math.round(um.quota * 0.4), tuition: um.tuition,
      });
    }
  }
  return records;
}

// ---------------------------------------------------------------------------
// Province-specific admission records
// ---------------------------------------------------------------------------

export const expandedRecords: AdmissionRecord[] = [
  // === 北京 ===
  ...genRecords("北京", [
    { universityId: "u-011", majorId: "m-001", score: 595, rank: 11000, quota: 80, tuition: 6850 },
    { universityId: "u-011", majorId: "m-002", score: 598, rank: 10500, quota: 60, tuition: 6850 },
    { universityId: "u-011", majorId: "m-005", score: 590, rank: 11800, quota: 55, tuition: 6850 },
    { universityId: "u-012", majorId: "m-011", score: 580, rank: 14500, quota: 50, tuition: 5000 },
    { universityId: "u-012", majorId: "m-012", score: 575, rank: 15500, quota: 40, tuition: 5000 },
  ]),
  // === 浙江 ===
  ...genRecords("浙江", [
    { universityId: "u-013", majorId: "m-001", score: 600, rank: 48000, quota: 90, tuition: 6850 },
    { universityId: "u-013", majorId: "m-002", score: 595, rank: 51000, quota: 70, tuition: 6850 },
    { universityId: "u-014", majorId: "m-001", score: 610, rank: 40000, quota: 80, tuition: 6850 },
    { universityId: "u-014", majorId: "m-005", score: 605, rank: 42500, quota: 60, tuition: 6850 },
    { universityId: "u-015", majorId: "m-012", score: 585, rank: 58000, quota: 45, tuition: 5000 },
  ]),
  // === 湖北 ===
  ...genRecords("湖北", [
    { universityId: "u-016", majorId: "m-001", score: 608, rank: 15000, quota: 100, tuition: 6850 },
    { universityId: "u-016", majorId: "m-013", score: 600, rank: 17500, quota: 50, tuition: 7650 },
    { universityId: "u-017", majorId: "m-011", score: 590, rank: 21000, quota: 60, tuition: 5000 },
    { universityId: "u-017", majorId: "m-012", score: 585, rank: 22500, quota: 45, tuition: 5000 },
    { universityId: "u-018", majorId: "m-007", score: 575, rank: 26000, quota: 40, tuition: 6850 },
  ]),
  // === 江苏 ===
  ...genRecords("江苏", [
    { universityId: "u-019", majorId: "m-001", score: 615, rank: 25000, quota: 80, tuition: 6850 },
    { universityId: "u-019", majorId: "m-003", score: 620, rank: 22000, quota: 40, tuition: 6850 },
    { universityId: "u-020", majorId: "m-001", score: 590, rank: 45000, quota: 70, tuition: 6850 },
    { universityId: "u-021", majorId: "m-006", score: 595, rank: 39000, quota: 80, tuition: 7650 },
  ]),
  // === 四川 ===
  ...genRecords("四川", [
    { universityId: "u-022", majorId: "m-001", score: 605, rank: 22000, quota: 90, tuition: 6850 },
    { universityId: "u-022", majorId: "m-005", score: 600, rank: 24000, quota: 65, tuition: 6850 },
    { universityId: "u-023", majorId: "m-001", score: 575, rank: 45000, quota: 70, tuition: 6850 },
    { universityId: "u-023", majorId: "m-004", score: 580, rank: 42000, quota: 50, tuition: 6850 },
  ]),
  // === 湖南 ===
  ...genRecords("湖南", [
    { universityId: "u-024", majorId: "m-012", score: 570, rank: 28000, quota: 50, tuition: 5000 },
    { universityId: "u-025", majorId: "m-011", score: 580, rank: 24000, quota: 40, tuition: 6850 },
    { universityId: "u-025", majorId: "m-009", score: 585, rank: 22500, quota: 35, tuition: 6850 },
  ]),
  // === 山东 ===
  ...genRecords("山东", [
    { universityId: "u-026", majorId: "m-006", score: 590, rank: 35000, quota: 100, tuition: 7650 },
    { universityId: "u-026", majorId: "m-014", score: 580, rank: 40000, quota: 50, tuition: 7650 },
    { universityId: "u-027", majorId: "m-001", score: 575, rank: 50000, quota: 80, tuition: 6850 },
    { universityId: "u-027", majorId: "m-005", score: 570, rank: 53000, quota: 60, tuition: 6850 },
  ]),
  // === 河南 ===
  ...genRecords("河南", [
    { universityId: "u-028", majorId: "m-012", score: 570, rank: 40000, quota: 55, tuition: 5000 },
    { universityId: "u-029", majorId: "m-001", score: 565, rank: 60000, quota: 70, tuition: 6850 },
    { universityId: "u-029", majorId: "m-002", score: 560, rank: 63000, quota: 55, tuition: 6850 },
  ]),
  // === 福建 ===
  ...genRecords("福建", [
    { universityId: "u-030", majorId: "m-001", score: 600, rank: 15000, quota: 80, tuition: 6850 },
    { universityId: "u-030", majorId: "m-005", score: 595, rank: 16000, quota: 60, tuition: 6850 },
    { universityId: "u-031", majorId: "m-012", score: 565, rank: 30000, quota: 45, tuition: 5000 },
  ]),
];
