"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, ClipboardCheck, BarChart3, HelpCircle, Map, Shield, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@qixu/ui/button";
import { AdmissionForm } from "./admission-form";

const TABS = [
  { id: "overview", label: "概览", icon: GraduationCap },
  { id: "assessment", label: "评估", icon: ClipboardCheck },
  { id: "recommendation", label: "推荐", icon: BarChart3 },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "roadmap", label: "路线图", icon: Map },
  { id: "policies", label: "说明", icon: Shield },
] as const;
type TabId = (typeof TABS)[number]["id"];

const FAQ_ITEMS = [
  { q: "推荐数据来源是什么？", a: "当前数据基于2025年广东省高考录取模拟数据。未来将接入官方数据源。数据仅供参考，实际填报请以省考试院为准。" },
  { q: "冲稳保是什么意思？", a: "「冲刺」指接近往年录取线的院校，有一定风险；「稳妥」指历年录取位次低于你的排名，录取概率较高；「保底」指历年录取位次远低于你的排名，录取把握极大。" },
  { q: "费用分析准确吗？", a: "学费数据基于往年招生简章估算，生活费为所在城市平均水平参考。实际费用因专业和个人消费习惯而异。" },
  { q: "志愿推荐免费吗？", a: "完全免费。QIXU 启序的志愿推荐功能对全体用户永久免费。" },
];

const ROADMAP_ITEMS = [
  { phase: "当前版本 (v0.8)", items: ["广东省基础推荐", "冲稳保三梯度分析", "费用对比", "规则引擎评分"] },
  { phase: "下一版本 (v0.9)", items: ["全国省份覆盖", "官方数据接入", "专业深度分析", "录取概率预测"] },
  { phase: "远期规划", items: ["AI个性化建议", "生涯规划联动", "实时录取追踪", "学长学姐经验"] },
];

const POLICIES = [
  "数据来源：当前为模拟数据，仅供体验参考",
  "推荐结果不构成正式报考建议",
  "正式志愿填报请以各省教育考试院官方数据为准",
  "本功能永久免费，无任何收费项目",
  "不收集用户敏感个人信息",
  "推荐算法透明，规则可解释",
];

export function AdmissionTabs() {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <div className="mx-auto max-w-3xl">
      {/* Tab bar */}
      <div className="mb-8 flex overflow-x-auto rounded-xl border border-border/40 bg-card p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              active === tab.id ? "bg-primary/10 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>

          {/* Overview */}
          {active === "overview" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="text-xl font-bold">高考志愿推荐系统</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  QIXU 高考志愿推荐系统基于模拟录取数据和规则引擎，为你提供科学、透明的志愿填报参考。
                  输入分数位次和偏好，系统自动生成冲刺、稳妥、保底三梯度推荐方案，并包含费用分析和职业建议。
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg bg-primary/5 p-4"><div className="text-2xl font-bold text-primary">3</div><div className="text-xs text-muted-foreground mt-1">梯度层次</div></div>
                  <div className="rounded-lg bg-success/5 p-4"><div className="text-2xl font-bold text-success">8</div><div className="text-xs text-muted-foreground mt-1">评分维度</div></div>
                  <div className="rounded-lg bg-warning/5 p-4"><div className="text-2xl font-bold text-warning">10+</div><div className="text-xs text-muted-foreground mt-1">院校数据</div></div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button onClick={() => setActive("assessment")}><ClipboardCheck className="mr-1.5 h-4 w-4" />开始评估</Button>
                  <Button variant="outline" asChild><Link href="/admission-result">查看示例</Link></Button>
                </div>
              </div>
            </div>
          )}

          {/* Assessment Form */}
          {active === "assessment" && <AdmissionForm />}

          {/* Recommendation */}
          {active === "recommendation" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-primary mb-4" />
                <h2 className="text-xl font-bold">查看你的推荐结果</h2>
                <p className="mt-2 text-muted-foreground">完成评估后，系统将为你生成个性化的志愿推荐报告，包含费用分析和职业建议。</p>
                <Button asChild className="mt-6" size="lg"><Link href="/admission-result">查看我的推荐<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </div>
            </div>
          )}

          {/* FAQ */}
          {active === "faq" && (
            <div className="space-y-3">
              {FAQ_ITEMS.map((f) => (
                <details key={f.q} className="rounded-lg border border-border/40 p-4">
                  <summary className="cursor-pointer font-medium text-sm">{f.q}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          )}

          {/* Roadmap */}
          {active === "roadmap" && (
            <div className="relative space-y-0">
              {ROADMAP_ITEMS.map((r, i) => (
                <div key={r.phase} className="relative flex gap-4 pb-8">
                  {i < ROADMAP_ITEMS.length - 1 && (
                    <div className="absolute left-[15px] top-8 h-full w-px bg-border" />
                  )}
                  <div className={`relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 ${i === 0 ? "border-primary bg-primary" : "border-muted-foreground/30 bg-card"}`} />
                  <div><h3 className="font-semibold">{r.phase}</h3><ul className="mt-2 space-y-1">{r.items.map((item) => (<li key={item} className="text-sm text-muted-foreground">• {item}</li>))}</ul></div>
                </div>
              ))}
            </div>
          )}

          {/* Policies */}
          {active === "policies" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <ul className="space-y-3">{POLICIES.map((p) => (<li key={p} className="flex items-start gap-2 text-sm"><Shield className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><span className="text-muted-foreground">{p}</span></li>))}</ul>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
