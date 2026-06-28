import type { Metadata } from "next";
import Link from "next/link";
import { Blocks, ArrowRight, Monitor, Wrench, BookOpen, HelpCircle } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { PageCTA } from "@qixu/ui/page-cta";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { Button } from "@qixu/ui/button";
import { brandConfig } from "@qixu/config/brand";

export const metadata: Metadata = {
  title: "AI工具课堂 — 推荐适合学习的AI工具",
  description: "精选适合不同学习阶段的AI工具推荐。AI助手、学习平台、效率工具，帮助你用AI提升学习效率。",
  keywords: ["AI工具课堂","AI工具推荐","学习工具","AI学习","效率工具","AI助手推荐","免费AI工具"],
  openGraph: { title: `AI工具课堂 | ${brandConfig.name}` },
};

const categories = [
  { icon: Monitor, title: "AI助手推荐", desc: "精选Claude、ChatGPT、Kimi等适合学习的AI对话工具，各有特色，按需选择。" },
  { icon: BookOpen, title: "学习平台", desc: "推荐优质在线学习平台和资源库，涵盖K12到大学阶段的各学科内容。" },
  { icon: Wrench, title: "效率工具", desc: "笔记工具、时间管理、专注力训练、思维导图等提升学习效率的实用工具。" },
];

const faqs = [
  { q:"AI工具课堂是什么？", a:"是QIXU的AI工具推荐和学习资源中心。我们精选适合不同学习阶段的AI工具，帮助你提升学习效率。" },
  { q:"推荐的AI工具收费吗？", a:"大部分推荐工具都有免费版本可以使用。我们会标注每个工具的收费模式，帮你选择最适合的方案。" },
  { q:"如何选择最适合我的AI工具？", a:"完成AI学习测评后，系统会根据你的学习风格和目标，推荐最适合你的AI工具组合。" },
];

export default function AIToolsCoursePage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label:"AI工具课堂", href:"/ai-tools-course" }]} />
      </div>
      <PageHeader title="AI工具课堂" description="精选适合学习的AI工具，帮助你用AI提升学习效率。AI助手×学习平台×效率工具。">
        <Blocks className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <Card key={c.title} className="border-border/50"><CardContent className="p-6 text-center">
              <c.icon className="mx-auto h-10 w-10 text-primary mb-3" />
              <h3 className="font-bold text-lg">{c.title}</h3><p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
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
      <PageCTA title="发现你的AI工具组合" description="完成AI学习测评，获取个性化工具推荐" background="primary">
        <Button asChild size="lg" variant="secondary"><Link href="/assessment">免费测评<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </PageCTA>
    </div>
  );
}
