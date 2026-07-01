"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, ArrowLeft, Check, Send, MapPin, BookOpen, Target,
  Wallet, GraduationCap, Briefcase, Shield, Handshake, Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@qixu/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@qixu/ui/card";
import type { StudentProfile, MajorCategory, SubjectType } from "@qixu/domain";
import {
  ADMISSION_PROVINCES,
  MAJOR_CATEGORY_OPTIONS, CAREER_OPTIONS,
  SUBJECT_TYPES, BUDGET_OPTIONS, getScoreRange,
} from "@/lib/admission-data";

const STEPS = [
  { id: "basics" as const, title: "成绩信息", icon: BookOpen, desc: "填写高考成绩基本信息" },
  { id: "preferences" as const, title: "偏好设置", icon: Target, desc: "选择你的志愿偏好（可跳过，但会降低推荐质量）" },
  { id: "review" as const, title: "确认提交", icon: Check, desc: "确认信息并生成推荐" },
];
type StepId = (typeof STEPS)[number]["id"];

function toggle<T>(arr: T[], setter: (v: T[]) => void, item: T, max?: number) {
  if (arr.includes(item)) setter(arr.filter((x) => x !== item));
  else if (!max || arr.length < max) setter([...arr, item]);
}

export function AdmissionForm() {
  const router = useRouter();
  const [stepI, setStepI] = useState(0);
  const [province, setProvince] = useState("");
  const [subjectType, setSubjectType] = useState<SubjectType>("物理类");
  const [score, setScore] = useState(550);
  const [rank, setRank] = useState(50000);
  const [budget, setBudget] = useState(60000);
  const [majorPref, setMajorPref] = useState<MajorCategory[]>([]);
  const [careerPref, setCareerPref] = useState<string[]>([]);
  const [adjustment, setAdjustment] = useState(true);
  const [cooperative, setCooperative] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Dynamically adjust score range based on province
  const scoreRange = getScoreRange(province);

  const step = STEPS[stepI] ?? STEPS[0]!;
  const total = STEPS.length;
  const pct = ((stepI + 1) / total) * 100;
  const sid: StepId = step.id;

  // Adjust score to stay within province range when province changes
  useEffect(() => {
    const range = getScoreRange(province);
    if (score > range.max) setScore(range.max);
    if (score < range.min) setScore(range.min);
  }, [province]);

  const canNext = (): boolean => {
    switch (sid) {
      case "basics": return !!province && score > 0 && rank >= 1;
      case "preferences": return budget > 0;
      case "review": return true;
    }
  };
  const next = () => { if (stepI < total - 1) setStepI((s) => s + 1); };
  const prev = () => { if (stepI > 0) setStepI((s) => s - 1); };

  const handleSubmit = () => {
    setSubmitting(true);
    try {
      const profile: StudentProfile = {
        province, subjectType, score, rank, budget,
        careerPreference: careerPref,
        majorPreference: majorPref,
        adjustmentAccepted: adjustment,
        cooperativeProgramAccepted: cooperative,
        familyFinancialLevel: budget >= 120000 ? "high" : budget >= 30000 ? "medium" : "low",
      };
      // Persist to sessionStorage (fallback for non-URL access)
      sessionStorage.setItem("qixu_admission_profile", JSON.stringify(profile));
      // Encode to URL params for shareability & cross-tab support
      const params = new URLSearchParams();
      params.set("pv", province);
      params.set("st", subjectType);
      params.set("sc", String(score));
      params.set("rk", String(rank));
      params.set("bg", String(budget));
      if (majorPref.length > 0) params.set("mp", majorPref.join(","));
      if (careerPref.length > 0) params.set("cp", careerPref.join(","));
      params.set("aj", adjustment ? "1" : "0");
      params.set("co", cooperative ? "1" : "0");
      router.push(`/admission-result?${params.toString()}`);
    } finally {
      // Reset submitting state after a short delay in case navigation is delayed
      setTimeout(() => setSubmitting(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{step.title}</span><span>{stepI + 1}/{total}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted">
          <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={sid} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {<step.icon className="h-5 w-5" />}
                </div>
                <div>
                  <CardTitle className="text-lg">第{stepI + 1}步：{step.title}</CardTitle>
                  <CardDescription>{step.desc}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Step 1: Basics */}
              {sid === "basics" && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium"><MapPin className="mr-1.5 inline h-3.5 w-3.5 text-primary" />省份</label>
                    <div className="flex flex-wrap gap-2">
                      {ADMISSION_PROVINCES.map((p) => (
                        <button key={p} onClick={() => setProvince(p)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${province === p ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/20"}`}>{p}</button>
                      ))}
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted-foreground/60"><Info className="mr-1 inline h-3 w-3" />当前支持{ADMISSION_PROVINCES.length}个省份，更多省份数据持续扩展中</p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">科目类型</label>
                    <div className="flex gap-2">
                      {SUBJECT_TYPES.map((t) => (
                        <button key={t} onClick={() => setSubjectType(t)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${subjectType === t ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">高考分数</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={scoreRange.min} max={scoreRange.max}
                        value={score}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (!isNaN(v)) setScore(Math.min(scoreRange.max, Math.max(scoreRange.min, v)));
                        }}
                        className="w-28 rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-semibold tabular-nums outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                      />
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => setScore((s) => Math.min(scoreRange.max, s + 1))}
                          className="flex-1 rounded border border-border/50 px-2 text-xs hover:bg-muted transition-colors"
                          aria-label="加1分"
                        >▴</button>
                        <button
                          type="button"
                          onClick={() => setScore((s) => Math.max(scoreRange.min, s - 1))}
                          className="flex-1 rounded border border-border/50 px-2 text-xs hover:bg-muted transition-colors"
                          aria-label="减1分"
                        >▾</button>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={scoreRange.min} max={scoreRange.max}
                      value={score}
                      onChange={(e) => setScore(Number(e.target.value))}
                      className="mt-2 w-full accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                      <span>{scoreRange.min}</span>
                      <span>{Math.round(scoreRange.min + (scoreRange.max - scoreRange.min) / 3)}</span>
                      <span>{Math.round(scoreRange.min + (scoreRange.max - scoreRange.min) * 2 / 3)}</span>
                      <span>{scoreRange.max}</span>
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground/60">精确输入高考分数，也可用滑块快速调整。各省满分不同（如上海660分、海南900分）</p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">全省位次</label>
                    <input
                      type="number" min={1} max={999999}
                      value={rank}
                      onChange={(e) => setRank(Math.max(1, Number(e.target.value)))}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                      placeholder="输入你的全省排名（1-999999）"
                    />
                    <p className="mt-1 text-[10px] text-muted-foreground/60">输入正整数（全省排名），排名越靠前数字越小</p>
                  </div>
                </div>
              )}

              {/* Step 2: Preferences */}
              {sid === "preferences" && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium"><Wallet className="mr-1.5 inline h-3.5 w-3.5 text-primary" />年度总预算（学费+生活费）</label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_OPTIONS.map((b) => (
                        <button key={b.value} onClick={() => setBudget(b.value)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${budget === b.value ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/20"}`}>{b.label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium"><GraduationCap className="mr-1.5 inline h-3.5 w-3.5 text-primary" />专业偏好（可多选，最多5个）</label>
                    <div className="flex flex-wrap gap-2">
                      {MAJOR_CATEGORY_OPTIONS.map((m) => (
                        <button key={m.value} onClick={() => toggle(majorPref, setMajorPref, m.value, 5)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${majorPref.includes(m.value) ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/20"}`}>{m.label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium"><Briefcase className="mr-1.5 inline h-3.5 w-3.5 text-primary" />职业兴趣（可多选，最多8个）</label>
                    <div className="flex flex-wrap gap-2">
                      {CAREER_OPTIONS.map((c) => (
                        <button key={c} onClick={() => toggle(careerPref, setCareerPref, c, 8)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${careerPref.includes(c) ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/20"}`}>{c}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {sid === "review" && (
                <div className="space-y-4">
                  <ReviewRow label="省份" value={province} />
                  <ReviewRow label="科目类型" value={subjectType} />
                  <ReviewRow label="高考分数" value={`${score}分 (满分${scoreRange.max})`} accent="primary" />
                  <ReviewRow label="全省位次" value={`第${rank.toLocaleString()}名`} accent="primary" />
                  <ReviewRow label="预算" value={BUDGET_OPTIONS.find((b) => b.value === budget)?.label ?? ""} />
                  {majorPref.length > 0 && <ReviewRow label="专业偏好" value={majorPref.join("、")} />}
                  {careerPref.length > 0 && <ReviewRow label="职业兴趣" value={careerPref.join("、")} />}
                  <hr className="border-border/40" />
                  <div className="space-y-2">
                    <ToggleOption
                      enabled={adjustment} setter={setAdjustment}
                      icon={Shield} title="接受专业调剂"
                      desc="同意在目标专业满额时调剂到相近专业（增加录取概率，但可能录取到非首选专业）"
                    />
                    <ToggleOption
                      enabled={cooperative} setter={setCooperative}
                      icon={Handshake} title="接受中外合作办学"
                      desc="接受中外合作办学项目（学费通常较高，10万+/年）"
                    />
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={prev} disabled={stepI === 0}><ArrowLeft className="mr-1.5 h-4 w-4" />上一步</Button>
              {stepI < total - 1 ? (
                <Button onClick={next} disabled={!canNext()}>下一步<ArrowRight className="ml-1.5 h-4 w-4" /></Button>
              ) : (
                <Button onClick={handleSubmit} disabled={submitting} className="min-w-[160px]">
                  {submitting ? "分析中..." : <><Send className="mr-1.5 h-4 w-4" />生成推荐</>}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ReviewRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex justify-between rounded-lg border border-border/30 px-4 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${accent === "primary" ? "text-primary" : ""}`}>{value}</span>
    </div>
  );
}

function ToggleOption({ enabled, setter, icon: Icon, title, desc }: { enabled: boolean; setter: (v: boolean) => void; icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div onClick={() => setter(!enabled)} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/30 px-4 py-3 transition-colors hover:border-primary/20">
      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${enabled ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
        {enabled && <Check className="h-3 w-3" />}
      </div>
      <div>
        <div className="text-sm font-medium"><Icon className="mr-1 inline h-3.5 w-3.5 text-primary" />{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
