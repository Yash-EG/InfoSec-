// src/components/Footer.tsx
import { club, socials } from "../data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge bg-panel/40 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold text-white">
            <span className="text-mint">{club.short}</span>
            <span className="text-muted">@</span>
            <span className="text-cyan">uncg</span>
          </p>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted">
            {club.tagline}
          </p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs text-neutral-300 transition-colors hover:text-mint"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-edge pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-muted">
          © {year} {club.name} · {club.school}. Not an official university
          publication.
        </p>
        <a
          href="#top"
          className="font-mono text-[11px] text-muted transition-colors hover:text-mint"
        >
          ↑ back to top
        </a>
      </div>
    </footer>
  );
}
