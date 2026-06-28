/**
 * Social Media Templates — platform-specific content formats.
 *
 * Each channel has its own constraints:
 * - Douyin: vertical 9:16, 15-60s, hook-first, fast pace
 * - Xiaohongshu: 3:4 or 1:1, image+text, refined aesthetic
 * - Bilibili: 16:9, 2-10min, educational depth, community interaction
 * - WeChat: article format, 公众号, long-form trust building
 */

export type Platform = "douyin" | "xiaohongshu" | "bilibili" | "wechat";

export interface ChannelTemplate {
  platform: Platform;
  label: string;
  /** Aspect ratio for video/image */
  aspectRatio: string;
  /** Optimal video duration */
  videoDuration: { min: number; max: number; unit: "seconds" | "minutes" };
  /** Character limit for caption/description */
  captionLimit: number;
  /** Character limit for title */
  titleLimit: number;
  /** Max hashtag count */
  maxHashtags: number;
  /** Hashtag format */
  hashtagPrefix: "#" | "#";
  /** Content style guide */
  style: string;
  /** Content pillars that work best on this platform */
  bestContentTypes: string[];
}

export const channelTemplates: Record<Platform, ChannelTemplate> = {
  douyin: {
    platform: "douyin", label: "抖音",
    aspectRatio: "9:16",
    videoDuration: { min: 15, max: 60, unit: "seconds" },
    captionLimit: 500, titleLimit: 55, maxHashtags: 8,
    hashtagPrefix: "#",
    style: "快节奏、强钩子前三秒、口语化、真实感",
    bestContentTypes: ["工具演示", "数据可视化", "前后对比", "真实场景"],
  },
  xiaohongshu: {
    platform: "xiaohongshu", label: "小红书",
    aspectRatio: "3:4",
    videoDuration: { min: 30, max: 180, unit: "seconds" },
    captionLimit: 1000, titleLimit: 20, maxHashtags: 10,
    hashtagPrefix: "#",
    style: "精致图文、干货清单、真实测评、情感共鸣",
    bestContentTypes: ["攻略清单", "产品测评", "学习打卡", "经验分享"],
  },
  bilibili: {
    platform: "bilibili", label: "B站",
    aspectRatio: "16:9",
    videoDuration: { min: 2, max: 10, unit: "minutes" },
    captionLimit: 2000, titleLimit: 80, maxHashtags: 10,
    hashtagPrefix: "#",
    style: "深度内容、教育性、弹幕互动、真诚不做作",
    bestContentTypes: ["深度教程", "产品解析", "行业分析", "技术科普"],
  },
  wechat: {
    platform: "wechat", label: "微信公众号",
    aspectRatio: "16:9",
    videoDuration: { min: 1, max: 5, unit: "minutes" },
    captionLimit: 20000, titleLimit: 64, maxHashtags: 0,
    hashtagPrefix: "#",
    style: "专业信任、深度长文、品牌建设、情感连接",
    bestContentTypes: ["行业洞察", "品牌故事", "使用指南", "用户故事"],
  },
};

/** Template for a complete social media post */
export interface SocialPost {
  platform: Platform;
  title: string;
  caption: string;
  hashtags: string[];
  coverText: {
    headline: string;
    subtitle: string;
  };
  /** Recommended video composition ID from remotion */
  compositionId: string;
}

/** Generate a social post from structured inputs */
export function generateSocialPost(options: {
  platform: Platform;
  topic: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
}): SocialPost {
  const template = channelTemplates[options.platform];
  const hashtags = options.hashtags.slice(0, template.maxHashtags);
  const caption = `${options.hook}\n\n${options.body.slice(0, template.captionLimit - 100)}\n\n${options.cta}`;

  return {
    platform: options.platform,
    title: options.hook.slice(0, template.titleLimit),
    caption,
    hashtags,
    coverText: {
      headline: options.topic,
      subtitle: options.hook.slice(0, 40),
    },
    compositionId: options.platform === "douyin" ? "hero-vertical" : options.platform === "bilibili" ? "brand-intro" : "product-demo",
  };
}
