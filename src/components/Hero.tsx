// src/components/Hero.tsx
import { club, heroPhrases } from "../data/site";
import { useTypewriter } from "../hooks/useTypewriter";
import { ErrorCascade } from "./Retro";
import NeonScene from "./NeonScene";

export default function Hero() {
  const typed = useTypewriter(heroPhrases);

  return (
    <section
      id="top"
      className="relative bg-gradient-to-b from-[#08060c] to-transparent px-5 pb-16 sm:px-8 sm:pb-20"
    >
      {/* soft edge so the solid hero blends into the page below */}
      <div
        className="pointer-events-none absolute inset-x-0 top-full z-10 bg-gradient-to-b from-[#08060c] to-transparent"
        aria-hidden="true"
      />

      {/* full-bleed scene; the container below is pulled up under its faded edge */}
      <div className="-mx-5 sm:-mx-8">
        <NeonScene />
      </div>

      <div className="relative mx-auto -mt-10 max-w-4xl text-center sm:-mt-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel/70 px-4 py-1.5 font-mono text-xs text-neutral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
          {club.school} · Student Organization
        </p>

        <p className="mt-3 font-mono text-lg text-neutral-300 sm:text-2xl">
          <span className="text-muted select-none">$ </span>
          <span className="text-mint">./learn</span>{" "}
          <span className="caret">{typed}</span>
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          {club.description}
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

        <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-3">
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

        <ErrorCascade className="mx-auto mt-12" />
      </div>
    </section>
  );
}
