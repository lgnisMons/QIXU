import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@qixu/ui/page-header";
import { PageSection } from "@qixu/ui/page-section";
import { Breadcrumb } from "@qixu/ui/breadcrumb";
import { AdmissionTabs } from "@/components/admission/admission-tabs";
import { brandConfig } from "@qixu/config/brand";

export const metadata: Metadata = {
  title: "高考志愿推荐",
  description:
    "免费AI志愿填报助手：输入分数位次，获取冲稳保三梯度推荐方案，含费用分析和职业建议。" +
    "支持高考志愿推荐、高考位次推荐、高考分数能上什么大学、志愿梯度策略。",
  keywords: [
    "高考志愿推荐", "AI志愿填报", "免费志愿推荐",
    "高考分数能上什么大学", "高考位次推荐", "冲稳保怎么填",
    "志愿梯度", "高考志愿填报系统", "录取位次查询",
    "历年分数线", "高考志愿怎么填", "深圳志愿填报",
  ],
  openGraph: {
    title: `高考志愿推荐 | ${brandConfig.name}`,
    description:
      "免费AI志愿填报助手。输入分数位次，基于2023-2025年公开录取数据提供冲刺/稳妥/保底三梯度推荐方案。含费用分析、风险提示和职业建议。",
  },
  alternates: {
    canonical: "/admission",
  },
};

// FAQ structured data for SEO
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "高考志愿推荐免费吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "完全免费。QIXU启序的AI志愿推荐功能对全体用户永久免费，没有隐藏收费。",
      },
    },
    {
      "@type": "Question",
      name: "冲稳保是什么意思？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "「冲刺」指位次接近或略低于往年录取线的院校，录取概率相对较低但值得尝试；「稳妥」指位次在往年录取范围内，录取概率较高；「保底」指位次远超往年录取线，录取把握极大。建议按「冲-稳-保」梯度合理安排志愿顺序。",
      },
    },
    {
      "@type": "Question",
      name: "志愿推荐的数据来源是什么？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "基于2023-2025年公开录取数据进行规则引擎分析。数据覆盖广东等省份70余所高校，包含985/211/双一流/普通本科/民办各层次。推荐结果仅供参考，正式填报请以各省教育考试院官方数据为准。",
      },
    },
    {
      "@type": "Question",
      name: "高考志愿怎么填才科学？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "建议采用「冲-稳-保」梯度策略：20%冲刺志愿 + 50%稳妥志愿 + 30%保底志愿。综合考虑分数位次、专业偏好、城市偏好、学费预算和职业规划等因素。QIXU的规则引擎从7个维度综合评分，帮你科学决策。",
      },
    },
  ],
};

export default function AdmissionPage() {
  return (
    <div className="min-h-[60vh]">
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "高考志愿推荐", href: "/admission" }]} />
      </div>
      <PageHeader
        title="高考志愿推荐"
        description="输入成绩位次，基于历年录取数据分析，获取冲稳保三梯度志愿推荐方案（含费用分析）"
      >
        <GraduationCap className="mx-auto mt-4 h-10 w-10 text-primary" />
      </PageHeader>
      <PageSection background="default" spacing="md">
        <AdmissionTabs />
      </PageSection>
    </div>
  );
}
