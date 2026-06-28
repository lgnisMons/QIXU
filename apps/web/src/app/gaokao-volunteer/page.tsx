import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { PageCTA } from "@qixu/ui/page-cta";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { Button } from "@qixu/ui/button";
import { brandConfig } from "@qixu/config/brand";

export const metadata: Metadata = {
  title: "高考志愿填报指南 — 冲稳保梯度策略",
  description: "高考志愿怎么填？免费AI志愿推荐工具，基于历年录取数据提供冲稳保三梯度方案。输入分数位次，获取个性化推荐。",
  keywords: ["高考志愿怎么填","冲稳保策略","志愿梯度","免费志愿推荐","AI志愿填报","高考位次推荐"],
  openGraph: { title: `高考志愿填报指南 | ${brandConfig.name}` },
};

const faqs = [
  { q:"高考志愿怎么填才科学？", a:"采用「冲-稳-保」梯度策略：20%冲刺志愿(位次接近录取线)+50%稳妥志愿(位次在录取范围内)+30%保底志愿(位次远超录取线)。综合考虑分数位次、专业偏好、城市偏好、学费预算。" },
  { q:"冲稳保的比例怎么分配？", a:"一般建议2:5:3。如果追求稳妥可以1:5:4，如果想冲名校可以3:5:2。关键是无论如何至少留1-2个保底志愿。" },
  { q:"位次和分数哪个更重要？", a:"位次更重要。因为每年试卷难度不同，分数线会浮动，但录取位次相对稳定。填志愿时应以位次为主要参考。" },
  { q:"要不要接受专业调剂？", a:"建议接受。不接受调剂有可能被退档，一旦退档就只能等征集志愿。接受调剂至少保证有学上。" },
];

export default function GaokaoVolunteerPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label:"高考志愿填报指南", href:"/gaokao-volunteer" }]} />
      </div>
      <PageHeader title="高考志愿怎么填？" description="免费AI志愿推荐工具，基于历年录取数据分析，提供冲稳保三梯度方案。输入分数位次即可获取个性化推荐。">
        <GraduationCap className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>

      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
          <Card className="border-border/50"><CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">🎯</div><h3 className="font-bold text-lg">冲·稳·保</h3><p className="text-sm text-muted-foreground mt-2">三梯度科学分配志愿，最大化录取概率</p>
          </CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">📊</div><h3 className="font-bold text-lg">位次分析</h3><p className="text-sm text-muted-foreground mt-2">以位次为核心匹配往年录取数据</p>
          </CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">💰</div><h3 className="font-bold text-lg">费用对比</h3><p className="text-sm text-muted-foreground mt-2">学费+生活费，四年总成本一目了然</p>
          </CardContent></Card>
        </div>
      </PageSection>

      <PageSection background="default" spacing="sm">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-2">常见问题</h2>
          <p className="text-center text-sm text-muted-foreground mb-8">关于高考志愿填报的常见疑问</p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-lg border border-border/40 p-4">
                <summary className="cursor-pointer font-medium text-sm flex items-center gap-2"><HelpCircle className="h-4 w-4 text-primary shrink-0" />{f.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground pl-6">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </PageSection>

      <PageCTA title="免费获取你的志愿方案" description="输入分数和位次，获取基于数据分析的个性化志愿推荐" background="primary">
        <Button asChild size="lg" variant="secondary"><Link href="/admission">开始志愿推荐<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </PageCTA>
    </div>
  );
}
