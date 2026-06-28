"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, ArrowLeft, Check, Send, MapPin, BookOpen, Target,
  Wallet, Building, GraduationCap, Briefcase, Shield, Handshake,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@qixu/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@qixu/ui/card";
import type { StudentProfile, MajorCategory, SubjectType, FinancialLevel } from "@qixu/domain";

const STEPS = [
  { id: "basics", title: "成绩信息", icon: BookOpen },
  { id: "preferences", title: "偏好设置", icon: Target },
  { id: "review", title: "确认提交", icon: Check },
] as const;
type StepId = (typeof STEPS)[number]["id"];

const PROVINCES = ["广东", "北京", "上海", "浙江", "江苏", "四川", "湖北", "湖南", "山东", "河南", "福建"];
const MAJOR_CATEGORIES: { value: MajorCategory; label: string }[] = [
  { value: "工学", label: "工学" }, { value: "理学", label: "理学" },
  { value: "医学", label: "医学" }, { value: "文学", label: "文学" },
  { value: "经济学", label: "经济学" }, { value: "管理学", label: "管理学" },
  { value: "法学", label: "法学" }, { value: "教育学", label: "教育学" },
  { value: "艺术学", label: "艺术学" }, { value: "农学", label: "农学" },
];
const CITIES = ["深圳", "广州", "珠海", "东莞", "佛山", "北京", "上海", "杭州", "南京", "成都", "武汉"];
const CAREER_OPTIONS = ["互联网/科技", "金融", "医疗健康", "教育", "制造业", "公务员/事业单位", "创业", "科研", "文化传媒"];

const BUDGET_OPTIONS = [
  { value: 10000, label: "1万/年以下" }, { value: 30000, label: "1-3万/年" },
  { value: 60000, label: "3-6万/年" }, { value: 120000, label: "6-12万/年" },
  { value: 200000, label: "12万以上/年" },
];

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
  const [cityPref, setCityPref] = useState<string[]>([]);
  const [majorPref, setMajorPref] = useState<MajorCategory[]>([]);
  const [careerPref, setCareerPref] = useState<string[]>([]);
  const [adjustment, setAdjustment] = useState(true);
  const [cooperative, setCooperative] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const step = STEPS[stepI] ?? STEPS[0];
  const total = STEPS.length;
  const pct = ((stepI + 1) / total) * 100;
  const sid: StepId = step.id;

  const canNext = () => {
    switch (sid) {
      case "basics": return !!province && score > 0 && rank > 0;
      case "preferences": return budget > 0;
      case "review": return true;
    }
  };
  const next = () => { if (stepI < total - 1) setStepI((s) => s + 1); };
  const prev = () => { if (stepI > 0) setStepI((s) => s - 1); };

  const handleSubmit = () => {
    setSubmitting(true);
    const profile: StudentProfile = {
      province, score, rank, budget,
      careerPreference: careerPref,
      majorPreference: majorPref,
      cityPreference: cityPref,
      adjustmentAccepted: adjustment,
      cooperativeProgramAccepted: cooperative,
      familyFinancialLevel: budget >= 120000 ? "high" : budget >= 30000 ? "medium" : "low",
    };
    sessionStorage.setItem("qixu_admission_profile", JSON.stringify(profile));
    setTimeout(() => router.push("/admission-result"), 500);
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
                  <CardDescription>{sid === "basics" ? "填写高考成绩基本信息" : sid === "preferences" ? "选择你的志愿偏好" : "确认信息并生成推荐"}</CardDescription>
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
                      {PROVINCES.map((p) => (
                        <button key={p} onClick={() => setProvince(p)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${province === p ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/20"}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">科目类型</label>
                    <div className="flex gap-2">
                      {(["物理类", "历史类"] as SubjectType[]).map((t) => (
                        <button key={t} onClick={() => setSubjectType(t)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${subjectType === t ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">高考分数：{score}分</label>
                    <input type="range" min={300} max={750} value={score} onChange={(e) => setScore(Number(e.target.value))} className="w-full accent-primary" />
                    <div className="mt-1 flex justify-between text-[10px] text-muted-foreground"><span>300</span><span>450</span><span>550</span><span>650</span><span>750</span></div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">全省位次</label>
                    <input type="number" value={rank} onChange={(e) => setRank(Number(e.target.value))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-ring" placeholder="输入你的全省排名" />
                  </div>
                </div>
              )}

              {/* Step 2: Preferences */}
              {sid === "preferences" && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium"><Wallet className="mr-1.5 inline h-3.5 w-3.5 text-primary" />学费预算</label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_OPTIONS.map((b) => (
                        <button key={b.value} onClick={() => setBudget(b.value)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${budget === b.value ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/20"}`}>{b.label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium"><Building className="mr-1.5 inline h-3.5 w-3.5 text-primary" />意向城市（可多选）</label>
                    <div className="flex flex-wrap gap-2">
                      {CITIES.map((c) => (
                        <button key={c} onClick={() => toggle(cityPref, setCityPref, c, 5)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${cityPref.includes(c) ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/20"}`}>{c}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium"><GraduationCap className="mr-1.5 inline h-3.5 w-3.5 text-primary" />专业偏好（可多选）</label>
                    <div className="flex flex-wrap gap-2">
                      {MAJOR_CATEGORIES.map((m) => (
                        <button key={m.value} onClick={() => toggle(majorPref, setMajorPref, m.value, 5)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${majorPref.includes(m.value) ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/20"}`}>{m.label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium"><Briefcase className="mr-1.5 inline h-3.5 w-3.5 text-primary" />职业兴趣（可多选）</label>
                    <div className="flex flex-wrap gap-2">
                      {CAREER_OPTIONS.map((c) => (
                        <button key={c} onClick={() => toggle(careerPref, setCareerPref, c)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${careerPref.includes(c) ? "border-primary/40 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/20"}`}>{c}</button>
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
                  <ReviewRow label="高考分数" value={`${score}分`} accent="primary" />
                  <ReviewRow label="全省位次" value={`第${rank.toLocaleString()}名`} accent="primary" />
                  <ReviewRow label="预算" value={BUDGET_OPTIONS.find((b) => b.value === budget)?.label ?? ""} />
                  {cityPref.length > 0 && <ReviewRow label="意向城市" value={cityPref.join("、")} />}
                  {majorPref.length > 0 && <ReviewRow label="专业偏好" value={majorPref.join("、")} />}
                  {careerPref.length > 0 && <ReviewRow label="职业兴趣" value={careerPref.join("、")} />}
                  <hr className="border-border/40" />
                  <div className="space-y-2">
                    <div onClick={() => setAdjustment(!adjustment)} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/30 px-4 py-3 transition-colors hover:border-primary/20">
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${adjustment ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                        {adjustment && <Check className="h-3 w-3" />}
                      </div>
                      <div><div className="text-sm font-medium"><Shield className="mr-1 inline h-3.5 w-3.5 text-primary" />接受专业调剂</div><div className="text-xs text-muted-foreground">同意在目标专业满额时调剂到相近专业</div></div>
                    </div>
                    <div onClick={() => setCooperative(!cooperative)} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/30 px-4 py-3 transition-colors hover:border-primary/20">
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${cooperative ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                        {cooperative && <Check className="h-3 w-3" />}
                      </div>
                      <div><div className="text-sm font-medium"><Handshake className="mr-1 inline h-3.5 w-3.5 text-primary" />接受中外合作办学</div><div className="text-xs text-muted-foreground">接受中外合作办学项目（学费较高）</div></div>
                    </div>
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
