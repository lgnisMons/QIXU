"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Send, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@qixu/ui/button";
import { Badge } from "@qixu/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@qixu/ui/card";
import { fadeInUp } from "@/lib/motion";
import {
  assessmentGrades,
  assessmentTargets,
  generateMockAssessment,
  type MockAssessmentResult,
} from "@/lib/mock-data";

function AssessmentCard() {
  const [grade, setGrade] = useState("");
  const [target, setTarget] = useState("");
  const [subject, setSubject] = useState("");
  const [result, setResult] = useState<MockAssessmentResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!grade || !target) return;
    setIsGenerating(true);
    setTimeout(() => {
      setResult(generateMockAssessment(grade, target, subject || undefined));
      setIsGenerating(false);
    }, 1200);
  };

  const handleReset = () => {
    setResult(null);
    setGrade("");
    setTarget("");
    setSubject("");
  };

  return (
    <Card className="w-full max-w-sm border-border/40 bg-card/80 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">快速成长评估</CardTitle>
        <CardDescription>
          填写基础信息，获取个性化成长建议
        </CardDescription>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {result === null ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  年级
                </label>
                <div className="relative">
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-ring"
                  >
                    <option value="">选择年级</option>
                    {assessmentGrades.map((g) => (
                      <option key={g.value} value={g.label}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  目标
                </label>
                <div className="relative">
                  <select
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-ring"
                  >
                    <option value="">选择目标</option>
                    {assessmentTargets.map((t) => (
                      <option key={t.value} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  学科 <span className="text-muted-foreground">（可选）</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="如：数学、英语、物理"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-ring"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-xs font-medium text-success">优势</h4>
                <ul className="mt-1 space-y-1">
                  {result.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-sm text-foreground/80"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-medium text-warning">待提升</h4>
                <ul className="mt-1 space-y-1">
                  {result.weaknesses.map((w, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-sm text-foreground/80"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-warning" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-medium text-primary">建议</h4>
                <ul className="mt-1 space-y-1">
                  {result.suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-sm text-foreground/80"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        {result === null ? (
          <Button
            onClick={handleGenerate}
            disabled={!grade || !target || isGenerating}
            className="w-full"
            size="sm"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                生成建议
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full"
            size="sm"
          >
            <RefreshCw className="h-4 w-4" />
            重新评估
          </Button>
        )}
        <p className="text-center text-[10px] text-muted-foreground/60">
          * 基于本地模拟数据，非真实 AI 分析
        </p>
      </CardFooter>
    </Card>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-2xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left: Hero content */}
          <motion.div
            className="mx-auto max-w-2xl text-center lg:col-span-3 lg:mx-0 lg:text-left"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                AI 时代学习成长平台
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              启于今日，
              <br />
              <span className="text-primary">序向未来</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl"
            >
              启蒙 · 序章 · 未来。QIXU
              启序帮助学习者建立属于自己的
              <span className="font-medium text-foreground">
                Growth Sequence（成长序列）
              </span>
              ，让 AI 与导师陪伴你的学习旅程。
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button size="lg" asChild className="min-w-[160px] shadow-md">
                <Link href="/ai">
                  开始体验
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="min-w-[160px]"
              >
                <Link href="/about">了解更多</Link>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground sm:gap-8 lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                AI 学习助手
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                导师全程指导
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-warning" />
                成长档案
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Assessment Card */}
          <motion.div
            className="flex justify-center lg:col-span-2 lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <AssessmentCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
