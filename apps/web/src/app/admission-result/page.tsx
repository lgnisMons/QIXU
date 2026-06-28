import type { Metadata } from "next";
import { AdmissionResultContent } from "./result-content";

export const metadata: Metadata = {
  title: "志愿推荐结果",
  description: "你的个性化高考志愿推荐分析报告",
};

export default function AdmissionResultPage() {
  return <AdmissionResultContent />;
}
