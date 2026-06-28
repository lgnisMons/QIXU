import type { Metadata } from "next";
import { Blocks } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { seoConfig } from "@qixu/config/seo";
import { ROUTES } from "@qixu/config/navigation";

export const metadata: Metadata = {
  title: "学习工具",
  description: "AI 工具推荐 · 学习资源库 · 效率提升工具集",
  openGraph: { title: `学习工具 | ${seoConfig.siteName}` },
};

export default function ToolsPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "学习工具", href: ROUTES.tools }]} />
      </div>
      <PageHeader
        title="学习工具"
        description="AI 工具推荐 · 学习资源库 · 效率提升工具集"
      >
        <Blocks className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-sm text-muted-foreground">此页面正在建设中，敬请期待</p>
        </div>
      </PageSection>
    </div>
  );
}
