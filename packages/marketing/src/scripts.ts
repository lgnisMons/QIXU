/**
 * Dynamic Script Generator.
 *
 * Generates marketing scripts from structured product data
 * (brand, features, tutor, admission, assessment, SEO keywords).
 *
 * No duplicated copywriting — all scripts are assembled from
 * composable building blocks defined in content.ts.
 */

import { brand, productFeatures, brandStories } from "./content";
import type { FeatureContent, BrandStory } from "./content";

// ---------------------------------------------------------------------------
// Script Types
// ---------------------------------------------------------------------------

export type VideoType = "hero" | "product" | "tutorial" | "testimonial" | "brand";
export type Tone = "inspire" | "educate" | "empower" | "trust" | "action";

export interface VideoScript {
  id: string;
  type: VideoType;
  title: string;
  /** Estimated duration in seconds */
  estimatedDuration: number;
  /** Scene-by-scene breakdown */
  scenes: VideoScene[];
  /** Voiceover text (plain) */
  voiceover: string;
  /** On-screen text overlays per scene */
  overlays: TextOverlay[];
  /** Suggested background style */
  backgroundStyle: "gradient" | "solid" | "footage" | "motion_graphics";
}

export interface VideoScene {
  id: string;
  duration: number; // seconds
  description: string;
  voiceover: string;
  visual: string;
  transition: "cut" | "fade" | "slide" | "zoom" | "none";
}

export interface TextOverlay {
  sceneId: string;
  text: string;
  position: "center" | "top" | "bottom" | "bottom-third";
  animation: "fadeIn" | "slideUp" | "typewriter" | "scaleIn";
}

// ---------------------------------------------------------------------------
// Script Builders — one function per video type
// ---------------------------------------------------------------------------

export function generateHeroScript(): VideoScript {
  const s = brandStories.find((x) => x.id === "origin")!;
  return {
    id: "hero-brand", type: "hero",
    title: `${brand.name} — ${brand.slogan}`,
    estimatedDuration: 30,
    backgroundStyle: "gradient",
    scenes: [
      { id: "s1", duration: 3, description: "品牌logo渐入", voiceover: "", visual: "Logo center, gradient background", transition: "fade" },
      { id: "s2", duration: 5, description: "时代背景", voiceover: "在AI改变一切的时代，教育却似乎停留在过去。", visual: "Abstract AI circuitry animation", transition: "cut" },
      { id: "s3", duration: 7, description: "问题陈述", voiceover: "AI不应该取代老师——它应该让每个学习者都能获得个性化关注。", visual: "Split: traditional classroom vs AI-assisted learning", transition: "slide" },
      { id: "s4", duration: 5, description: "品牌亮相", voiceover: `所以，我们创造了${brand.name}。${brand.slogan}。`, visual: "Full brand logo reveal with tagline", transition: "zoom" },
      { id: "s5", duration: 5, description: "功能概览", voiceover: "AI学习助手、真人导师陪伴、成长档案、志愿规划——一个平台，全程陪伴。", visual: "Feature icons grid animation", transition: "fade" },
      { id: "s6", duration: 5, description: "CTA", voiceover: "免费测评，开启你的成长序列。", visual: "CTA: 免费测评 → /assessment", transition: "cut" },
    ],
    voiceover: s.script,
    overlays: [
      { sceneId: "s4", text: brand.slogan, position: "center", animation: "scaleIn" },
      { sceneId: "s6", text: "免费测评 → qixuxuexi.top", position: "bottom", animation: "slideUp" },
    ],
  };
}

export function generateProductScript(featureId: string): VideoScript | null {
  const feature = productFeatures.find((f) => f.id === featureId);
  if (!feature) return null;

  return {
    id: `product-${feature.id}`, type: "product",
    title: `${feature.title} — ${feature.pitch}`,
    estimatedDuration: 25,
    backgroundStyle: "motion_graphics",
    scenes: [
      { id: "s1", duration: 3, description: "Hook", voiceover: feature.pitch, visual: "Bold text on brand gradient", transition: "cut" },
      { id: "s2", duration: 8, description: "Problem", voiceover: `你是否曾经遇到过：找不到适合自己的学习方法？不知道薄弱环节在哪里？`, visual: "User pain point scenes", transition: "fade" },
      { id: "s3", duration: 8, description: "Solution", voiceover: `${feature.description}`, visual: "Product UI demonstration", transition: "slide" },
      { id: "s4", duration: 6, description: "CTA", voiceover: `${feature.cta}，就在${brand.name}。${brand.slogan}。`, visual: "CTA button with QR code", transition: "zoom" },
    ],
    voiceover: `${feature.pitch}。${feature.description}。${feature.cta}，就在${brand.name}。`,
    overlays: [
      { sceneId: "s1", text: feature.pitch, position: "center", animation: "scaleIn" },
      { sceneId: "s3", text: feature.shortTitle, position: "bottom-third", animation: "slideUp" },
      { sceneId: "s4", text: `${feature.cta} → ${feature.route}`, position: "bottom", animation: "fadeIn" },
    ],
  };
}

export function generateAdmissionScript(): VideoScript {
  return {
    id: "admission-demo", type: "tutorial",
    title: "高考志愿推荐 — 冲稳保三步法",
    estimatedDuration: 45,
    backgroundStyle: "solid",
    scenes: [
      { id: "s1", duration: 4, description: "Hook", voiceover: "高考分数出来了，志愿填报比考试还让人焦虑。", visual: "Dramatic score reveal", transition: "cut" },
      { id: "s2", duration: 8, description: "Problem", voiceover: "冲稳保是什么意思？怎么确定冲刺院校和保底院校？费用到底是多少？", visual: "Question marks on screen", transition: "fade" },
      { id: "s3", duration: 10, description: "Demo", voiceover: "输入你的分数和位次，系统自动分析往年录取数据，生成冲刺、稳妥、保底三梯度推荐。每所学校还标注了学费和预估生活成本。", visual: "Screen recording of /admission flow", transition: "slide" },
      { id: "s4", duration: 8, description: "Value", voiceover: "完全免费，没有隐藏收费。推荐结果透明可解释。", visual: "Free badge + transparency icons", transition: "cut" },
      { id: "s5", duration: 6, description: "CTA", voiceover: "现在就去 qixuxuexi.top 试试吧。", visual: "CTA + QR code", transition: "zoom" },
    ],
    voiceover: "高考志愿填报，输入分数位次，获取冲稳保三梯度方案。含费用分析，完全免费。",
    overlays: [
      { sceneId: "s3", text: "冲·稳·保 三梯度推荐", position: "bottom-third", animation: "slideUp" },
      { sceneId: "s5", text: "qixuxuexi.top/admission", position: "bottom", animation: "fadeIn" },
    ],
  };
}

export function generateBrandIntroScript(): VideoScript {
  return {
    id: "brand-intro", type: "brand",
    title: `${brand.name} — ${brand.tagline}`,
    estimatedDuration: 60,
    backgroundStyle: "gradient",
    scenes: [
      { id: "s1", duration: 5, description: "Opening", voiceover: "这是一个关于成长的故事。", visual: "Animated growth sequence: seed→sprout→tree", transition: "fade" },
      { id: "s2", duration: 8, description: "Philosophy", voiceover: `${brand.philosophy}。每个学习者的成长都是独一无二的序列，没有标准答案，没有统一模板。`, visual: "Abstract sequence visualization", transition: "slide" },
      { id: "s3", duration: 10, description: "Product", voiceover: `AI学习助手帮你诊断起点，真人导师引导你的方向，成长档案记录每一步，志愿推荐帮你把握关键节点。`, visual: "4-product module showcase", transition: "fade" },
      { id: "s4", duration: 8, description: "Differentiator", voiceover: "AI不是替代者，是辅助者。我们不制造焦虑，不夸大承诺。我们只是陪着你，一步一步走。", visual: "AI + Human collaboration visual", transition: "cut" },
      { id: "s5", duration: 5, description: "Closing", voiceover: `${brand.name}。${brand.slogan}。`, visual: "Brand logo + tagline", transition: "zoom" },
    ],
    voiceover: brandStories.map((s) => s.script).join(" "),
    overlays: [
      { sceneId: "s5", text: brand.slogan, position: "center", animation: "scaleIn" },
    ],
  };
}

// ---------------------------------------------------------------------------
// Batch Script Generator — generate all scripts at once
// ---------------------------------------------------------------------------

export function generateAllScripts(): VideoScript[] {
  const scripts: VideoScript[] = [
    generateHeroScript(),
    ...productFeatures.map((f) => generateProductScript(f.id)).filter(Boolean) as VideoScript[],
    generateAdmissionScript(),
    generateBrandIntroScript(),
  ];
  return scripts;
}
