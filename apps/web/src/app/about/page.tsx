import type { Metadata } from "next";
import Link from "next/link";
import { Info, ArrowRight, BookOpen, Heart, Target } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { PageCTA } from "@qixu/ui/page-cta";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { Button } from "@qixu/ui/button";
import { brandConfig } from "@qixu/config/brand";
import { seoConfig } from "@qixu/config/seo";

export const metadata: Metadata = {
  title: "关于启序",
  description: `${brandConfig.slogan} — 了解 QIXU 的品牌故事与成长理念`,
  openGraph: { title: `关于启序 | ${seoConfig.siteName}` },
};

const FAQ = [
  { q: "QIXU 启序是什么？", a: `QIXU 启序（${brandConfig.slogan}）是一个AI时代的学习成长平台。我们提供AI学习助手、真人导师陪伴、成长档案和志愿规划服务。` },
  { q: "QIXU 启序收费吗？", a: "所有核心功能永久免费，包括AI学习测评、高考志愿推荐、学习工具推荐。导师服务按需付费。" },
  { q: "QIXU 启序的导师来自哪里？", a: "导师来自深圳及周边高校（深圳大学、香港中文大学（深圳）、南方科技大学等），均为真实教育者。" },
];

export default function AboutPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "关于启序", href: "/about" }]} />
      </div>
      <PageHeader title="关于启序" description={`${brandConfig.slogan} — 了解 QIXU 的品牌故事与成长理念`}><Info className="mx-auto mt-4 h-10 w-10 text-primary" /></PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
          <Card className="border-border/50"><CardContent className="p-6 text-center"><BookOpen className="mx-auto h-8 w-8 text-primary mb-3" /><h3 className="font-bold">{brandConfig.philosophy.split("·")[0]?.trim() ?? "启蒙"}</h3><p className="text-sm text-muted-foreground mt-2">发现兴趣，认识潜能</p></CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6 text-center"><Heart className="mx-auto h-8 w-8 text-success mb-3" /><h3 className="font-bold">AI+人文</h3><p className="text-sm text-muted-foreground mt-2">AI是辅助者，不是替代者</p></CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6 text-center"><Target className="mx-auto h-8 w-8 text-warning mb-3" /><h3 className="font-bold">成长优先</h3><p className="text-sm text-muted-foreground mt-2">建立属于自己的成长序列</p></CardContent></Card>
        </div>
      </PageSection>
      <PageSection background="default" spacing="sm">
        <div className="mx-auto max-w-2xl"><h2 className="text-2xl font-bold text-center mb-8">常见问题</h2><div className="space-y-3">{FAQ.map((f) => (<details key={f.q} className="rounded-lg border border-border/40 p-4"><summary className="cursor-pointer font-medium text-sm">{f.q}</summary><p className="mt-2 text-sm text-muted-foreground">{f.a}</p></details>))}</div></div>
      </PageSection>
      <PageCTA title="开启你的成长序列" description={`${brandConfig.slogan}。完成AI学习测评，发现你的成长起点。`} background="primary">
        <Button asChild size="lg" variant="secondary"><Link href="/assessment">免费测评<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </PageCTA>
    </div>
  );
}
