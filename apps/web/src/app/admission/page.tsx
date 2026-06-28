import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { AdmissionForm } from "@/components/admission/admission-form";

export const metadata: Metadata = {
  title: "高考志愿推荐",
  description:
    "免费AI志愿填报助手，根据你的高考分数和位次，智能推荐适合的大学和专业。支持高考志愿推荐、AI志愿填报、高考位次推荐。",
  keywords: [
    "高考志愿推荐", "AI志愿填报", "免费志愿推荐",
    "高考分数能上什么大学", "高考位次推荐",
  ],
  openGraph: {
    title: "高考志愿推荐 | QIXU 启序",
    description: "免费AI志愿填报助手，输入分数位次，智能推荐冲刺/稳妥/保底院校。",
  },
};

export default function AdmissionPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "高考志愿推荐", href: "/admission" }]} />
      </div>
      <PageHeader
        title="高考志愿推荐"
        description="输入你的高考成绩和位次，获取基于数据的个性化志愿推荐"
      >
        <GraduationCap className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="default" spacing="md">
        <AdmissionForm />
      </PageSection>
    </div>
  );
}
