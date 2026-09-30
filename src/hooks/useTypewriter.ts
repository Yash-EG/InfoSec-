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
  const erasingRef = useRef(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced || phrases.length === 0) {
      setText(phrases[0] ?? "");
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = phrases[indexRef.current];

      setText((prev) => {
        if (!erasingRef.current) {
          const next = full.slice(0, prev.length + 1);
          if (next === full) {
            erasingRef.current = true;
            timer = setTimeout(tick, holdMs);
          } else {
            timer = setTimeout(tick, typeMs);
          }
          return next;
        }

        const next = prev.slice(0, -1);
        if (next.length === 0) {
          erasingRef.current = false;
          indexRef.current = (indexRef.current + 1) % phrases.length;
        }
        timer = setTimeout(tick, eraseMs);
        return next;
      });
    };

    timer = setTimeout(tick, typeMs);
    return () => clearTimeout(timer);
  }, [phrases, typeMs, eraseMs, holdMs, reduced]);

  return text;
}
