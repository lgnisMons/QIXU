/**
 * Asset Generator — auto-generate video titles, subtitles, and thumbnail metadata.
 *
 * Every video asset should have machine-generated metadata that can be
 * used by video platforms (Bilibili, YouTube, etc.) and social media.
 */

import { brand, productFeatures } from "./content";
import type { VideoScript } from "./scripts";
import type { Platform } from "./templates";

// ---------------------------------------------------------------------------
// Cover / Thumbnail Metadata
// ---------------------------------------------------------------------------

export interface CoverMeta {
  /** Primary headline on cover */
  headline: string;
  /** Secondary subtitle on cover */
  subtitle: string;
  /** Brand watermark text */
  brandTag: string;
  /** Recommended background color (hex) */
  bgColor: string;
  /** Text color on cover */
  textColor: "light" | "dark";
}

export interface VideoMeta {
  /** Platform-specific title */
  title: string;
  /** SEO description */
  description: string;
  /** Tags for discoverability */
  tags: string[];
  /** Thumbnail metadata */
  cover: CoverMeta;
  /** Estimated duration string */
  durationLabel: string;
}

/** Generate cover metadata from a video script */
export function generateCoverMeta(script: VideoScript): CoverMeta {
  const colors: Record<string, string> = {
    hero: "#1e40af", product: "#1e3a5f", tutorial: "#0f172a",
    testimonial: "#3b82f6", brand: "#1e3a8a",
  };
  return {
    headline: script.title.slice(0, 20),
    subtitle: script.scenes[0]?.voiceover.slice(0, 30) ?? script.title,
    brandTag: `${brand.nameEn} · ${brand.tagline}`,
    bgColor: colors[script.type] ?? "#1e3a8a",
    textColor: "light",
  };
}

/** Generate full video metadata for a specific platform */
export function generateVideoMeta(script: VideoScript, platform: Platform): VideoMeta {
  const cover = generateCoverMeta(script);
  const feature = productFeatures[0]!;

  return {
    title: script.title.slice(0, platform === "bilibili" ? 80 : platform === "xiaohongshu" ? 20 : 55),
    description: `${script.voiceover.slice(0, 200)}… ${brand.name}。${brand.slogan}。免费体验：${brand.url}`,
    tags: [
      brand.nameEn, brand.nameZh,
      ...(script.type === "product" ? ["教育科技", "AI学习", "学习方法"] : []),
      ...(script.id.includes("admission") ? ["高考志愿", "志愿填报", "免费推荐"] : []),
      "深圳家教", "AI助手",
    ],
    cover,
    durationLabel: `${Math.ceil(script.estimatedDuration / 60)}分${script.estimatedDuration % 60}秒`,
  };
}

/** Generate a standard YouTube-style chapter list */
export function generateChapters(script: VideoScript): { time: string; title: string }[] {
  let time = 0;
  return script.scenes.map((s) => {
    const start = time;
    time += s.duration;
    const min = Math.floor(start / 60);
    const sec = start % 60;
    return { time: `${min}:${sec.toString().padStart(2, "0")}`, title: s.description };
  });
}

// ---------------------------------------------------------------------------
// Batch asset generator
// ---------------------------------------------------------------------------

export interface AssetBundle {
  script: VideoScript;
  meta: Record<Platform, VideoMeta>;
  chapters: { time: string; title: string }[];
  cover: CoverMeta;
}

export function generateAssetBundle(script: VideoScript): AssetBundle {
  const platforms: Platform[] = ["douyin", "xiaohongshu", "bilibili", "wechat"];
  const meta = Object.fromEntries(platforms.map((p) => [p, generateVideoMeta(script, p)])) as Record<Platform, VideoMeta>;
  return {
    script,
    meta,
    chapters: generateChapters(script),
    cover: generateCoverMeta(script),
  };
}
