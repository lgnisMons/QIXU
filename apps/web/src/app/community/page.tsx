import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { Card, CardContent } from "@qixu/ui/card";
import { seoConfig } from "@qixu/config/seo";
import { ROUTES } from "@qixu/config/navigation";

export const metadata: Metadata = {
  title: "成长社区",
  description: "成长分享 · 交流互动 · 真实学员故事",
  openGraph: { title: `成长社区 | ${seoConfig.siteName}` },
};

export default function CommunityPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "成长社区", href: ROUTES.community }]} />
      </div>
      <PageHeader
        title="成长社区"
        description="成长分享 · 交流互动 · 真实学员故事"
      >
        <MessageCircle className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-sm text-muted-foreground">此页面正在建设中，敬请期待</p>
        </div>
      </PageSection>
    </div>
  );
}
