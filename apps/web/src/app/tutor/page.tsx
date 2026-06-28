import type { Metadata } from "next";
import { Users } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { seoConfig } from "@qixu/config/seo";
import { ROUTES } from "@qixu/config/navigation";

export const metadata: Metadata = {
  title: "导师团队",
  description: "来自深圳及周边高校的导师团队，用真实、有温度的指导陪伴你的成长",
  openGraph: { title: `导师团队 | ${seoConfig.siteName}` },
};

export default function TutorPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "导师团队", href: ROUTES.tutor }]} />
      </div>
      <PageHeader
        title="导师团队"
        description="来自深圳及周边高校的导师，用真实、有温度的指导陪伴你的成长"
      >
        <Users className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="surface" spacing="md">
        <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-sm text-muted-foreground">此页面正在建设中，敬请期待</p>
        </div>
      </PageSection>
    </div>
  );
}
