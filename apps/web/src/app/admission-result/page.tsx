import { Suspense } from "react";
import type { Metadata } from "next";
import { AdmissionResultContent } from "./result-content";

export const metadata: Metadata = {
  title: "志愿推荐结果",
  description: "你的个性化高考志愿推荐分析报告",
};

export default function AdmissionResultPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <AdmissionResultContent />
    </Suspense>
  );
}
