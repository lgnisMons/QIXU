/**
 * HeroVideo — 30s brand hero (9:16 vertical).
 *
 * Scenes driven by generateHeroScript() from @qixu/marketing.
 * Renders each scene in sequence with animated text overlays.
 */

import { useCurrentFrame, useVideoConfig, Sequence, interpolate, spring } from "remotion";
import type { VideoScript } from "@qixu/marketing/scripts";

// Simple text animation helper
function AnimatedText({ text, y = 0, delay = 0 }: { text: string; y?: number; delay?: number }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame - delay, [0, 15], [20, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: `${40 + y}%`,
        width: "100%",
        textAlign: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: "0 40px",
      }}
    >
      <h1 style={{ color: "#fff", fontSize: 48, fontWeight: 700, textShadow: "0 2px 12px rgba(0,0,0,0.3)", margin: 0 }}>
        {text}
      </h1>
    </div>
  );
}

function SceneRenderer({ script, sceneIndex }: { script: VideoScript; sceneIndex: number }) {
  const frame = useCurrentFrame();
  const scene = script.scenes[sceneIndex];
  if (!scene) return null;

  const bgColors = ["#0f172a", "#1e3a8a", "#1e40af", "#0f172a", "#1e3a8a", "#0f172a"];
  const bg = bgColors[sceneIndex % bgColors.length]!;

  return (
    <div
      style={{
        width: "100%", height: "100%",
        background: `linear-gradient(135deg, ${bg} 0%, ${bgColors[(sceneIndex + 1) % bgColors.length]} 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "-20%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: "rgba(255,255,255,0.03)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "-30%", left: "-20%", width: "80%", height: "80%", borderRadius: "50%", background: "rgba(255,255,255,0.02)", filter: "blur(60px)" }} />

      <AnimatedText text={scene.voiceover || scene.description} y={-5} delay={0} />

      {/* Brand logo bar at bottom */}
      <div style={{ position: "absolute", bottom: 40, width: "100%", textAlign: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, letterSpacing: 2 }}>
          QIXU 启序
        </span>
      </div>
    </div>
  );
}

export function HeroVideo({ script }: { script: VideoScript }) {
  const { fps } = useVideoConfig();
  let frameOffset = 0;

  return (
    <>
      {script.scenes.map((scene, i) => {
        const sceneFrames = Math.round(scene.duration * fps);
        const offset = frameOffset;
        frameOffset += sceneFrames;

        return (
          <Sequence key={scene.id} from={offset} durationInFrames={sceneFrames}>
            <SceneRenderer script={script} sceneIndex={i} />
          </Sequence>
        );
      })}
    </>
  );
}
