import { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "AI 能力学院",
  description: "AI 学习助手 · AI 创作 · Agent 工程 · AI 工具推荐",
};

export default function AIPage() {
  return (
    <PlaceholderPage
      title="AI 能力学院"
      description="AI 学习助手 · AI 创作 · AI 办公 · AI 开发 · Agent 工程"
      icon={<Sparkles className="h-12 w-12" />}
    />
  );
}
