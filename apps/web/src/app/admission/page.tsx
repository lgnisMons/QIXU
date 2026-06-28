import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { AdmissionTabs } from "@/components/admission/admission-tabs";

export const metadata: Metadata = {
  title: "高考志愿推荐",
  description: "免费AI志愿填报助手，冲稳保三梯度推荐，含费用分析和职业建议。",
  keywords: ["高考志愿推荐", "AI志愿填报", "免费志愿推荐", "高考分数能上什么大学", "高考位次推荐"],
  openGraph: { title: "高考志愿推荐 | QIXU 启序", description: "免费AI志愿填报助手，智能推荐冲刺/稳妥/保底院校。" },
};

export default function AdmissionPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "高考志愿推荐", href: "/admission" }]} />
      </div>
      <PageHeader title="高考志愿推荐" description="输入成绩位次，获取冲稳保三梯度志愿推荐方案">
        <GraduationCap className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="default" spacing="md">
        <AdmissionTabs />
      </PageSection>
    </div>
  );
}
