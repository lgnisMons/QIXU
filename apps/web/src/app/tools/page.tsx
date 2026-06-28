import { Metadata } from "next";
import { Blocks } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "学习工具",
  description: "AI 工具推荐 · 学习资源 · 效率工具",
};

export default function ToolsPage() {
  return (
    <PlaceholderPage
      title="学习工具"
      description="AI 工具推荐 · 学习资源库 · 效率提升工具集"
      icon={<Blocks className="h-12 w-12" />}
    />
  );
}
