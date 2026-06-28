"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, RefreshCw, ExternalLink } from "lucide-react";
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
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("qixu_admission_profile");
      if (!raw) {
        setError("未找到志愿填报数据，请先完成信息填写。");
        return;
      }
      const parsed: StudentProfile = JSON.parse(raw);
      setProfile(parsed);

      // FIX: Use the subjectType from the profile, not hardcoded
      const result = runRecommendationEngine(parsed, {
        province: parsed.province,
        subjectType: parsed.subjectType,
        maxRecommendations: 20,
      });

      if (result.recommendations.length === 0) {
        // Give a useful error instead of silent empty
        setError(
          `当前数据暂不支持你在「${parsed.province}」的「${parsed.subjectType}」组合。我们的数据正在持续扩展中，目前覆盖10个省份。`
        );
        return;
      }

      setOutput(result);
    } catch {
      setError("数据解析失败，请重新完成评估。");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "高考志愿推荐", href: "/admission" }, { label: "推荐结果" }]} />
        </div>
        <PageSection background="default" spacing="lg">
          <EmptyState
            title="无推荐数据"
            description={error}
            icon={<FileText className="h-6 w-6" />}
            action={
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild><Link href="/admission"><ArrowLeft className="mr-1.5 h-4 w-4" />重新填报</Link></Button>
                <Button variant="outline" asChild>
                  <Link href="https://eea.gd.gov.cn" target="_blank">广东省教育考试院<ExternalLink className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            }
          />
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
        description={
          profile
            ? `${profile.province} · ${profile.subjectType} · ${profile.score}分(位次${profile.rank.toLocaleString()})`
            : "分析中..."
        }
      >
        <FileText className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>

      <PageSection background="default" spacing="md">
        <div className="mx-auto max-w-3xl">
          {output ? (
            <AdmissionReport output={output} />
          ) : (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" asChild>
              <Link href="/admission"><ArrowLeft className="mr-1.5 h-4 w-4" />重新填报</Link>
            </Button>
            <Button asChild>
              <Link href="/assessment">AI 学习测评<ArrowLeft className="ml-1.5 h-4 w-4 rotate-180" /></Link>
            </Button>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
