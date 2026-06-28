import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ArrowRight, Users, Lightbulb, Star } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { PageCTA } from "@qixu/ui/page-cta";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { Button } from "@qixu/ui/button";
import { seoConfig } from "@qixu/config/seo";

export const metadata: Metadata = {
  title: "成长社区",
  description: "成长分享 · 交流互动。一个温暖、鼓励的学习社区。",
  openGraph: { title: `成长社区 | ${seoConfig.siteName}` },
};

const FAQ = [
  { q: "成长社区是什么？", a: "成长社区是学习者和导师交流互动的空间。你可以分享学习心得、讨论问题、展示成长成果。" },
  { q: "如何加入社区？", a: "成长社区即将正式开放！完成AI学习测评即可获得加入资格。" },
  { q: "社区有导师互动吗？", a: "是的，社区将定期举办导师答疑、学习分享会和成长工作坊。" },
];

export default function CommunityPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "成长社区", href: "/community" }]} />
      </div>
      <PageHeader title="成长社区" description="一个温暖、鼓励的学习社区，汇聚学习者、导师和AI助手"><MessageCircle className="mx-auto mt-4 h-10 w-10 text-primary" /></PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
          <Card className="border-border/50"><CardContent className="p-6 text-center"><Users className="mx-auto h-8 w-8 text-primary mb-3" /><h3 className="font-bold">学习交流</h3><p className="text-sm text-muted-foreground mt-2">分享学习方法，讨论疑难问题</p></CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6 text-center"><Lightbulb className="mx-auto h-8 w-8 text-warning mb-3" /><h3 className="font-bold">成长分享</h3><p className="text-sm text-muted-foreground mt-2">展示学习成果，见证彼此成长</p></CardContent></Card>
          <Card className="border-border/50"><CardContent className="p-6 text-center"><Star className="mx-auto h-8 w-8 text-success mb-3" /><h3 className="font-bold">导师互动</h3><p className="text-sm text-muted-foreground mt-2">参与导师答疑和学习工作坊</p></CardContent></Card>
        </div>
      </PageSection>
      <PageSection background="default" spacing="sm">
        <div className="mx-auto max-w-2xl"><h2 className="text-2xl font-bold text-center mb-8">常见问题</h2><div className="space-y-3">{FAQ.map((f) => (<details key={f.q} className="rounded-lg border border-border/40 p-4"><summary className="cursor-pointer font-medium text-sm">{f.q}</summary><p className="mt-2 text-sm text-muted-foreground">{f.a}</p></details>))}</div></div>
      </PageSection>
      <PageCTA title="加入成长社区" description="完成测评，成为首批社区成员" background="primary">
        <Button asChild size="lg" variant="secondary"><Link href="/assessment">免费加入<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </PageCTA>
    </div>
  );
}
