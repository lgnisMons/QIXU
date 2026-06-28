import { Metadata } from "next";
import { Mail } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "联系我们",
  description: "预约咨询 · 合作洽谈 · 意见反馈",
};

export default function ContactPage() {
  return (
    <PlaceholderPage
      title="联系我们"
      description="预约咨询 · 合作洽谈 · 意见反馈，我们期待与你交流"
      icon={<Mail className="h-12 w-12" />}
    />
  );
}
