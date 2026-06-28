import { useCurrentFrame, useVideoConfig, Sequence, interpolate } from "remotion";
import type { VideoScript } from "@qixu/marketing/scripts";

const GRADIENTS = [["#0f172a","#1e293b"], ["#1e3a8a","#3b82f6"], ["#0f172a","#1e40af"], ["#1e3a5f","#0f172a"]] as const;

function Scene({ scene, index }: { scene: VideoScript["scenes"][number]; index: number }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const [from, to] = GRADIENTS[index % GRADIENTS.length]!;

  return (
    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "50%", height: "50%", borderRadius: "50%", background: "rgba(255,255,255,0.03)", filter: "blur(60px)" }} />
      <div style={{ textAlign: "center", padding: "0 80px", opacity }}>
        <h1 style={{ color: "#fff", fontSize: 48, fontWeight: 700, margin: 0 }}>{scene.voiceover.slice(0, 40) || scene.description}</h1>
      </div>
      <div style={{ position: "absolute", bottom: 40, textAlign: "center", width: "100%" }}><span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>QIXU · AI 学习助手</span></div>
    </div>
  );
}

export function AILearningDemo({ script }: { script: VideoScript }) {
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
