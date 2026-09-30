// src/components/Officers.tsx
import Section from "./Section";
import { officers } from "../data/site";
import type { Officer } from "../types";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0 || name === "TBD") return "?";
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function OfficerCard({ officer }: { officer: Officer }) {
  const links = [
    officer.email && { label: "email", href: `mailto:${officer.email}` },
    officer.github && { label: "github", href: officer.github },
    officer.linkedin && { label: "linkedin", href: officer.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <article className="relative rounded-xl border border-edge bg-panel p-6 transition-all odd:-rotate-1 even:rotate-1 hover:rotate-0 hover:border-mint/50">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-mint/30 bg-mint/10 font-mono text-sm font-bold text-mint"
          aria-hidden="true"
        >
          {initials(officer.name)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">
            {officer.name}
          </h3>
          <p className="font-mono text-xs text-mint">{officer.role}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-neutral-400">{officer.focus}</p>

      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 border-t border-edge pt-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer noopener"
              className="font-mono text-xs text-muted transition-colors hover:text-mint"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Officers() {
  return (
    <Section
      id="officers"
      eyebrow="officers"
      title="Who runs this"
      intro="Officer elections happen every spring."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {officers.map((o) => (
          <OfficerCard key={o.role} officer={o} />
        ))}
      </div>
    </Section>
  );
}
