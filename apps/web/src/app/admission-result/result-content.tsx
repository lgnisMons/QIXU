"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, FileText, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@qixu/ui/button";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { EmptyState } from "@qixu/ui/empty-state";
import { AdmissionReport } from "@/components/admission/admission-report";
import { runRecommendationEngine } from "@qixu/domain";
import type { StudentProfile, AdmissionRecommendationOutput, MajorCategory, SubjectType } from "@qixu/domain";

/** Try to parse profile from URL search params (compact encoding) */
function parseProfileFromParams(sp: URLSearchParams): StudentProfile | null {
  const province = sp.get("pv");
  const subjectType = sp.get("st") as SubjectType | null;
  const score = Number(sp.get("sc"));
  const rank = Number(sp.get("rk"));
  const budget = Number(sp.get("bg"));
  if (!province || !subjectType || !score || !rank || !budget) return null;
  const mp = sp.get("mp");
  const cp = sp.get("cp");
  return {
    province,
    subjectType,
    score,
    rank,
    budget,
    majorPreference: mp ? (mp.split(",").filter(Boolean) as MajorCategory[]) : [],
    careerPreference: cp ? cp.split(",").filter(Boolean) : [],
    adjustmentAccepted: sp.get("aj") !== "0",
    cooperativeProgramAccepted: sp.get("co") === "1",
    familyFinancialLevel: budget >= 120000 ? "high" : budget >= 30000 ? "medium" : "low",
  };
}

export function AdmissionResultContent() {
  const searchParams = useSearchParams();
  const [output, setOutput] = useState<AdmissionRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  // Parse profile once from URL params (priority) or sessionStorage (fallback)
  const resolvedProfile = useMemo((): StudentProfile | null => {
    const fromUrl = parseProfileFromParams(searchParams);
    if (fromUrl) return fromUrl;
    try {
      const raw = sessionStorage.getItem("qixu_admission_profile");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, [searchParams]);

  useEffect(() => {
    if (!resolvedProfile) {
      setError("未找到志愿填报数据，请先完成信息填写。");
      return;
    }
    setProfile(resolvedProfile);

    try {
      const result = runRecommendationEngine(resolvedProfile, {
        subjectType: resolvedProfile.subjectType,
        maxRecommendations: 20,
      });

      if (result.recommendations.length === 0) {
        setError(
          `当前数据暂不支持你在「${resolvedProfile.province}」的「${resolvedProfile.subjectType}」组合。我们的数据正在持续扩展中，目前覆盖10个省份。`
        );
        return;
      }

      setOutput(result);
    } catch {
      setError("数据解析失败，请重新完成评估。");
    }
  }, [resolvedProfile]);

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
