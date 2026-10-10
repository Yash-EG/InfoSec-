// src/hooks/useTypewriter.ts
import { useEffect, useRef, useState } from "react";

interface Options {
  typeMs?: number;
  eraseMs?: number;
  holdMs?: number;
}

/**
 * Cycles through `phrases`, typing and erasing one character at a time.
 * Pass a module-level (stable) array — a new array literal each render
 * would restart the effect.
 */
export function useTypewriter(
  phrases: string[],
  { typeMs = 90, eraseMs = 45, holdMs = 2600 }: Options = {},
): string {
  const [text, setText] = useState("");
  const indexRef = useRef(0);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced || phrases.length === 0) {
      setText(phrases[0] ?? "");
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let current = "";
    let erasing = false;

    // State lives in locals, not in a setText updater: updaters must be pure,
    // and StrictMode double-invokes them, which used to schedule two timers
    // per tick (exponential growth -> main-thread jank over time).
    const tick = () => {
      const full = phrases[indexRef.current];
      let delay: number;

      if (!erasing) {
        current = full.slice(0, current.length + 1);
        if (current === full) {
          erasing = true;
          delay = holdMs;
        } else {
          delay = typeMs;
        }
      } else {
        current = current.slice(0, -1);
        if (current.length === 0) {
          erasing = false;
          indexRef.current = (indexRef.current + 1) % phrases.length;
        }
        delay = eraseMs;
      }

      setText(current);
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, typeMs);
    return () => clearTimeout(timer);
  }, [phrases, typeMs, eraseMs, holdMs, reduced]);

  return text;
}
