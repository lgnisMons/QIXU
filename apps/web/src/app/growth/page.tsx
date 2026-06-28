import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, ArrowRight, Users, Target, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { PageCTA } from "@qixu/ui/page-cta";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { Button } from "@qixu/ui/button";
import { seoConfig } from "@qixu/config/seo";

export const metadata: Metadata = {
  title: "成长档案",
  description: "记录学习每一刻，可视化成长轨迹。AI驱动的个性化成长档案系统。",
  openGraph: { title: `成长档案 | ${seoConfig.siteName}` },
};

const FAQ = [
  { q: "成长档案包含什么？", a: "包含学习记录、能力雷达图、里程碑达成、成长报告等维度，全面反映你的学习进程。" },
  { q: "数据如何更新？", a: "完成评估、学习计划或导师课程后，系统会自动更新你的成长档案。" },
  { q: "成长档案可以分享吗？", a: "可以在隐私设置中控制分享范围，支持分享给家长、导师或社交平台。" },
];

export default function GrowthPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "成长档案", href: "/growth" }]} />
      </div>
      <PageHeader title="成长档案" description="记录学习的每一个重要时刻，可视化成长轨迹，让进步看得见">
        <BarChart3 className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>

      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
          <Card className="border-border/50"><CardContent className="p-6"><Target className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-bold text-lg">能力雷达图</h3><p className="text-sm text-muted-foreground mt-2">多维度可视化你的学科能力分布，直观对比成长前后变化。</p>
          </CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6"><Clock className="h-8 w-8 text-success mb-3" />
            <h3 className="font-bold text-lg">学习历程</h3><p className="text-sm text-muted-foreground mt-2">自动记录每日学习时长、完成目标数、课程进度等关键数据。</p>
          </CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6"><CheckCircle2 className="h-8 w-8 text-warning mb-3" />
            <h3 className="font-bold text-lg">成果展示</h3><p className="text-sm text-muted-foreground mt-2">汇聚学习成果、证书、项目作品，形成可展示的个人学习档案。</p>
          </CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6"><Users className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-bold text-lg">成长报告</h3><p className="text-sm text-muted-foreground mt-2">定期生成学习成长报告，帮助你回顾进步、调整方向。</p>
          </CardContent></Card>
        </div>
      </PageSection>

      <PageSection background="default" spacing="sm">
        <div className="mx-auto max-w-2xl"><h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
          <div className="space-y-3">{FAQ.map((f) => (<details key={f.q} className="rounded-lg border border-border/40 p-4"><summary className="cursor-pointer font-medium text-sm">{f.q}</summary><p className="mt-2 text-sm text-muted-foreground">{f.a}</p></details>))}</div>
        </div>
      </PageSection>

      <PageCTA title="开始记录成长" description="完成AI学习测评，开启你的成长档案" background="primary">
        <Button asChild size="lg" variant="secondary"><Link href="/assessment">免费测评<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </PageCTA>
    </div>
  );
}
