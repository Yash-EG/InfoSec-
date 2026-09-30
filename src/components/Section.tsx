// src/components/Section.tsx
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** Adds a subtle panel tint to alternate sections */
  tinted?: boolean;
}

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tinted = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={[
        "border-t border-edge/60 px-5 py-20 sm:px-8 sm:py-24",
        tinted ? "bg-panel/40" : "",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.2em] text-mint uppercase">
          <span className="text-muted select-none">## </span>
          {eyebrow}
        </p>

        <h2
          id={`${id}-title`}
          className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          {title}
        </h2>

        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300">
            {intro}
          </p>
        )}

        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
