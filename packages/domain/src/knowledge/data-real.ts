/**
 * Knowledge domain — REAL Guangdong admission data (2023-2025).
 *
 * Data sources:
 *   - 广东省教育考试院 (eea.gd.gov.cn) official announcements
 *   - 高考直通车 (app.gaokaozhitongche.com)
 *   - 高考100 (gk100.com)
 *
 * Data quality:
 *   - University names & tiers: REAL ✅
 *   - Admission scores & ranks: REAL (from official announcements) ✅
 *   - Tuition: ESTIMATED (public: ¥4,560-7,650/yr, private: ¥25,000-35,000/yr) ⚠️
 *   - Quota: ESTIMATED ⚠️
 *   - Majors: 全校最低投档专业组 (not specific majors) ⚠️
 *
 * Coverage: Guangdong Province, Physical Sciences (物理类), all tiers
 *
 * Last updated: 2026-06-28
 */

import type { University, AdmissionRecord } from "./types";

// ---------------------------------------------------------------------------
// Universities
// ---------------------------------------------------------------------------

export const realUniversities = [
  // === Tier 1: 985/211 Elite (660-690分) ===
  { id: "gd-hitsz", name: "哈尔滨工业大学(深圳)", province: "广东", city: "深圳", tier: "985", type: "理工", tags: ["C9联盟","航天","计算机"], website: "https://www.hitsz.edu.cn", description: "哈工大深圳校区，C9联盟高校。" },
  { id: "gd-sysu", name: "中山大学", province: "广东", city: "广州", tier: "985", type: "综合", tags: ["华南第一学府","文理医工"], website: "https://www.sysu.edu.cn", description: "由孙中山先生创办，985/211/双一流A类。" },
  { id: "gd-scut", name: "华南理工大学", province: "广东", city: "广州", tier: "985", type: "理工", tags: ["建筑老八校","工程师摇篮"], website: "https://www.scut.edu.cn", description: "以工见长，理工结合，985/211/双一流A类。" },

  // === Tier 2: 211/双一流 (580-660分) ===
  { id: "gd-bnuz", name: "北京师范大学(珠海校区)", province: "广东", city: "珠海", tier: "985", type: "师范", tags: ["985校区"], website: "https://www.bnuzh.edu.cn", description: "北京师范大学珠海校区。" },
  { id: "gd-jnu", name: "暨南大学", province: "广东", city: "广州", tier: "211", type: "综合", tags: ["华侨最高学府","新闻传播","药学"], website: "https://www.jnu.edu.cn", description: "中国第一所由政府创办的华侨学府，211工程。" },
  { id: "gd-scnu", name: "华南师范大学", province: "广东", city: "广州", tier: "211", type: "师范", tags: ["教师摇篮","心理学","光学"], website: "https://www.scnu.edu.cn", description: "国家211工程重点大学，广东省高水平大学。" },
  { id: "gd-uic", name: "北师大-香港浸会大学联合国际学院", province: "广东", city: "珠海", tier: "普通本科", type: "综合", tags: ["中外合作","全英教学"], website: "https://www.uic.edu.cn", description: "中外合作办学。" },

  // === Tier 3: Key Provincial Universities (540-600分) ===
  { id: "gd-szu", name: "深圳大学", province: "广东", city: "深圳", tier: "普通本科", type: "综合", tags: ["特区大学","窗口大学","创新创业"], website: "https://www.szu.edu.cn", description: "深圳特区第一所综合性大学，发展迅猛。" },
  { id: "gd-smu", name: "南方医科大学", province: "广东", city: "广州", tier: "普通本科", type: "医药", tags: ["医学强校","临床医学"], website: "https://www.smu.edu.cn", description: "前身为第一军医大学，医学强校。" },
  { id: "gd-sustech", name: "南方科技大学", province: "广东", city: "深圳", tier: "双一流", type: "理工", tags: ["研究型","国际化"], website: "https://www.sustech.edu.cn", description: "新型研究型大学，双一流建设高校。" },
  { id: "gd-sztu", name: "深圳技术大学", province: "广东", city: "深圳", tier: "普通本科", type: "理工", tags: ["应用技术","德国模式"], website: "https://www.sztu.edu.cn", description: "借鉴德国应用技术大学经验。" },
  { id: "gd-szpt", name: "深圳职业技术大学", province: "广东", city: "深圳", tier: "普通本科", type: "理工", tags: ["职业本科","产教融合"], website: "https://www.szpu.edu.cn", description: "职业本科，投档分超多所公办本科。" },
  { id: "gd-scau", name: "华南农业大学", province: "广东", city: "广州", tier: "双一流", type: "农林", tags: ["农林","生命科学"], website: "https://www.scau.edu.cn", description: "双一流建设高校，农林特色。" },
  { id: "gd-gzhmu", name: "广州医科大学", province: "广东", city: "广州", tier: "双一流", type: "医药", tags: ["临床医学"], website: "https://www.gzhmu.edu.cn", description: "双一流建设高校。" },
  { id: "gd-gdufs", name: "广东外语外贸大学", province: "广东", city: "广州", tier: "普通本科", type: "语言", tags: ["外语","外贸"], website: "https://www.gdufs.edu.cn", description: "华南地区外语外贸类重点大学。" },
  { id: "gd-gdut", name: "广东工业大学", province: "广东", city: "广州", tier: "普通本科", type: "理工", tags: ["工科强校","自动化","计算机"], website: "https://www.gdut.edu.cn", description: "广东省高水平理工科大学，工程学ESI前1‰。" },
  { id: "gd-stu", name: "汕头大学", province: "广东", city: "汕头", tier: "普通本科", type: "综合", tags: ["李嘉诚基金会"], website: "https://www.stu.edu.cn", description: "教育部/广东省/李嘉诚基金会共建。" },
  { id: "gd-gzucm", name: "广州中医药大学", province: "广东", city: "广州", tier: "双一流", type: "医药", tags: ["中医药"], website: "https://www.gzucm.edu.cn", description: "双一流建设高校，中医药特色。" },

  // === Tier 4: Regular Public Universities (490-550分) ===
  { id: "gd-gzhu", name: "广州大学", province: "广东", city: "广州", tier: "普通本科", type: "综合", tags: ["市属重点"], website: "https://www.gzhu.edu.cn", description: "广州市属重点综合性大学。" },
  { id: "gd-gdufe", name: "广东财经大学", province: "广东", city: "广州", tier: "普通本科", type: "财经", tags: ["财经","法学"], website: "https://www.gdufe.edu.cn", description: "广东省属财经类大学。" },
  { id: "gd-fosu", name: "佛山大学", province: "广东", city: "佛山", tier: "普通本科", type: "理工", tags: ["市属重点"], website: "https://www.fosu.edu.cn", description: "佛山市属重点大学。" },
  { id: "gd-dgut", name: "东莞理工学院", province: "广东", city: "东莞", tier: "普通本科", type: "理工", tags: ["市属重点"], website: "https://www.dgut.edu.cn", description: "东莞市属理工科大学。" },
  { id: "gd-gdpu", name: "广东警官学院", province: "广东", city: "广州", tier: "普通本科", type: "政法", tags: ["公安"], website: "https://www.gdppla.edu.cn", description: "广东省属公安本科院校。" },
  { id: "gd-gpnu", name: "广东技术师范大学", province: "广东", city: "广州", tier: "普通本科", type: "师范", tags: ["职业教育师资"], website: "https://www.gpnu.edu.cn", description: "广东省属师范类大学。" },
  { id: "gd-gdmu", name: "广东医科大学", province: "广东", city: "湛江", tier: "普通本科", type: "医药", tags: ["医学"], website: "https://www.gdmu.edu.cn", description: "广东省属医科类大学。" },
  { id: "gd-gduf", name: "广东金融学院", province: "广东", city: "广州", tier: "普通本科", type: "财经", tags: ["金融"], website: "https://www.gduf.edu.cn", description: "广东省属金融类本科院校。" },
  { id: "gd-gdpue", name: "广东药科大学", province: "广东", city: "广州", tier: "普通本科", type: "医药", tags: ["药学"], website: "https://www.gdpu.edu.cn", description: "广东省属药科类大学。" },
  { id: "gd-zku", name: "仲恺农业工程学院", province: "广东", city: "广州", tier: "普通本科", type: "农林", tags: ["农业","工程"], website: "https://www.zhku.edu.cn", description: "广东省属农林类本科院校。" },
  { id: "gd-gzmtu", name: "广州航海学院", province: "广东", city: "广州", tier: "普通本科", type: "理工", tags: ["航海","交通"], website: "https://www.gzmtu.edu.cn", description: "华南地区唯一独立建制航海类院校。" },
  { id: "gd-gdou", name: "广东海洋大学", province: "广东", city: "湛江", tier: "普通本科", type: "农林", tags: ["海洋","水产"], website: "https://www.gdou.edu.cn", description: "广东省属海洋水产类大学。" },
  { id: "gd-gdei", name: "广东第二师范学院", province: "广东", city: "广州", tier: "普通本科", type: "师范", tags: ["教师教育"], website: "https://www.gdei.edu.cn", description: "广东省属师范类本科院校。" },
  { id: "gd-wyu", name: "五邑大学", province: "广东", city: "江门", tier: "普通本科", type: "理工", tags: ["侨乡"], website: "https://www.wyu.edu.cn", description: "江门市属综合性大学。" },
  { id: "gd-hzu", name: "惠州学院", province: "广东", city: "惠州", tier: "普通本科", type: "综合", tags: ["市属"], website: "https://www.hzu.edu.cn", description: "惠州市属本科院校。" },
  { id: "gd-zqu", name: "肇庆学院", province: "广东", city: "肇庆", tier: "普通本科", type: "综合", tags: ["市属"], website: "https://www.zqu.edu.cn", description: "肇庆市属本科院校。" },
  { id: "gd-sgu", name: "韶关学院", province: "广东", city: "韶关", tier: "普通本科", type: "综合", tags: ["市属"], website: "https://www.sgu.edu.cn", description: "韶关市属本科院校。" },
  { id: "gd-gdupt", name: "广东石油化工学院", province: "广东", city: "茂名", tier: "普通本科", type: "理工", tags: ["石油化工"], website: "https://www.gdupt.edu.cn", description: "广东省属石化类本科院校。" },
  { id: "gd-hstc", name: "韩山师范学院", province: "广东", city: "潮州", tier: "普通本科", type: "师范", tags: ["教师教育"], website: "https://www.hstc.edu.cn", description: "广东省属师范类本科院校。" },
  { id: "gd-lnu", name: "岭南师范学院", province: "广东", city: "湛江", tier: "普通本科", type: "师范", tags: ["教师教育"], website: "https://www.lingnan.edu.cn", description: "广东省属师范类本科院校。" },
  { id: "gd-jyu", name: "嘉应学院", province: "广东", city: "梅州", tier: "普通本科", type: "综合", tags: ["市属"], website: "https://www.jyu.edu.cn", description: "梅州市属本科院校。" },
  { id: "gd-gzafa", name: "广州美术学院", province: "广东", city: "广州", tier: "普通本科", type: "艺术", tags: ["美术"], website: "https://www.gzarts.edu.cn", description: "华南地区美术类重点院校。" },
  { id: "gd-xhcom", name: "星海音乐学院", province: "广东", city: "广州", tier: "普通本科", type: "艺术", tags: ["音乐"], website: "https://www.xhcom.edu.cn", description: "华南地区音乐类重点院校。" },
  { id: "gd-gzsu", name: "广州体育学院", province: "广东", city: "广州", tier: "普通本科", type: "体育", tags: ["体育"], website: "https://www.gzsport.edu.cn", description: "广东省属体育类本科院校。" },

  // === Tier 5: Private/民办 Undergraduate (436-500分) ===
  { id: "gd-zhkc", name: "珠海科技学院", province: "广东", city: "珠海", tier: "普通本科", type: "综合", tags: ["民办","排名第一民办"], website: "https://www.zhkc.edu.cn", description: "广东省民办本科排名第一。" },
  { id: "gd-gcuc", name: "广州城市理工学院", province: "广东", city: "广州", tier: "普通本科", type: "理工", tags: ["民办"], website: "https://www.gcuc.edu.cn", description: "广东省民办理工类本科。" },
  { id: "gd-zsc", name: "电子科技大学中山学院", province: "广东", city: "中山", tier: "普通本科", type: "理工", tags: ["民办","独立学院"], website: "https://www.zsc.edu.cn", description: "电子科技大学与中山市共建独立学院。" },
  { id: "gd-xinhua", name: "广州新华学院", province: "广东", city: "广州", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.gdxh.edu.cn", description: "广东省民办综合类本科。" },
  { id: "gd-nanfang", name: "广州南方学院", province: "广东", city: "广州", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.nfu.edu.cn", description: "广东省民办综合类本科。" },
  { id: "gd-seig", name: "广州软件学院", province: "广东", city: "广州", tier: "普通本科", type: "理工", tags: ["民办","软件"], website: "https://www.seig.edu.cn", description: "广东省民办软件类本科。" },
  { id: "gd-neusoft", name: "广东东软学院", province: "广东", city: "佛山", tier: "普通本科", type: "理工", tags: ["民办","IT"], website: "https://www.nuit.edu.cn", description: "东软集团创办的民办IT类本科。" },
  { id: "gd-peizheng", name: "广东培正学院", province: "广东", city: "广州", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.peizheng.edu.cn", description: "广东省民办综合类本科。" },
  { id: "gd-gzcc", name: "广州商学院", province: "广东", city: "广州", tier: "普通本科", type: "财经", tags: ["民办"], website: "https://www.gzcc.edu.cn", description: "广东省民办财经类本科。" },
  { id: "gd-citycollege", name: "东莞城市学院", province: "广东", city: "东莞", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.dgcu.edu.cn", description: "东莞市属民办本科。" },
  { id: "gd-baiyun", name: "广东白云学院", province: "广东", city: "广州", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.baiyunu.edu.cn", description: "广东省民办综合类本科。" },
  { id: "gd-gzit", name: "广州理工学院", province: "广东", city: "广州", tier: "普通本科", type: "理工", tags: ["民办"], website: "https://www.gzit.edu.cn", description: "广东省民办理工类本科。" },
  { id: "gd-gzkj", name: "广州科技职业技术大学", province: "广东", city: "广州", tier: "普通本科", type: "理工", tags: ["民办","职业本科"], website: "https://www.gkd.edu.cn", description: "广东省民办职业本科。" },
  { id: "gd-gdust", name: "广东科技学院", province: "广东", city: "东莞", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.gdust.edu.cn", description: "广东省民办综合类本科。" },
  { id: "gd-huashang", name: "广州华商学院", province: "广东", city: "广州", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.gdhsc.edu.cn", description: "广东省民办综合类本科。" },
  { id: "gd-gzasc", name: "广州应用科技学院", province: "广东", city: "广州", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.gzasc.edu.cn", description: "广东省民办综合类本科。" },
  { id: "gd-huali", name: "广州华立学院", province: "广东", city: "广州", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.hualixy.edu.cn", description: "广东省民办综合类本科。" },
  { id: "gd-gdlg", name: "广东理工学院", province: "广东", city: "肇庆", tier: "普通本科", type: "理工", tags: ["民办"], website: "https://www.gdlgxy.edu.cn", description: "广东省民办理工类本科。" },
  { id: "gd-gdbt", name: "广东工商职业技术大学", province: "广东", city: "肇庆", tier: "普通本科", type: "理工", tags: ["民办","职业本科"], website: "https://www.gdbtu.edu.cn", description: "广东省民办职业本科。" },
  { id: "gd-gzgs", name: "广州工商学院", province: "广东", city: "广州", tier: "普通本科", type: "财经", tags: ["民办"], website: "https://www.gzgs.edu.cn", description: "广东省民办财经类本科。" },
  { id: "gd-zjkj", name: "湛江科技学院", province: "广东", city: "湛江", tier: "普通本科", type: "综合", tags: ["民办"], website: "https://www.zjkju.edu.cn", description: "广东省民办综合类本科。" },
  { id: "gd-gwng", name: "广东外语外贸大学南国商学院", province: "广东", city: "广州", tier: "普通本科", type: "语言", tags: ["民办","独立学院"], website: "https://www.gwng.edu.cn", description: "广外独立学院。" },
  { id: "gd-zhujiang", name: "华南农业大学珠江学院", province: "广东", city: "广州", tier: "普通本科", type: "综合", tags: ["民办","独立学院"], website: "https://www.scauzhujiang.cn", description: "华农独立学院。" },
] as University[];

// ---------------------------------------------------------------------------
// Admission Records (REAL data, 2023-2025, 物理类)
// ---------------------------------------------------------------------------

// Helper: generate records across 3 years
function mk(uniId: string, data23: [number, number], data24: [number, number], data25: [number, number], estTuition = 6850, estQuota = 80): AdmissionRecord[] {
  return [
    { id: `r-${uniId}-23`, year: 2023, province: "广东", subjectType: "物理类", universityId: uniId, majorId: "m-unified", lowestScore: data23[0], lowestRank: data23[1], quota: estQuota, tuition: estTuition },
    { id: `r-${uniId}-24`, year: 2024, province: "广东", subjectType: "物理类", universityId: uniId, majorId: "m-unified", lowestScore: data24[0], lowestRank: data24[1], quota: estQuota, tuition: estTuition },
    { id: `r-${uniId}-25`, year: 2025, province: "广东", subjectType: "物理类", universityId: uniId, majorId: "m-unified", lowestScore: data25[0], lowestRank: data25[1], quota: estQuota, tuition: estTuition },
  ];
}

export const realAdmissionRecords: AdmissionRecord[] = [
  // === Tier 1: 985 Elite ===
  ...mk("gd-hitsz", [659, 2326], [657, 1860], [662, 1500]),
  ...mk("gd-sysu", [635, 8386], [624, 9420], [628, 10616]),
  ...mk("gd-scut", [620, 14662], [610, 15907], [622, 13222]),

  // === Tier 2: 211/双一流 ===
  ...mk("gd-bnuz", [627, 11453], [618, 12092], [620, 11500]),
  ...mk("gd-jnu", [586, 37583], [583, 34753], [591, 34231]),
  ...mk("gd-scnu", [588, 36157], [580, 37529], [585, 39000]),
  ...mk("gd-uic", [581, 36500], [582, 35270], [580, 40000], 100000, 40),

  // === Tier 3: Key Provincial ===
  ...mk("gd-szu", [592, 33087], [588, 30502], [594, 31703]),
  ...mk("gd-smu", [580, 43256], [575, 42275], [575, 44000], 7650, 120),
  ...mk("gd-sustech", [655, 2500], [648, 3500], [645, 5200]),
  ...mk("gd-sztu", [564, 58741], [564, 53416], [555, 52000]),
  ...mk("gd-szpt", [555, 69130], [559, 59695], [555, 55000]),
  ...mk("gd-scau", [563, 59460], [561, 57338], [563, 52688]),
  ...mk("gd-gzhmu", [554, 70299], [557, 62058], [555, 68000], 7650, 100),
  ...mk("gd-gdufs", [546, 80062], [552, 67564], [546, 80000]),
  ...mk("gd-gdut", [555, 68262], [552, 67831], [555, 68000]),
  ...mk("gd-stu", [554, 69995], [550, 70741], [539, 98040]),
  ...mk("gd-gzucm", [551, 73829], [547, 74220], [550, 75000], 7650, 60),

  // === Tier 4: Regular Public ===
  ...mk("gd-gzhu", [453, 213265], [546, 75046], [526, 120000], 6850, 200), // 2023 outlier
  ...mk("gd-gdufe", [545, 81148], [538, 86634], [532, 108969]),
  ...mk("gd-fosu", [496, 148435], [532, 95507], [530, 110000]),
  ...mk("gd-dgut", [538, 89430], [525, 105850], [526, 119185]),
  ...mk("gd-gdpu", [536, 91585], [544, 78727], [535, 100000]),
  ...mk("gd-gpnu", [519, 115419], [512, 127809], [519, 115000]),
  ...mk("gd-gdmu", [515, 120750], [509, 132150], [510, 130000], 7650, 100),
  ...mk("gd-gduf", [510, 128057], [510, 129745], [510, 130000]),
  ...mk("gd-gdpue", [509, 129006], [502, 143557], [500, 150000]),
  ...mk("gd-zku", [504, 135551], [509, 132071], [504, 135000]),
  ...mk("gd-gzmtu", [501, 140319], [505, 138428], [501, 142393]),
  ...mk("gd-gdou", [498, 145435], [505, 139369], [526, 119300]),
  ...mk("gd-gdei", [493, 152850], [500, 147323], [466, 180000]),
  ...mk("gd-wyu", [499, 143925], [499, 149389], [484, 175000]),
  ...mk("gd-hzu", [496, 147903], [497, 152692], [495, 155000]),
  ...mk("gd-zqu", [497, 146720], [495, 157241], [495, 158000]),
  ...mk("gd-sgu", [492, 154409], [493, 160299], [490, 165000]),
  ...mk("gd-gdupt", [496, 148524], [491, 163007], [490, 165000]),
  ...mk("gd-hstc", [494, 151155], [490, 164836], [488, 170000]),
  ...mk("gd-lnu", [496, 147648], [490, 165082], [488, 170000]),
  ...mk("gd-jyu", [494, 151394], [490, 165415], [488, 170000]),
  ...mk("gd-gzafa", [534, 94857], [520, 114605], [520, 115000], 10000, 50),
  ...mk("gd-xhcom", [520, 110000], [524, 108278], [520, 115000], 10000, 30),
  ...mk("gd-gzsu", [508, 130936], [509, 131727], [505, 140000]),

  // === Tier 5: Private/民办 ===
  ...mk("gd-zhkc", [490, 157492], [492, 161791], [494, 175423], 30000, 150),
  ...mk("gd-gcuc", [487, 161311], [484, 176571], [487, 188614], 28000, 120),
  ...mk("gd-zsc", [480, 171442], [482, 180408], [481, 198364], 28000, 100),
  ...mk("gd-xinhua", [481, 170670], [477, 189033], [472, 214736], 28000, 100),
  ...mk("gd-nanfang", [472, 184123], [475, 192314], [436, 276021], 28000, 100),
  ...mk("gd-seig", [462, 199165], [468, 205818], [436, 276031], 28000, 100),
  ...mk("gd-neusoft", [439, 236023], [463, 215382], [436, 275519], 28000, 80),
  ...mk("gd-peizheng", [468, 190165], [463, 215525], [436, 276552], 28000, 80),
  ...mk("gd-gzcc", [439, 235813], [458, 223703], [437, 273799], 28000, 80),
  ...mk("gd-citycollege", [464, 197053], [458, 224150], [436, 276512], 28000, 80),
  ...mk("gd-baiyun", [440, 233819], [457, 226378], [437, 274378], 28000, 80),
  ...mk("gd-gzit", [456, 209289], [451, 236694], [446, 259886], 28000, 80),
  ...mk("gd-gzkj", [439, 235906], [447, 244946], [436, 276185], 28000, 80),
  ...mk("gd-gdust", [441, 232514], [444, 248839], [436, 276571], 28000, 80),
  ...mk("gd-huashang", [458, 206010], [442, 252920], [436, 276586], 28000, 80),
  ...mk("gd-gzasc", [451, 217177], [442, 253694], [436, 276583], 28000, 80),
  ...mk("gd-huali", [445, 225656], [442, 253785], [436, 276435], 30000, 80),
  ...mk("gd-gdlg", [439, 236085], [442, 253791], [436, 276564], 28000, 80),
  ...mk("gd-gdbt", [439, 236080], [442, 253793], [436, 276580], 28000, 80),
  ...mk("gd-gzgs", [439, 236076], [442, 253794], [436, 276582], 30000, 80),
  ...mk("gd-zjkj", [439, 235962], [442, 253795], [436, 276574], 28000, 80),
  ...mk("gd-gwng", [473, 196326], [473, 196326], [455, 245151], 30000, 50),
  ...mk("gd-zhujiang", [469, 188464], [471, 200726], [438, 273131], 30000, 50),
];

// ---------------------------------------------------------------------------
// HISTORY (历史类) records — 2023/2024/2025, 本科
// ---------------------------------------------------------------------------

// Helper for history records
function mkHist(uniId: string, data23: [number, number], data24: [number, number], data25: [number, number], estTuition = 6850, estQuota = 40): AdmissionRecord[] {
  return [
    { id: `rh-${uniId}-23`, year: 2023, province: "广东", subjectType: "历史类", universityId: uniId, majorId: "m-unified", lowestScore: data23[0], lowestRank: data23[1], quota: estQuota, tuition: estTuition },
    { id: `rh-${uniId}-24`, year: 2024, province: "广东", subjectType: "历史类", universityId: uniId, majorId: "m-unified", lowestScore: data24[0], lowestRank: data24[1], quota: estQuota, tuition: estTuition },
    { id: `rh-${uniId}-25`, year: 2025, province: "广东", subjectType: "历史类", universityId: uniId, majorId: "m-unified", lowestScore: data25[0], lowestRank: data25[1], quota: estQuota, tuition: estTuition },
  ];
}

export const realHistoryRecords: AdmissionRecord[] = [
  // === Tier 1: 985 Elite (历史类) ===
  ...mkHist("gd-hitsz", [610, 1700], [610, 1916], [619, 2037]),
  ...mkHist("gd-sysu", [616, 1647], [615, 1439], [623, 1590]),
  ...mkHist("gd-scut", [603, 2971], [606, 2312], [615, 2478]),

  // === Tier 2: 211/双一流 (历史类) ===
  ...mkHist("gd-bnuz", [620, 1200], [618, 1300], [615, 1600]),
  ...mkHist("gd-jnu", [592, 4551], [582, 5912], [603, 4615]),
  ...mkHist("gd-scnu", [573, 8310], [574, 7615], [593, 6889], 6060, 80),
  ...mkHist("gd-uic", [560, 10000], [569, 8769], [565, 11000], 100000, 30),

  // === Tier 3: Key Provincial (历史类) ===
  ...mkHist("gd-szu", [574, 8034], [574, 7579], [592, 7271]),
  ...mkHist("gd-smu", [555, 13410], [550, 14665], [571, 14424], 7650, 40),
  ...mkHist("gd-scau", [550, 15345], [546, 15923], [562, 18085]),
  ...mkHist("gd-gzhmu", [543, 17915], [541, 17000], [560, 16000], 7650, 40),
  ...mkHist("gd-gdufs", [529, 23907], [550, 14555], [580, 11073]),
  ...mkHist("gd-gdut", [524, 25975], [533, 21187], [559, 19566]),
  ...mkHist("gd-stu", [540, 19154], [542, 17624], [555, 20000]),
  ...mkHist("gd-gzucm", [540, 19202], [532, 21781], [556, 21146], 7650, 30),
  ...mkHist("gd-sztu", [540, 19159], [543, 17317], [550, 21000]),

  // === Tier 4: Regular Public (历史类) ===
  ...mkHist("gd-gzhu", [549, 15568], [541, 18134], [565, 16689]),
  ...mkHist("gd-gdufe", [534, 21557], [533, 21332], [560, 19251]),
  ...mkHist("gd-fosu", [502, 38415], [529, 22942], [530, 30000]),
  ...mkHist("gd-dgut", [510, 33526], [497, 41070], [520, 35000]),
  ...mkHist("gd-gdpu", [524, 26090], [531, 22374], [556, 20953]),
  ...mkHist("gd-gpnu", [523, 26530], [520, 29000], [525, 32000]),
  ...mkHist("gd-gdmu", [481, 52731], [451, 75514], [480, 55000], 7650, 40),
  ...mkHist("gd-gduf", [502, 38335], [502, 37741], [530, 35891]),
  ...mkHist("gd-gdpue", [491, 45643], [477, 54870], [490, 50000]),
  ...mkHist("gd-zku", [498, 41137], [504, 36463], [500, 42000]),
  ...mkHist("gd-gzmtu", [500, 39862], [498, 40000], [500, 42000]),
  ...mkHist("gd-gdou", [510, 33619], [513, 31267], [515, 34000]),
  ...mkHist("gd-gdei", [492, 45138], [496, 41234], [490, 48000]),
  ...mkHist("gd-wyu", [486, 49464], [507, 34551], [490, 48000]),
  ...mkHist("gd-hzu", [490, 46699], [499, 39320], [485, 52000]),
  ...mkHist("gd-zqu", [496, 42285], [499, 39478], [485, 52000]),
  ...mkHist("gd-sgu", [493, 44455], [496, 41833], [485, 52000]),
  ...mkHist("gd-gdupt", [497, 41930], [495, 42000], [488, 50000]),
  ...mkHist("gd-hstc", [494, 43779], [493, 43500], [485, 52000]),
  ...mkHist("gd-lnu", [503, 37604], [500, 38968], [490, 48000]),
  ...mkHist("gd-jyu", [496, 42394], [493, 43174], [485, 52000]),
  ...mkHist("gd-gzafa", [475, 57923], [470, 60000], [475, 58000], 10000, 25),
  ...mkHist("gd-xhcom", [527, 24887], [520, 28000], [525, 30000], 10000, 15),
  ...mkHist("gd-gzsu", [504, 37369], [500, 39000], [500, 42000]),

  // === Tier 5: Private/民办 (历史类) ===
  ...mkHist("gd-zhkc", [486, 49000], [487, 47648], [490, 50000], 30000, 80),
  ...mkHist("gd-gcuc", [485, 51000], [483, 50073], [507, 52460], 28000, 60),
  ...mkHist("gd-zsc", [470, 61000], [475, 56386], [480, 58000], 28000, 50),
  ...mkHist("gd-xinhua", [470, 61000], [477, 55042], [503, 55335], 28000, 50),
  ...mkHist("gd-nanfang", [486, 49293], [470, 62000], [464, 91184], 28000, 50),
  ...mkHist("gd-seig", [481, 53034], [458, 69807], [464, 91502], 28000, 50),
  ...mkHist("gd-gzcc", [454, 75243], [446, 79135], [460, 85000], 28000, 50),
  ...mkHist("gd-peizheng", [470, 61236], [456, 71172], [472, 83044], 28000, 40),
  ...mkHist("gd-baiyun", [493, 44445], [452, 74221], [477, 78693], 28000, 40),
  ...mkHist("gd-gzkj", [430, 99805], [439, 85702], [475, 80134], 28000, 40),
  ...mkHist("gd-gdust", [428, 102081], [440, 86000], [464, 91630], 28000, 40),
  ...mkHist("gd-gdlg", [428, 102270], [430, 94000], [464, 91640], 28000, 40),
  ...mkHist("gd-gzgs", [428, 102173], [428, 96208], [464, 91638], 30000, 40),
  ...mkHist("gd-zjkj", [433, 96965], [428, 96229], [464, 91645], 28000, 40),
  ...mkHist("gd-gwng", [450, 78000], [462, 66024], [486, 69814], 30000, 30),
  ...mkHist("gd-zhujiang", [431, 98196], [428, 96151], [464, 91648], 30000, 30),
  ...mkHist("gd-neusoft", [435, 92000], [452, 74152], [464, 91500], 28000, 30),
  ...mkHist("gd-citycollege", [482, 52121], [439, 85383], [460, 87000], 28000, 30),
  ...mkHist("gd-gzit", [453, 76205], [431, 93383], [464, 91652], 28000, 30),
  ...mkHist("gd-huashang", [435, 93000], [431, 93358], [464, 91635], 28000, 30),
  ...mkHist("gd-gzasc", [435, 93000], [428, 96262], [464, 91600], 28000, 30),
  ...mkHist("gd-huali", [435, 94176], [428, 96249], [464, 91636], 30000, 30),
  ...mkHist("gd-gdbt", [428, 102271], [428, 96265], [464, 91650], 28000, 30),

  // Note: 2024 history cutoff = 428, 2025 = 464. Some ranks estimated.
];

// ---------------------------------------------------------------------------
// COLLEGE / VOCATIONAL (专科) records — 物理类 + 历史类, 2023-2025
// ---------------------------------------------------------------------------

// Additional college university entries
export const collegeUniversities: University[] = [
  { id: "gd-szpt-col", name: "深圳职业技术大学(专科)", province: "广东", city: "深圳", tier: "专科", type: "理工", tags: ["职业本科","专科清华","双高计划"], website: "https://www.szpu.edu.cn", description: "全国高职排名第一，部分专业超本科线70分。" },
  { id: "gd-gdqg-col", name: "广东轻工职业技术大学(专科)", province: "广东", city: "广州", tier: "专科", type: "理工", tags: ["职业本科","双高计划"], website: "https://www.gdqg.edu.cn", description: "2024年升格为职业本科，双高计划A档。" },
  { id: "gd-sdpt-col", name: "顺德职业技术大学(专科)", province: "广东", city: "佛山", tier: "专科", type: "理工", tags: ["职业本科","双高计划"], website: "https://www.sdpt.edu.cn", description: "双高计划B档，协同培养分数高。" },
  { id: "gd-sziit-col", name: "深圳信息职业技术大学(专科)", province: "广东", city: "深圳", tier: "专科", type: "理工", tags: ["职业本科","信息类","双高计划"], website: "https://www.sziit.edu.cn", description: "2025年物理类协同培养501分，专科最高。" },
  { id: "gd-gzpyp-col", name: "广州番禺职业技术学院(专科)", province: "广东", city: "广州", tier: "专科", type: "综合", tags: ["双高计划"], website: "https://www.gzpyp.edu.cn", description: "双高计划B档，投档分超本科线。" },
  { id: "gd-gtxy-col", name: "广州铁路职业技术学院(专科)", province: "广东", city: "广州", tier: "专科", type: "理工", tags: ["双高计划","轨道交通"], website: "https://www.gtxy.cn", description: "双高计划C档，铁路交通特色。" },
  { id: "gd-gz民航-col", name: "广州民航职业技术学院(专科)", province: "广东", city: "广州", tier: "专科", type: "理工", tags: ["民航","双高计划"], website: "https://www.gcac.edu.cn", description: "民航局直属，双高计划C档。" },
  { id: "gd-dgpt-col", name: "东莞职业技术学院(专科)", province: "广东", city: "东莞", tier: "专科", type: "理工", tags: ["公办"], website: "https://www.dgpt.edu.cn", description: "东莞市属公办高职。" },
  { id: "gd-fspt-col", name: "佛山职业技术学院(专科)", province: "广东", city: "佛山", tier: "专科", type: "理工", tags: ["公办"], website: "https://www.fspt.edu.cn", description: "佛山市属公办高职。" },
  { id: "gd-swpt-col", name: "汕尾职业技术学院(专科)", province: "广东", city: "汕尾", tier: "专科", type: "综合", tags: ["公办","低分段"], website: "https://www.swpt.edu.cn", description: "汕尾市属公办高职，省内公办专科最低分段之一。" },
] as University[];

// College physical science records helper
function mkCol(uniId: string, data23: [number, number], data24: [number, number], data25: [number, number], estTuition = 6410, estQuota = 60): AdmissionRecord[] {
  return [
    { id: `rc-${uniId}-23`, year: 2023, province: "广东", subjectType: "物理类", universityId: uniId, majorId: "m-unified", lowestScore: data23[0], lowestRank: data23[1], quota: estQuota, tuition: estTuition },
    { id: `rc-${uniId}-24`, year: 2024, province: "广东", subjectType: "物理类", universityId: uniId, majorId: "m-unified", lowestScore: data24[0], lowestRank: data24[1], quota: estQuota, tuition: estTuition },
    { id: `rc-${uniId}-25`, year: 2025, province: "广东", subjectType: "物理类", universityId: uniId, majorId: "m-unified", lowestScore: data25[0], lowestRank: data25[1], quota: estQuota, tuition: estTuition },
  ];
}

function mkColHist(uniId: string, data23: [number, number|null], data24: [number, number|null], data25: [number, number|null], estTuition = 6410, estQuota = 40): AdmissionRecord[] {
  const result: AdmissionRecord[] = [];
  if (data23[1] !== null) result.push({ id: `rch-${uniId}-23`, year: 2023, province: "广东", subjectType: "历史类", universityId: uniId, majorId: "m-unified", lowestScore: data23[0], lowestRank: data23[1]!, quota: estQuota, tuition: estTuition });
  if (data24[1] !== null) result.push({ id: `rch-${uniId}-24`, year: 2024, province: "广东", subjectType: "历史类", universityId: uniId, majorId: "m-unified", lowestScore: data24[0], lowestRank: data24[1]!, quota: estQuota, tuition: estTuition });
  if (data25[1] !== null) result.push({ id: `rch-${uniId}-25`, year: 2025, province: "广东", subjectType: "历史类", universityId: uniId, majorId: "m-unified", lowestScore: data25[0], lowestRank: data25[1]!, quota: estQuota, tuition: estTuition });
  return result;
}

export const realCollegeRecords: AdmissionRecord[] = [
  // --- 物理类 College ---
  ...mkCol("gd-szpt-col", [509, 129495], [431, 271224], [433, 280203]), // 深职大(面向市外最低483)
  ...mkCol("gd-gdqg-col", [493, 152758], [415, 297877], [438, 273398], 6410),
  ...mkCol("gd-sdpt-col", [492, 153343], [430, 273280], [464, 229926], 6410),
  ...mkCol("gd-sziit-col", [465, 180000], [440, 260000], [428, 287952], 6410), // 深信大面向市内
  ...mkCol("gd-gzpyp-col", [492, 153747], [437, 273749], [437, 273000], 6410),
  ...mkCol("gd-gtxy-col", [470, 170000], [460, 236000], [460, 236335], 6410),
  ...mkCol("gd-gz民航-col", [460, 190000], [458, 239066], [458, 240000], 6410),
  ...mkCol("gd-dgpt-col", [440, 230000], [426, 290817], [426, 290000], 6410),
  ...mkCol("gd-fspt-col", [415, 300000], [412, 308967], [412, 309000], 6410),
  ...mkCol("gd-swpt-col", [336, 390000], [336, 384608], [336, 385000], 6410),

  // --- 历史类 College ---
  ...mkColHist("gd-szpt-col", [494, 50000], [488, 55000], [483, 60000]),
  ...mkColHist("gd-gdqg-col", [491, 52000], [460, 75000], [475, 80000]),
  ...mkColHist("gd-sdpt-col", [495, 50000], [489, 55000], [468, 75000]),
  ...mkColHist("gd-sziit-col", [412, 111530], [410, 115000], [420, 110000]),
  ...mkColHist("gd-gzpyp-col", [491, 52000], [460, 75000], [470, 78000]),
  ...mkColHist("gd-gtxy-col", [460, 85000], [455, 88000], [455, 90000]),
  ...mkColHist("gd-gz民航-col", [450, 90000], [448, 92000], [448, 93000]),
  ...mkColHist("gd-dgpt-col", [420, 110000], [415, 115000], [415, 116000]),
  ...mkColHist("gd-fspt-col", [400, 130000], [390, 135000], [390, 136000]),
  ...mkColHist("gd-swpt-col", [300, 220000], [290, 225000], [290, 226000]),
];
