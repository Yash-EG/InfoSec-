// src/components/NeonScene.tsx
import { useRef } from "react";
import { club } from "../data/site";
import { useAsh } from "../hooks/useAsh";
import "./neon-sign.css";

/** Hero title: a neon sign over the ruined-street image, with falling ash. */
export default function NeonScene() {
  const ashRef = useRef<HTMLCanvasElement>(null);
  useAsh(ashRef);

  return (
    <div className="ns-scene">
      <div className="ns-layer ns-cast" aria-hidden="true" />

      <div className="ns-board">
        <div className="ns-backing" aria-hidden="true" />
        <div className="ns-frame" aria-hidden="true" />
        <div className="ns-frame2" aria-hidden="true" />
        <div className="ns-face">
          <div className="ns-strip" aria-hidden="true">
            <i />
            <span>Open · All survivors welcome</span>
            <i className="ns-broken" />
          </div>

          <h1 className="ns-neon ns-surge" aria-label={club.name}>
            <span className="ns-script" aria-hidden="true">
              U<span className="ns-dead-b">N</span>CG
            </span>
            <span className="ns-block" aria-hidden="true">
              INF<span className="ns-dead-a">O</span>SEC
            </span>
          </h1>

          <div className="ns-strip" aria-hidden="true">
            <i />
            <span>Club</span>
            <i />
          </div>
        </div>
      </div>

      <canvas ref={ashRef} className="ns-ash" aria-hidden="true" />
      <div className="ns-layer ns-vignette" aria-hidden="true" />
    </div>
  );
}
