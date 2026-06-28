import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { seoConfig } from "@qixu/config/seo";
import { ROUTES } from "@qixu/config/navigation";

export const metadata: Metadata = {
  title: "AI 能力",
  description: "AI 学习助手 · AI 创作 · Agent 工程 · AI 工具推荐",
  openGraph: { title: `AI 能力 | ${seoConfig.siteName}` },
};

export default function AIPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "AI 能力", href: ROUTES.ai }]} />
      </div>
      <PageHeader
        title="AI 能力学院"
        description="AI 学习助手 · AI 创作 · AI 办公 · AI 开发 · Agent 工程"
      >
        <Sparkles className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-sm text-muted-foreground">此页面正在建设中，敬请期待</p>
        </div>
      </PageSection>
    </div>
  );
}
