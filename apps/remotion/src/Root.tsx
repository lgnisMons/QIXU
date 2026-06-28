/**
 * Remotion Root — registers all video compositions.
 *
 * Each composition is a self-contained video driven by
 * structured JSON from @qixu/marketing.
 *
 * Videos:
 *   HeroVideo     — 30s brand hero (9:16 vertical for Douyin/TikTok)
 *   AdmissionVideo — 45s admission product demo (16:9)
 *   AILearningDemo — 25s AI learning feature demo (16:9)
 *   BrandIntro     — 60s full brand introduction (16:9)
 */

import { Composition } from "remotion";
import {
  generateHeroScript,
  generateAdmissionScript,
  generateProductScript,
  generateBrandIntroScript,
} from "@qixu/marketing/scripts";

import { HeroVideo } from "./compositions/HeroVideo";
import { AdmissionVideo } from "./compositions/AdmissionVideo";
import { AILearningDemo } from "./compositions/AILearningDemo";
import { BrandIntro } from "./compositions/BrandIntro";

export function RemotionRoot() {
  const heroScript = generateHeroScript();
  const admissionScript = generateAdmissionScript();
  const aiScript = generateProductScript("ai-assistant")!;
  const brandScript = generateBrandIntroScript();

  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={heroScript.estimatedDuration * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ script: heroScript }}
      />
      <Composition
        id="AdmissionVideo"
        component={AdmissionVideo}
        durationInFrames={admissionScript.estimatedDuration * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ script: admissionScript }}
      />
      <Composition
        id="AILearningDemo"
        component={AILearningDemo}
        durationInFrames={aiScript.estimatedDuration * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ script: aiScript }}
      />
      <Composition
        id="BrandIntro"
        component={BrandIntro}
        durationInFrames={brandScript.estimatedDuration * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ script: brandScript }}
      />
    </>
  );
}
