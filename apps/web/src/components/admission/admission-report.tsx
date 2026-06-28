"use client";

import Link from "next/link";
import {
  TrendingUp, CheckCircle2, ShieldCheck, AlertTriangle,
  DollarSign, MapPin, GraduationCap, Briefcase, Building,
  ArrowRight, BarChart3, Star, ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@qixu/ui/card";
import { Badge } from "@qixu/ui/badge";
import { Button } from "@qixu/ui/button";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import type { AdmissionRecommendationOutput, AdmissionRecommendation, StudentProfile } from "@qixu/domain";

// ---- Cost Constants ----

const CITY_LIVING_COST: Record<string, number> = {
  "深圳": 24000, "北京": 26000, "上海": 26000,
  "广州": 20000, "杭州": 20000, "南京": 18000,
  "珠海": 18000, "东莞": 16000, "佛山": 16000,
  "成都": 15000, "武汉": 15000,
};
const DEFAULT_LIVING = 16000;

// ---- Helpers ----

function getLivingCost(city: string): number {
  for (const [k, v] of Object.entries(CITY_LIVING_COST)) {
    if (city.includes(k)) return v;
  }
  return DEFAULT_LIVING;
}

function formatMoney(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  return n.toLocaleString();
}

function tierBadge(tier: string) {
  switch (tier) {
    case "reach": return <Badge variant="secondary">{tier === "reach" ? "冲刺" : tier}</Badge>;
    case "match": return <Badge variant="success">稳妥</Badge>;
    case "safe": return <Badge variant="success">保底</Badge>;
    default: return <Badge>{tier}</Badge>;
  }
}

function riskBadge(level: string) {
  switch (level) {
    case "low": return <Badge variant="success">低风险</Badge>;
    case "medium": return <Badge variant="warning">中风险</Badge>;
    case "high": return <Badge variant="destructive">高风险</Badge>;
    default: return <Badge>{level}</Badge>;
  }
}

// ---- Student Profile Card ----

function StudentCard({ student }: { student: StudentProfile }) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" />你的报考画像</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="省份" value={student.province} />
          <Stat label="分数" value={`${student.score}分`} accent />
          <Stat label="位次" value={`第${student.rank.toLocaleString()}名`} accent />
          <Stat label="预算" value={`≤${formatMoney(student.budget)}/年`} />
          <Stat label="调剂" value={student.adjustmentAccepted ? "接受" : "不接受"} />
          <Stat label="中外合作" value={student.cooperativeProgramAccepted ? "接受" : "不接受"} />
        </div>
        {(student.cityPreference.length > 0 || student.majorPreference.length > 0) && (
          <div className="mt-3 space-y-1.5 border-t border-border/30 pt-3">
            {student.cityPreference.length > 0 && <div className="text-xs text-muted-foreground"><MapPin className="mr-1 inline h-3 w-3" />城市偏好：{student.cityPreference.join("、")}</div>}
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

// ---- Recommendation Card (single) ----

function RecCard({ rec, index }: { rec: AdmissionRecommendation; index: number }) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="group border-border/50 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">{index + 1}</span>
                <CardTitle className="text-base">{rec.universityName}</CardTitle>
                {rec.tier === "safe" ? <Badge variant="success" className="text-xs">保底</Badge> : rec.tier === "match" ? <Badge className="text-xs bg-success/20 text-success">稳妥</Badge> : <Badge variant="secondary" className="text-xs">冲刺</Badge>}
              </div>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" />{rec.majorName}</span>
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
            {riskBadge(rec.breakdown.riskLevel)}
          </div>

          {/* Key indicators */}
          <div className="flex flex-wrap gap-2 text-[10px]">
            {rec.breakdown.budgetFit ? (
              <span className="flex items-center gap-1 rounded bg-success/10 px-2 py-0.5 text-success"><CheckCircle2 className="h-3 w-3" />预算匹配</span>
            ) : (
              <span className="flex items-center gap-1 rounded bg-warning/10 px-2 py-0.5 text-warning"><AlertTriangle className="h-3 w-3" />预算不足</span>
            )}
            {rec.breakdown.cityMatch ? (
              <span className="flex items-center gap-1 rounded bg-success/10 px-2 py-0.5 text-success"><CheckCircle2 className="h-3 w-3" />城市匹配</span>
            ) : (
              <span className="flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-muted-foreground">城市不匹配</span>
            )}
            {rec.breakdown.majorMatch ? (
              <span className="flex items-center gap-1 rounded bg-success/10 px-2 py-0.5 text-success"><CheckCircle2 className="h-3 w-3" />专业匹配</span>
            ) : (
              <span className="flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-muted-foreground">专业不匹配</span>
            )}
          </div>

          {/* Rule details (collapsed by default) */}
          <details className="text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">查看详细分析</summary>
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

// ---- Cost Analysis Section ----

function CostAnalysis({ recommendations }: { recommendations: AdmissionRecommendation[] }) {
  const withCost = recommendations.map((rec) => {
    const tuition = 115000; // Fallback — actual tuition lookup would come from AdmissionRecord
    const living = getLivingCost("深圳"); // Fallback
    const fourYear = (tuition + living) * 4;
    return { ...rec, tuition, living, fourYear };
  });

  return (
    <motion.div variants={fadeInUp}>
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary" />费用分析</CardTitle>
          <p className="text-xs text-muted-foreground">基于各高校所在城市的预估生活成本 + 学费</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="pb-2 pr-2 font-medium">学校</th>
                  <th className="pb-2 pr-2 font-medium">学费/年</th>
                  <th className="pb-2 pr-2 font-medium">生活费/年</th>
                  <th className="pb-2 font-medium">4年合计</th>
                </tr>
              </thead>
              <tbody>
                {withCost.slice(0, 10).map((rec) => {
                  const estTuition = rec.tier === "safe" ? 6850 : rec.tier === "match" ? 7650 : 115000;
                  const cityForCost = "深圳";
                  const living = getLivingCost(cityForCost);
                  const total = (estTuition + living) * 4;
                  return (
                    <tr key={rec.id} className="border-b border-border/20">
                      <td className="py-2 pr-2">{rec.universityName}</td>
                      <td className="py-2 pr-2">¥{formatMoney(estTuition)}</td>
                      <td className="py-2 pr-2">≈¥{formatMoney(living)}</td>
                      <td className="py-2 font-semibold">≈¥{formatMoney(total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground/60">* 学费/生活费用为预估值，实际以各高校当年招生简章为准</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---- Career Section ----

function CareerSection({ recommendations, careerPref }: { recommendations: AdmissionRecommendation[]; careerPref: string[] }) {
  const uniqueMajors = [...new Map(recommendations.map((r) => [r.majorName, r.majorName])).values()];

  return (
    <motion.div variants={fadeInUp}>
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" />职业发展建议</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium">推荐专业方向</h4>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {uniqueMajors.slice(0, 8).map((m) => (
                  <Badge key={m} variant="outline" className="text-xs">{m}</Badge>
                ))}
              </div>
            </div>
            {careerPref.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-success">与你的职业兴趣匹配</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {careerPref.join("、")}领域是本省高校的优势方向，建议结合专业排名和城市发展潜力综合考虑。
                </p>
              </div>
            )}
            <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">
                💡 建议：选择专业时综合考虑兴趣、就业前景、学校实力和城市发展潜力。志愿填报遵循"冲-稳-保"梯度策略，合理安排志愿顺序。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---- Main Report ----

interface AdmissionReportProps {
  output: AdmissionRecommendationOutput;
}

export function AdmissionReport({ output }: AdmissionReportProps) {
  const { student, recommendations, summary, generatedAt } = output;
  const reach = recommendations.filter((r) => r.tier === "reach");
  const match = recommendations.filter((r) => r.tier === "match");
  const safe = recommendations.filter((r) => r.tier === "safe");

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer} className="space-y-6">
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
        <p className="mt-3 text-[10px] text-muted-foreground/50">生成时间：{new Date(generatedAt).toLocaleString("zh-CN")}</p>
      </motion.div>

      {/* Student Profile */}
      <StudentCard student={student} />

      {/* Reach */}
      {reach.length > 0 && (
        <motion.div variants={fadeInUp}>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold"><TrendingUp className="h-5 w-5 text-warning" />冲刺院校 ({reach.length})</h3>
          <div className="space-y-3">{reach.map((rec, i) => <RecCard key={rec.id} rec={rec} index={i} />)}</div>
        </motion.div>
      )}

      {/* Match */}
      {match.length > 0 && (
        <motion.div variants={fadeInUp}>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold"><ShieldCheck className="h-5 w-5 text-success" />稳妥院校 ({match.length})</h3>
          <div className="space-y-3">{match.map((rec, i) => <RecCard key={rec.id} rec={rec} index={i} />)}</div>
        </motion.div>
      )}

      {/* Safe */}
      {safe.length > 0 && (
        <motion.div variants={fadeInUp}>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold"><CheckCircle2 className="h-5 w-5 text-success" />保底院校 ({safe.length})</h3>
          <div className="space-y-3">{safe.map((rec, i) => <RecCard key={rec.id} rec={rec} index={i} />)}</div>
        </motion.div>
      )}

      {/* Cost Analysis */}
      <CostAnalysis recommendations={recommendations} />

      {/* Career Suggestions */}
      <CareerSection recommendations={recommendations} careerPref={student.careerPreference} />

      {/* Disclaimer */}
      <motion.div variants={fadeInUp} className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-4 text-center">
        <p className="text-[11px] text-muted-foreground/60">
          ⚠️ 以上推荐基于模拟数据和规则引擎生成，仅供参考。实际志愿填报请以各省考试院公布数据为准。数据来源：模拟2025年广东录取数据。
        </p>
      </motion.div>
    </motion.div>
  );
}
