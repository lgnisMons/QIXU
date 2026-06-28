import { useCurrentFrame, useVideoConfig, Sequence, interpolate } from "remotion";
import type { VideoScript } from "@qixu/marketing/scripts";

const GRADS: [string, string][] = [
  ["#0f172a", "#1e3a8a"], ["#1e3a8a", "#1e40af"],
  ["#1e40af", "#3b82f6"], ["#0f172a", "#1e293b"],
  ["#1e3a5f", "#0f172a"],
];

function Scene({ scene, index }: { scene: VideoScript["scenes"][number]; index: number }) {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const [from, to] = GRADS[index % GRADS.length]!;
  const isLast = index === 4;

  return (
    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "0 100px", opacity: op }}>
        <h1 style={{ color: "#fff", fontSize: isLast ? 56 : 40, fontWeight: isLast ? 800 : 600, margin: 0, lineHeight: 1.3 }}>
          {isLast ? "QIXU 启序\n启于今日，序向未来" : scene.voiceover.slice(0, 60)}
        </h1>
      </div>
      {!isLast && <div style={{ position: "absolute", bottom: 50, textAlign: "center" }}><span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>QIXU 启序 · 品牌故事</span></div>}
    </div>
  );
}

export function BrandIntro({ script }: { script: VideoScript }) {
  const { fps } = useVideoConfig();
  let off = 0;
  return (
    <>
      {script.scenes.map((s, i) => {
        const dur = Math.round(s.duration * fps), o = off; off += dur;
        return <Sequence key={s.id} from={o} durationInFrames={dur}><Scene scene={s} index={i} /></Sequence>;
      })}
    </>
  );
}
