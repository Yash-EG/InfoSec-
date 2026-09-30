// src/components/About.tsx
import Section from "./Section";
import { pillars } from "../data/site";

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="about"
      title="What we actually do"
      intro="We meet, we build something, we break something. Every session is hands-on — no lecture slides, no passive attendance."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {pillars.map((p, i) => (
          <article
            key={p.title}
            className="group rounded-xl border border-edge bg-panel p-6 transition-colors hover:border-mint/40"
          >
            <span className="font-mono text-xs text-mint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
