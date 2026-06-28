"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, RefreshCw } from "lucide-react";
import { Button } from "@qixu/ui/button";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { EmptyState } from "@qixu/ui/empty-state";
import { AdmissionReport } from "@/components/admission/admission-report";
import { runRecommendationEngine } from "@qixu/domain";
import type { StudentProfile, AdmissionRecommendationOutput } from "@qixu/domain";

export function AdmissionResultContent() {
  const [output, setOutput] = useState<AdmissionRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("qixu_admission_profile");
      if (!raw) { setError("未找到志愿填报数据，请先完成信息填写。"); return; }
      const profile: StudentProfile = JSON.parse(raw);
      const result = runRecommendationEngine(profile, {
        province: profile.province,
        subjectType: profile.province === "广东" ? "物理类" : "物理类",
        maxRecommendations: 20,
      });
      setOutput(result);
    } catch { setError("数据解析失败，请重新填写。"); }
  }, []);

  if (error) {
    return (
      <div className="min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "高考志愿推荐", href: "/admission" }, { label: "推荐结果" }]} />
        </div>
        <PageSection background="default" spacing="lg">
          <EmptyState title="无数据" description={error} icon={<FileText className="h-6 w-6" />}
            action={<Button asChild><Link href="/admission"><ArrowLeft className="mr-1.5 h-4 w-4" />开始填报</Link></Button>} />
        </PageSection>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "高考志愿推荐", href: "/admission" }, { label: "推荐结果" }]} />
      </div>
      <PageHeader
        title="志愿推荐结果"
        description={output ? `${output.recommendations.length}条推荐 · 冲刺/稳妥/保底三梯度` : "分析中..."}
      >
        <FileText className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="default" spacing="md">
        <div className="mx-auto max-w-3xl">
          {output ? (
            <AdmissionReport output={output} />
          ) : (
            <div className="flex items-center justify-center py-16"><RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          )}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" asChild><Link href="/admission"><ArrowLeft className="mr-1.5 h-4 w-4" />重新填报</Link></Button>
            <Button asChild><Link href="/ai">查看 AI 学习助手<ArrowLeft className="ml-1.5 h-4 w-4 rotate-180" /></Link></Button>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
