"use client";

import { useRef, useCallback, useState } from "react";
import Link from "next/link";
import {
  TrendingUp, CheckCircle2, ShieldCheck, AlertTriangle,
  DollarSign, MapPin, GraduationCap, Briefcase, Building,
  ArrowRight, BarChart3, Star, Download, Camera, UserCheck, MessageCircle,
  Sparkles, ChevronDown, ChevronUp, Filter, ArrowUpDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@qixu/ui/card";
import { Badge } from "@qixu/ui/badge";
import { Button } from "@qixu/ui/button";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import type { AdmissionRecommendationOutput, AdmissionRecommendation, StudentProfile } from "@qixu/domain";

// === City living cost lookup (from domain data would be ideal; here as fallback) ===

const CITY_LIVING_COST: Record<string, number> = {
  "深圳": 24000, "北京": 26000, "上海": 26000, "广州": 20000,
  "杭州": 20000, "武汉": 16000, "南京": 18000, "成都": 15000,
  "长沙": 15000, "青岛": 16000, "郑州": 14000, "福州": 16000,
  "珠海": 18000, "东莞": 16000, "佛山": 16000, "厦门": 20000,
  "汕头": 14000, "湛江": 13000, "茂名": 12000, "江门": 13000,
  "惠州": 14000, "肇庆": 12000, "韶关": 12000, "梅州": 11000,
  "潮州": 12000, "中山": 16000, "金华": 14000, "镇江": 14000,
  "湘潭": 12000, "宁波": 18000, "苏州": 18000, "无锡": 17000,
  "重庆": 15000, "西安": 14000, "天津": 18000, "大连": 15000,
  "沈阳": 14000, "哈尔滨": 13000, "长春": 13000, "济南": 16000,
  "合肥": 15000, "南昌": 14000, "昆明": 13000, "贵阳": 13000,
  "南宁": 13000, "海口": 15000, "兰州": 12000, "银川": 12000,
  "乌鲁木齐": 12000, "呼和浩特": 13000, "西宁": 11000, "拉萨": 12000,
  "太原": 13000, "石家庄": 13000, "廊坊": 14000, "烟台": 14000,
};
const DEFAULT_LIVING_COST = 15000;

function getLivingCost(city: string): number {
  for (const [k, v] of Object.entries(CITY_LIVING_COST)) {
    if (city.includes(k)) return v;
  }
  return DEFAULT_LIVING_COST;
}
function formatMoney(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  return n >= 1000 ? `${(n / 1000).toFixed(1)}千` : n.toLocaleString();
}
function formatNumber(n: number): string {
  return n.toLocaleString("zh-CN");
}

// === Risk flag helper ===

function isHighRisk(rec: AdmissionRecommendation): boolean {
  const reachRule = rec.rules.find((r) => r.category === "reach");
  return (reachRule?.score ?? 0) < 0.4 && rec.tier === "reach";
}

// === Student Card ===

function StudentCard({ student }: { student: StudentProfile }) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" />你的报考画像</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="省份" value={student.province} />
          <Stat label="科目" value={student.subjectType} />
          <Stat label="分数" value={`${student.score}分`} accent />
          <Stat label="位次" value={`第${formatNumber(student.rank)}名`} accent />
          <Stat label="年度预算" value={`≤${formatMoney(student.budget)}`} />
          <Stat label="家庭经济" value={student.familyFinancialLevel === "low" ? "普通" : student.familyFinancialLevel === "medium" ? "中等" : "宽裕"} />
        </div>
        {student.majorPreference.length > 0 && (
          <div className="mt-3 space-y-1.5 border-t border-border/30 pt-3">
            {student.majorPreference.length > 0 && <div className="text-xs text-muted-foreground"><GraduationCap className="mr-1 inline h-3 w-3" />专业偏好：{student.majorPreference.join("、")}</div>}
            {student.careerPreference.length > 0 && <div className="text-xs text-muted-foreground"><Briefcase className="mr-1 inline h-3 w-3" />职业兴趣：{student.careerPreference.join("、")}</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-border/40 bg-surface p-2.5 text-center">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-sm font-semibold ${accent ? "text-primary" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

// === AI Natural Language Explanation (P2) ===

function AIExplanation({ rec, studentRank }: { rec: AdmissionRecommendation; studentRank: number }) {
  const [open, setOpen] = useState(false);
  const matchRule = rec.rules.find((r) => r.category === "match");
  const budgetRule = rec.rules.find((r) => r.category === "budget");
  const riskRule = rec.rules.find((r) => r.category === "risk");
  const riskLabel = rec.breakdown.riskLevel === "low" ? "较低" : rec.breakdown.riskLevel === "medium" ? "中等" : "较高";

  // Build plain-Chinese explanation from rule engine results
  const matchDesc = (matchRule?.score ?? 0) >= 0.8 ? "录取概率较高" : (matchRule?.score ?? 0) >= 0.5 ? "有一定录取把握" : "录取存在一定难度";
  const budgetDesc = (budgetRule?.passed ?? false) ? "学费在你预算范围内" : "学费略超你的预算";

  // Correct comparison: actual cutoff rank vs actual student rank
  const cutoffRank = rec.lowestRank;
  const rankComparison = cutoffRank > studentRank
    ? `低于录取线（差${formatNumber(cutoffRank - studentRank)}名）`
    : cutoffRank <= studentRank
      ? `高于录取线（超出${formatNumber(studentRank - cutoffRank)}名）`
      : `接近录取线`;

  const explanation = `根据历年录取数据分析，${rec.universityName}(${rec.universityProvince}${rec.universityCity})的${rec.majorName}专业2025年录取最低位次为${formatNumber(cutoffRank)}名。你的位次为${formatNumber(studentRank)}名，${rankComparison}，${matchDesc}。${budgetDesc}（学费¥${formatMoney(rec.tuition)}/年）。综合风险${riskLabel}。此为${rec.tier === "safe" ? "保底" : rec.tier === "match" ? "稳妥" : "冲刺"}推荐。`;

  return (
    <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
      <div className="flex items-start gap-2">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">AI 推荐依据</span>
            <span className="text-[10px] text-muted-foreground/60">由规则引擎生成</span>
          </div>
          <p className={`text-xs text-muted-foreground mt-1 ${open ? "" : "line-clamp-2"}`}>
            {explanation}
          </p>
          {explanation.length > 100 && (
            <button onClick={() => setOpen(!open)} className="mt-1 text-[10px] text-primary hover:underline flex items-center gap-1">
              {open ? <><ChevronUp className="h-3 w-3" />收起</> : <><ChevronDown className="h-3 w-3" />展开完整说明</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// === Recommendation Card ===

function RecCard({ rec, index, studentRank }: { rec: AdmissionRecommendation; index: number; studentRank: number }) {
  // Smart tier label: for 985/211/双一流 schools, "safe" → "稳录" (feels more respectful)
  const eliteTiers = ["985", "211", "双一流"];
  const isElite = eliteTiers.includes(rec.universityTier);
  const tierLabel = rec.tier === "safe" && isElite ? "稳录" : rec.tier === "match" ? "稳妥" : rec.tier === "safe" ? "保底" : "冲刺";
  const tierVariant = rec.tier === "safe" ? "success" : rec.tier === "match" ? "success" : "warning";
  return (
    <motion.div variants={fadeInUp}>
      <Card className="group border-border/50 shadow-sm transition-shadow hover:shadow-md">
        {isHighRisk(rec) && (
          <div className="flex items-center gap-2 rounded-t-lg border-b border-warning/20 bg-warning/5 px-4 py-2 text-xs text-warning">
            <AlertTriangle className="h-3.5 w-3.5" />
            此推荐为冲刺目标，录取概率相对较低，建议结合稳妥和保底选择综合考量。
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">{index + 1}</span>
                <CardTitle className="text-base">{rec.universityName}</CardTitle>
                {/* University tier badge */}
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
                  {rec.universityTier}
                </Badge>
                {/* Recommendation tier badge */}
                <Badge variant={tierVariant as "success" | "warning"} className="text-xs">{tierLabel}</Badge>
              </div>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" />{rec.majorName}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{rec.universityProvince} {rec.universityCity}</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3" />匹配度 {rec.compositeScore}%</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Score breakdown */}
          <div className="grid grid-cols-4 gap-1.5">
            <ScoreTag label="冲刺" score={rec.rules.find((r) => r.category === "reach")?.score ?? 0} />
            <ScoreTag label="稳妥" score={rec.rules.find((r) => r.category === "match")?.score ?? 0} />
            <ScoreTag label="保底" score={rec.rules.find((r) => r.category === "safe")?.score ?? 0} />
            <div className={`rounded px-2 py-1 text-center ${rec.breakdown.riskLevel === "low" ? "bg-success/10" : rec.breakdown.riskLevel === "medium" ? "bg-warning/10" : "bg-danger/10"}`}>
              <div className="text-[9px] text-muted-foreground">风险</div>
              <div className={`text-xs font-bold ${rec.breakdown.riskLevel === "low" ? "text-success" : rec.breakdown.riskLevel === "medium" ? "text-warning" : "text-danger"}`}>
                {rec.breakdown.riskLevel === "low" ? "低" : rec.breakdown.riskLevel === "medium" ? "中" : "高"}
              </div>
            </div>
          </div>

          {/* Fast indicators */}
          <div className="flex flex-wrap gap-2 text-[10px]">
            {rec.breakdown.budgetFit ? (
              <span className="flex items-center gap-1 rounded bg-success/10 px-2 py-0.5 text-success"><CheckCircle2 className="h-3 w-3" />预算匹配</span>
            ) : (
              <span className="flex items-center gap-1 rounded bg-warning/10 px-2 py-0.5 text-warning"><AlertTriangle className="h-3 w-3" />预算超支</span>
            )}
            {rec.breakdown.majorMatch ? (
              <span className="flex items-center gap-1 rounded bg-success/10 px-2 py-0.5 text-success"><CheckCircle2 className="h-3 w-3" />专业匹配</span>
            ) : (
              <span className="flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-muted-foreground">专业不匹配</span>
            )}
            <span className="rounded bg-muted/50 px-2 py-0.5 text-muted-foreground">2025数据</span>
          </div>

          {/* P2: AI Natural Language Explanation */}
          <AIExplanation rec={rec} studentRank={studentRank} />

          {/* Expandable rule detail */}
          <details className="text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">查看详细规则分析</summary>
            <div className="mt-2 space-y-1.5">
              {rec.rules.map((r) => (
                <div key={r.category} className="flex items-start gap-2 rounded bg-muted/30 px-2 py-1">
                  <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${r.passed ? "bg-success" : "bg-warning"}`} />
                  <span className="text-muted-foreground">{r.detail}</span>
                </div>
              ))}
            </div>
          </details>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ScoreTag({ label, score }: { label: string; score: number }) {
  const pct = Math.round(score * 100);
  return (
    <div className="rounded bg-muted/50 px-2 py-1 text-center">
      <div className="text-[9px] text-muted-foreground">{label}</div>
      <div className={`text-xs font-bold ${pct >= 70 ? "text-success" : pct >= 40 ? "text-warning" : "text-danger"}`}>{pct}%</div>
    </div>
  );
}

// === Cost Analysis (P1: real tuition from AdmissionRecommendation) ===

function CostAnalysis({ recommendations }: { recommendations: AdmissionRecommendation[] }) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary" />费用分析</CardTitle>
          <p className="text-xs text-muted-foreground">学费来自推荐数据 · 生活费为所在城市平均水平参考</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="pb-2 pr-2 font-medium">学校</th>
                  <th className="pb-2 pr-2 font-medium">城市</th>
                  <th className="pb-2 pr-2 font-medium">学费/年</th>
                  <th className="pb-2 pr-2 font-medium">生活费/年(估)</th>
                  <th className="pb-2 pr-2 font-medium">年合计</th>
                  <th className="pb-2 font-medium">4年预估</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((rec) => {
                  const living = getLivingCost(rec.universityCity);
                  const yearly = rec.tuition + living;
                  const fourYear = yearly * 4;
                  return (
                    <tr key={rec.id} className="border-b border-border/20">
                      <td className="py-2 pr-2">{rec.universityName}</td>
                      <td className="py-2 pr-2">{rec.universityCity}</td>
                      <td className="py-2 pr-2">¥{formatMoney(rec.tuition)}</td>
                      <td className="py-2 pr-2">≈¥{formatMoney(living)}</td>
                      <td className="py-2 pr-2 font-medium">≈¥{formatMoney(yearly)}</td>
                      <td className="py-2 font-semibold">≈¥{formatMoney(fourYear)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground/60">* 生活费为城市平均水平参考，实际费用因个人消费习惯而异。正式填报请以各高校当年招生简章为准。</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// === Career Section ===

function CareerSection({ recommendations, careerPref }: { recommendations: AdmissionRecommendation[]; careerPref: string[] }) {
  const uniqueMajors = [...new Set(recommendations.map((r) => r.majorName))];
  return (
    <motion.div variants={fadeInUp}>
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" />职业发展建议</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div><h4 className="text-sm font-medium">推荐专业方向</h4><div className="mt-1.5 flex flex-wrap gap-1.5">{uniqueMajors.slice(0, 8).map((m) => (<Badge key={m} variant="outline" className="text-xs">{m}</Badge>))}</div></div>
          {careerPref.length > 0 && (
            <div><h4 className="text-sm font-medium text-success">与你的职业兴趣匹配</h4><p className="mt-1 text-xs text-muted-foreground">{careerPref.join("、")}领域与本省高校优势方向相关，建议结合专业排名和城市发展潜力综合考虑。</p></div>
          )}
          <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">💡 建议：综合兴趣、就业前景、学校实力和城市发展潜力选择专业。志愿填报遵循"冲-稳-保"梯度策略，合理安排志愿顺序。最终决策由你做出。</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// === P2: Mentor Review Placeholder ===

function MentorReview({ recommendations }: { recommendations: AdmissionRecommendation[] }) {
  const highRiskCount = recommendations.filter(isHighRisk).length;
  return (
    <motion.div variants={fadeInUp}>
      <Card className="border-dashed border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><UserCheck className="h-4 w-4 text-primary" />导师复核</CardTitle>
          <p className="text-xs text-muted-foreground">真实导师正在验证推荐结果的合理性（功能即将上线）</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-background/50 p-4 text-center">
            <MessageCircle className="mx-auto h-6 w-6 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              {highRiskCount > 0
                ? `你有${highRiskCount}个冲刺推荐建议咨询导师。导师复核功能上线后，我们将为你匹配真实导师对推荐结果进行人工确认和补充建议。`
                : "导师复核功能即将上线。届时，你可以邀请真实导师对你的推荐结果进行人工确认，获取更个性化的建议。"}
            </p>
            <p className="mt-2 text-xs text-muted-foreground/60">
              Human-in-the-Loop：AI 推荐 + 人类导师确认 = 最可信的升学规划
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// === P1: Save as Image (html-to-image) ===

function SaveAsImage({ reportRef }: { reportRef: React.RefObject<HTMLDivElement | null> }) {
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!reportRef.current) return;
    setSaving(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(reportRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      // Trigger download
      const link = document.createElement("a");
      link.download = `QIXU志愿推荐报告_${new Date().toLocaleDateString("zh-CN").replace(/\//g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Save as image failed:", err);
      // Graceful fallback: open print dialog
      window.print();
    } finally {
      setSaving(false);
    }
  }, [reportRef]);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
        <Download className="mr-1.5 h-4 w-4" />
        {saving ? "生成图片中..." : "保存为图片"}
      </Button>
    </div>
  );
}

// === Decision Reminder Banner (P0) ===

function DecisionBanner() {
  return (
    <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">请结合个人情况独立决策</p>
          <p className="mt-1 text-xs text-muted-foreground">
            以上推荐基于2023-2025年录取数据分析和规则引擎生成，<strong>仅供参考</strong>。
            AI 不能保证录取结果。最终志愿填报决策由你做出。
            正式填报请以各省教育考试院官方数据为准。
          </p>
        </div>
      </div>
    </div>
  );
}

// === Main Report ===

interface AdmissionReportProps {
  output: AdmissionRecommendationOutput;
}

export function AdmissionReport({ output }: AdmissionReportProps) {
  const reportRef = useRef<HTMLDivElement | null>(null);
  const { student, recommendations, summary, generatedAt } = output;

  // --- Filter & sort state ---
  const ALL_TIERS = ["reach", "match", "safe"] as const;
  const [activeTiers, setActiveTiers] = useState<Set<string>>(new Set(ALL_TIERS));
  const allProvinces = [...new Set(recommendations.map((r) => r.universityProvince))].sort();
  const [activeProvinces, setActiveProvinces] = useState<Set<string>>(new Set(allProvinces));
  type SortKey = "composite" | "tuition-asc" | "tuition-desc";
  const [sortBy, setSortBy] = useState<SortKey>("composite");
  // 办学层次 filter: true=本科, false=专科, null=全部
  const [levelFilter, setLevelFilter] = useState<"all" | "benke" | "zhuanke">("all");

  const toggleTier = (t: string) => {
    setActiveTiers((prev) => {
      const next = new Set(prev);
      if (next.has(t)) { if (next.size > 1) next.delete(t); }
      else next.add(t);
      return next;
    });
  };
  const toggleProvince = (p: string) => {
    setActiveProvinces((prev) => {
      const next = new Set(prev);
      if (next.has(p)) { if (next.size > 1) next.delete(p); }
      else next.add(p);
      return next;
    });
  };

  // Apply filters
  const filtered = recommendations
    .filter((r) => activeTiers.has(r.tier) && activeProvinces.has(r.universityProvince))
    .filter((r) => {
      if (levelFilter === "benke") return r.universityTier !== "专科";
      if (levelFilter === "zhuanke") return r.universityTier === "专科";
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "tuition-asc") return a.tuition - b.tuition;
      if (sortBy === "tuition-desc") return b.tuition - a.tuition;
      return b.compositeScore - a.compositeScore;
    });

  const reach = filtered.filter((r) => r.tier === "reach");
  const match = filtered.filter((r) => r.tier === "match");
  const safe = filtered.filter((r) => r.tier === "safe");

  // Global numbering across tiers
  let globalIdx = 0;
  const reachWithIdx = reach.map((rec) => ({ rec, idx: globalIdx++ }));
  const matchWithIdx = match.map((rec) => ({ rec, idx: globalIdx++ }));
  const safeWithIdx = safe.map((rec) => ({ rec, idx: globalIdx++ }));

  return (
    <motion.div ref={reportRef} initial="hidden" animate="show" variants={staggerContainer} className="space-y-6">
      {/* Summary */}
      <motion.div variants={fadeInUp} className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
        <BarChart3 className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-3 text-xl font-bold">你的志愿推荐</h2>
        <p className="mt-2 text-sm text-muted-foreground">{summary}</p>
        <div className="mt-4 flex justify-center gap-4">
          <Badge variant="secondary">{reach.length} 冲刺</Badge>
          <Badge variant="success">{match.length} 稳妥</Badge>
          <Badge variant="success">{safe.length} 保底</Badge>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground/50">
          生成时间：{new Date(generatedAt).toLocaleString("zh-CN")} · 数据来源：2023-2025年公开录取数据 · 仅供参考
        </p>
      </motion.div>

      {/* P0: Decision Reminder Banner */}
      <DecisionBanner />

      {/* Student Profile */}
      <StudentCard student={student} />

      {/* Filter & Sort Bar */}
      <motion.div variants={fadeInUp} className="rounded-lg border border-border/40 bg-surface p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium">层次：</span>
            {ALL_TIERS.map((t) => (
              <button
                key={t}
                onClick={() => toggleTier(t)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeTiers.has(t)
                    ? t === "reach" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"
                    : "bg-muted text-muted-foreground line-through"
                }`}
              >
                {t === "reach" ? "冲刺" : t === "match" ? "稳妥" : "保底"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">办学：</span>
            {([
              ["all", "全部"],
              ["benke", "本科"],
              ["zhuanke", "专科"],
            ] as const).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setLevelFilter(v)}
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                  levelFilter === v ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {label}
              </button>
            ))}
            <span className="mx-1 text-border">|</span>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="rounded border border-border/50 bg-background px-2 py-1 text-xs outline-none focus:border-primary"
            >
              <option value="composite">综合匹配度 ↓</option>
              <option value="tuition-asc">学费从低到高</option>
              <option value="tuition-desc">学费从高到低</option>
            </select>
          </div>
        </div>
        {allProvinces.length > 1 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-border/30 pt-2">
            <span className="text-[10px] text-muted-foreground mr-1">省份：</span>
            {allProvinces.map((p) => (
              <button
                key={p}
                onClick={() => toggleProvince(p)}
                className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                  activeProvinces.has(p)
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
        <p className="mt-2 text-[10px] text-muted-foreground/50">
          当前显示 {filtered.length}/{recommendations.length} 条推荐
        </p>
      </motion.div>

      {/* Reach */}
      {reach.length > 0 && (
        <motion.div variants={fadeInUp}>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold"><TrendingUp className="h-5 w-5 text-warning" />冲刺院校 ({reach.length})</h3>
          <p className="mb-3 text-xs text-muted-foreground">录取概率相对较低，但值得尝试。建议冲刺不超过志愿总数的20%。</p>
          <div className="space-y-3">{reachWithIdx.map(({ rec, idx }) => <RecCard key={rec.id} rec={rec} index={idx} studentRank={student.rank} />)}</div>
        </motion.div>
      )}

      {/* Match */}
      {match.length > 0 && (
        <motion.div variants={fadeInUp}>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold"><ShieldCheck className="h-5 w-5 text-success" />稳妥院校 ({match.length})</h3>
          <p className="mb-3 text-xs text-muted-foreground">你的位次在往年录取范围之内，录取概率较高。建议作为主力志愿。</p>
          <div className="space-y-3">{matchWithIdx.map(({ rec, idx }) => <RecCard key={rec.id} rec={rec} index={idx} studentRank={student.rank} />)}</div>
        </motion.div>
      )}

      {/* Safe */}
      {safe.length > 0 && (
        <motion.div variants={fadeInUp}>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold"><CheckCircle2 className="h-5 w-5 text-success" />保底院校 ({safe.length})</h3>
          <p className="mb-3 text-xs text-muted-foreground">位次远超往年录取线，录取把握极大。建议至少填报1-2个保底志愿。</p>
          <div className="space-y-3">{safeWithIdx.map(({ rec, idx }) => <RecCard key={rec.id} rec={rec} index={idx} studentRank={student.rank} />)}</div>
        </motion.div>
      )}

      {/* Cost Analysis (P1: real tuition data) */}
      <CostAnalysis recommendations={recommendations} />

      {/* Career Suggestions */}
      <CareerSection recommendations={recommendations} careerPref={student.careerPreference} />

      {/* P2: Mentor Review Placeholder */}
      <MentorReview recommendations={recommendations} />

      {/* Disclaimer — comprehensive */}
      <motion.div variants={fadeInUp} className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-4 text-center">
        <p className="text-[11px] text-muted-foreground/60">
          ⚠️ 以上推荐基于2023-2025年公开录取数据和规则引擎生成，仅作参考。AI 不声称"保证录取"或"最佳答案"。实际志愿填报请以各省教育考试院官方发布的招生计划和录取数据为准。最终决策由你做出。
        </p>
      </motion.div>

      {/* Share actions */}
      <SaveAsImage reportRef={reportRef} />
    </motion.div>
  );
}
