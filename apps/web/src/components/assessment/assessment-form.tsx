"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, ArrowLeft, Check, Send, GraduationCap, BookOpen, Target,
  Clock, AlertTriangle, Palette,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@qixu/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@qixu/ui/card";
import { Badge } from "@qixu/ui/badge";
import type { AssessmentEngineInput } from "@qixu/domain";

// ---- Step Definitions ----

const STEPS = [
  { id: "grade", title: "年级", icon: GraduationCap },
  { id: "subjects", title: "学科与成绩", icon: BookOpen },
  { id: "goals", title: "学习目标", icon: Target },
  { id: "habits", title: "学习习惯", icon: Clock },
  { id: "review", title: "确认提交", icon: Check },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const GRADES = ["小学", "初中", "高中", "大学及以上"];
const SUBJECT_OPTIONS = ["数学", "英语", "语文", "物理", "化学", "生物", "历史", "地理", "政治", "计算机", "其他"];
const GOAL_OPTIONS = ["提升成绩", "备战考试", "培养兴趣", "竞赛准备", "能力拓展", "补齐短板", "升学准备"];
const WEAK_SUBJECTS = SUBJECT_OPTIONS;
const LEARNING_STYLES = [
  { value: "visual", label: "视觉型", desc: "喜欢图表、视频、文字" },
  { value: "auditory", label: "听觉型", desc: "喜欢听讲、讨论、音频" },
  { value: "reading", label: "读写型", desc: "喜欢阅读、笔记、写作" },
  { value: "kinesthetic", label: "实践型", desc: "喜欢动手、实验、项目" },
] as const;

const STYLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  visual: Palette,
  auditory: Clock,
  reading: BookOpen,
  kinesthetic: Target,
};

// ---- Component ----

export function AssessmentForm() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [grade, setGrade] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [learningGoals, setLearningGoals] = useState<string[]>([]);
  const [dailyStudyHours, setDailyStudyHours] = useState<number>(2);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = STEPS[stepIndex] ?? STEPS[0];
  const totalSteps = STEPS.length;
  const progress = ((stepIndex + 1) / totalSteps) * 100;
  const stepId: StepId = currentStep.id;

  const canNext = (() => {
    switch (stepId) {
      case "grade": return !!grade;
      case "subjects": return selectedSubjects.length > 0 && selectedSubjects.every((s) => scores[s] !== undefined);
      case "goals": return learningGoals.length > 0;
      case "habits": return dailyStudyHours > 0 && !!learningStyle;
      case "review": return true;
    }
  })();

  const handleNext = () => {
    if (stepIndex < totalSteps - 1) setStepIndex((s) => s + 1);
  };
  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex((s) => s - 1);
  };

  const toggleItem = (list: string[], setter: (v: string[]) => void, item: string) => {
    setter(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const handleScoreChange = (subject: string, value: number) => {
    setScores((prev) => ({ ...prev, [subject]: value }));
  };

  const buildInput = (): AssessmentEngineInput => ({
    grade,
    subjects: selectedSubjects,
    scores,
    learningGoals,
    dailyStudyHours,
    weakSubjects,
    learningStyle: learningStyle as AssessmentEngineInput["learningStyle"],
  });

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    const input = buildInput();
    // Store in sessionStorage for the result page to consume
    sessionStorage.setItem("qixu_assessment_input", JSON.stringify(input));
    setTimeout(() => {
      router.push("/result");
    }, 600);
  }, [grade, selectedSubjects, scores, learningGoals, dailyStudyHours, weakSubjects, learningStyle, router]);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{currentStep.title}</span>
          <span>{stepIndex + 1}/{totalSteps}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {<currentStep.icon className="h-5 w-5" />}
                </div>
                <div>
                  <CardTitle className="text-lg">第{stepIndex + 1}步：{currentStep.title}</CardTitle>
                  <CardDescription>
                    {stepTitle(stepId)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Step 1: Grade */}
              {stepId === "grade" && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`rounded-xl border-2 p-4 text-center transition-all ${
                        grade === g
                          ? "border-primary bg-primary/5 text-primary shadow-sm"
                          : "border-border/50 bg-card text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <span className="text-sm font-semibold">{g}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2: Subjects & Scores */}
              {stepId === "subjects" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {SUBJECT_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          if (selectedSubjects.includes(s)) {
                            setSelectedSubjects((prev) => prev.filter((x) => x !== s));
                            const next = { ...scores }; delete next[s]; setScores(next);
                          } else {
                            setSelectedSubjects((prev) => [...prev, s]);
                            setScores((prev) => ({ ...prev, [s]: 60 }));
                          }
                        }}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                          selectedSubjects.includes(s)
                            ? "border-primary/40 bg-primary/5 text-primary"
                            : "border-border/50 text-muted-foreground hover:border-primary/20"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {selectedSubjects.length > 0 && (
                    <div className="space-y-3 rounded-xl border border-border/40 bg-surface p-4">
                      <p className="text-xs font-medium text-muted-foreground">预估成绩 (0-100)</p>
                      {selectedSubjects.map((s) => (
                        <div key={s} className="flex items-center gap-3">
                          <span className="w-14 text-sm font-medium">{s}</span>
                          <input
                            type="range" min="0" max="100" value={scores[s] ?? 60}
                            onChange={(e) => handleScoreChange(s, Number(e.target.value))}
                            className="flex-1 accent-primary"
                          />
                          <span className={`w-10 text-right text-sm font-bold ${
                            (scores[s] ?? 0) >= 80 ? "text-success" : (scores[s] ?? 0) >= 60 ? "text-warning" : "text-danger"
                          }`}>{scores[s] ?? 60}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Goals */}
              {stepId === "goals" && (
                <div className="space-y-3">
                  {GOAL_OPTIONS.map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleItem(learningGoals, setLearningGoals, g)}
                      className={`w-full rounded-xl border-2 p-3 text-left transition-all ${
                        learningGoals.includes(g)
                          ? "border-primary/40 bg-primary/5 text-primary"
                          : "border-border/50 text-foreground hover:border-primary/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                          learningGoals.includes(g) ? "border-primary bg-primary text-primary-foreground" : "border-border"
                        }`}>
                          {learningGoals.includes(g) && <Check className="h-3 w-3" />}
                        </div>
                        <span className="text-sm font-medium">{g}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 4: Study Habits */}
              {stepId === "habits" && (
                <div className="space-y-6">
                  {/* Daily Study Hours */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">每日学习时长：{dailyStudyHours}小时</label>
                    <input
                      type="range" min="0.5" max="8" step="0.5" value={dailyStudyHours}
                      onChange={(e) => setDailyStudyHours(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                      <span>0.5h</span><span>2h</span><span>4h</span><span>6h</span><span>8h</span>
                    </div>
                  </div>

                  {/* Weak Subjects */}
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                      <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                      需要重点提升的学科
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {WEAK_SUBJECTS.map((s) => (
                        <button
                          key={s}
                          onClick={() => toggleItem(weakSubjects, setWeakSubjects, s)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                            weakSubjects.includes(s)
                              ? "border-warning/40 bg-warning/5 text-warning"
                              : "border-border/50 text-muted-foreground hover:border-warning/20"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Learning Style */}
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                      <Palette className="h-3.5 w-3.5 text-primary" />
                      学习风格偏好
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {LEARNING_STYLES.map((style) => {
                        const Icon = STYLE_ICONS[style.value] || Palette;
                        return (
                          <button
                            key={style.value}
                            onClick={() => setLearningStyle(style.value)}
                            className={`rounded-xl border-2 p-3 text-left transition-all ${
                              learningStyle === style.value
                                ? "border-primary/40 bg-primary/5"
                                : "border-border/50 hover:border-primary/20"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${learningStyle === style.value ? "text-primary" : "text-muted-foreground"}`} />
                              <span className={`text-sm font-semibold ${learningStyle === style.value ? "text-primary" : ""}`}>
                                {style.label}
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] text-muted-foreground">{style.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {stepId === "review" && (
                <div className="space-y-3">
                  <ReviewRow label="年级" value={grade} />
                  <ReviewRow label="学科" value={selectedSubjects.map((s) => `${s}(${scores[s] ?? "?"})`).join("、")} />
                  <ReviewRow label="学习目标" value={learningGoals.join("、")} />
                  <ReviewRow label="每日学习时长" value={`${dailyStudyHours}小时`} />
                  {weakSubjects.length > 0 && <ReviewRow label="薄弱学科" value={weakSubjects.join("、")} accent="warning" />}
                  <ReviewRow label="学习风格" value={LEARNING_STYLES.find((s) => s.value === learningStyle)?.label ?? ""} />
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={stepIndex === 0}
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />上一步
              </Button>

              {stepIndex < totalSteps - 1 ? (
                <Button onClick={handleNext} disabled={!canNext}>
                  下一步<ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="min-w-[140px]">
                  {isSubmitting ? (
                    <>分析中...</>
                  ) : (
                    <><Send className="mr-1.5 h-4 w-4" />提交评估</>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function stepTitle(id: StepId): string {
  switch (id) {
    case "grade": return "选择你当前的年级";
    case "subjects": return "选择学科并评估当前成绩";
    case "goals": return "选择你的学习目标";
    case "habits": return "描述你的学习习惯与偏好";
    case "review": return "确认信息并提交";
  }
}

function ReviewRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  const colorClass = accent === "warning" ? "text-warning" : "";
  return (
    <div className="flex justify-between rounded-lg border border-border/30 px-4 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${colorClass}`}>{value}</span>
    </div>
  );
}
