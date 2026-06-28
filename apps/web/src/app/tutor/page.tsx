import { Metadata } from "next";
import { Users } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "导师团队",
  description: "资深教育者 · 行业专家 · AI 训练师",
};

export default function TutorPage() {
  return (
    <PlaceholderPage
      title="导师团队"
      description="资深教育者 · 行业专家 · AI 训练师，为你的成长保驾护航"
      icon={<Users className="h-12 w-12" />}
    />
  );
}
