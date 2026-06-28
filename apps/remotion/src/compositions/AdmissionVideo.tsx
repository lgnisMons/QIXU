/**
 * AdmissionVideo — 45s admission product demo (16:9).
 * Scenes from generateAdmissionScript().
 */

import { useCurrentFrame, useVideoConfig, Sequence, interpolate } from "remotion";
import type { VideoScript } from "@qixu/marketing/scripts";

function AnimatedTitle({ text, subtitle }: { text: string; subtitle?: string }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", top: "35%", width: "100%", textAlign: "center", opacity, transform: `translateY(${y}px)` }}>
      <h1 style={{ color: "#fff", fontSize: 56, fontWeight: 800, margin: 0 }}>{text}</h1>
      {subtitle && <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 28, marginTop: 16 }}>{subtitle}</p>}
    </div>
  );
}

function FeatureBadge({ text, visible }: { text: string; visible: boolean }) {
  return (
    <span
      style={{
        display: "inline-block", padding: "8px 20px", margin: "6px",
        borderRadius: 24, background: visible ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.05)",
        color: visible ? "#3b82f6" : "rgba(255,255,255,0.3)", fontSize: 18, fontWeight: 600,
        border: `1px solid ${visible ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.1)"}`,
        transition: "all 0.5s",
      }}
    >
      {text}
    </span>
  );
}

function SceneRenderer({ script, sceneIndex }: { script: VideoScript; sceneIndex: number }) {
  const frame = useCurrentFrame();
  const scene = script.scenes[sceneIndex];
  if (!scene) return null;

  const gradientPairs = [
    ["#0f172a", "#1e293b"], ["#1e3a5f", "#1e40af"],
    ["#1e3a8a", "#3b82f6"], ["#0f172a", "#1e3a8a"],
    ["#1e40af", "#0f172a"],
  ];
  const [from, to] = gradientPairs[sceneIndex % gradientPairs.length]!;

  const features = ["冲·稳·保三梯度", "费用分析", "完全免费", "透明可解释"];

  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <AnimatedTitle
        text={sceneIndex === 0 ? "高考志愿怎么填？" : scene.voiceover.slice(0, 30)}
        subtitle={sceneIndex === 2 ? "输入分数位次 → 获取推荐方案" : undefined}
      />

      {sceneIndex === 3 && (
        <div style={{ position: "absolute", top: "55%", width: "100%", textAlign: "center" }}>
          {features.map((f, i) => (
            <FeatureBadge key={f} text={f} visible={frame > 1 + i * 15} />
          ))}
        </div>
      )}

      <div style={{ position: "absolute", bottom: 40, width: "100%", textAlign: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
          QIXU 启序 · 免费高考志愿推荐
        </span>
      </div>
    </div>
  );
}

export function AdmissionVideo({ script }: { script: VideoScript }) {
  const { fps } = useVideoConfig();
  let offset = 0;

  return (
    <>
      {script.scenes.map((scene, i) => {
        const dur = Math.round(scene.duration * fps);
        const o = offset;
        offset += dur;
        return (
          <Sequence key={scene.id} from={o} durationInFrames={dur}>
            <SceneRenderer script={script} sceneIndex={i} />
          </Sequence>
        );
      })}
    </>
  );
}
