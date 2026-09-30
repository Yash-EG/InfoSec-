// src/components/Hero.tsx
import { club, heroPhrases } from "../data/site";
import { useTypewriter } from "../hooks/useTypewriter";
import { ErrorCascade } from "./Retro";

export default function Hero() {
  const typed = useTypewriter(heroPhrases);

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-20 pb-24 sm:px-8 sm:pt-28 sm:pb-32"
    >
      {/* background layers */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink/70 to-ink"
        aria-hidden="true"
      />
      <div
        className="absolute top-[-12rem] left-1/2 -z-10 h-[28rem] w-[38rem] -translate-x-1/2 bg-mint/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* oversized ghost wordmark — zine cut-and-paste overlap */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 hidden select-none text-center font-mono text-[8rem] leading-none font-black tracking-tighter text-white/[0.035] uppercase sm:block sm:text-[11rem]"
      >
        {club.short}
      </p>

      {/* corner ticks — brutalist frame */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-mint/50"
      />
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-mint/50"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel/70 px-4 py-1.5 font-mono text-xs text-neutral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
          {club.school} · Student Organization
        </p>

        <h1
          data-text={club.name}
          className="glitch mt-7 text-5xl font-crt tracking-wide uppercase sm:text-7xl"
        >
          {club.name}
        </h1>

        <p className="mt-5 font-mono text-lg text-neutral-300 sm:text-2xl">
          <span className="text-muted select-none">$ </span>
          <span className="text-mint">./learn</span>{" "}
          <span className="caret">{typed}</span>
        </p>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          {club.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#join"
            className="glow-mint w-full rounded-lg bg-mint px-7 py-3.5 font-mono text-sm font-semibold text-ink transition-colors hover:bg-mint-dim sm:w-auto"
          >
            Join the club
          </a>
          <a
            href="#events"
            className="w-full rounded-lg border border-edge bg-panel/60 px-7 py-3.5 font-mono text-sm font-semibold text-neutral-200 transition-colors hover:border-mint/50 hover:text-mint sm:w-auto"
          >
            See upcoming events
          </a>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-3">
          {[
            { k: "When", v: club.meeting.cadence },
            { k: "Time", v: club.meeting.time },
            { k: "Where", v: club.meeting.room },
          ].map((item) => (
            <div key={item.k} className="bg-panel px-5 py-5">
              <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                {item.k}
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-neutral-100">
                {item.v}
              </dd>
            </div>
          ))}
        </dl>

        <ErrorCascade className="mx-auto mt-16" />
      </div>
    </section>
  );
}
