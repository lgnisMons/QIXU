import type { Metadata } from "next";
import Link from "next/link";
import { Users, ArrowRight, GraduationCap, MapPin, HelpCircle } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { PageCTA } from "@qixu/ui/page-cta";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { Button } from "@qixu/ui/button";
import { brandConfig } from "@qixu/config/brand";

export const metadata: Metadata = {
  title: "深圳家教 — AI学习助手+真人导师陪伴",
  description: "深圳及周边高校导师团队，暨南大学、中山大学、南方医科大学等真实导师。AI学习助手+真人导师，让学习更高效。",
  keywords: ["深圳家教","深圳导师","AI学习助手","深圳大学导师","一对一辅导","学习方法指导"],
  openGraph: { title: `深圳家教 | ${brandConfig.name}` },
};

const tutors = [
  { name:"杨老师",school:"暨南大学",title:"AI与编程导师",desc:"电子与信息工程硕士，专注AI素养教育与编程启蒙。" },
  { name:"廖老师",school:"中山大学",title:"数学与逻辑思维导师",desc:"数学系硕士，擅长数学思维训练与逻辑推理培养。" },
  { name:"杨老师",school:"南方医科大学",title:"学业规划导师",desc:"擅长学习方法指导与学业规划，帮助建立科学高效的学习体系。" },
];

const faqs = [
  { q:"QIXU的导师来自哪些学校？", a:"导师来自深圳及周边高校，包括暨南大学、中山大学、南方医科大学等。我们的导师团队还在持续扩展中。" },
  { q:"导师服务怎么收费？", a:"核心学习功能永久免费。导师一对一服务按需付费，具体费用根据导师资历和课程类型确定。" },
  { q:"AI学习助手能做什么？", a:"AI学习助手提供智能答疑、自适应推荐、学情分析、薄弱点检测等功能，7×24小时陪伴学习。" },
];

export default function ShenzhenTutorPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label:"深圳家教", href:"/shenzhen-tutor" }]} />
      </div>
      <PageHeader title="深圳家教 — AI+真人导师" description="深圳及周边高校真实导师，AI学习助手与真人导师协同，让学习更高效">
        <Users className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>

      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
          {tutors.map((t) => (
            <Card key={t.name} className="border-border/50"><CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg">{t.name}</h3>
              <p className="text-sm text-primary">{t.title}</p>
              <p className="flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{t.school}</p>
              <p className="text-xs text-muted-foreground mt-2">{t.desc}</p>
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

      <PageCTA title="找到适合你的导师" description="完成AI学习测评，匹配最合适的导师" background="primary">
        <Button asChild size="lg" variant="secondary"><Link href="/assessment">免费测评<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </PageCTA>
    </div>
  );
}
