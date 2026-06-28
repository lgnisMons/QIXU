import { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "成长社区",
  description: "成长分享 · 交流互动 · 学员故事",
};

export default function CommunityPage() {
  return (
    <PlaceholderPage
      title="成长社区"
      description="成长分享 · 交流互动 · 真实学员故事"
      icon={<MessageCircle className="h-12 w-12" />}
    />
  );
}
