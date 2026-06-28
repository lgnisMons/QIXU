import type { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { EmptyState } from "@qixu/ui/empty-state";
import { seoConfig } from "@qixu/config/seo";

export const metadata: Metadata = {
  title: "成长面板",
  description: "查看学习进度、成长档案和个人统计数据",
  openGraph: { title: `成长面板 | ${seoConfig.siteName}` },
};

export default function DashboardPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "成长面板", href: "/dashboard" }]} />
      </div>
      <PageHeader
        title="成长面板"
        description="查看你的学习进度、成长档案和个人统计数据"
      >
        <LayoutDashboard className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="surface" spacing="md">
        <EmptyState
          title="即将开放"
          description="成长面板功能正在开发中。上线后，你将能在此查看个人学习进度、AI 诊断报告和导师反馈。"
          icon={<LayoutDashboard className="h-6 w-6" />}
        />
      </PageSection>
    </div>
  );
}
