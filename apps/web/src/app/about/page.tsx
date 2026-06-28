import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { brandConfig } from "@qixu/config/brand";
import { seoConfig } from "@qixu/config/seo";
import { ROUTES } from "@qixu/config/navigation";

export const metadata: Metadata = {
  title: "关于启序",
  description: `${brandConfig.slogan} — 了解 QIXU 的品牌故事与成长理念`,
  openGraph: { title: `关于启序 | ${seoConfig.siteName}` },
};

export default function AboutPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "关于启序", href: ROUTES.about }]} />
      </div>
      <PageHeader
        title="关于启序"
        description={`${brandConfig.slogan} — 了解 QIXU 的品牌故事与成长理念`}
      >
        <Info className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-sm text-muted-foreground">此页面正在建设中，敬请期待</p>
        </div>
      </PageSection>
    </div>
  );
}
