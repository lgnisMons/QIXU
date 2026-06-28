"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, RefreshCw } from "lucide-react";
import { Button } from "@qixu/ui/button";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { EmptyState } from "@qixu/ui/empty-state";
import { AssessmentReport } from "@/components/assessment/assessment-report";
import { runAssessmentEngine, generateReport } from "@qixu/domain";
import type { AssessmentEngineInput, AssessmentEngineOutput, ReportSection } from "@qixu/domain";

export function ResultContent() {
  const [sections, setSections] = useState<ReportSection[] | null>(null);
  const [aiNotes, setAiNotes] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<AssessmentEngineOutput["profile"] | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("qixu_assessment_input");
      if (!raw) {
        setError("未找到评估数据，请先完成评估。");
        return;
      }
      const input: AssessmentEngineInput = JSON.parse(raw);
      const output = runAssessmentEngine(input);
      const report = generateReport(output);
      setSections(report);
      setAiNotes(output.aiNotes);
      setProfile(output.profile);
    } catch {
      setError("评估数据解析失败，请重新完成评估。");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: "学习评估", href: "/assessment" },
            { label: "评估结果" },
          ]} />
        </div>
        <PageSection background="default" spacing="lg">
          <EmptyState
            title="无评估数据"
            description={error}
            icon={<FileText className="h-6 w-6" />}
            action={
              <Button asChild>
                <Link href="/assessment">
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  开始评估
                </Link>
              </Button>
            }
          />
        </PageSection>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "学习评估", href: "/assessment" },
          { label: "评估结果" },
        ]} />
      </div>
      <PageHeader
        title="你的评估报告"
        description={
          profile
            ? `${profile.grade} · ${profile.subjects.join("、")} · ${profile.learningStyle === "visual" ? "视觉型" : profile.learningStyle === "auditory" ? "听觉型" : profile.learningStyle === "reading" ? "读写型" : "实践型"}学习者`
            : "个性化学习分析"
        }
      >
        <FileText className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>

      <PageSection background="default" spacing="md">
        <div className="mx-auto max-w-3xl">
          {sections ? (
            <AssessmentReport sections={sections} aiNotes={aiNotes ?? undefined} />
          ) : (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" asChild>
              <Link href="/assessment">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                重新评估
              </Link>
            </Button>
            <Button asChild>
              <Link href="/ai">
                查看 AI 学习计划
                <ArrowLeft className="ml-1.5 h-4 w-4 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
