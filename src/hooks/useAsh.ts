// src/hooks/useAsh.ts
import { useEffect, type RefObject } from "react";

/**
 * Falling ash on one canvas. A single rAF loop drives every flake (no
 * per-particle DOM), capped at 1.5x DPR, and it stops while the canvas is
 * off-screen or the tab is hidden. Does nothing under prefers-reduced-motion.
 */

type Flake = {
  x: number;
  y: number;
  vy: number;
  size: number;
  sway: number;
  phase: number;
  alpha: number;
  ember: boolean;
};

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const between = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

export function useAsh(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let onScreen = true;
    let ash: Flake[] = [];

    const seed = () => {
      const count = clamp(Math.round((w * h) / 4200), 90, 320);
      ash = Array.from({ length: count }, () => {
        const depth = Math.random(); // 0 = far (small, slow, dim) .. 1 = near
        return {
          x: between(0, w),
          y: between(-h, h),
          vy: 16 + depth * 70,
          size: 1 + depth * 3.4,
          sway: between(8, 28),
          phase: between(0, Math.PI * 2),
          alpha: 0.3 + depth * 0.55,
          ember: Math.random() < 0.12,
        };
      });
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const frame = (now: number) => {
      raf = 0;
      if (!onScreen || document.hidden) return;
      const dt = Math.min((now - last) / 1000 || 0.016, 0.05);
      last = now;
      const t = now / 1000;

      ctx.clearRect(0, 0, w, h);
      for (const f of ash) {
        f.y += f.vy * dt;
        if (f.y > h + 4) {
          f.y = -4;
          f.x = between(0, w);
        }
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = f.ember ? "#ff9a3c" : "#d8cfc0";
        ctx.fillRect(f.x + Math.sin(t * 0.8 + f.phase) * f.sway, f.y, f.size, f.size);
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);
    start();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, [canvasRef]);
}
