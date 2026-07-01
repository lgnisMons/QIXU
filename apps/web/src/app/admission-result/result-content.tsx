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

/** Province education exam authority links */
const EXAM_AUTHORITY_LINKS: Record<string, { name: string; url: string }> = {
  "广东": { name: "广东省教育考试院", url: "https://eea.gd.gov.cn" },
  "北京": { name: "北京教育考试院", url: "https://www.bjeea.cn" },
  "上海": { name: "上海教育考试院", url: "https://www.shmeea.edu.cn" },
  "浙江": { name: "浙江省教育考试院", url: "https://www.zjzs.net" },
  "江苏": { name: "江苏省教育考试院", url: "https://www.jseea.cn" },
  "湖北": { name: "湖北省教育考试院", url: "http://www.hbea.edu.cn" },
  "湖南": { name: "湖南省教育考试院", url: "https://ksy.hunan.gov.cn" },
  "山东": { name: "山东省教育招生考试院", url: "https://www.sdzk.cn" },
  "河南": { name: "河南省教育考试院", url: "http://www.haeea.cn" },
  "福建": { name: "福建省教育考试院", url: "https://www.eeafj.cn" },
  "四川": { name: "四川省教育考试院", url: "https://www.sceea.cn" },
  "河北": { name: "河北省教育考试院", url: "http://www.hebeea.edu.cn" },
  "安徽": { name: "安徽省教育招生考试院", url: "https://www.ahzsks.cn" },
  "江西": { name: "江西省教育考试院", url: "http://www.jxeea.cn" },
  "辽宁": { name: "辽宁省教育招生考试", url: "https://www.lnzsks.com" },
  "陕西": { name: "陕西省教育考试院", url: "http://www.sneea.cn" },
  "重庆": { name: "重庆市教育考试院", url: "http://www.cqksy.cn" },
  "黑龙江": { name: "黑龙江省招生考试", url: "https://www.lzk.hl.cn" },
  "吉林": { name: "吉林省教育考试院", url: "http://www.jleea.edu.cn" },
  "山西": { name: "山西省教育考试院", url: "http://www.sxkszx.cn" },
  "云南": { name: "云南省招生考试院", url: "https://www.ynzs.cn" },
  "贵州": { name: "贵州省招生考试院", url: "http://www.eaagz.org.cn" },
  "广西": { name: "广西招生考试院", url: "https://www.gxeea.cn" },
  "内蒙古": { name: "内蒙古教育招生考试", url: "https://www.nm.zsks.cn" },
  "天津": { name: "天津市教育招生考试院", url: "http://www.zhaokao.net" },
  "甘肃": { name: "甘肃省教育考试院", url: "https://www.ganseea.cn" },
  "新疆": { name: "新疆教育考试院", url: "http://www.xjzk.gov.cn" },
  "海南": { name: "海南省考试局", url: "http://ea.hainan.gov.cn" },
  "宁夏": { name: "宁夏教育考试院", url: "https://www.nxjyks.cn" },
  "青海": { name: "青海省教育考试网", url: "http://www.qhjyks.com" },
  "西藏": { name: "西藏教育考试院", url: "http://zsks.edu.xizang.gov.cn" },
};

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

    // Persist profile from URL params to sessionStorage for refresh resilience
    try {
      const existing = sessionStorage.getItem("qixu_admission_profile");
      if (!existing || JSON.parse(existing).rank !== resolvedProfile.rank) {
        sessionStorage.setItem("qixu_admission_profile", JSON.stringify(resolvedProfile));
      }
    } catch { /* ignore storage errors */ }

    try {
      const result = runRecommendationEngine(resolvedProfile, {
        subjectType: resolvedProfile.subjectType,
        maxRecommendations: 20,
      });

      if (result.recommendations.length === 0) {
        setError(
          `当前「${resolvedProfile.province}」的「${resolvedProfile.subjectType}」数据暂不足或你的分数位次超出数据范围。我们正在持续扩展数据覆盖。`
        );
        return;
      }

      setOutput(result);
    } catch {
      setError("数据解析失败，请重新完成评估。");
    }
  }, [resolvedProfile]);

  if (error) {
    const authority = resolvedProfile ? EXAM_AUTHORITY_LINKS[resolvedProfile.province] : null;
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
                {authority && (
                  <Button variant="outline" asChild>
                    <Link href={authority.url} target="_blank">{authority.name}<ExternalLink className="ml-1.5 h-3.5 w-3.5" /></Link>
                  </Button>
                )}
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
