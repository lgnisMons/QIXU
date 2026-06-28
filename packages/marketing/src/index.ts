/**
 * @qixu/marketing — Marketing Automation Foundation
 *
 * Marketing assets generated from structured product data.
 * No duplicated copywriting. No hardcoded assets.
 *
 * Modules:
 *   content   — Structured product content (features, stories, hooks, SEO blocks)
 *   templates — Platform-specific social media templates
 *   scripts   — Dynamic video script generator
 *   assets    — Cover/thumbnail metadata & asset bundle generator
 */

// Content
export {
  brand, seoKeywords,
  productFeatures, brandStories, socialHooks, seoContentBlocks,
} from "./content";
export type { FeatureContent, BrandStory, SocialHook } from "./content";

// Templates
export {
  channelTemplates, generateSocialPost,
} from "./templates";
export type { Platform, ChannelTemplate, SocialPost } from "./templates";

// Scripts
export {
  generateHeroScript, generateProductScript,
  generateAdmissionScript, generateBrandIntroScript,
  generateAllScripts,
} from "./scripts";
export type { VideoScript, VideoScene, TextOverlay, VideoType, Tone } from "./scripts";

// Assets
export {
  generateCoverMeta, generateVideoMeta,
  generateChapters, generateAssetBundle,
} from "./assets";
export type { CoverMeta, VideoMeta, AssetBundle } from "./assets";
