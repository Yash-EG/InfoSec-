// src/components/Retro.tsx
import { useState, type ReactNode, type ComponentType } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import {
  IconSkull,
  IconBug,
  IconTerminal2,
  IconShieldLock,
  IconFingerprint,
  IconEye,
  IconSpider,
  IconGhost,
  IconBiohazard,
  IconRadioactive,
  IconBinary,
  IconWifi,
  IconLock,
  IconKey,
  IconVirus,
  IconFlame,
  IconCpu,
  IconServer,
  IconRouter,
  IconCode,
  IconHash,
  IconWorld,
  IconSatellite,
  IconAlien,
  IconRobot,
  IconBrandGithub,
  IconFlask,
  IconBomb,
  IconRadar,
  type IconProps,
} from "@tabler/icons-react";

/* ------------------------------------------------------------------ */
/* Sticker-bombed icon field — hacker/security iconography scattered   */
/* the full length of the page, like patches slapped on a laptop lid.  */
/* Mount ONCE as a direct child of a `relative` full-height wrapper     */
/* (NOT inside the fixed GlitchBackground — that's viewport-height     */
/* only, which would squash every sticker into the first screen).      */
/* Positions come from a seeded PRNG, computed once at module load —   */
/* deterministic, so the layout never jumps on re-render.              */
/* ------------------------------------------------------------------ */

type Sticker = {
  Icon: ComponentType<IconProps>;
  top: string;
  left: string;
  rotate: number;
  size: number;
  tone: "mint" | "gold" | "cyan" | "bone";
  opacity: number;
};

const TONE_CLASS: Record<Sticker["tone"], string> = {
  mint: "text-mint",
  gold: "text-gold",
  cyan: "text-cyan",
  bone: "text-bone",
};

const STICKER_ICONS: ComponentType<IconProps>[] = [
  IconSkull,
  IconBug,
  IconTerminal2,
  IconShieldLock,
  IconFingerprint,
  IconEye,
  IconSpider,
  IconGhost,
  IconBiohazard,
  IconRadioactive,
  IconBinary,
  IconWifi,
  IconLock,
  IconKey,
  IconVirus,
  IconFlame,
  IconCpu,
  IconServer,
  IconRouter,
  IconCode,
  IconHash,
  IconWorld,
  IconSatellite,
  IconAlien,
  IconRobot,
  IconBrandGithub,
  IconFlask,
  IconBomb,
  IconRadar,
];

const TONES: Sticker["tone"][] = ["mint", "gold", "cyan", "bone"];

/** Small deterministic PRNG (mulberry32) so the scatter is fixed, not Math.random(). */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildStickers(count: number, seed: number): Sticker[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    Icon: STICKER_ICONS[Math.floor(rand() * STICKER_ICONS.length)],
    top: `${(rand() * 98).toFixed(1)}%`,
    left: `${(rand() * 96).toFixed(1)}%`,
    rotate: Math.round(rand() * 70 - 35),
    size: Math.round(28 + rand() * 40),
    tone: TONES[i % TONES.length],
    opacity: Number((0.28 + rand() * 0.3).toFixed(2)),
  }));
}

const STICKERS = buildStickers(60, 1337);

export function StickerBomb() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {STICKERS.map(({ Icon, top, left, rotate, size, tone, opacity }, i) => (
        <Icon
          key={i}
          size={size}
          stroke={1.75}
          className={TONE_CLASS[tone]}
          style={{
            position: "absolute",
            top,
            left,
            rotate: `${rotate}deg`,
            opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fixed full-page texture stack. Mount ONCE, near the top of <App />.  */
/* ------------------------------------------------------------------ */

export function GlitchBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* magenta + acid blooms */}
      <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-gold/25 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-mint/15 blur-[150px]" />
      <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-[130px]" />

      {/* comic halftone passes */}
      <div className="bg-halftone absolute inset-0" />
      <div className="bg-halftone-lg absolute inset-0" />

      {/* grain + scanlines + vignette */}
      <div className="noise scanlines crt absolute inset-0" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Glitch text — needs data-text to duplicate the string in pseudos.    */
/* ------------------------------------------------------------------ */

export function GlitchText({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag data-text={children} className={`glitch ${className}`}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Windows 98 dialog                                                    */
/* ------------------------------------------------------------------ */

export interface ErrorWindowProps {
  title: string;
  body: ReactNode;
  buttons?: string[];
  /** "error" | "warn" | "info" — swaps the glyph */
  icon?: "error" | "warn" | "info";
  /** magenta titlebar instead of classic blue */
  dead?: boolean;
  className?: string;
  onClose?: () => void;
}

const glyphs = { error: "✖", warn: "⚠", info: "i" } as const;
const glyphColors = {
  error: "bg-blood text-white",
  warn: "bg-gold text-black",
  info: "bg-win-blue text-white",
} as const;

export function ErrorWindow({
  title,
  body,
  buttons = ["OK", "Cancel"],
  icon = "error",
  dead = false,
  className = "",
  onClose,
}: ErrorWindowProps) {
  return (
    <div
      role="dialog"
      aria-label={title}
      className={`win-window w-[19rem] max-w-full ${className}`}
    >
      <div className={`win-title ${dead ? "win-title-dead" : ""}`}>
        <span className="truncate">{title}</span>
        <span className="flex gap-0.5">
          <button type="button" className="win-btn" tabIndex={-1} aria-hidden>
            _
          </button>
          <button type="button" className="win-btn" tabIndex={-1} aria-hidden>
            □
          </button>
          <button
            type="button"
            className="win-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </span>
      </div>

      <div className="flex items-start gap-3 px-4 py-5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold ${glyphColors[icon]}`}
          aria-hidden="true"
        >
          {glyphs[icon]}
        </span>
        <div className="pt-1 text-[12px] leading-snug">{body}</div>
      </div>

      <div className="flex justify-center gap-2 border-t-2 border-t-white px-4 pt-3 pb-4">
        {buttons.map((b, i) => (
          <button
            key={`${b}-${i}`}
            type="button"
            onClick={onClose}
            className={`win-btn h-auto px-5 py-1.5 text-[12px] ${
              i === 0 ? "outline outline-offset-[-4px] outline-black" : ""
            }`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cascading stack of dialogs — the "you got popped" hero decoration.   */
/* Dismissable so it never traps a real user.                           */
/* ------------------------------------------------------------------ */

const CASCADE: ErrorWindowProps[] = [
  {
    title: "C:\\WINDOWS\\SYSTEM32",
    body: "Port 22 is wide open. Was that on purpose?",
    buttons: ["Abort", "Retry", "Ignore"],
    icon: "warn",
  },
  {
    title: "SPARTAN_TAKEOVER.EXE",
    body: "Privilege escalation successful. Welcome to root.",
    buttons: ["Nice", "Undo"],
    icon: "info",
    dead: true,
  },
  {
    title: "INFOSEC.UNCG.EDU",
    body: "ARE YOU SURE YOU LIKE WHAT YOU SEE?",
    buttons: ["YES", "YES", "YES"],
    icon: "error",
    dead: true,
  },
  {
    title: "DEFCON_ALERT.LOG",
    body: "Unusual outbound traffic on port 4444. Probably nothing.",
    buttons: ["Investigate", "Later"],
    icon: "warn",
  },
  {
    title: "WELCOME.TXT",
    body: "You've reached UNCG InfoSec. Curiosity required. Malice not.",
    buttons: ["Got it"],
    icon: "info",
    dead: true,
  },
];

export function ErrorCascade({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<number[]>(CASCADE.map((_, i) => i));

  if (open.length === 0) return null;

  return (
    <div className={`relative h-96 w-full max-w-md ${className}`}>
      {CASCADE.map((w, i) =>
        open.includes(i) ? (
          <ErrorWindow
            key={w.title}
            {...w}
            className="absolute"
            onClose={() => setOpen((o) => o.filter((n) => n !== i))}
          />
        ) : null,
      )}
      <style>{`
        .relative > [role="dialog"]:nth-of-type(1) { top: 0;    left: 0;    z-index: 1; }
        .relative > [role="dialog"]:nth-of-type(2) { top: 26px; left: 26px; z-index: 2; }
        .relative > [role="dialog"]:nth-of-type(3) { top: 52px; left: 52px; z-index: 3; }
        .relative > [role="dialog"]:nth-of-type(4) { top: 78px; left: 78px; z-index: 4; }
        .relative > [role="dialog"]:nth-of-type(5) { top: 104px; left: 104px; z-index: 5; }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scrolling ticker — drop between sections.                            */
/* ------------------------------------------------------------------ */

export function Marquee({
  text,
  reverse = false,
  tone = "mint",
}: {
  text: string;
  reverse?: boolean;
  tone?: "mint" | "gold";
}) {
  // nbsp: `white-space: nowrap` collapses normal spaces, which ate the
  // trailing separator and glued the two copies together at the seam.
  const sep = "\u00a0\u00a0\u00a0///\u00a0\u00a0\u00a0";
  const strip = Array.from({ length: 4 }, () => text).join(sep) + sep;

  return (
    <div
      aria-hidden="true"
      className={`marquee ${reverse ? "marquee-rev" : ""} border-y-2 border-black py-2 ${
        tone === "mint" ? "bg-mint text-black" : "bg-gold text-white"
      }`}
    >
      <span className="font-pixel text-[10px] tracking-[0.2em]">{strip}</span>
      <span className="font-pixel text-[10px] tracking-[0.2em]">{strip}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Terminal ticker — types the message out letter by letter, then       */
/* holds and erases it, on loop. A calmer stand-in for <Marquee />.     */
/* ------------------------------------------------------------------ */

export function TerminalTicker({ text }: { text: string }) {
  const typed = useTypewriter([text], { typeMs: 45, eraseMs: 18, holdMs: 2600 });

  return (
    <div
      aria-hidden="true"
      className="border-y-2 border-black bg-ink py-3 text-center"
    >
      <span className="font-mono text-xs tracking-[0.15em] text-mint sm:text-sm">
        <span className="text-muted select-none">$ </span>
        {typed}
        <span className="caret" />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hazard-tape divider                                                  */
/* ------------------------------------------------------------------ */

export function HazardBar({ tone = "warn" }: { tone?: "warn" | "blood" }) {
  return (
    <div
      aria-hidden="true"
      className={`h-3 w-full ${tone === "warn" ? "stripes-warn" : "stripes-blood"}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Sticker                                                              */
/* ------------------------------------------------------------------ */

export function Sticker({
  children,
  alt = false,
  className = "",
}: {
  children: ReactNode;
  alt?: boolean;
  className?: string;
}) {
  return (
    <span className={`sticker ${alt ? "sticker-alt" : ""} ${className}`}>
      {children}
    </span>
  );
}
