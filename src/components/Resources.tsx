// src/components/Resources.tsx
import Section from "./Section";
import { resourceGroups } from "../data/site";
import type { Resource } from "../types";

const costStyles: Record<Resource["cost"], string> = {
  free: "border-mint/40 text-mint",
  freemium: "border-cyan/40 text-cyan",
  paid: "border-gold/40 text-gold",
  student: "border-violet-400/40 text-violet-300",
};

export default function Resources() {
  return (
    <Section
      id="resources"
      eyebrow="resources"
      title="Where to start learning"
      intro="Everything below is either free or has a usable free tier. If you only do one thing, finish OverTheWire: Bandit."
      tinted
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {resourceGroups.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-edge bg-panel p-6"
          >
            <h3 className="font-mono text-sm tracking-wider text-mint uppercase">
              {group.category}
            </h3>

            <ul className="mt-5 space-y-5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <div className="flex items-start justify-between gap-3">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm font-medium text-neutral-100 transition-colors hover:text-mint"
                    >
                      {item.name}
                      <span aria-hidden="true" className="text-muted"> ↗</span>
                    </a>
                    <span
                      className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] ${costStyles[item.cost]}`}
                    >
                      {item.cost}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
