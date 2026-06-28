import { Metadata } from "next";
import { Info } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "关于启序",
  description: "品牌故事 · 成长理念 · 加入我们",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="关于启序"
      description="启于今日，序向未来 — 了解 QIXU 的品牌故事与成长理念"
      icon={<Info className="h-12 w-12" />}
    />
  );
}
