import type { Metadata } from "next";
import { ClipboardCheck } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { seoConfig } from "@qixu/config/seo";
import { AssessmentForm } from "@/components/assessment/assessment-form";

export const metadata: Metadata = {
  title: "学习评估",
  description: "完成多维度学习评估，获取个性化成长建议",
  openGraph: { title: `学习评估 | ${seoConfig.siteName}` },
};

export default function AssessmentPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "学习评估", href: "/assessment" }]} />
      </div>
      <PageHeader
        title="学习评估"
        description="完成以下评估，获取你的个性化学习分析与成长建议"
      >
        <ClipboardCheck className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="default" spacing="md">
        <AssessmentForm />
      </PageSection>
    </div>
  );
}
