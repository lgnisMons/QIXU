import type { Metadata } from "next";
import Link from "next/link";
import { Blocks, ArrowRight, Sparkles, Monitor, Wrench } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { PageCTA } from "@qixu/ui/page-cta";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { Button } from "@qixu/ui/button";
import { seoConfig } from "@qixu/config/seo";

export const metadata: Metadata = {
  title: "AI工具课堂",
  description: "AI 工具推荐 · 学习资源库 · 效率提升工具集。探索适合学习的 AI 工具。",
  openGraph: { title: `AI工具课堂 | ${seoConfig.siteName}` },
};

const FAQ = [
  { q: "AI工具课堂是什么？", a: "AI工具课堂是 QIXU 的AI工具推荐和学习资源中心。我们精选适合不同学习阶段的AI工具，帮助你提升学习效率。" },
  { q: "工具收费吗？", a: "我们会标注工具的收费模式（免费/免费增值/付费），大部分推荐工具都有免费版本。QIXU的课程和指导完全免费。" },
  { q: "如何选择最适合我的工具？", a: "完成AI学习测评后，系统会根据你的学习风格和目标，推荐最适合你的AI工具组合。" },
];

export default function ToolsPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "AI工具课堂", href: "/tools" }]} />
      </div>
      <PageHeader title="AI工具课堂" description="AI 工具推荐 · 学习资源库 · 效率提升工具集"><Blocks className="mx-auto mt-4 h-10 w-10 text-primary" /></PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
          <Card className="border-border/50"><CardContent className="p-6 text-center"><Sparkles className="mx-auto h-8 w-8 text-primary mb-3" /><h3 className="font-bold">AI 助手推荐</h3><p className="text-sm text-muted-foreground mt-2">精选适合学习的AI对话和创作工具</p></CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6 text-center"><Monitor className="mx-auto h-8 w-8 text-success mb-3" /><h3 className="font-bold">学习平台</h3><p className="text-sm text-muted-foreground mt-2">推荐优质在线学习平台和资源库</p></CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6 text-center"><Wrench className="mx-auto h-8 w-8 text-warning mb-3" /><h3 className="font-bold">效率工具</h3><p className="text-sm text-muted-foreground mt-2">笔记、时间管理、专注力工具推荐</p></CardContent></Card>
        </div>
      </PageSection>
      <PageSection background="default" spacing="sm">
        <div className="mx-auto max-w-2xl"><h2 className="text-2xl font-bold text-center mb-8">常见问题</h2><div className="space-y-3">{FAQ.map((f) => (<details key={f.q} className="rounded-lg border border-border/40 p-4"><summary className="cursor-pointer font-medium text-sm">{f.q}</summary><p className="mt-2 text-sm text-muted-foreground">{f.a}</p></details>))}</div></div>
      </PageSection>
      <PageCTA title="探索你的最佳工具组合" description="完成AI学习测评，获取个性化工具推荐" background="primary">
        <Button asChild size="lg" variant="secondary"><Link href="/assessment">免费测评<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </PageCTA>
    </div>
  );
}
