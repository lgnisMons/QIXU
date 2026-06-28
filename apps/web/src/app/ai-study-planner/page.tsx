import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, Target, BarChart3, Lightbulb, HelpCircle } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { PageCTA } from "@qixu/ui/page-cta";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { Button } from "@qixu/ui/button";
import { brandConfig } from "@qixu/config/brand";

export const metadata: Metadata = {
  title: "AI学习规划器 — 个性化学习路径生成",
  description: "AI驱动的学习规划工具。输入年级和目标，自动生成个性化学习路径。含能力诊断、阶段规划、进度跟踪。",
  keywords: ["AI学习规划","学习路径","个性化学习","AI诊断","学习计划","自适应学习"],
  openGraph: { title: `AI学习规划器 | ${brandConfig.name}` },
};

const features = [
  { icon: Target, title: "智能诊断", desc: "多维度评估学习能力、风格和薄弱环节，精准定位学习起点。" },
  { icon: BarChart3, title: "路径生成", desc: "基于诊断结果，AI自动生成分阶段学习路径，每阶段有明确目标。" },
  { icon: Lightbulb, title: "动态调整", desc: "根据学习进度和反馈，实时调整学习计划和难度，确保始终在最佳学习区。" },
];

const faqs = [
  { q:"AI学习规划器是什么？", a:"是一个基于AI的学习路径生成工具。通过能力诊断了解你的学习水平和风格，自动生成个性化的分阶段学习计划。" },
  { q:"AI生成的计划靠谱吗？", a:"AI根据你的实际学习数据和认知科学原理生成建议。计划可以随时调整，最终决定权在你手中。AI是辅助，不是替代。" },
  { q:"需要付费吗？", a:"核心功能永久免费。完成AI学习测评即可获得个性化学习建议和路径规划。" },
];

export default function AIStudyPlannerPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label:"AI学习规划器", href:"/ai-study-planner" }]} />
      </div>
      <PageHeader title="AI学习规划器" description="输入你的学习目标和现状，AI自动生成分阶段个性化学习路径">
        <Sparkles className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border-border/50"><CardContent className="p-6 text-center">
              <f.icon className="mx-auto h-10 w-10 text-primary mb-3" />
              <h3 className="font-bold text-lg">{f.title}</h3><p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
            </CardContent></Card>
          ))}
        </div>
      </PageSection>
      <PageSection background="default" spacing="sm">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
          <div className="space-y-3">{faqs.map((f) => (
            <details key={f.q} className="rounded-lg border border-border/40 p-4">
              <summary className="cursor-pointer font-medium text-sm flex items-center gap-2"><HelpCircle className="h-4 w-4 text-primary shrink-0" />{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground pl-6">{f.a}</p>
            </details>
          ))}</div>
        </div>
      </PageSection>
      <PageCTA title="生成你的学习路径" description="完成3分钟AI学习测评，获取个性化学习规划" background="primary">
        <Button asChild size="lg" variant="secondary"><Link href="/assessment">免费测评<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </PageCTA>
    </div>
  );
}
