import type { Metadata } from "next";
import { ResultContent } from "./result-content";

export const metadata: Metadata = {
  title: "评估结果",
  description: "你的个性化学习评估报告",
};

export default function ResultPage() {
  return <ResultContent />;
}
